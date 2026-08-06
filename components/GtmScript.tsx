'use client';

import { config } from '../lib/config';

/**
 * Skrypty Google Tag Manager i Google Analytics 4 (GA4).
 *
 * Renderowane TYLKO wtedy, gdy w lib/config.ts wpisano prawdziwe ID
 * (pole NIE może być puste ani zawierać placeholderów 'GTM-XXXXXXX' /
 * 'G-XXXXXXXXXX'). Dopóki ID są placeholderami, komponent zwraca null
 * i na stronie nie ładuje się żadna analityka.
 *
 * Gdzie wpisać ID: lib/config.ts → pola `gtmId` i `ga4Id`.
 * - GTM: Google Tag Manager → Administracja → kontener (ID: GTM-XXXXXXX)
 * - GA4: Google Analytics → Administracja → Strumienie danych (ID: G-XXXXXXXXXX)
 *
 * Wskazówka: jeśli tag GA4 konfigurujesz wewnątrz GTM, możesz zostawić
 * `ga4Id` puste (''), aby uniknąć podwójnego zliczania odsłon.
 */
export default function GtmScript() {
  const { gtmId, ga4Id } = config;

  const gtmReady = Boolean(gtmId) && !gtmId.includes('XXXX');
  const ga4Ready = Boolean(ga4Id) && !ga4Id.includes('XXXX');

  if (!gtmReady && !ga4Ready) return null;

  return (
    <>
      {gtmReady && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
      )}
      {gtmReady && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
      )}
      {ga4Ready && <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />}
      {ga4Ready && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
          }}
        />
      )}
    </>
  );
}
