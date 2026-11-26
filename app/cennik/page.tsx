import {officeId} from '../../lib/entities';
import {Crumbs} from '../../components/Site';
import {details,meta} from '../../lib/site';
import { config } from '../../lib/config';

export const metadata=meta('/cennik/','Psycholog Wrocław - cennik konsultacji i terapii','Sprawdzi Pan/Pani cenę i czas konsultacji psychologicznej oraz psychoterapii we Wrocławiu lub online. Każde spotkanie trwa 50 minut i kosztuje 200 zł.');

/**
 * Podstrona /cennik/ - osobny adres pod frazy „cennik psychoterapia Wrocław”.
 * Ceny pochodzą z jednego źródła (lib/config.ts), więc nie rozjadą się
 * z sekcją cennika na stronie głównej. JSON-LD: OfferCatalog.
 */
export default function CennikPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'Cennik - psycholog Grzegorz Plebaniak Wrocław',
        url: 'https://psychologplebaniak.pl/cennik/',
        itemListElement: config.prices.map((p) => ({
          '@type': 'Offer',
          seller: { '@id': officeId },
          name: p.name,
          price: String(p.price),
          priceCurrency: 'PLN',
          category: 'Psychoterapia',
          description: `Sesja ${p.duration}. Stacjonarnie we Wrocławiu i online.`,
          areaServed: 'Wrocław',
          url: `https://psychologplebaniak.pl/cennik/#${p.key}`,
        })),
      },
    ],
  };

  return (
    <>

      <main id="tresc" className="container section max-w-3xl">
        <Crumbs path="/cennik/" title="Cennik"/>
        <h1 className="mt-4 text-5xl leading-tight text-green md:text-6xl">
          Cennik wizyt - Wrocław · stacjonarnie i online
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/80">
          Wszystkie spotkania trwają 50 minut. Ceny dotyczą zarówno wizyt stacjonarnych
          w gabinecie przy ul. {config.address} (szczegóły placówki:{' '}
          <a
            className="text-green underline"
            href={config.officeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            centrumrownowagi.com
          </a>
          ), jak i sesji online.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {config.prices.map((p) => (
            <div key={p.key} id={p.key} className="rounded border border-border bg-white p-7">
              <h2 className="text-2xl text-green">{p.name}</h2>
              <p className="mt-3 text-4xl font-semibold text-ink">{p.price} zł</p>
              <p className="mt-1 text-sm text-ink/60">sesja {p.duration}</p>
              <p className="mt-4 leading-7 text-ink/80">
                {p.key === 'konsultacja'
                  ? 'Spotkanie konsultacyjne (50 min), podczas którego omawiamy trudności i oczekiwania. Nie zobowiązuje do rozpoczęcia psychoterapii. Zwykle poprzedza ją kilka konsultacji, po których ustalamy dalszą formę pomocy.'
                  : 'Regularne sesje w nurcie psychodynamicznym, dopasowane do indywidualnych potrzeb i tempa.'}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-lg leading-8 text-ink/80">
          {details}
        </p>

        <p className="mt-8"><a className="text-link" href="/kontakt/">Dane kontaktowe</a></p>

        <h2 className="mt-14 text-4xl text-green">Jak często odbywają się spotkania?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Zwykle spotykamy się raz lub dwa razy w tygodniu, o stałej porze. Częstotliwość
          zależy od potrzeb, możliwości i ustaleń kontraktu terapeutycznego. Niektóre osoby
          korzystają z kilku konsultacji, inne decydują się na dłuższą, regularną pracę.
        </p>

        <h2 className="mt-12 text-4xl text-green">Czym różni się konsultacja od psychoterapii?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Konsultacja to zwykle kilka spotkań konsultacyjnych, podczas których przyglądamy się temu, co
          skłoniło do kontaktu, i wspólnie decydujemy o dalszych krokach. Po zakończeniu konsultacji
          omawiamy możliwość rozpoczęcia regularnej psychoterapii, jej cele oraz zasady współpracy.
          Psychoterapia to regularna, długofalowa praca w nurcie psychodynamicznym, ukierunkowana na głębsze
          rozumienie emocji, relacji i powtarzających się wzorców.
        </p>

        <h2 className="mt-12 text-4xl text-green">Zobacz także</h2>
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
