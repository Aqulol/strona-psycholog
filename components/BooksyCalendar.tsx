'use client';

import { useEffect, useRef, useState } from 'react';
import { booksyWidgetUrl, config } from '../lib/config';
import { useBooksyConsent } from './PrivacyPreferences';

function CalendarFrame() {
  const slot = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<'loading' | 'navigation-ended' | 'slow' | 'failed'>('loading');

  useEffect(() => {
    if (!slot.current || !('IntersectionObserver' in window)) {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setNear(true);
      observer.disconnect();
    }, { rootMargin: '240px 0px' });
    observer.observe(slot.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near || status !== 'loading') return;
    const timer = window.setTimeout(() => setStatus('slow'), 12000);
    return () => window.clearTimeout(timer);
  }, [near, status]);

  return <>
    <div className="booksy-slot" ref={slot} data-status={status}>
      {status !== 'navigation-ended' && <p className="booksy-loading" role="status">{status === 'slow' || status === 'failed'
        ? 'Nie widać terminów? Skorzystaj z odnośnika do Booksy powyżej.'
        : 'Wczytywanie kalendarza Booksy…'}</p>}
      {/* Cross-origin load can also mean a browser error document. The direct link remains available. */}
      {near && status !== 'failed' && <iframe
        src={booksyWidgetUrl}
        title="Kalendarz rezerwacji Booksy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('navigation-ended')}
        onError={() => setStatus('failed')}
      />}
    </div>

  </>;
}

export default function BooksyCalendar({ linkLabel = 'Otwórz kalendarz w Booksy', primary = false }: { linkLabel?: string; primary?: boolean }) {
  const allowed = useBooksyConsent(Boolean(config.booksyId));
  return <div className="booksy-calendar">
    <p><a className={primary ? 'booking' : 'text-link'} href={config.booksyUrl} rel="noreferrer">{linkLabel}</a></p>
    {config.booksyId && allowed && <>
      <p className="booksy-fallback-note">Jeśli kalendarz nie pokazuje terminów, skorzystaj z odnośnika powyżej.</p>
      <CalendarFrame/>
    </>}
  </div>;
}
