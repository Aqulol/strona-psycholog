import type { ReactNode } from 'react';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
};

/** Nagłówek sekcji: eyebrow + H2 (+ opcjonalny lead). */
export default function SectionHeading({ eyebrow = 'Gabinet psychologiczny Wrocław', title, children }: SectionHeadingProps) {
  return (
    <Reveal>
      <p className="eyebrow flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className="inline-block h-px w-8 shrink-0 bg-gradient-to-r from-gold/20 via-gold to-gold"
        />
        {eyebrow}
      </p>
      <h2 className="mt-3 mb-8 text-4xl text-green md:text-5xl lg:mb-10 xl:text-6xl">{title}</h2>
      {children}
    </Reveal>
  );
}
