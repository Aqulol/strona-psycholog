'use client';

import { Award, ShieldCheck, Timer } from 'lucide-react';
import Reveal from './Reveal';
import ZnanyLekarzWidget from './ZnanyLekarzWidget';
import { track } from '../lib/analytics';

/**
 * Hero strony głównej – H1, dwa CTA, micro-trust i portret
 * (eager loading + fetchpriority high, atrybuty width/height).
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-32" aria-label="Powitanie">
      {/* Delikatny radialny blask po stronie portretu – dekoracja, nie wpływa na kontrast tekstu */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_40%,rgba(201,169,106,0.07),transparent_55%)]"
      />
      <div className="container relative grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <p className="eyebrow flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 shrink-0 bg-gradient-to-r from-gold/20 via-gold to-gold"
            />
            Wrocław · Gaj · stacjonarnie i online
          </p>
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
              onClick={() => track('book_click', { method: 'znanylekarz', location: 'hero' })}
              className="rounded bg-green px-6 py-3.5 text-base font-medium text-white transition hover:bg-green/90 active:scale-[0.99]"
            >
              Umów konsultację
            </a>
            <a
              href="#o-mnie"
              className="rounded border border-green px-6 py-3.5 text-base font-medium text-green transition hover:bg-green/5 active:scale-[0.99]"
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
            <li className="flex items-center">
              <ZnanyLekarzWidget />
            </li>
          </ul>
        </Reveal>

        <Reveal delay={150} className="mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative">
            {/* Miękki organiczny kształt za portretem – bardzo stonowana zieleń, dekoracja */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 600"
              className="pointer-events-none absolute -right-8 -top-10 h-[110%] w-auto opacity-80 lg:-right-12 lg:-top-12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 300 30 C 430 40 545 120 560 250 C 575 380 520 495 400 545 C 280 595 140 565 90 435 C 40 305 70 140 170 80 C 210 55 260 30 300 30 Z"
                fill="#2D5A4E"
                opacity="0.07"
              />
            </svg>
            <img
              src="/images/portret.webp"
              alt="Grzegorz Plebaniak – psycholog, Wrocław Gaj"
              width={1280}
              height={1280}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="relative aspect-square w-full rounded-2xl border border-border object-cover shadow-lg shadow-green/5"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
