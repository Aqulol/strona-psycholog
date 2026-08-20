import type { Metadata } from 'next';
import './globals.css';
import CookieBanner from '../components/CookieBanner';
import MobileCtaBar from '../components/MobileCtaBar';
import GtmScript from '../components/GtmScript';

export const metadata: Metadata = {
  title: {
    default: 'Grzegorz Plebaniak – psycholog, psychoterapeuta we Wrocławiu',
    template: '%s | Grzegorz Plebaniak',
  },
  description:
    'Psycholog Grzegorz Plebaniak we Wrocławiu (Gaj). Konsultacje i psychoterapia psychodynamiczna dla dorosłych — stacjonarnie i online.',
  metadataBase: new URL('https://psychologplebaniak.pl'),
  // UWAGA: NIE ustawiamy tu globalnego alternates.canonical! Poprzednio
  // canonical: '/' był dziedziczony przez WSZYSTKIE podstrony (blog, artykuły,
  // polityka prywatności) — każda z nich wskazywała kanonikal na stronę główną,
  // przez co Google traktował je jako duplikaty '/' i nie indeksował artykułów.
  // Kanonikale są teraz ustawiane per-podstrona (Next.js generuje je
  // automatycznie z adresu URL lub jawnie w metadata danej strony).
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
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
    <html lang="pl">
      {/* ===== Weryfikacja Google Search Console — AKTYWNA =====
          Tag google-site-verification wstrzyknięty w <head> poniżej
          (content CzlhzCDS5zGi-A7dtgAl5kU80WTzUisLFFLmqwd5wD4),
          dodany 2026-08-19. Sitemap do zgłoszenia: /sitemap.xml. */}
      {/* Preload logo (widoczne w headerze), self-hostowane fonty
          (najczęściej używane wagi: Cormorant Garamond 600 i Inter 400)
          i preconnect do domen zewnętrznych faktycznie używanych na stronie:
          widget ZnanyLekarz (platform.docplanner.com), osadzona mapa Google
          (www.google.com) i GTM/GA4 (www.googletagmanager.com, ładowane po
          zgodzie na cookies). Fonty są hostowane lokalnie w /fonts — build
          nie pobiera nic z fonts.gstatic.com.
          Tagi <link> wstrzyknięte w <head> jako surowy HTML, aby trafiły do
          <head> DOKŁADNIE RAZ: elementy <link> renderowane w drzewie React
          byłyby wyemitowane podwójnie (React 19 hoistuje je do <head>,
          a Next.js dodatkowo zbiera <link rel="preload"> do własnego head). */}
      <head
        dangerouslySetInnerHTML={{
          __html: `
            <meta name="google-site-verification" content="CzlhzCDS5zGi-A7dtgAl5kU80WTzUisLFFLmqwd5wD4" />
            <meta name="theme-color" content="#2D5A4E" />
            <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/fonts/cormorant-garamond-600.woff2" />
            <link rel="preload" as="font" type="font/woff2" crossorigin="anonymous" href="/fonts/inter-400.woff2" />
            <link rel="preconnect" href="https://platform.docplanner.com" />
            <link rel="preconnect" href="https://www.google.com" />
            <link rel="preconnect" href="https://www.googletagmanager.com" />
          `,
        }}
      />
      <body>
        <GtmScript />
        <a href="#tresc" className="skip-link">
          Przejdź do treści
        </a>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />
        <noscript>
          <p>
            Psycholog Grzegorz Plebaniak we Wrocławiu (Gaj). Psychoterapia psychodynamiczna
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
