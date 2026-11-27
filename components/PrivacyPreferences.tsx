'use client';

import { useSyncExternalStore } from 'react';

import {conversionsEnabled, readConversionChoice, subscribeConversionChoice, saveConversionChoice} from '../lib/conversions';

export default function PrivacyPreferences() {
  const choice = useSyncExternalStore(subscribeConversionChoice, readConversionChoice, () => null);
  if (!conversionsEnabled) return null;
  return <details className="privacy-preferences-trigger">
    <summary>Ustawienia prywatności</summary>
    <section className="privacy-preferences" aria-label="Opcjonalny pomiar skuteczności">
      <p>Opcjonalny pomiar nie wpływa na kontakt ani rezerwację. <a href="/polityka-prywatnosci/#pomiar-skutecznosci">Jak działa pomiar</a></p>
      <label><input type="checkbox" checked={choice === 'granted'} onChange={event=>saveConversionChoice(event.currentTarget.checked ? 'granted' : 'denied')}/> Zgadzam się na pomiar skuteczności</label>
    </section>
  </details>;
}
