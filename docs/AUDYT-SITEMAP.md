# Audyt sitemap.xml — psychologplebaniak.pl

Zakres: bazowy commit `0e8dfa0`, dwa niezależne eksporty Next.js przed i po zmianach, rzeczywiste odpowiedzi emulatora Firebase Hosting i ograniczona weryfikacja publiczna. Nie wdrożono zmian na Firebase.

## Bilans adresów

| Pozycja | Przed | Po |
| --- | ---: | ---: |
| Adresy w lokalnym `sitemap.xml` | 100 | 100 |
| Rzeczywiste podstrony z treścią | 100 | 100 |
| Podstrony kwalifikujące się do sitemap | 100 | 100 |
| Wszystkie pliki HTML, w tym aliasy, błędy i weryfikacja Google | 111 | 110 |
| `lastmod` | 88 | 8 |
| Dodane / usunięte adresy **w sitemap** | — | 0 / 0 |

Skład 100 kanonicznych stron: **74 tematy psychologiczne, 11 wpisów blogowych i 15 pozostałych stron**, w tym strona główna, indeks bloga, konsultacje, psychoterapia psychodynamiczna i TFP, osobne strony dorosłych, młodzieży i pracy online, katalog pomocy, gabinet, autor, FAQ, kontakt, cennik i polityka prywatności. Wszystkie 100 ma wpis w manifeście prerenderowania Next.js, własny plik `index.html`, pojedynczy tytuł i H1 oraz własny canonical. Nie stwierdzono identycznych tytułów, H1 ani identycznej głównej treści różnych podstron. To nie oznacza automatycznej oceny przydatności lub podobieństwa redakcyjnego każdej pary tekstów.

| Kontrola lokalna | Wynik |
| --- | --- |
| Indeksowalne podstrony brakujące w sitemap | Brak, przed i po. |
| Wpisy bez pliku lub bez treści, błędnie generowane, stare lub usunięte w sitemap | Brak, przed i po. |
| Zduplikowane URL-e, błędny host lub canonical, noindex w sitemap | Brak. |
| Błędne przekierowania lub przekierowania w sitemap | Brak. 16 poprawnych reguł 301 dla wariantów bez końcowego ukośnika i z nim, dotyczących ośmiu aliasów. |
| HTTP 403/404/410/500 albo soft 404 w sitemap | Brak w emulatorze po zmianach; 100 bezpośrednich HTTP 200 z właściwą treścią. |
| Adresy osierocone, niedostępne z głównej, błędne odnośniki lub odnośniki do aliasów 301 | Brak w statycznym HTML. Maksymalna odległość od strony głównej: dwa przejścia. |
| Zablokowane podstrony lub zasoby w robots.txt | Brak. Jest właściwy adres sitemap, `Allow: /` dla `*` oraz jawnie dla OAI-SearchBot i Bingbot. |

Zachowane historyczne aliasy (poza sitemap): `/blog/artykul-1/`, `/blog/artykul-2/`, `/blog/artykul-3/`, `/blog/artykul-4/`, `/blog/jak-radzic-sobie-z-lekiem/`, `/blog/pierwsza-wizyta-u-psychologa/`, `/blog/psychoterapia-psychodynamiczna/`, `/blog/wypalenie-zawodowe/`. W Firebase są prawdziwymi 301 do istniejących stron, a statyczne dokumenty `noindex` mają awaryjny `meta refresh`. Poza sitemap pozostają również szablon błędu i `google2391dcad42225921.html`. Nie dodano ani nie usunięto wpisu mapy, bo żaden adres nie wymagał korekty. Usunięto tylko **duplikat technicznego pliku `out/404/index.html`**, nie podstronę z treścią.

## Ustalenia według priorytetu

- **Krytyczne:** brak wykrytych błędów w zbiorze lokalnych kanonicznych URL-i. Nie potwierdzono całości produkcyjnych nagłówków HTTP (patrz niżej).
- **Wysokie:** mechanizm miał kilka niezależnych list/filtrów i nie potrafił wykryć strony brakującej w mapie. Lista dat artykułów była równocześnie listą wpisów sitemap; usunięcie trasy lub zmiana slugu mogły zostawić martwy adres. Podstawą mapy jest teraz faktycznie wygenerowany HTML, a kontrola porównuje zbiory w obie strony.
- **Średnie:** 80 zbiorczych lub odrębnie utrzymywanych dat nie miało jednoznacznego źródła aktualizacji przypisanego do treści. Pominięto je dla 74 tematów, strony głównej, katalogu pomocy, strony młodzieży, indeksu bloga, cennika i polityki prywatności. Zachowano 8 wiarygodnych dat źródłowych `BlogPosting`: `dateModified` ma pierwszeństwo, w pozostałych przypadkach użyto `datePublished`. Trzy pozostałe wpisy blogowe nie mają daty, więc jej nie wymyślono. Nie ma `priority`, `changefreq` ani daty bieżącego builda.
- **Niskie:** Next emitował dwa pliki z szablonem błędu. Obecność `404/index.html` powodowała w emulatorze **200 na `/404/` z treścią błędu**, choć URL był `noindex` i poza mapą. Po usunięciu zduplikowanego pliku `/404/` i trzy celowo nieistniejące adresy zwracają właściwe **404** z zachowanym szablonem `out/404.html`. To nie był soft 404 w sitemap. Nie zmieniono prawidłowych przekierowań ani konfiguracji Firebase.

## Mechanizm i testy

`npm run build` uruchamia `next build`, skanuje cały `out/`, odrzuca techniczne wyjątki i tworzy deterministyczną mapę. Nowa strona, edycja slugu i usunięcie trafiają do mapy zgodnie z wynikiem eksportu, bez ręcznego rejestru. Niezależne `npm run check:sitemap` czyta mapę z dysku i sprawdza jej zgodność z HTML, formatem URL, canonicalami, datami oraz regułami Firebase i robots. Przy błędzie integralności polecenie zwraca niezerowy kod. Kontrola treści wykrywa szablony błędów i przekierowań, duplikaty głównej treści oraz brak rzeczywistej treści poza H1; nie jest oceną Google ani oceną jakości klinicznej. Osobno kontrolowany jest graf zwykłych odnośników `<a href>` w eksporcie, w tym linki w natywnych `details`, bez wykonywania JavaScriptu.

- `npm run build`, `npm run check:sitemap`, `npm run check:export`, `npx tsc --noEmit` i `git diff --check` — przeszły.
- Negatywne próby na kopii eksportu: brak wpisu, brak HTML, duplikat URL, obca domena, nieistniejąca data, błędny canonical, `noindex`, pusty `main` i blokada `/_next/` — każda została wykryta.
- Firebase CLI 15.37.0, wyłącznie emulator Hosting projektu demonstracyjnego: 100 bezpośrednich `200 text/html`, zgodne canonicale, brak `X-Robots-Tag` z `noindex`, 16 reguł `301`, 3 nieistniejące adresy i `/404/` z HTTP 404. `sitemap.xml`: `200 application/xml`; `robots.txt`: `200 text/plain`. Przykładowy bezukośnikowy `/kontakt` przekierowuje do `/kontakt/`. Hosting używa `out`, `cleanUrls: true`, `trailingSlash: true` i nie ma reguły `rewrites` kierującej do strony głównej.

## Produkcja i dalsze decyzje

Narzędzie odczytu stron zwróciło tekstową reprezentację publicznego `sitemap.xml` i `robots.txt`, spójną z układem bazowego eksportu (m.in. grupowe daty 2026-11-26). Zwróciło również właściwą treść dla `/blog/samotnosc/` oraz `/w-czym-pomagam/lek-spoleczny/`. Dla testowego nieistniejącego adresu narzędzie zwróciło błąd pobrania bez kodu HTTP. Odczyt tekstowy nie udostępnia surowych nagłówków, więc nie zastępuje porównania XML ani pełnego crawl. Z terminala bezpośrednie HTTPS do produkcji kończyło się `ECONNRESET`/`SSL_ERROR_SYSCALL` przed uzyskaniem odpowiedzi. **Nie potwierdzono produkcyjnego statusu, MIME, X-Robots-Tag, przekierowań ani canonical dla każdego ze 100 wpisów**, nie zweryfikowano też, czy produkcja wystawia techniczne `/404/` z HTTP 200. Testy emulatora nie są dowodem na stan produkcji.

Po ręcznej publikacji uruchomić `node scripts/check-hosting.mjs https://psychologplebaniak.pl` z sieci mającej dostęp do produkcji. Skrypt porówna zbiory publiczny i lokalny oraz wykona żądania bez podążania za przekierowaniami. W Search Console warto sprawdzić stan ostatniego odczytu sitemap i wybrane kanoniczne adresy. Osobnej decyzji redakcyjnej wymagałaby ewentualna konsolidacja bliskich tematycznie, ale różnych stron (np. artykuł o samotności vs strona konsultacji dotycząca samotności); sam audyt nie uzasadnia usuwania którejkolwiek z nich. Nie dokonano zgłoszeń w GSC.

## Zmienione pliki

- `app/sitemap.ts` — usunięty dotychczasowy generator oparty na listach.
- `package.json` — generowanie i walidacja w buildzie oraz komenda `check:sitemap`.
- `scripts/sitemap-lib.mjs`, `scripts/check-sitemap.mjs` — inwentaryzacja, generator, kontrola XML i HTML, graf linków, usunięcie technicznego duplikatu 404.
- `scripts/check-hosting.mjs` — pełne porównanie i kontrole HTTP hostingu.
- `README-WDROZENIE.md`, `docs/AUDYT-SITEMAP.md` — dokumentacja pracy i wyniki.

Bez zmian `firebase.json`, `.firebaserc`, `robots.txt` (jego generatora), treści, metadanych i kanonicznych adresów.
