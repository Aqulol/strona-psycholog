import { Award, ShieldCheck, Timer } from 'lucide-react';
import Reveal from './Reveal';

/**
 * Hero strony głównej – H1, dwa CTA, micro-trust i portret
 * (eager loading + fetchpriority high, atrybuty width/height).
 */
export default function Hero() {
  return (
    <section className="bg-cream py-20 lg:py-32" aria-label="Powitanie">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow">Wrocław · Gaj · stacjonarnie i online</p>
          <h1 className="mt-5 text-5xl leading-tight text-green md:text-6xl xl:text-7xl">
            Grzegorz Plebaniak – psycholog i psychoterapeuta
          </h1>
          <p className="my-7 text-lg leading-8 text-ink/80 xl:text-xl xl:leading-9">
            Bezpieczna przestrzeń do rozmowy o tym, co trudne. Pracuję w nurcie psychodynamicznym z osobami
            dorosłymi, stacjonarnie i online.
          </p>
          <div className="flex flex-wrap gap-3 lg:gap-4">
            <a
              href="#kontakt"
              className="rounded bg-green px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-green/90"
            >
              Umów konsultację
            </a>
            <a
              href="#o-mnie"
              className="rounded border border-green px-6 py-3.5 text-base font-medium text-green transition-colors hover:bg-green/5"
            >
              Poznaj mnie
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-ink/70 lg:text-base">
            <li className="flex items-center gap-2">
              <Award aria-hidden="true" className="text-green" size={20} />
              Dyplomowany psycholog
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="text-green" size={20} />
              Superwizja
            </li>
            <li className="flex items-center gap-2">
              <Timer aria-hidden="true" className="text-green" size={20} />
              Sesje 50 min
            </li>
          </ul>
        </Reveal>

        <Reveal delay={150} className="mx-auto w-full max-w-lg lg:max-w-none">
          <img
            src="/images/portret.jpg"
            alt="Grzegorz Plebaniak – psycholog, Wrocław Gaj"
            width={1280}
            height={1280}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="aspect-square w-full rounded-2xl border border-border object-cover shadow-lg shadow-green/5"
          />
        </Reveal>
      </div>
    </section>
  );
}
