import { CalendarCheck, FileSignature, Repeat, Flag } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const steps = [
  {
    icon: CalendarCheck,
    number: '1',
    title: 'Konsultacja',
    text: 'Poznajemy powód zgłoszenia.',
  },
  {
    icon: FileSignature,
    number: '2',
    title: 'Kontrakt',
    text: 'Ustalamy zasady współpracy.',
  },
  {
    icon: Repeat,
    number: '3',
    title: 'Regularne sesje',
    text: 'Spotykamy się w ustalonym rytmie.',
  },
  {
    icon: Flag,
    number: '4',
    title: 'Zakończenie',
    text: 'Podsumowujemy wspólną pracę.',
  },
];

/** Sekcja „Metoda pracy” – opis nurtu i timeline współpracy. */
export default function Method() {
  return (
    <section id="metoda" className="section">
      <div className="container">
        <SectionHeading title="Metoda pracy" />
        <Reveal>
          <div className="max-w-3xl space-y-4 text-lg leading-8 text-ink/80">
            <p>
              Nurt psychodynamiczny zakłada, że na nasze samopoczucie wpływają nie tylko bieżące wydarzenia, ale
              także wcześniejsze doświadczenia i relacje.
            </p>
            <p>
              W bezpiecznej relacji terapeutycznej można lepiej rozumieć swoje emocje i reakcje. Nie chodzi o
              ocenę, lecz o wspólne zaciekawienie tym, co się dzieje.
            </p>
            <p>
              Każda osoba pracuje w swoim tempie. Terapia jest wsparciem i nie zastępuje konsultacji lekarskiej,
              gdy jest ona potrzebna.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <div className="flex h-full flex-col gap-2">
                <step.icon aria-hidden="true" className="text-gold" size={28} strokeWidth={1.5} />
                <p className="text-sm font-semibold text-gold" aria-hidden="true">
                  Krok {step.number}
                </p>
                <h3 className="text-2xl text-green">{step.title}</h3>
                <p className="text-ink/80">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
