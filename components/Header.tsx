'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { track } from '../lib/analytics';

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
 * Na podstronach linki kotwicowe prowadzą do sekcji strony głównej (/#…),
 * a „Blog” prowadzi do pełnej listy artykułów (/blog).
 * Scrollspy (IntersectionObserver) delikatnie podświetla link sekcji,
 * która jest aktualnie w widoku – tylko na stronie głównej.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;
    const sections = navItems
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible.length > 0 ? visible[0].target.id : null);
      },
      // Pasek w środkowej części ekranu – sekcja, która go przecina, jest „aktywna”.
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const hrefFor = (anchor: string) => {
    if (anchor === 'blog' && !isHome) return '/blog';
    return isHome ? `#${anchor}` : `/#${anchor}`;
  };

  const linkClass = (anchor: string) =>
    active === anchor ? 'text-green font-semibold underline decoration-gold decoration-2 underline-offset-8' : 'text-ink/80 hover:text-green';
  // W menu mobilnym (pełna szerokość, block) złote podkreślenie wygląda źle — sam semibold.
  const mobileLinkClass = (anchor: string) =>
    active === anchor ? 'text-green font-semibold' : 'text-ink/80 hover:text-green';

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-cream shadow-[0_4px_20px_rgba(45,90,78,0.12)]">
      <div className="container flex items-center justify-between py-4">
        {/* Logo jako przycisk „home" — statyczne logo (bez animacji) */}
        <Link
          href="/"
          aria-label="Strona główna"
          className="inline-flex items-center rounded-sm px-1.5"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt=""
            className="h-12 w-auto max-w-[60vw] select-none"
            width={1434}
            height={258}
          />
        </Link>

        {/* Nawigacja desktop (lg+) */}
        <nav aria-label="Nawigacja główna" className="hidden gap-6 text-sm lg:flex">
          {navItems.map((item) => (
            <a
              key={item.anchor}
              href={hrefFor(item.anchor)}
              aria-current={active === item.anchor ? 'true' : undefined}
              className={linkClass(item.anchor)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={hrefFor('kontakt')}
            onClick={() => track('book_click', { method: 'znanylekarz', location: 'header' })}
            className="hidden rounded bg-green px-4 py-2 text-sm text-white transition hover:bg-green/90 active:scale-[0.99] lg:inline-block"
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
                  aria-current={active === item.anchor ? 'true' : undefined}
                  className={`block py-3 ${mobileLinkClass(item.anchor)}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="border-t border-border py-3">
              <a
                href={hrefFor('kontakt')}
                className="inline-block rounded bg-green px-4 py-2 text-sm text-white transition hover:bg-green/90 active:scale-[0.99]"
                onClick={() => {
                  track('book_click', { method: 'znanylekarz', location: 'header' });
                  setMenuOpen(false);
                }}
              >
                Umów wizytę
              </a>
            </li>
          </ul>
        </nav>
      )}
      <div aria-hidden="true" className="h-0.5 w-full bg-gradient-to-r from-green via-gold to-green" />
    </header>
  );
}
