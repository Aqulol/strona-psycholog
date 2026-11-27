# Diagnostyka `/sitemap.xml`

## Ustalenia

- `5de111c` (PR #66) usunął `app/sitemap.ts` i przeniósł generowanie na etap po statycznym eksporcie, aby źródłem adresów były rzeczywiste strony HTML. Od tej zmiany samo `next build` tworzy `out/robots.txt`, ale nie `out/sitemap.xml`. Odtworzono to poleceniem `./node_modules/.bin/next build`: wyjście 0, robots obecny, sitemap nieobecna. `public/` i `app/` nie zawierają drugiego generatora ani kopii XML.
- Redesign z PR #72 nie zmienił generatora ani komendy `npm run build`. Przy jego standardowej komendzie generator był uruchamiany, ale Firebase Hosting nie miał bariery uniemożliwiającej publikację niepełnego `out`. `output: "export"`, `cleanUrls`, końcowe ukośniki i istniejące przekierowania nie przechwytują `/sitemap.xml`; brak rewrites.
- To potwierdzona ścieżka reprodukcji, nie dowód komendy użytej przy ostatnim wydaniu produkcyjnym. Publiczny URL nie dał się odczytać z tego środowiska (narzędzie pobierania zgłosiło błąd, curl nie nawiązał TLS). Bez odpowiedzi HTTP i historii wydania nie ustalono, jaka paczka została faktycznie opublikowana.

## Naprawa i zabezpieczenie

`npm run build` uruchamia eksport, następnie `postbuild`: generowanie mapy z `out`, budowę indeksu wyszukiwania i niezależną końcową walidację gotowej paczki. `firebase.json` uruchamia tę walidację przez `hosting.predeploy` przed standardową publikacją Hosting. Hook niczego nie generuje ani nie publikuje. Brak pliku powoduje jawny błąd z instrukcją, nie zastępowanie mapy HTML. Zachowano rejestr dat oraz istniejące zasady wykluczeń i 404. Parser odrzuca również białe znaki przed deklaracją XML.

## Wyniki

- Dwie udane kompilacje; plik `out/sitemap.xml` istnieje po obu i jest bajtowo identyczny (12 609 B). Niezależny parser XML potwierdził format i przestrzeń nazw. Brak XSLT, `priority`, `changefreq`.
- 133 pliki HTML: 123 indeksowalne strony, 10 wykluczonych plików technicznych, przekierowań lub `noindex`. 123 adresy w sitemapie, **0 brakujących, 0 nadmiarowych/błędnych**, 23 udokumentowane daty `lastmod`, 100 bez daty. Testy `check:lastmod`, `check:links`, `check:sitemap`, `check:export`, `check:content` i TypeScript przeszły.
- Emulator Firebase: `/sitemap.xml` zwraca **HTTP 200, `Content-Type: application/xml`**. `robots.txt` dostępny, zezwala na renderowanie i wskazuje właściwą domenę oraz mapę. Sprawdzono 123 kanoniczne odpowiedzi 200, 16 przekierowań i 3 faktyczne 404.
- `npm run check:sitemap:failures` uruchomił dokładną komendę hooka na kopii eksportu. Poprawna paczka przeszła; brak pliku, pusty plik, XML z błędem, zero URL, brakujący URL, nieistniejący URL, zła domena, duplikat oraz błędne wskazanie w robots zwróciły kod 1. Nie wykonywano próby publikacji, produkcyjnej ani podglądowej.

Zmodyfikowane: `package.json`, `firebase.json`, `scripts/check-sitemap.mjs`, `scripts/sitemap-lib.mjs`, `scripts/check-sitemap-failures.mjs`, `README-WDROZENIE.md` i ten raport. Nie zmieniono treści ani wyglądu witryny. Produkcję należy zweryfikować po ręcznym wdrożeniu zweryfikowanej paczki: `node scripts/check-hosting.mjs https://psychologplebaniak.pl`.
