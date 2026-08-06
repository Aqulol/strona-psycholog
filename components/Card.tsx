import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

/** Kafelek z białym tłem, ramką i zaokrągleniem w stylu strony. */
export default function Card({ children, className = '' }: CardProps) {
  return <div className={`rounded border border-border bg-white p-6 ${className}`.trim()}>{children}</div>;
}
