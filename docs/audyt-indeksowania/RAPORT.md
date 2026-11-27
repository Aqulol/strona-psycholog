# Diagnostyka indeksowania i przekierowań

Punkt odniesienia: `2acac93` i agregaty GSC przekazane przez właściciela (27.11.2026: 9 zindeksowanych, 15 niezindeksowanych; 4 błędy przekierowania, 4 poprawnie sklasyfikowane przekierowania, 6 odpowiedzi 404, 1 zeskanowana bez indeksowania). Nie otrzymano adresów ani dat ostatniego skanowania dla poszczególnych przypadków. Żaden wynik emulatora nie jest przypisany do tych 6 ani 4 wpisów GSC.

## Potwierdzone wyniki HTTP

Dwa rzeczywiste emulatory Firebase Hosting z osobnymi paczkami (`demo-seo-baseline` i `demo-seo-fixed`). [Pełne łańcuchy 606 wariantów](lancuchy.tsv) oraz [HTTP, canonical, meta robots, X-Robots-Tag, H1 i objętość HTML SSR dla 192 podstron + kontrolne 404](http.tsv).

| Próbka | Bazowo | Po naprawie |
|---|---|---|
| `/kontakt` | 301 → `/kontakt/` 200 | bez zmian |
| `/kontakt/index.html` | 301 → `/kontakt/` 200 | bez zmian |
| `/index.html` | 301 → `/` 200 | bez zmian |
| `/kontakt.html` | 404 | 301 → `/kontakt/` 200 |
| `/blog/artykul-1.html` | 404 | 301 → `/blog/dlaczego-wybieram-podobnych-partnerow/` 200 |
| `/blog/artykul-1/index.html` | 301 → `/blog/artykul-1/` 301 → `/blog/dlaczego-wybieram-podobnych-partnerow/` 200 | 301 → `/blog/dlaczego-wybieram-podobnych-partnerow/` 200 |
| `/blog/wypalenie-zawodowe/` | 301 → ogólny katalog `/kiedy-zglosic-sie-na-terapie/` 200 | 301 → `/w-czym-pomagam/wypalenie-zawodowe/` 200 |
| `/blog/jak-radzic-sobie-z-lekiem/` | 301 → ogólny katalog `/kiedy-zglosic-sie-na-terapie/` 200 | 301 → `/w-czym-pomagam/zaburzenia-lekowe/` 200 |
| `/404/`, nieznane adresy | prawdziwe 404 w próbkach | prawdziwe 404, bez fallbacku na stronę główną |

Bazowo: 399 bezpośrednich 301, 199 odpowiedzi 404 (191 wariantów `.html` dla istniejących tras i 8 dla starych artykułów), 8 ścieżek z dwiema odpowiedziami 301. Nie potwierdzono pętli. Po zmianie: **606/606** trwałych przekierowań w jednym kroku do 200. To test obsługi równoważnych wariantów, nie stwierdzenie, że Google znało wszystkie 606. Nie obejmuje przekierowań domeny ani HTTPS na produkcji.

## Przyczyna i decyzje dotyczące tras

- Next statycznie eksportuje `path/index.html` (`output: export`, `trailingSlash: true`); `cleanUrls` Firebase nie utożsamia tego pliku z `path.html`. Firebase sam poprawnie normalizuje `/path` i `/path/index.html` dla istniejącego katalogu. Dodano 191 jawnych aliasów `.html` tylko dla istniejących stron, bez reguły typu catch-all. Konfigurację odświeża `npm run redirects:sync-html` z wygenerowanej sitemapy. Przy usuwaniu tras najpierw usunąć z konfiguracji ich nieaktualne aliasy lub wskazać zasadny nowy cel; walidator blokuje nieistniejące cele.
- Osiem starych artykułów miało równolegle regułę Hosting i eksportowane strony meta refresh (nie były 404 jako podstawowe ścieżki). Usunięto zastępcze pliki HTML i komponent meta refresh. Hosting jest jedynym źródłem reguł dla tych tras. Każdy stary adres, z ukośnikiem, bez niego, z `.html` i z `/index.html`, prowadzi w jednym kroku do celu. Manifest Next: wyłącznie wewnętrzne reguły formatu slash, bez własnych przekierowań i rewrites. Nie wykryto przekierowań nawigacyjnych wykonywanych przez JS dla badanych aliasów. Zachowano brak rewrites w Hosting.
- Przejrzano historyczne `app/**/page.tsx`, `firebase.json`, zmiany slugów katalogu i historyczny `app/sitemap.ts` po pogłębieniu historii Git. `artykul-1`–`artykul-4` to stare adresy zastąpione nazwami opisowymi; ich cele pozostają bez zmian. Zachowano też cele dla `/blog/pierwsza-wizyta-u-psychologa/` (konsultacje) i `/blog/psychoterapia-psychodynamiczna/` (opis podejścia). Lęk i wypalenie mają dziś bardziej adekwatne strony tematyczne, więc zmieniono wyłącznie cele tych dwóch zestawów. Nie przywracano żadnych stron merytorycznych — w przejrzanych danych nie potwierdzono przypadkowego usunięcia strony bez odpowiednika. Nieznane adresy, w tym nieznane `.html`, pozostają 404. Dokładne adresy wszystkich aliasów i ich cele są w [konfiguracji](../../firebase.json) i w tabeli HTTP.

## Sitemap, canonical i odkrywalność

Eksport przed: 202 pliki HTML, z czego 192 indeksowalne i 10 technicznych. Po: **194 HTML**, **192 indeksowalne**, 2 techniczne (`404.html` i weryfikacja Google). Zniknęło tylko osiem plików meta refresh. Sitemap, globalny indeks wyszukiwania i 23 udokumentowane `lastmod` są identyczne bajtowo z bazą. Mapa jest rzeczywistym plikiem `out/sitemap.xml`, zawiera 192 adresy (w tym 69 definicji i 74 strony tematów). Wszystkie adresy mają dostępny HTML, zgodny self-canonical i pojedynczy H1; nie stwierdzono globalnego canonical do strony głównej, `noindex` ani `X-Robots-Tag: noindex` na tych trasach. `robots.txt` zezwala na skanowanie i wskazuje HTTPS bez www. Brak tras osieroconych, niedostępnych, linków do aliasów i błędów fragmentów; maksymalna głębokość od strony głównej: 2. `generateStaticParams` i zakres treści pozostawiono bez zmian.

Publicznie narzędzie odczytu stron zwróciło treść `https://psychologplebaniak.pl/sitemap.xml` (obie części, m.in. nowe definicje i usługi), `robots.txt` i hasła „Agresja”. Zwróciło także treść robots pod `www`, ale nie udostępnia nagłówków ani pełnych łańcuchów HTTP. Bezpośrednie żądania `curl` dla HTTP/HTTPS, z www i bez: `Empty reply from server` (HTTP) albo `SSL_ERROR_SYSCALL` (HTTPS). Nie jest to dowód błędu TLS na stronie produkcyjnej. Nie wykonano pełnego przebiegu publicznego HTTP, nie potwierdzono statusu przed przekierowaniem, pełnej zgodności wdrożenia ani konfiguracji hosta. Udany odczyt publicznej mapy przeczy tezie, że obecnie nie można jej w ogóle pobrać; nie ustala jej stanu na dzień ostatniego crawlu Google. Starsza historia repo dokumentuje węższe mapy i zmiany mechanizmu generowania, ale nie dowodzi, co i kiedy było wdrożone. 24 adresy w raporcie to stan raportowania, nie pomiar bieżącej liczby stron; możliwe są wcześniejsze wdrożenia, opóźnienie odkrywania lub wybór indeksowania przez Google. Nie obiecuje się indeksacji.

## Weryfikacja i następne kroki

- `npm ci`, `npm run build` (z `postbuild`), `check:sitemap`, `check:links`, `check:redirects`, `check:indexability`, `check:export`, `check:content`, `check:sitemap:failures`, `git diff --check`: przeszły. `parse5` jest w manifeście i lockfile. Próby negatywne grafu: pętla do siebie, pętla dwuadresowa, łańcuch z dwoma regułami, zduplikowane źródło — wszystkie odrzucone. Emulator: 192 bezpośrednie 200, 606 wariantów, 4 rzeczywiste kontrolne 404; osobny istniejący test `check-hosting.mjs` również przeszedł.
- Po standardowym wdrożeniu z sieci mającej dostęp uruchomić `npm run check:indexability -- https://psychologplebaniak.pl --json=wynik.json` i analogicznie `check:redirects`. W konsoli Firebase sprawdzić certyfikaty i ustawienie www jako domeny przekierowującej do apex, nie jako niezależnego hosta tej samej treści; przetestować HTTP i HTTPS z obu domen. Nie dodawać przekierowania wszystkich ścieżek do origin w `firebase.json`, które objęłoby także żądania kanoniczne.
- W GSC pobrać dokładne przykłady każdego typu, sprawdzić ostatni crawl, canonical wybrany przez Google i test wersji na żywo. Potwierdzić aktualny odczyt zgłoszonej sitemapy. Jeśli cztery prawidłowe stare przekierowania mają oczekiwane cele, nie usuwać ich; dla 404 bez odpowiednika nie wymuszać 301. Zgłoszenie do ponownej walidacji dopiero po weryfikacji konkretnych adresów na produkcji.

Zmienione pliki: `firebase.json`, `package.json`, `scripts/sitemap-lib.mjs`, nowe `scripts/{redirect-policy,http-seo,check-redirects,check-indexability,sync-html-redirects}.mjs`, usunięte `app/blog/_BlogRedirect.tsx` i osiem stron historycznych wymienionych w zadaniu; dokumentacja i dowody w tym katalogu. Bez zmian wyglądu, oferty, treści słownika ani wdrożenia Firebase.
