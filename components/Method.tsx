import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Sekcja „Metoda pracy” – opis nurtu psychodynamicznego. */
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
      </div>
    </section>
  );
}
