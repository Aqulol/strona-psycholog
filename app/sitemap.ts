export const dynamic='force-static';
import type{MetadataRoute} from 'next';

/**
 * Sitemap — Wszystkie adresy z końcówką '/' (serwer z trailingSlash:true
 * serwuje je bez przekierowania 301; Google odrzuca w sitemap/inspection
 * adresy z przekierowaniem jako „Błąd przekierowania”).
 *
 * WAŻNE: lastmod są STABILNE (stałe daty publikacji), a nie new Date().
 * Wcześniej każdy build ustawiał lastmod na czas budowania, przez co sitemap
 * zmieniała się przy każdym wdrożeniu — Google niepotrzebnie przeszukiwał
 * wszystkie podstrony i mógł traktować je jako „zmienione”, mimo braku zmian.
 */
const SITE = 'https://psychologplebaniak.pl';

// Data publikacji artykułów (datePublished z metadata) — spójna z JSON-LD.
const ARTICLE_DATES: Record<string, string> = {
  'jak-wybrac-psychoterapeute': '2026-08-20',
  'dlaczego-wybieram-podobnych-partnerow': '2026-08-11',
  'dlaczego-sama-swiadomosc-nie-wystarcza': '2026-08-11',
  'relacja-terapeutyczna-zrodlo-zmiany': '2026-08-11',
  'czy-przeszlosc-ma-znaczenie': '2026-08-11',
};

// Ostatnia istotna zmiana strony głównej / listy bloga / polityki.
const STATIC_LASTMOD = '2026-08-19';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastmod?: string }[] = [
    { path: '/', lastmod: STATIC_LASTMOD },
    { path: '/blog/', lastmod: STATIC_LASTMOD },
    ...Object.entries(ARTICLE_DATES).map(([slug, lastmod]) => ({
      path: `/blog/${slug}/`,
      lastmod,
    })),
    { path: '/cennik/', lastmod: '2026-08-20' },
    { path: '/polityka-prywatnosci/', lastmod: STATIC_LASTMOD },
  ];

  return pages.map((p) => ({
    url: SITE + p.path,
    ...(p.lastmod ? { lastModified: p.lastmod } : {}),
  }));
}
