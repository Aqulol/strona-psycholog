import type { Metadata } from 'next';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { config } from '../../lib/config';

export const metadata: Metadata = {
  title: 'Cennik – konsultacja i psychoterapia we Wrocławiu',
  description:
    'Cennik wizyt u psychologa Grzegorza Plebaniaka we Wrocławiu (Gaj): konsultacja psychologiczna 160 zł, sesja psychoterapii 140 zł. Sesja trwa 50 minut, stacjonarnie i online.',
  alternates: { canonical: '/cennik/' },
  openGraph: { url: 'https://psychologplebaniak.pl/cennik/' },
};

/**
 * Podstrona /cennik/ — osobny adres pod frazy „cennik psychoterapia Wrocław”.
 * Ceny pochodzą z jednego źródła (lib/config.ts), więc nie rozjadą się
 * z sekcją cennika na stronie głównej. JSON-LD: OfferCatalog + BreadcrumbList.
 */
export default function CennikPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'Cennik – psycholog Grzegorz Plebaniak Wrocław',
        url: 'https://psychologplebaniak.pl/cennik/',
        provider: {
          '@type': ['LocalBusiness', 'ProfessionalService'],
          name: 'Psycholog Grzegorz Plebaniak',
          url: 'https://psychologplebaniak.pl/',
          telephone: config.phone,
        },
        itemListElement: config.prices.map((p) => ({
          '@type': 'Offer',
          name: p.name,
          price: String(p.price),
          priceCurrency: 'PLN',
          category: 'Psychoterapia',
          description: `Sesja ${p.duration}. Stacjonarnie (Wrocław, Gaj) i online.`,
          areaServed: 'Wrocław',
          url: `https://psychologplebaniak.pl/cennik/#${p.key}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://psychologplebaniak.pl' },
          { '@type': 'ListItem', position: 2, name: 'Cennik', item: 'https://psychologplebaniak.pl/cennik/' },
        ],
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="tresc" className="container section max-w-3xl">
        <p className="eyebrow">Cennik</p>
        <h1 className="mt-4 text-5xl leading-tight text-green md:text-6xl">
          Cennik wizyt — Wrocław, Gaj · stacjonarnie i online
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/80">
          Wszystkie spotkania trwają 50 minut. Ceny dotyczą zarówno wizyt stacjonarnych
          w gabinecie (Soméntiq, ul. Śliczna 28/24), jak i sesji online.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {config.prices.map((p) => (
            <div key={p.key} id={p.key} className="rounded border border-border bg-white p-7">
              <h2 className="text-2xl text-green">{p.name}</h2>
              <p className="mt-3 text-4xl font-semibold text-ink">{p.price} zł</p>
              <p className="mt-1 text-sm text-ink/60">sesja {p.duration}</p>
              <p className="mt-4 leading-7 text-ink/80">
                {p.key === 'konsultacja'
                  ? 'Pierwsze spotkanie, podczas którego wspólnie zastanawiamy się nad formą dalszej pracy.'
                  : 'Regularne sesje w nurcie psychodynamicznym, dopasowane do indywidualnych potrzeb i tempa.'}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg leading-8 text-ink/80">
          Szczegóły płatności (gotówka, przelew, faktura) ustalamy podczas konsultacji.
          Częstotliwość spotkań — zwykle raz lub dwa razy w tygodniu, o stałej porze —
          dopasowujemy do potrzeb i ustaleń kontraktu.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={config.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-green px-6 py-3.5 text-base font-medium text-white transition hover:bg-green/90"
          >
            Zarezerwuj termin online
          </a>
          <a
            href="/#kontakt"
            className="rounded border border-green px-6 py-3.5 text-base font-medium text-green transition hover:bg-green/5"
          >
            Napisz wiadomość
          </a>
        </div>

        <h2 className="mt-14 text-4xl text-green">Jak często odbywają się spotkania?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Zwykle spotykamy się raz lub dwa razy w tygodniu, o stałej porze. Częstotliwość
          zależy od potrzeb, możliwości i ustaleń kontraktu terapeutycznego. Niektóre osoby
          korzystają z kilku konsultacji, inne decydują się na dłuższą, regularną pracę.
        </p>

        <h2 className="mt-12 text-4xl text-green">Czym różni się konsultacja od psychoterapii?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Konsultacja to zwykle 1–3 spotkania, podczas których przyglądamy się temu, co
          skłoniło do kontaktu, i wspólnie decydujemy o dalszych krokach. Psychoterapia to
          regularna, długofalowa praca w nurcie psychodynamicznym, ukierunkowana na głębsze
          rozumienie emocji, relacji i powtarzających się wzorców.
        </p>

        <h2 className="mt-12 text-4xl text-green">Przeczytaj także</h2>
        <ul className="mt-4 space-y-4">
          <li>
            <a href="/blog/jak-wybrac-psychoterapeute/" className="text-lg font-medium text-green underline hover:text-green/80">
              Jak wybrać psychoterapeutę? Praktyczny przewodnik
            </a>
            <p className="mt-1 leading-7 text-ink/70">na co zwrócić uwagę przy wyborze i pierwszej konsultacji</p>
          </li>
          <li>
            <a href="/blog/dlaczego-wybieram-podobnych-partnerow/" className="text-lg font-medium text-green underline hover:text-green/80">
              Dlaczego ciągle wybieram podobnych partnerów?
            </a>
            <p className="mt-1 leading-7 text-ink/70">nieświadome schematy relacyjne z perspektywy psychodynamicznej</p>
          </li>
        </ul>
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
