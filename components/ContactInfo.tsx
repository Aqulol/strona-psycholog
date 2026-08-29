'use client';

import { type ReactNode } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { config } from '../lib/config';
import BooksyCalendar from './BooksyCalendar';
import { track } from '../lib/analytics';

/**
 * Statyczna część sekcji „Kontakt" — renderuje JEDEN rząd (grid lg:grid-cols-2):
 *   - kolumna 1: dane kontaktowe (lista z ikonami) + POD nimi blok „Cennik"
 *     (karty cen z config.prices + stopka „Stacjonarnie i online..."), jedna
 *     karta;
 *   - kolumna 2: „Rezerwacja online" — widget kalendarza Booksy (inline),
 *     na desktopie zajmujący połowę szerokości (większy, czytelniejszy);
 *   - formularz wiadomości (children), przekazany z Contact.tsx, renderowany
 *     PONIŻEJ rzędu, na całą szerokość.
 * Na mobile/tablet bloki układają się pionowo w kolejności: dane kontaktowe,
 * cennik, kalendarz, a pod nimi formularz.
 *
 * Formularz (z SDK Firestore) jest wydzielony do ContactForm.tsx i ładowany
 * LENIwie w components/Contact.tsx, skąd trafia tutaj jako {children}.
 */
export default function ContactInfo({ children }: { children?: ReactNode }) {
  const hasBooksy = Boolean(config.booksyId && !config.booksyId.includes('[do uzupełnienia]'));
  const contactItems = [
    { icon: Phone, label: 'Telefon', value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'E-mail', value: config.email, href: `mailto:${config.email}` },
    { icon: MapPin, label: 'Adres', value: config.address },
    { icon: Clock, label: 'Godziny przyjęć', value: 'Aktualne terminy w kalendarzu online – rezerwacja przez Booksy.' },
  ];

  return (
    <div>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* Kolumna 1: dane kontaktowe + cennik (jedna karta) */}
        <div className="rounded border border-border bg-white p-6 lg:p-8">
        <ul className="space-y-5">
          {contactItems.map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <item.icon aria-hidden="true" className="mt-1 shrink-0 text-green" size={22} />
              <div>
                <p className="text-sm text-ink/60">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() =>
                      track(
                        item.href.startsWith('tel:') ? 'call_click' : 'email_click',
                        { location: 'kontakt' }
                      )
                    }
                    className="text-lg text-ink hover:text-green"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-lg text-ink">{item.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Cennik — poniżej danych kontaktowych, w tej samej karcie */}
        <div className="mt-8 border-t border-border pt-8">
          <h3 className="text-2xl text-green lg:text-3xl">Cennik</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {config.prices.map((p) => (
              <div key={p.key} className="rounded border border-border bg-white p-6">
                <p className="text-lg text-green">{p.name}</p>
                <p className="mt-2 text-3xl font-semibold text-ink">{p.price} zł</p>
                <p className="mt-1 text-sm text-ink/60">sesja {p.duration}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink/70">
            Stacjonarnie i online. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.
          </p>
        </div>
      </div>

      {/* Kolumna 2: rezerwacja online (kalendarz Booksy) — na desktopie 1/2 szerokości */}
      <div className="rounded border border-border bg-white p-6 lg:p-8">
        <h3 className="text-2xl text-green lg:text-3xl">Rezerwacja online</h3>
        <p className="my-3 text-lg text-ink/80">Umów wizytę w dogodnym dla siebie terminie:</p>
        <BooksyCalendar />
        {hasBooksy && (
          <a
            href={`https://booksy.com/pl-pl/${config.booksyId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded bg-green px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-green/90"
            onClick={() => track('book_click', { method: 'booksy', location: 'kontakt' })}
          >
            Zarezerwuj termin online
          </a>
        )}
      </div>
      </div>

      {/* Formularz wiadomości (przekazany z Contact.tsx) — PONIŻEJ, na całą szerokość */}
      <div className="mt-8 rounded border border-border bg-white p-6 lg:p-8">{children}</div>
    </div>
  );
}
