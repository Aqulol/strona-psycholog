'use client';

import { config } from '../lib/config';
import { track } from '../lib/analytics';

/**
 * Widget kalendarza Booksy — osadzony w stronie (inline).
 *
 * Kod powstał w oparciu o integrację Booksy (Business Settings → Online
 * Booking → Your Website). Unikalny identyfikator gabinetu pochodzi z
 * lib/config.ts (config.booksyId) — wystarczy go wpisać w jednym miejscu.
 *
 * Kalendarz jest ładowany w <iframe> (pełny, osadzony widok dostępności),
 * dzięki czemu nie wymaga `<script>` od strony klienta i nie jest cofany
 * przez re-render Reacta. Dla a11y/bezpieczeństwa ustawiamy tytuł ramki i
 * tryb sandbox ograniczony do tego, co potrzebne do rezerwacji.
 */
export default function BooksyCalendar() {
  const id = config.booksyId;
  const hasId = Boolean(id && !id.includes('[do uzupełnienia]'));

  const src = `https://booksy.com/widget/index.html?id=${encodeURIComponent(id)}&lang=pl&country=pl`;

  // Gdy booksyId nie jest jeszcze wpisane w lib/config.ts, pokazujemy
  // przyjazny fallback z przyciskiem do rezerwacji — zamiast komunikatu
  // technicznego przeznaczonego dla dewelopera.
  if (!hasId) {
    return (
      <div className="rounded bg-cream p-6">
        <p className="text-base leading-7 text-ink/80">
          Najszybciej umówi się Pan/Pani wizytę bezpośrednio w kalendarzu online:
        </p>
        <a
          href={config.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('book_click', { method: 'link', location: 'kontakt' })}
          className="mt-3 inline-flex items-center justify-center rounded bg-green px-6 py-3 text-base font-medium text-white transition hover:bg-green/90 active:scale-[0.99]"
        >
          Zarezerwuj termin online
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        title="Rezerwacja wizyty online — Booksy"
        src={src}
        className="block h-[780px] w-full lg:h-[920px]"
        style={{ border: 0 }}
        loading="lazy"
        allow="payment"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      />
      <div className="flex items-center justify-between border-t border-border bg-cream px-4 py-3 text-sm text-ink/70">
        <span>
          Rezerwacja online przez{' '}
          <a
            href={config.booksyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:underline"
          >
            Booksy
          </a>
        </span>
        <span>Aktualne terminy na żywo</span>
      </div>
    </div>
  );
}
