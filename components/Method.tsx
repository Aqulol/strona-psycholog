import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

/** Sekcja „Metoda pracy” – opis nurtu psychodynamicznego. */
export default function Method() {
  return (
    <section id="metoda" className="section bg-pale">
      <div className="container">
        <SectionHeading title="Metoda pracy" />
        <Reveal>
          <div className="max-w-4xl space-y-5 text-lg leading-8 text-ink/80 xl:text-xl xl:leading-9">
            <p>
              Nurt psychodynamiczny zakłada, że na nasze samopoczucie i sposób funkcjonowania wpływają nie tylko
              bieżące wydarzenia, ale również wcześniejsze doświadczenia, relacje oraz utrwalone sposoby
              przeżywania i reagowania.
            </p>
            <p>
              W bezpiecznej i opartej na zaufaniu relacji terapeutycznej można stopniowo lepiej rozumieć własne
              emocje, potrzeby i reakcje. Terapia nie opiera się na ocenianiu czy dawaniu gotowych odpowiedzi.
              Jej celem jest wspólne przyglądanie się temu, co dzieje się w życiu i wewnętrznym świecie osoby
              korzystającej z pomocy.
            </p>
            <p>
              Każda osoba ma własne tempo pracy, dlatego proces terapeutyczny jest dostosowany do jej
              indywidualnych potrzeb i możliwości.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
