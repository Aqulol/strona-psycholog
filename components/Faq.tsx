import SectionHeading from './SectionHeading';
import FaqAccordion from './FaqAccordion';
import Reveal from './Reveal';

const faqItems = [
  {
    question: 'Jak wygląda pierwsza wizyta?',
    answer:
      'Pierwsze spotkanie to konsultacja trwająca 50 minut. Rozmawiamy o tym, co skłoniło Pana/Panią do szukania wsparcia i wspólnie zastanawiamy się nad dalszą formą pracy.',
  },
  {
    question: 'Psycholog vs psychiatra vs psychoterapeuta?',
    answer:
      'Psycholog zajmuje się wsparciem i diagnozą psychologiczną. Psychiatra jest lekarzem i może prowadzić leczenie farmakologiczne. Psychoterapeuta prowadzi regularną terapię po odpowiednim szkoleniu. Role mogą się uzupełniać.',
  },
  {
    question: 'Ile kosztuje i jak wygląda płatność?',
    answer:
      'Konsultacja kosztuje 160 zł, sesja psychoterapii 140 zł. Sesja trwa 50 minut. Szczegóły płatności ustalamy podczas konsultacji.',
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
