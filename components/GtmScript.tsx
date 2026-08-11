'use client';

import { useEffect, useRef, useState } from 'react';
import { config } from '../lib/config';

/**
 * Skrypty Google Tag Manager i Google Analytics 4 (GA4) — ładowane
 * WYŁĄCZNIE po wyrażeniu zgody na cookies (RODO / ePrivacy).
 *
 * Zasada działania:
 * - Klucz zgody w localStorage: 'gabinet-cookie-consent' (wartość '1' =
 *   zgoda udzielona). Ustawia go components/CookieBanner.tsx po kliknięciu
 *   „Akceptuję" i wysyła zdarzenie 'gabinet-consent-accepted'.
 * - Przy pierwszym wejściu bez zapisanej zgody analityka NIE jest ładowana.
 * - Po akceptacji w banerze (zdarzenie 'gabinet-consent-accepted') skrypty
 *   są wstrzykiwane natychmiast; na kolejnych wizytach wystarczy zapisana
 *   zgoda w localStorage. Nasłuch 'storage' synchronizuje zakładki.
 * - Jeśli zgoda nie zostanie udzielona lub zostanie odrzucona (brak wartości
 *   w localStorage) — analityka się nie ładuje.
 *
 * Renderowane TYLKO wtedy, gdy w lib/config.ts wpisano prawdziwe ID
 * (pole NIE może być puste ani zawierać placeholderów 'GTM-XXXXXXX' /
 * 'G-XXXXXXXXXX'). Dopóki ID są placeholderami, komponent niczego nie
 * wstrzykuje i na stronie nie ładuje się żadna analityka.
 *
 * Gdzie wpisać ID: lib/config.ts → pola `gtmId` i `ga4Id`.
 * - GTM: Google Tag Manager → Administracja → kontener (ID: GTM-XXXXXXX)
 * - GA4: Google Analytics → Administracja → Strumienie danych (ID: G-XXXXXXXXXX)
 *
 * Wskazówka: jeśli tag GA4 konfigurujesz wewnątrz GTM, możesz zostawić
 * `ga4Id` puste (''), aby uniknąć podwójnego zliczania odsłon.
 *
 * Uwaga: wstrzykiwanie następuje po stronie klienta (po zgodzie), dlatego
 * nie ma tu wersji <noscript> — nie można jej uzależnić od zgody bez JS,
 * a ładowanie GTM/GA4 bez zgody byłoby naruszeniem zasad RODO.
 */

const CONSENT_KEY = 'gabinet-cookie-consent';
const CONSENT_ACCEPTED_EVENT = 'gabinet-consent-accepted';

function idsReady() {
  const { gtmId, ga4Id } = config;
  const gtmReady = Boolean(gtmId) && !gtmId.includes('XXXX');
  const ga4Ready = Boolean(ga4Id) && !ga4Id.includes('XXXX');
  return { gtmReady, ga4Ready, gtmId: gtmId as string, ga4Id: ga4Id as string };
}

export default function GtmScript() {
  const [consented, setConsented] = useState(false);
  const injected = useRef(false);

  // Sprawdź zapisaną zgodę i nasłuchuj akceptacji w banerze.
  useEffect(() => {
    const hasConsent = () => {
      try {
        return localStorage.getItem(CONSENT_KEY) === '1';
      } catch {
        return false;
      }
    };

    const accept = () => setConsented(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY && e.newValue === '1') accept();
    };

    if (hasConsent()) accept();
    window.addEventListener(CONSENT_ACCEPTED_EVENT, accept);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, accept);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Po uzyskaniu zgody wstrzyknij skrypty (raz).
  useEffect(() => {
    if (!consented || injected.current) return;
    const { gtmReady, ga4Ready, gtmId, ga4Id } = idsReady();
    if (!gtmReady && !ga4Ready) return;
    injected.current = true;

    if (gtmReady) {
      const inline = document.createElement('script');
      inline.text = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`;
      document.head.appendChild(inline);
    }

    if (ga4Ready) {
      const ga = document.createElement('script');
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
      document.head.appendChild(ga);

      const configScript = document.createElement('script');
      configScript.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`;
      document.head.appendChild(configScript);
    }
  }, [consented]);

  return null;
}
