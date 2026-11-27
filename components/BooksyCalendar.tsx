'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { booksyWidgetUrl, config } from '../lib/config';

const consentKey = 'gabinet-booksy-consent-v1';
const consentEvent = 'gabinet-booksy-consent-change';
type Consent = 'granted' | 'denied' | null;
let sessionChoice: Consent = null;

function readConsent(): Consent {
  if (sessionChoice !== null) return sessionChoice;
  try {
    const value = localStorage.getItem(consentKey);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch { return null; }
}

function subscribe(callback: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key === consentKey || event.key === null) callback();
  }
  window.addEventListener(consentEvent, callback);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(consentEvent, callback);
    window.removeEventListener('storage', onStorage);
  };
}

function saveConsent(choice: Exclude<Consent, null>) {
  try {
    localStorage.setItem(consentKey, choice);
    sessionChoice = null;
  } catch { sessionChoice = choice; }
  window.dispatchEvent(new Event(consentEvent));
}

function CalendarFrame() {
  const slot = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<'loading' | 'loaded' | 'slow'>('loading');

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
      {near && <iframe
        src={booksyWidgetUrl}
        title="Kalendarz rezerwacji Booksy"
        sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        referrerPolicy="no-referrer"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('slow')}
      />}
    </div>
    <p className="booksy-status" role="status">{status === 'slow'
      ? 'Kalendarz ładuje się długo. Można przejść bezpośrednio do Booksy, korzystając z odnośnika powyżej.'
      : ''}</p>
  </>;
}

export default function BooksyCalendar({ linkLabel = 'Otwórz kalendarz w Booksy', primary = false }: { linkLabel?: string; primary?: boolean }) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const allowed = consent === 'granted';

  return <div className="booksy-calendar">
    <p><a className={primary ? 'booking' : 'text-link'} href={config.booksyUrl} rel="noreferrer">{linkLabel}</a></p>
    {config.booksyId && <>
      <div className="booksy-consent">
        <p>{allowed
          ? 'Gdy zbliżysz się do kalendarza, wczyta się on automatycznie. Jeśli nie działa, skorzystaj z odnośnika powyżej.'
          : 'Opcjonalny kalendarz Booksy wymaga zgody. Po wczytaniu Booksy otrzyma dane połączenia (np. adres IP) i może używać własnych plików cookies. Bez zgody możesz skorzystać z odnośnika powyżej.'}{' '}<a href="/polityka-prywatnosci/#cookies">Informacje o prywatności</a></p>
        <div className="booksy-consent-actions">
          <button type="button" className="button-secondary" onClick={() => saveConsent(allowed ? 'denied' : 'granted')}>
            {allowed ? 'Wycofaj zgodę na osadzenie Booksy' : 'Zezwól na osadzenie Booksy'}
          </button>
          {consent === null && <button type="button" className="button-secondary" onClick={() => saveConsent('denied')}>Nie zezwalaj</button>}
        </div>
        <p className="booksy-status" role="status">{consent === 'denied' ? 'Kalendarz nie jest osadzany.' : ''}</p>
        <noscript><p>Do zapisania zgody potrzebny jest JavaScript. Możesz przejść bezpośrednio do Booksy.</p></noscript>
      </div>
      {allowed && <CalendarFrame/>}
    </>}
  </div>;
}
