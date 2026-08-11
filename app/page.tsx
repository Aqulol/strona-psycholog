import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Areas from '../components/Areas';
import Method from '../components/Method';
import Office from '../components/Office';
import Faq from '../components/Faq';
import BlogSection from '../components/BlogSection';
import LazyContact from '../components/LazyContact';
import Footer from '../components/Footer';

/**
 * Strona główna – sekcje ułożone jak puzzle:
 * Hero → O mnie → Obszary pomocy → Metoda pracy → Gabinet → FAQ → Blog → Kontakt.
 */
export default function Home() {
  // Structured data (schema.org) tylko na stronie głównej: LocalBusiness +
  // MedicalBusiness + ProfessionalService + Person + FAQPage + BreadcrumbList.
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
          streetAddress: 'ul. Śliczna 28/24',
          addressLocality: 'Wrocław',
          postalCode: '50-566',
          addressCountry: 'PL',
        },
        areaServed: 'Wrocław',
        knowsAbout: ['lęk i depresja', 'kryzysy życiowe', 'relacje', 'stres', 'wypalenie zawodowe'],
        sameAs: ['https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw'],
      },
      {
        '@type': 'Person',
        name: 'Grzegorz Plebaniak',
        jobTitle: 'psycholog / psychoterapeuta',
        sameAs: ['https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw'],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Jak wygląda pierwsza wizyta?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pierwsze spotkanie to konsultacja trwająca 50 minut. Rozmawiamy o tym, co skłoniło Pana/Panią do szukania wsparcia i wspólnie zastanawiamy się nad dalszą formą pracy.',
            },
          },
          {
            '@type': 'Question',
            name: 'Psycholog vs psychiatra vs psychoterapeuta?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Psycholog zajmuje się wsparciem i diagnozą psychologiczną. Psychiatra jest lekarzem i może prowadzić leczenie farmakologiczne. Psychoterapeuta prowadzi regularną terapię po odpowiednim szkoleniu. Role mogą się uzupełniać.',
            },
          },
          {
            '@type': 'Question',
            name: 'Ile kosztuje i jak wygląda płatność?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Konsultacja kosztuje 160 zł, sesja psychoterapii 140 zł. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.',
            },
          },
          {
            '@type': 'Question',
            name: 'Jak często odbywają się spotkania?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zwykle spotykamy się raz lub dwa razy w tygodniu, o stałej porze. Częstotliwość dopasowujemy do potrzeb i ustaleń kontraktu. Dostępna jest forma stacjonarna i online.',
            },
          },
          {
            '@type': 'Question',
            name: 'Co to superwizja i jak chronisz moje dane?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Superwizja to poufna konsultacja pracy z doświadczonym specjalistą, bez danych pozwalających na identyfikację. Dbam o dyskrecję i przetwarzam dane zgodnie z RODO.',
            },
          },
        ],
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
    <>
      {/* Preload zdjęcia portretowego z hero (LCP strony głównej) —
          fetchPriority="high" ustawione bezpośrednio na <img> w Hero. */}
      <link rel="preload" as="image" href="/images/portret.webp" fetchPriority="high" />
      <Header />
      <main id="tresc">
        <Hero />
        <About />
        <Areas />
        <Method />
        <Office />
        <Faq />
        <BlogSection />
        <LazyContact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
