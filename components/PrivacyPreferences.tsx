'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

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

const usageEvent = 'gabinet-booksy-widget-usage';
let widgets = 0;

export function useBooksyConsent(hasWidget: boolean) {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  useEffect(() => {
    if (!hasWidget) return;
    widgets++;
    window.dispatchEvent(new Event(usageEvent));
    return () => {
      widgets--;
      window.dispatchEvent(new Event(usageEvent));
    };
  }, [hasWidget]);
  return consent === 'granted';
}

export default function PrivacyPreferences() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => null);
  const [requested, setRequested] = useState(false);
  const [hasWidget, setHasWidget] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const visible = requested || (hasWidget && consent === null);

  useEffect(() => {
    const update = () => setHasWidget(widgets > 0);
    window.addEventListener(usageEvent, update);
    update();
    return () => window.removeEventListener(usageEvent, update);
  }, []);
  useEffect(() => { if (requested) heading.current?.focus(); }, [requested]);

  function close() {
    setRequested(false);
    if (requested) trigger.current?.focus({ preventScroll: true });
  }

  return <>
    <button ref={trigger} type="button" className="privacy-preferences-trigger" aria-expanded={visible}
      onClick={() => { setRequested(true); heading.current?.focus(); }}>Ustawienia prywatności</button>
    {visible && <section className="privacy-preferences" aria-labelledby="privacy-preferences-title">
      <h2 id="privacy-preferences-title" ref={heading} tabIndex={-1}>Ustawienia prywatności</h2>
      <p>Kalendarz Booksy może używać własnych cookies i otrzymuje dane połączenia. Jeśli zezwolisz na opcjonalne treści, terminy wczytają się automatycznie w sekcjach rezerwacji na całej stronie. Bez zgody nadal możesz rezerwować bezpośrednio w Booksy. <a href="/polityka-prywatnosci/#cookies">Polityka prywatności</a></p>
      {consent && <p>Aktualny wybór: {consent === 'granted' ? 'zaakceptowano' : 'odrzucono'}.</p>}
      <div className="privacy-preferences-actions">
        <button className="button-secondary" type="button" onClick={() => { saveConsent('granted'); close(); }}>Akceptuję opcjonalne treści</button>
        <button className="button-secondary" type="button" onClick={() => { saveConsent('denied'); close(); }}>Odrzucam opcjonalne treści</button>
        {requested && consent !== null && <button className="button-secondary" type="button" onClick={close}>Zamknij</button>}
      </div>
    </section>}
  </>;
}
