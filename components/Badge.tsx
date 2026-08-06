import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

/** Drobna etykieta (np. micro-trust w Hero). */
export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm text-ink ${className}`.trim()}
    >
      {children}
    </span>
  );
}
