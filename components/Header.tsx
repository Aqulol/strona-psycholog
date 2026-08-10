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
        {/* Logo jako przycisk „home" — domyślnie zwinięte do samego znaku „GP"
            (znak jest środkiem wordmarku „psycholoGPlebaniak", dlatego obraz jest
            przesunięty w lewo), po najechaniu/fokusie klawiatury płynnie rozwija
            się do pełnego napisu (width + translate, 500 ms). */}
        <Link
          href="/"
          aria-label="Strona główna"
          className="group inline-flex items-center rounded-sm px-1.5"
        >
          <span className="inline-flex h-12 items-center overflow-hidden transition-all duration-500 ease-in-out w-[70px] group-hover:w-[274px] group-focus-visible:w-[274px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt=""
              className="h-12 w-auto max-w-none shrink-0 select-none -translate-x-[105px] transition-transform duration-500 ease-in-out group-hover:translate-x-0 group-focus-visible:translate-x-0"
              width={274}
              height={48}
            />
          </span>
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
