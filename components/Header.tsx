'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'O mnie', anchor: 'o-mnie' },
  { label: 'Obszary pomocy', anchor: 'obszary' },
  { label: 'Metoda pracy', anchor: 'metoda' },
  { label: 'Gabinet', anchor: 'gabinet' },
  { label: 'FAQ', anchor: 'faq' },
  { label: 'Blog', anchor: 'blog' },
  { label: 'Kontakt', anchor: 'kontakt' },
];

/**
 * Sticky header z logotypem, nawigacją (desktop) i hamburgerem (<1024px).
 * Na podstronach linki kotwicowe prowadzą do sekcji strony głównej (/#…).
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const hrefFor = (anchor: string) => (isHome ? `#${anchor}` : `/#${anchor}`);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream/95 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-heading text-2xl font-semibold text-green">
          Grzegorz Plebaniak
        </Link>

        {/* Nawigacja desktop (lg+) */}
        <nav aria-label="Nawigacja główna" className="hidden gap-6 text-sm lg:flex">
          {navItems.map((item) => (
            <a key={item.anchor} href={hrefFor(item.anchor)} className="text-ink/80 hover:text-green">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={hrefFor('kontakt')}
            className="hidden rounded bg-green px-4 py-2 text-sm text-white transition-colors hover:bg-green/90 lg:inline-block"
          >
            Umów wizytę
          </a>

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="rounded p-2 text-green lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobilne"
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      {menuOpen && (
        <nav id="menu-mobilne" aria-label="Menu mobilne" className="border-t border-border bg-cream lg:hidden">
          <ul className="container py-2">
            {navItems.map((item) => (
              <li key={item.anchor}>
                <a
                  href={hrefFor(item.anchor)}
                  className="block py-3 text-ink/80 hover:text-green"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-t border-border py-3">
              <a
                href={hrefFor('kontakt')}
                className="inline-block rounded bg-green px-4 py-2 text-sm text-white"
                onClick={() => setMenuOpen(false)}
              >
                Umów wizytę
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
