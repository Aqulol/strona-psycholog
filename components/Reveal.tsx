'use client';

import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Opóźnienie animacji w ms (używane z klasą Tailwind `delay-[...]`). */
  delay?: number;
  as?: 'div' | 'section' | 'article' | 'li';
};

/**
 * Opakowuje treść w kontener z animacją fade-in przy wejściu w viewport.
 * Przy prefers-reduced-motion treść jest od razu widoczna.
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
