import { HeartPulse, LifeBuoy, Users, Waves, Leaf, Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const areas = [
  {
    icon: HeartPulse,
    title: 'Lęk i depresja',
    text: 'Wsparcie w rozumieniu trudnych emocji i codziennym funkcjonowaniu.',
  },
  {
    icon: LifeBuoy,
    title: 'Kryzysy życiowe',
    text: 'Towarzyszenie w zmianie, stracie lub ważnej decyzji.',
  },
  {
    icon: Users,
    title: 'Trudności w relacjach',
    text: 'Przyglądanie się potrzebom i sposobom budowania bliskości.',
  },
  {
    icon: Waves,
    title: 'Stres i regulacja emocji',
    text: 'Spokojna praca nad rozpoznawaniem napięcia i emocji.',
  },
  {
    icon: Leaf,
    title: 'Poczucie własnej wartości',
    text: 'Poszukiwanie bardziej życzliwego kontaktu ze sobą.',
  },
  {
    icon: Briefcase,
    title: 'Wypalenie zawodowe',
    text: 'Wsparcie przy przeciążeniu i utracie energii.',
  },
];

/** Sekcja „Obszary pomocy” – 6 kafelków z ikonami lucide. */
export default function Areas() {
  return (
    <section id="obszary" className="section bg-white">
      <div className="container">
        <SectionHeading title="Obszary pomocy">
          <p className="mb-8 max-w-2xl leading-7 text-ink/70">
            Prowadzę konsultacje i psychoterapię dla dorosłych. Poniżej obszary, z którymi najczęściej zgłaszają
            się osoby na Gaju i w całym Wrocławiu.
          </p>
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <Reveal key={area.title} delay={(index % 3) * 100}>
              <div className="h-full rounded border border-border bg-cream p-6 transition-shadow hover:shadow-md">
                <area.icon aria-hidden="true" className="text-green" size={28} strokeWidth={1.5} />
                <h3 className="mt-4 text-2xl text-green">{area.title}</h3>
                <p className="mt-2 text-ink/80">{area.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
