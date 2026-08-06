'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Input from './Input';
import { config } from '../lib/config';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Waliduje pole „Telefon lub e-mail”: poprawny adres e-mail LUB
 * numer telefonu z min. 9 cyframi.
 */
function isValidContact(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (emailPattern.test(trimmed)) return true;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 9;
}

/**
 * Sekcja „Kontakt” – dane kontaktowe, rezerwacja online i formularz
 * z walidacją klient-side, honeypotem i wysyłką do config.formEndpoint.
 */
export default function Contact() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [rodo, setRodo] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<{ name?: string; contact?: string; rodo?: string }>({});

  useEffect(() => {
    if (!config.bookingUrl || config.bookingUrl.includes('[do uzupełnienia]')) return;
    if (document.getElementById('zl-widget-s')) return;

    const script = document.createElement('script');
    script.id = 'zl-widget-s';
    script.src = '//platform.docplanner.com/js/widget.js';
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript?.parentNode) firstScript.parentNode.insertBefore(script, firstScript);
    else document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  const validate = () => {
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = 'Proszę podać imię (min. 2 znaki).';
    if (!isValidContact(contact)) {
      next.contact = 'Proszę podać poprawny e-mail lub numer telefonu (min. 9 cyfr).';
    }
    if (!rodo) next.rodo = 'Zgoda RODO jest wymagana.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: jeśli ukryte pole zostało wypełnione, nie wysyłamy
    // (symulujemy sukces, by nie zdradzać mechanizmu botowi).
    if (honeypot) {
      setState('success');
      return;
    }

    if (!validate()) return;

    setState('sending');
    try {
      const response = await fetch(config.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), contact: contact.trim(), message: message.trim(), rodo }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setState('success');
      setName('');
      setContact('');
      setMessage('');
      setRodo(false);
      setErrors({});
    } catch (err) {
      console.error('Błąd wysyłki formularza:', err);
      setState('error');
    }
  };

  const contactItems = [
    { icon: Phone, label: 'Telefon', value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'E-mail', value: config.email, href: `mailto:${config.email}` },
    { icon: MapPin, label: 'Adres', value: config.address },
    { icon: Clock, label: 'Godziny przyjęć', value: 'Aktualne terminy w kalendarzu online – rezerwacja przez ZnanyLekarz.' },
  ];

  return (
    <section id="kontakt" className="section bg-white">
      <div className="container">
        <SectionHeading title="Kontakt" />

        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <ul className="space-y-4">
              {contactItems.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon aria-hidden="true" className="mt-1 shrink-0 text-green" size={20} />
                  <div>
                    <p className="text-sm text-ink/60">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-ink hover:text-green">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-ink">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded border border-border bg-cream p-6">
              <h3 className="text-2xl text-green">Rezerwacja online</h3>
              {config.bookingUrl && !config.bookingUrl.includes('[do uzupełnienia]') ? (
                <>
                  <p className="my-3 text-ink/80">Umów wizytę w dogodnym dla siebie terminie:</p>
                  <a
                    id="zl-url"
                    className="zl-url inline-block text-green underline"
                    href={config.bookingUrl}
                    rel="nofollow"
                    data-zlw-doctor="grzegorz-plebaniak"
                    data-zlw-type="big_with_calendar"
                    data-zlw-opinion="false"
                    data-zlw-hide-branding="true"
                    data-zlw-saas-only="true"
                    data-zlw-a11y-title="Widget umówienia wizyty lekarskiej"
                  >
                    Umów wizytę
                  </a>
                  <a
                    href={config.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 inline-block rounded bg-green px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green/90"
                  >
                    Zarezerwuj termin online
                  </a>
                </>
              ) : (
                <p className="my-3 text-ink/80">Aktualne terminy znajdzie Pan/Pani w kalendarzu online ZnanyLekarz.</p>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              id="imie"
              label="Imię"
              placeholder="Jan"
              required
              autoComplete="given-name"
              value={name}
              onChange={setName}
              error={errors.name}
            />

            <Input
              id="kontakt-form"
              label="Telefon lub e-mail"
              placeholder="+48 600 000 000 lub jan@przyklad.pl"
              required
              autoComplete="email"
              value={contact}
              onChange={setContact}
              error={errors.contact}
            />

            <Input
              id="wiadomosc"
              label="Wiadomość"
              placeholder="W kilku zdaniach: czego dotyczy Pana/Pani zgłoszenie?"
              required
              textarea
              value={message}
              onChange={setMessage}
            />

            {/* Honeypot – ukryte pole antyspamowe */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Nie wypełniaj tego pola</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-start gap-2 text-sm text-ink/80">
                <input
                  type="checkbox"
                  checked={rodo}
                  onChange={(e) => setRodo(e.target.checked)}
                  className="mt-1"
                  aria-describedby="rodo-error"
                />
                <span>
                  Wyrażam zgodę na kontakt i przetwarzanie moich danych osobowych zgodnie z{' '}
                  <a href="/polityka-prywatnosci" className="text-green underline">
                    polityką prywatności
                  </a>
                  .
                </span>
              </label>
              {errors.rodo && (
                <p id="rodo-error" className="mt-1 text-sm text-red-700" role="alert">
                  {errors.rodo}
                </p>
              )}
            </div>

            {state === 'success' && (
              <p
                role="status"
                className="flex items-start gap-2 rounded border border-green/30 bg-green/5 p-4 text-sm text-green"
              >
                <CheckCircle2 aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                Dziękuję za wiadomość. Odpowiem najszybciej, jak to możliwe.
              </p>
            )}

            {state === 'error' && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                Nie udało się wysłać wiadomości. Proszę spróbować później lub skontaktować się telefonicznie.
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex items-center gap-2 rounded bg-green px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send aria-hidden="true" size={16} />
              {state === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
