'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const CONSENT_KEY = 'gabinet-cookie-consent';

/**
 * Baner cookies – informacja o plikach i zgoda zapisywana w localStorage.
 * Po wyrażeniu zgody baner nie jest już pokazywany.
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

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, '1');
    } catch {
      // localStorage niedostępne – baner zostaje na sesję
    }
    setVisible(false);
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
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded bg-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green/90"
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
}
