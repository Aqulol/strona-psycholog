import SectionHeading from './SectionHeading';
import FaqAccordion from './FaqAccordion';
import Reveal from './Reveal';
import { config } from '../lib/config';

const konsultacja = config.prices.find((p) => p.key === 'konsultacja')!;
const psychoterapia = config.prices.find((p) => p.key === 'psychoterapia')!;

const faqItems = [
  {
    question: 'Jak wygląda pierwsza konsultacja psychologiczna?',
    answer:
      'Pierwsze spotkanie jest okazją do omówienia trudności, które skłoniły do poszukiwania pomocy, oraz oczekiwań wobec dalszej współpracy. Konsultacja trwa 50 minut i nie zobowiązuje do rozpoczęcia psychoterapii. Rozpoczęcie psychoterapii poprzedza zazwyczaj kilka spotkań konsultacyjnych, podczas których przyglądamy się aktualnym trudnościom, historii życia oraz sposobowi funkcjonowania w relacjach. Pozwala to lepiej zrozumieć zgłaszane problemy i ocenić, jaka forma pomocy będzie odpowiednia. Po zakończeniu konsultacji omawiamy możliwość rozpoczęcia regularnej psychoterapii, jej cele oraz zasady współpracy, w tym częstotliwość spotkań, płatności i odwoływanie wizyt.',
  },
  {
    question: 'Psycholog vs psychiatra vs psychoterapeuta?',
    answer:
      'Psycholog zajmuje się wsparciem i diagnozą psychologiczną. Psychiatra jest lekarzem i może prowadzić leczenie farmakologiczne. Psychoterapeuta prowadzi regularną terapię po odpowiednim szkoleniu. Role mogą się uzupełniać.',
  },
  {
    question: 'Ile kosztuje i jak wygląda płatność?',
    answer: `Konsultacja kosztuje ${konsultacja.price} zł, sesja psychoterapii ${psychoterapia.price} zł. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.`,
  },
  {
    question: 'Jak często odbywają się spotkania?',
    answer:
      'Zwykle spotykamy się raz lub dwa razy w tygodniu, o stałej porze. Częstotliwość dopasowujemy do potrzeb i ustaleń kontraktu. Dostępna jest forma stacjonarna i online.',
  },
  {
    question: 'Co to superwizja i jak chronisz moje dane?',
    answer:
      'Superwizja to poufna konsultacja pracy z doświadczonym specjalistą, bez danych pozwalających na identyfikację. Dbam o dyskrecję i przetwarzam dane zgodnie z RODO.',
  },
];

/** Sekcja FAQ z akordeonem. */
export default function Faq() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <SectionHeading title="Najczęstsze pytania" />
        <Reveal>
          <div className="max-w-4xl">
            <FaqAccordion items={faqItems} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
