import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import CookieBanner from '../components/CookieBanner';
import MobileCtaBar from '../components/MobileCtaBar';
import GtmScript from '../components/GtmScript';

/**
 * Fonty: Cormorant Garamond (nagłówki) + Inter (tekst).
 * Ładowane przez next/font/google — pliki fontów są pobierane podczas
 * budowania i hostowane lokalnie (/_next/static/media/…), co eliminuje
 * blokujący renderowanie @import z Google Fonts (LCP) i dodatkowe
 * zapytania do zewnętrznej domeny. Zmienne CSS: --font-heading / --font-body.
 */
const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Grzegorz Plebaniak – psycholog, psychoterapeuta we Wrocławiu',
    template: '%s | Grzegorz Plebaniak',
  },
  description:
    'Gabinet psychologiczny we Wrocławiu (Gaj). Konsultacje i psychoterapia psychodynamiczna dla dorosłych — stacjonarnie i online.',
  metadataBase: new URL('https://psychologplebaniak.pl'),
  alternates: { canonical: '/' },
  icons: { apple: '/apple-touch-icon.png' },
  openGraph: {
    title: 'Grzegorz Plebaniak – psycholog, psychoterapeuta we Wrocławiu',
    description: 'Konsultacje i psychoterapia psychodynamiczna dla dorosłych — stacjonarnie i online.',
    images: ['/og-image.png'],
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.png'] },
  other: {
    'ai-content': 'Strona gabinetu psychologicznego',
    'ai-audience': 'Dorośli szukający wsparcia psychologicznego',
    'ai-topic': 'psychologia, psychoterapia psychodynamiczna',
    'ai-region': 'Wrocław, Gaj',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${heading.variable} ${body.variable}`}>
      {/* ===== Weryfikacja Google Search Console =====
          Jak odblokować:
          1. Zaloguj się na https://search.google.com/search-console
          2. Dodaj zasób (domenę lub prefiks URL).
          3. Wybierz metodę „Tag HTML”.
          4. Skopiuj wygenerowany tag z wartością content i ODKOMENTUJ poniższy
             wiersz, podmieniając content="..." na swój identyfikator.
          Alternatywnie możesz zweryfikować przez DNS (rekord TXT w panelu
          domeny) — wtedy ten tag nie jest potrzebny. Szczegóły:
          README-WDROZENIE.md, krok 5. */}
      {/* <meta name="google-site-verification" content="..." /> */}
      <head>
        {/* Preload logo (widoczne w headerze na każdej podstronie — LCP na
            podstronach) oraz preconnect do domen zewnętrznych faktycznie
            używanych na stronie: widget ZnanyLekarz (platform.docplanner.com),
            osadzona mapa Google (www.google.com) i GTM/GA4
            (www.googletagmanager.com, ładowane po zgodzie na cookies). */}
        <link rel="preload" as="image" href="/logo.png" />
        <link rel="preconnect" href="https://platform.docplanner.com" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <GtmScript />
        <a href="#tresc" className="skip-link">
          Przejdź do treści
        </a>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
        <noscript>
          <p>
            Gabinet psychologiczny Grzegorza Plebaniaka we Wrocławiu (Gaj). Psychoterapia psychodynamiczna
            dorosłych, stacjonarnie i online.
          </p>
        </noscript>
        {children}
        <CookieBanner />
        <MobileCtaBar />
      </body>
    </html>
  );
}
