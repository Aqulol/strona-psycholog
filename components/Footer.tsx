import Link from 'next/link';
import { config } from '../lib/config';

const navLinks = [
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Obszary pomocy', href: '#obszary' },
  { label: 'Metoda pracy', href: '#metoda' },
  { label: 'Gabinet', href: '#gabinet' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '#kontakt' },
];

/** Stopka – nawigacja, dane firmy, RODO i copyright. */
export default function Footer() {
  return (
    <footer className="bg-green py-10 text-white lg:py-14">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-heading text-3xl lg:text-4xl">Grzegorz Plebaniak</p>
            <p className="mt-2 text-sm text-white/80">Psycholog / psychoterapeuta · Wrocław Gaj</p>
          </div>
          <nav aria-label="Nawigacja w stopce">
            <ul className="grid grid-cols-2 gap-2 text-sm text-white/85">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-white/85">
            <p className="mb-2">Psycholog Grzegorz Plebaniak — psychoterapia psychodynamiczna dla dorosłych, stacjonarnie i online.</p>
            <p>{config.address}</p>
            <p className="mt-1">{config.phone}</p>
            <p className="mt-1">{config.email}</p>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/20 pt-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Grzegorz Plebaniak. Wszystkie prawa zastrzeżone.</p>
          <Link href="/polityka-prywatnosci" className="underline hover:text-white">
            Polityka prywatności
          </Link>
        </div>
      </div>
    </footer>
  );
}
