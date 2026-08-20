'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'gabinet-cookie-consent';
const CONSENT_ACCEPTED_EVENT = 'gabinet-consent-accepted';
const CONSENT_REJECTED_EVENT = 'gabinet-consent-rejected';

/**
 * Baner cookies – informacja o plikach i zgoda zapisywana w localStorage.
 * Po wyrażeniu zgody („Akceptuję") lub odmowie („Tylko niezbędne") baner
 * nie jest już pokazywany.
 * - Zgoda (klucz 'gabinet-cookie-consent' = '1') oraz zdarzenie
 *   'gabinet-consent-accepted' uruchamiają ładowanie analityki
 *   (components/GtmScript.tsx).
 * - Odmowa ('0') i zdarzenie 'gabinet-consent-rejected' — analityka nigdy
 *   się nie ładuje (brak plików analitycznych).
 * Przycisk „Tylko niezbędne" daje równoważną drogę odmowy — wymóg
 * ePrivacy/RODO (odmowa równie łatwa jak zgoda).
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const store = (value: '0' | '1') => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // localStorage niedostępne – baner zostaje na sesję
    }
    setVisible(false);
  };

  const accept = () => {
    store('1');
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_ACCEPTED_EVENT));
    } catch {
      // brak wsparcia CustomEvent – analityka nie zostanie wstrzyknięta,
      // ale strona działa normalnie
    }
  };

  const reject = () => {
    store('0');
    try {
      window.dispatchEvent(new CustomEvent(CONSENT_REJECTED_EVENT));
    } catch {
      // brak wsparcia CustomEvent
    }
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Informacja o plikach cookies"
      className="fixed inset-x-0 bottom-16 z-50 lg:bottom-0"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-t-2xl border border-border bg-white p-5 shadow-xl md:m-4 md:rounded-2xl md:flex-row md:items-center">
        <Cookie aria-hidden="true" className="hidden shrink-0 text-gold md:block" size={28} />
        <p className="flex-1 text-sm leading-6 text-ink/80">
          Ta strona używa plików cookies w celach technicznych oraz – po wyrażeniu zgody – analitycznych.{' '}
          <Link href="/polityka-prywatnosci" className="text-green underline">
            Dowiedz się więcej w polityce prywatności
          </Link>
          .
        </p>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={reject}
            className="rounded border border-green px-5 py-2.5 text-sm font-medium text-green transition-colors hover:bg-green/5"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded bg-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green/90"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
