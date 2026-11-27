import {officeId} from '../../lib/entities';
import {Crumbs} from '../../components/Site';
import {details,meta} from '../../lib/site';
import { priceServices, services } from '../../lib/services';
import { config } from '../../lib/config';

export const metadata=meta('/cennik/','Psycholog Wrocław - cennik konsultacji i terapii','Sprawdź cenę konsultacji psychologicznej i sesji psychoterapii we Wrocławiu lub online. Dowiedz się, jak zapytać o koszt osobnej diagnozy i psychoedukacji.');

/**
 * Podstrona /cennik/ - osobny adres pod frazy „cennik psychoterapia Wrocław”.
 * Ceny pochodzą z jednego źródła (lib/config.ts), więc nie rozjadą się
 * z sekcją cennika na stronie głównej. JSON-LD: OfferCatalog.
 */
export default function CennikPage() {
  const prices = priceServices.flatMap(item => item.rate ? [{...item.rate, name:item.name, href:item.href, category:item.category}] : []);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'OfferCatalog',
        name: 'Cennik - psycholog Grzegorz Plebaniak Wrocław',
        url: 'https://psychologplebaniak.pl/cennik/',
        itemListElement: prices.map((p) => ({
          '@type': 'Offer',
          seller: { '@id': officeId },
          name: p.name,
          itemOffered: { '@id': `https://psychologplebaniak.pl${p.href}#usluga` },
          price: String(p.price),
          priceCurrency: 'PLN',
          category: p.category === 'therapy' ? 'Psychoterapia' : 'Konsultacja psychologiczna',
          description: `Sesja ${p.duration}. Stacjonarnie we Wrocławiu i online.`,
          areaServed: 'Wrocław',
          url: `https://psychologplebaniak.pl/cennik/#${p.key}`,
        })),
      },
    ],
  };

  return (
    <>

      <main id="tresc" className="container section max-w-3xl price-editorial">
        <Crumbs path="/cennik/" title="Cennik"/>
        <h1 className="mt-4 text-5xl leading-tight text-green md:text-6xl">
          Cennik wizyt - Wrocław · stacjonarnie i online
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/80">
          Stawki poniżej dotyczą standardowej konsultacji i sesji psychoterapii, zarówno wizyt stacjonarnych
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

        <div className="price-ledger">
          {prices.map((p) => (
            <div key={p.key} id={p.key} className="price-row">
              <h2 className="text-2xl text-green"><a href={p.href}>{p.name}</a></h2>
              <p className="price-number">{p.price} zł</p>
              <p className="mt-1 text-sm text-ink/60">sesja {p.duration}</p>
              <p className="mt-4 leading-7 text-ink/80">
                {p.key === 'konsultacja'
                  ? 'Spotkanie konsultacyjne, podczas którego omawiamy trudności i oczekiwania. Nie zobowiązuje do rozpoczęcia psychoterapii. Zwykle poprzedza ją kilka konsultacji, po których ustalamy dalszą formę pomocy.'
                  : 'Psychoterapia indywidualna w nurcie psychodynamicznym z wykorzystaniem TFP. Stawka dotyczy sesji w gabinecie lub online, nie osobnego wariantu terapii.'}
              </p>
            </div>
          ))}
        </div>

        <section className="diagnostic-note"><h2>Dodatkowe usługi: ustalenie kosztu</h2>
          <p>Stawka za pojedynczą konsultację nie stanowi ceny procesu diagnostycznego. Informacje o opłatach i czasie proszę ustalić z gabinetem przed spotkaniem.</p>
          <p><a href={services.diagnostic.href}>Konsultacja ukierunkowana diagnostycznie</a> to rozmowa o kierunku oceny, a nie z góry wyceniony pakiet ani osobna pozycja w rezerwacji. Cenę i czas psychoedukacji trzeba ustalić niezależnie od stawek powyżej.</p>
          <ul>{(['general','personality','adhd','edu','eduAdhd'] as const).map(key=><li key={key}><a href={services[key].href}>{services[key].name}</a></li>)}</ul>
        </section>
        <p className="mt-8 text-lg leading-8 text-ink/80">
          {details}
        </p>

        <p className="mt-8"><a className="text-link" href="/kontakt/">Dane kontaktowe</a></p>

        <p className="mt-4"><a href="/narzedzia-psychologiczne/">Oblicz orientacyjny koszt kilku sesji psychoterapii</a></p>
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
