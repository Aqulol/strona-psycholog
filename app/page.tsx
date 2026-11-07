import type { Metadata } from 'next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Areas from '../components/Areas';
import Method from '../components/Method';
import Office from '../components/Office';
import Faq from '../components/Faq';
import BlogSection from '../components/BlogSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { config } from '../lib/config';
import { websiteOpenGraph } from '../lib/seoMetadata';

const priceValues = config.prices.map((p) => p.price);
const minPrice = Math.min(...priceValues);
const maxPrice = Math.max(...priceValues);
const priceRange = minPrice === maxPrice ? `${minPrice} zł` : `${minPrice}-${maxPrice} zł`;
const konsultacja = config.prices.find((p) => p.key === 'konsultacja')!;
const psychoterapia = config.prices.find((p) => p.key === 'psychoterapia')!;
const priceAnswer = `Konsultacja kosztuje ${konsultacja.price} zł, sesja psychoterapii ${psychoterapia.price} zł. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.`;

/** Strona główna - jawny kanonikal '/' i og:url (layout nie narzuca już
 *  canonical globalnie, żeby nie zerować kanonikali podstron). */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: websiteOpenGraph({
    url: 'https://psychologplebaniak.pl/',
    title: 'Psycholog Wrocław | Grzegorz Plebaniak',
    description:
      'Psycholog we Wrocławiu: konsultacje i psychoterapia psychodynamiczna dla dorosłych, stacjonarnie i online.',
  }),
};

/**
 * Strona główna - sekcje ułożone jak puzzle:
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
        '@id': 'https://psychologplebaniak.pl/#gabinet',
        name: 'Psycholog Grzegorz Plebaniak',
        url: 'https://psychologplebaniak.pl/',
        telephone: '+48 693087574',
        email: config.email,
        priceRange,
        image: 'https://psychologplebaniak.pl/og-image.png',
        logo: 'https://psychologplebaniak.pl/logo.png',
        address: {
          '@type': 'PostalAddress',
          streetAddress: config.streetAddress,
          addressLocality: 'Wrocław',
          postalCode: config.postal,
          addressCountry: 'PL',
        },
        hasMap: `https://www.google.com/maps/search/?api=1&query=${config.geoLat},${config.geoLng}`,
        areaServed: 'Wrocław',
        knowsAbout: ['lęk i obniżony nastrój', 'kryzysy i zmiany życiowe', 'trudności w relacjach', 'stres i regulacja emocji', 'poczucie własnej wartości', 'wypalenie zawodowe'],
        sameAs: ['https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw'],
        // geo jest dołączane tylko po uzupełnieniu współrzędnych w lib/config.ts
        ...(config.geoLat && config.geoLng
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: Number(config.geoLat),
                longitude: Number(config.geoLng),
              },
            }
          : {}),
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
            name: 'Jak wygląda pierwsza konsultacja psychologiczna?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pierwsze spotkanie jest okazją do omówienia trudności, które skłoniły do poszukiwania pomocy, oraz oczekiwań wobec dalszej współpracy. Konsultacja trwa 50 minut i nie zobowiązuje do rozpoczęcia psychoterapii. Rozpoczęcie psychoterapii poprzedza zazwyczaj kilka spotkań konsultacyjnych, podczas których przyglądamy się aktualnym trudnościom, historii życia oraz sposobowi funkcjonowania w relacjach. Pozwala to lepiej zrozumieć zgłaszane problemy i ocenić, jaka forma pomocy będzie odpowiednia. Po zakończeniu konsultacji omawiamy możliwość rozpoczęcia regularnej psychoterapii, jej cele oraz zasady współpracy, w tym częstotliwość spotkań, płatności i odwoływanie wizyt.',
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
              text: priceAnswer,
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
      {/* Preload portretu z hero (LCP) generuje automatycznie Next.js
          (image preloading w Next 15) na bazie <img loading="eager"
          fetchPriority="high"> w Hero - nie duplikujemy go ręcznie. */}
      <Header />
      <main id="tresc">
        <Hero />
        <About />
        <Areas />
        <Method />
        <Office />
        <Faq />
        <BlogSection />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
