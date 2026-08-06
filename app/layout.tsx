import type { Metadata } from 'next';
import './globals.css';
import CookieBanner from '../components/CookieBanner';
import MobileCtaBar from '../components/MobileCtaBar';
import GtmScript from '../components/GtmScript';

export const metadata: Metadata = {
  title: {
    default: 'Psycholog Wrocław – Grzegorz Plebaniak | psychoterapia psychodynamiczna',
    template: '%s | Grzegorz Plebaniak – Psycholog Wrocław',
  },
  description:
    'Gabinet psychologiczny we Wrocławiu na Gaju. Grzegorz Plebaniak oferuje konsultacje i psychoterapię psychodynamiczną dorosłych, stacjonarnie oraz online.',
  metadataBase: new URL('https://psychologplebaniak.pl'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Psycholog Wrocław – Grzegorz Plebaniak',
    description: 'Psychoterapia psychodynamiczna we Wrocławiu i online.',
    images: ['/og-image.svg'],
    type: 'website',
    locale: 'pl_PL',
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.svg'] },
  other: {
    'ai-content': 'Strona gabinetu psychologicznego',
    'ai-audience': 'Dorośli szukający wsparcia psychologicznego',
    'ai-topic': 'psychologia, psychoterapia psychodynamiczna',
    'ai-region': 'Wrocław, Gaj',
  },
};

const faq = [
  [
    'Jak wygląda pierwsza wizyta?',
    'Pierwsze spotkanie to konsultacja trwająca 50 minut. Rozmawiamy o tym, co skłoniło Pana/Panią do szukania wsparcia i wspólnie zastanawiamy się nad dalszą formą pracy.',
  ],
  [
    'Psycholog vs psychiatra vs psychoterapeuta?',
    'Psycholog zajmuje się wsparciem i diagnozą psychologiczną. Psychiatra jest lekarzem i może prowadzić leczenie farmakologiczne. Psychoterapeuta prowadzi regularną terapię po odpowiednim szkoleniu. Role mogą się uzupełniać.',
  ],
  [
    'Ile kosztuje i jak wygląda płatność?',
    'Konsultacja kosztuje 160 zł, sesja psychoterapii 140 zł. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.',
  ],
  [
    'Jak często odbywają się spotkania?',
    'Zwykle spotykamy się raz w tygodniu, o stałej porze. Częstotliwość dopasowujemy do potrzeb i ustaleń kontraktu. Dostępna jest forma stacjonarna i online.',
  ],
  [
    'Co to superwizja i jak chronisz moje dane?',
    'Superwizja to poufna konsultacja pracy z doświadczonym specjalistą, bez danych pozwalających na identyfikację. Dbam o dyskrecję i przetwarzam dane zgodnie z RODO.',
  ],
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'MedicalBusiness', 'ProfessionalService'],
        name: 'Grzegorz Plebaniak – gabinet psychologiczny',
        telephone: '+48 693087574',
        email: 'g.plebaniak@somentiq.pl',
        priceRange: '140–160 zł',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ul. Śliczna 24/28',
          addressLocality: 'Wrocław',
          postalCode: '50-566',
          addressCountry: 'PL',
        },
        areaServed: 'Wrocław',
        knowsAbout: ['lęk i depresja', 'kryzysy życiowe', 'relacje', 'stres', 'wypalenie zawodowe'],
      },
      { '@type': 'Person', name: 'Grzegorz Plebaniak', jobTitle: 'psycholog / psychoterapeuta' },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://psychologplebaniak.pl' },
        ],
      },
    ],
  };

  return (
    <html lang="pl">
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
