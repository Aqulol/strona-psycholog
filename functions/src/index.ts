import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Typ sekretu zwracanego przez defineSecret (SecretParam nie jest eksportowany
// z 'firebase-functions/params', dlatego wyprowadzamy go przez ReturnType).
type Secret = ReturnType<typeof defineSecret>;

initializeApp();
const db = getFirestore();

/**
 * Sekrety zadeklarowane przez defineSecret (firebase-functions/params).
 * Wartości ustawia właściciel w Firebase CLI:
 *
 *   firebase functions:secrets:set SMTP_HOST
 *   firebase functions:secrets:set SMTP_PORT
 *   firebase functions:secrets:set SMTP_USER
 *   firebase functions:secrets:set SMTP_PASS
 *   firebase functions:secrets:set MAIL_TO
 *   firebase functions:secrets:set SITE_URL
 *
 * Sekrety NIE trafiają do repozytorium. Po ustawieniu sekretu trzeba
 * ponownie wdrożyć funkcję (firebase deploy --only functions).
 * Szczegóły: README-FUNCTIONS.md.
 */
const SMTP_HOST = defineSecret('SMTP_HOST');
const SMTP_PORT = defineSecret('SMTP_PORT');
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');
const MAIL_TO = defineSecret('MAIL_TO');
const SITE_URL = defineSecret('SITE_URL');

/** Sekrety udostępniane funkcji przez Cloud Functions (opcja `secrets`). */
const SECRETS = [SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, SITE_URL];

/**
 * Bezpieczny odczyt sekretu: zwraca wartość sekretu (secret.value()),
 * a jeśli sekret nie został ustawiony – fallback. Dzięki temu funkcja
 * działa również lokalnie / testowo: zgłoszenie trafia wtedy do Firestore,
 * a wysyłka SMTP jest pomijana (patrz obsługa w sendContactForm).
 */
function readSecret(secret: Secret, fallback = ''): string {
  try {
    return secret.value();
  } catch {
    return fallback;
  }
}

const formSchema = z.object({
  name: z.string().trim().min(2),
  contact: z.string().trim().refine((value) => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(value);
    const digits = value.replace(/\D/g, '').length >= 9;
    return email || digits;
  }, 'Podaj poprawny e-mail lub numer telefonu.'),
  message: z.string().trim().min(10),
  // Frontend wysyła obecnie pole „rodo”; rodoConsent pozostaje zgodne z docelowym API.
  rodoConsent: z.boolean().optional(),
  rodo: z.boolean().optional(),
  honeypot: z.string().optional().default('')
}).superRefine((data, ctx) => {
  if (data.rodoConsent !== true && data.rodo !== true) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rodoConsent'], message: 'Zgoda RODO jest wymagana.' });
  }
});

type FormData = z.infer<typeof formSchema>;

function corsHeaders(origin: string | undefined): Record<string, string> {
  // SITE_URL to produkcyjna domena (np. https://twojadomena.pl), ustawiana sekretem.
  // Domyślnie „*” – wygodne testowo; właściciel powinien ustawić dokładną domenę.
  const allowed = readSecret(SITE_URL, '*') || '*';
  const permitted = allowed === '*' || (origin && origin === allowed) ? (origin || allowed) : allowed;
  return {
    'Access-Control-Allow-Origin': permitted,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export const sendContactForm = onRequest(
  {
    region: 'europe-west1',
    secrets: SECRETS,
  },
  async (req, res) => {
    Object.entries(corsHeaders(req.headers.origin)).forEach(([key, value]) => res.setHeader(key, value));
    if (req.method === 'OPTIONS') { res.status(204).send(''); return; }
    if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'Dozwolona jest tylko metoda POST.' }); return; }

    const parsed = formSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ ok: false, error: 'Proszę sprawdzić dane formularza.' }); return; }

    const data: FormData = parsed.data;
    if (data.honeypot) { res.status(200).json({ ok: true }); return; }

    try {
      await db.collection('messages').add({
        name: data.name,
        contact: data.contact,
        message: data.message,
        rodoConsent: data.rodoConsent === true || data.rodo === true,
        createdAt: FieldValue.serverTimestamp()
      });

      // Odczyt sekretów SMTP przez .value() (SMTP_PORT rzutowany na Number).
      const host = readSecret(SMTP_HOST);
      const port = Number(readSecret(SMTP_PORT, '587') || 587);
      const user = readSecret(SMTP_USER);
      const pass = readSecret(SMTP_PASS);
      const to = readSecret(MAIL_TO, 'g.plebaniak@somentiq.pl') || 'g.plebaniak@somentiq.pl';

      if (host && user && pass) {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });
        await transporter.sendMail({
          from: user,
          to,
          subject: `Nowa wiadomość ze strony – ${data.name}`,
          text: `Imię: ${data.name}\nKontakt: ${data.contact}\n\nWiadomość:\n${data.message}\n\nZgoda RODO: tak`,
        });
      } else {
        console.warn('Brak kompletnej konfiguracji SMTP; wiadomość zapisano w Firestore.');
      }

      res.status(200).json({ ok: true });
    } catch (error) {
      console.error('Błąd obsługi formularza kontaktowego:', error instanceof Error ? error.message : 'nieznany błąd');
      res.status(500).json({ ok: false, error: 'Nie udało się wysłać wiadomości. Proszę spróbować później.' });
    }
  }
);
