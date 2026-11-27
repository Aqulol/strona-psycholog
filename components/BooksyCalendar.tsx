'use client';

import { useEffect, useRef, useState } from 'react';
import { booksyWidgetUrl, config } from '../lib/config';
import { useBooksyConsent } from './PrivacyPreferences';

function CalendarFrame() {
  const slot = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'slow' | 'failed'>('loading');

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
    <div className="booksy-slot" ref={slot}>
      {status !== 'loaded' && <p className="booksy-loading" role="status">{status === 'slow' || status === 'failed'
        ? 'Nie widać terminów? Skorzystaj z odnośnika do Booksy powyżej.'
        : 'Wczytywanie kalendarza Booksy…'}</p>}
      {near && status !== 'failed' && <iframe
        src={booksyWidgetUrl}
        title="Kalendarz rezerwacji Booksy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('failed')}
      />}
    </div>

  </>;
}

export default function BooksyCalendar({ linkLabel = 'Otwórz kalendarz w Booksy', primary = false }: { linkLabel?: string; primary?: boolean }) {
  const allowed = useBooksyConsent(Boolean(config.booksyId));
  return <div className="booksy-calendar">
    <p><a className={primary ? 'booking' : 'text-link'} href={config.booksyUrl} rel="noreferrer">{linkLabel}</a></p>
    {config.booksyId && allowed && <CalendarFrame/>}
  </div>;
}
