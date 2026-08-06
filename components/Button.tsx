import Link from 'next/link';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

/**
 * Przycisk w dwóch wariantach (primary / outline).
 * Z `href` renderuje link (Next.js), bez `href` – element <button>.
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  disabled,
  ariaLabel,
}: ButtonProps) {
  const base =
    'inline-block rounded px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-3 focus-visible:outline-gold focus-visible:outline-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-green text-white hover:bg-green/90 disabled:cursor-not-allowed disabled:opacity-60'
      : 'border border-green text-green hover:bg-green/5';

  if (href) {
    const external = href.startsWith('http');
    if (external) {
      return (
        <a href={href} className={`${base} ${styles} ${className}`} aria-label={ariaLabel}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`${base} ${styles} ${className}`} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles} ${className}`} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
