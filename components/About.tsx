import { Award, BookOpen, ShieldCheck } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

const trustCards = [
  {
    icon: Award,
    title: 'Dyplom',
    text: 'Uniwersytet Wrocławski - specjalność psychologia kliniczna i zdrowia dorosłych',
  },
  {
    icon: BookOpen,
    title: 'Szkolenie',
    text: 'II rok czteroletniego szkolenia w Międzynarodowej Szkole Psychoterapii Psychodynamicznej (TFP)',
  },
  {
    icon: ShieldCheck,
    title: 'Superwizja',
    text: 'Swoją pracę poddaję regularnej superwizji.',
  },
];

/** Sekcja „O mnie” - bio, zdjęcie poziome i kafle zaufania. */
export default function About() {
  return (
    <section id="o-mnie" className="section">
      <div className="container">
        <SectionHeading title="O mnie" />
        <div className="grid gap-10 md:grid-cols-2 md:items-center lg:gap-14">
          <Reveal>
            <img
              src="/images/portret2.webp"
              alt="Grzegorz Plebaniak - psycholog we Wrocławiu"
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
                Jestem psychologiem, absolwentem Uniwersytetu Wrocławskiego ze specjalnością psychologia
                kliniczna i zdrowia dorosłych. Obecnie jestem na drugim roku czteroletniego szkolenia
                w Międzynarodowej Szkole Psychoterapii Psychodynamicznej, obejmującego również podejście
                skoncentrowane na przeniesieniu (TFP).
              </p>
              <p>
                Prowadzę konsultacje psychologiczne oraz psychoterapię indywidualną osób dorosłych.
                Doświadczenie zawodowe zdobywam zarówno w prywatnej praktyce, jak i we współpracy z Poradnią
                Zdrowia Psychicznego. Swoją pracę poddaję regularnej superwizji.
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
