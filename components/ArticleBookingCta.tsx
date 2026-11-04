'use client';

import { CalendarPlus } from 'lucide-react';
import { config } from '../lib/config';
import { track } from '../lib/analytics';

/**
 * Spokojne CTA na końcu artykułu — po głównym tekście, przed „Przeczytaj także”.
 *
 * Celowo JEDEN przycisk i zero CTA w środku tekstu: na telefonach działa już
 * stały pasek rezerwacji (components/MobileCtaBar.tsx), a artykuł ma pozostać
 * przede wszystkim tekstem. Link prowadzi bezpośrednio do kalendarza Booksy
 * (bez pośredniej sekcji kontaktu), więc przejście od czytania do rezerwacji
 * jest jak najkrótsze.
 *
 * Kliknięcie mierzone jako `book_click` z `location: 'article'` — zgodnie
 * z konwencją używaną w Header/Hero/MobileCtaBar/Contact.
 */
export default function ArticleBookingCta() {
  return (
    <aside
      aria-label="Rezerwacja wizyty"
      className="mt-12 rounded-lg border border-border bg-white p-6 sm:p-8"
    >
      <p className="text-lg leading-8 text-ink/80">
        Jeśli ten temat jest Panu/Pani bliski, można omówić go podczas konsultacji — stacjonarnie
        we Wrocławiu lub online.
      </p>
      <a
        href={config.booksyUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('book_click', { method: 'booksy', location: 'article' })}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded bg-green px-6 py-3.5 text-base font-medium text-white transition hover:bg-green/90 active:scale-[0.99]"
      >
        <CalendarPlus aria-hidden="true" size={18} />
        Umów wizytę przez Booksy
        <span className="sr-only"> (otwiera się w nowej karcie)</span>
      </a>
      <p className="mt-3 text-sm leading-6 text-ink/60">
        Wybór terminu w kalendarzu Booksy — stacjonarnie lub online.
      </p>
    </aside>
  );
}
