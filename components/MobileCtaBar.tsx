'use client';

import { usePathname } from 'next/navigation';
import { CalendarPlus } from 'lucide-react';
import { track } from '../lib/analytics';

/**
 * Sticky bottom CTA bar – tylko na mobile (<lg).
 * Na podstronach prowadzi do sekcji kontakt strony głównej (/#kontakt).
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const href = pathname === '/' ? '#kontakt' : '/#kontakt';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-cream/95 p-3 backdrop-blur lg:hidden">
      <a
        href={href}
        onClick={() => track('book_click', { method: 'znanylekarz', location: 'mobile_bar' })}
        className="flex items-center justify-center gap-2 rounded bg-green px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-green/90"
      >
        <CalendarPlus aria-hidden="true" size={18} />
        Umów wizytę
      </a>
    </div>
  );
}
