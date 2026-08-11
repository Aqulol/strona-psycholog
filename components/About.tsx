import { Award, BookOpen, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const trustCards = [
  {
    icon: Award,
    title: 'Dyplom',
    text: 'Dyplom: wyższe wykształcenie psychologiczne – specjalność kliniczna i zdrowia',
  },
  {
    icon: BookOpen,
    title: 'Szkolenie',
    text: 'Szkolenie: w trakcie szkolenia psychoterapeutycznego w MSPPD',
  },
  {
    icon: ShieldCheck,
    title: 'Superwizja',
    text: 'Uczęszczam na regularne superwizje.',
  },
];

/** Sekcja „O mnie” – bio, zdjęcie poziome i kafle zaufania. */
export default function About() {
  return (
    <section id="o-mnie" className="section">
      <div className="container">
        <SectionHeading title="O mnie" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-14">
          <Reveal>
            <img
              src="/images/portret2.webp"
              alt="Grzegorz Plebaniak – gabinet psychologiczny Wrocław Gaj"
              width={1280}
              height={855}
              loading="lazy"
              decoding="async"
              className="aspect-[3/2] w-full rounded-2xl border border-border object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-lg leading-8 text-ink/80">
              <p>
                Nazywam się Grzegorz Plebaniak. Jestem psychologiem i psychoterapeutą pracującym z osobami
                dorosłymi. W kontakcie z drugim człowiekiem ważne są dla mnie uważność, szacunek i tempo, które
                pozwala mówić o sprawach naprawdę istotnych.
              </p>
              <p>
                Pracuję w nurcie psychodynamicznym. Pomagam przyglądać się emocjom, relacjom i powtarzającym się
                sposobom reagowania. Mam wyższe wykształcenie psychologiczne ze specjalnością kliniczną i zdrowia. Obecnie jestem w trakcie szkolenia psychoterapeutycznego w MSPPD. Swoją pracę poddaję regularnej
                superwizji.
              </p>
              <p>
                Psychoterapia nie jest gotową poradą ani obietnicą szybkiej zmiany. To wspólna, stopniowa praca.
                Dbam o poufność i jasne zasady współpracy.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-6">
          {trustCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 100}>
              <div className="h-full rounded border border-border bg-white p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <card.icon aria-hidden="true" className="text-gold" size={28} />
                  <h3 className="text-2xl text-green">{card.title}</h3>
                </div>
                <p className="mt-2 text-base text-ink/70">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
