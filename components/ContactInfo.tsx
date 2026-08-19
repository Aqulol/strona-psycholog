'use client';

import { useEffect, type ReactNode } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { config } from '../lib/config';
import { track } from '../lib/analytics';

/**
 * Statyczna część sekcji „Kontakt" — renderuje JEDEN rząd (grid lg:grid-cols-3):
 *   - kolumna 1: dane kontaktowe (lista z ikonami) + POD nimi blok „Cennik"
 *     (karty cen z config.prices + stopka „Stacjonarnie i online..."), jedna
 *     karta;
 *   - kolumna 2: „Rezerwacja online" — widget kalendarza ZnanyLekarz;
 *   - kolumna 3: formularz wiadomości (children), przekazany z Contact.tsx.
 * Na mobile/tablet bloki układają się pionowo w kolejności: dane kontaktowe,
 * cennik, kalendarz, formularz.
 *
 * Renderuje się OD RAZU na stronie głównej (nie-leniwie), dzięki czemu
 * anchor kalendarza (data-zlw-type="big_with_calendar") trafia do
 * początkowego HTML (out/index.html). Skrypt widget.js (platform.docplanner.
 * com/js/widget.js) — wstrzykiwany po hydratacji z guardem na #zl-widget-s —
 * przetwarza ten anchor na starcie, tak samo jak certyfikat w hero.
 *
 * Formularz (z SDK Firestore) jest wydzielony do ContactForm.tsx i ładowany
 * LENIwie w components/Contact.tsx, skąd trafia tutaj jako {children}
 * (kolumna 3).
 */
export default function ContactInfo({ children }: { children?: ReactNode }) {
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

  const contactItems = [
    { icon: Phone, label: 'Telefon', value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'E-mail', value: config.email, href: `mailto:${config.email}` },
    { icon: MapPin, label: 'Adres', value: config.address },
    { icon: Clock, label: 'Godziny przyjęć', value: 'Aktualne terminy w kalendarzu online – rezerwacja przez ZnanyLekarz.' },
  ];

  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
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

      {/* Kolumna 2: rezerwacja online (kalendarz ZnanyLekarz) */}
      <div className="rounded border border-border bg-white p-6 lg:p-8">
        <h3 className="text-2xl text-green lg:text-3xl">Rezerwacja online</h3>
        {config.bookingUrl && !config.bookingUrl.includes('[do uzupełnienia]') ? (
          <>
            <p className="my-3 text-lg text-ink/80">Umów wizytę w dogodnym dla siebie terminie:</p>
            <a
              id="zl-url"
              className="zl-url inline-block text-lg text-green underline"
              href={config.bookingUrl}
              rel="nofollow"
              data-zlw-doctor="grzegorz-plebaniak"
              data-zlw-type="big_with_calendar"
              data-zlw-opinion="false"
              data-zlw-hide-branding="true"
              data-zlw-saas-only="true"
              data-zlw-a11y-title="Widget umówienia wizyty lekarskiej"
              onClick={() => track('book_click', { method: 'znanylekarz', location: 'kontakt' })}
            >
              Umów wizytę
            </a>
            <a
              href={config.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-block rounded bg-green px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-green/90"
              onClick={() => track('book_click', { method: 'znanylekarz', location: 'kontakt' })}
            >
              Zarezerwuj termin online
            </a>
          </>
        ) : (
          <p className="my-3 text-lg text-ink/80">Aktualne terminy znajdzie Pan/Pani w kalendarzu online ZnanyLekarz.</p>
        )}
      </div>

      {/* Kolumna 3: formularz wiadomości (przekazany z Contact.tsx) */}
      <div className="rounded border border-border bg-white p-6 lg:p-8">{children}</div>
    </div>
  );
}
