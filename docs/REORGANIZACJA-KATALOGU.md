# Reorganizacja strony „W czym mogę pomóc?”

Usunięto całą odrębną sekcję dodatkowych obszarów z `/kiedy-zglosic-sie-na-terapie/`: nagłówek, opis, kontener, listę i powtórzone zastrzeżenia. Wszystkie **74 tematy** są w jednym katalogu, każdy dokładnie raz. Osobny odnośnik o konsultacji dla młodzieży pozostaje w jej kategorii i nie jest liczony jako temat. Informacje o indywidualnej formie pracy, braku terapii par, diagnostyce i współpracy, uzależnieniach, odżywianiu, bezpieczeństwie i dobrowolności zebrano w istniejącej sekcji o zakresie pomocy. Nie zmieniono treści stron tematów, adresów, Booksy, Firebase ani metadanych.

## Trzy niezależne kontenery

- Wprowadzenie i informacje końcowe: zwykła szerokość `.reading`, maks. 52 rem (832 px), marginesy automatyczne. Tekst wyrównany naturalnie do lewej; okruszki należą do wprowadzenia.
- Katalog: osobna sekcja, 94% szerokości od 976 px, maks. 112,5 rem (1800 px). Poniżej 976 px pozostaje po 16 px marginesu. Na 2560 px świadomie obowiązuje maksimum 1800 px, zamiast rozciągania do 94%.
- Balansowane kolumny CSS: całe kafelki, wysokość z treści, bez pustych komórek narzuconych przez rzędy. Czytanie, DOM i Tab idą od góry do dołu jednej kolumny, potem do kolejnej. Drobne różnice wysokości kolumn pozostają, bo nie dzielimy kategorii. Czcionka linków 16 px, obszar kliknięcia co najmniej 32 px, naturalne zawijanie.

## Pomiary w Chromium

Bazowy eksport: `1da9a125`. Pomiar obejmuje w obu wersjach komplet katalogu (wcześniej wraz z końcem sekcji dodatkowej), bez wstępu i późniejszych sekcji informacyjnych.

| Ekran | Kolumny po | Wstęp i koniec po | Szerokość katalogu przed → po | Wysokość przed → po | Skrócenie |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 2560 px | 5 | 832 px | 1376 → 1800 px | 1529 → 900 px | 41% |
| 1920 px | 5 | 832 px | 1376 → 1800 px | 1529 → 900 px | 41% |
| 1728 px | 5 | 832 px | 1376 → 1624 px | 1529 → 957 px | 37% |
| 1440 px | 4 | 832 px | 1376 → 1354 px | 1529 → 1105 px | 28% |
| 1366 px | 4 | 832 px | 1326 → 1284 px | 1608 → 1148 px | 29% |
| 1344 px | 4 | 832 px | 1304 → 1263 px | 1606 → 1167 px | 27% |
| 1280 px | 3 | 832 px | 1240 → 1203 px | 1851 → 1219 px | 34% |
| 1024 px | 3 | 832 px | 984 → 963 px | 1983 → 1310 px | 34% |
| 976 px | 3 | 832 px | 936 → 917 px | 2058 → 1399 px | 32% |
| 768 px | 2 | 728 px | 728 → 736 px | 2251 → 1835 px | 18% |
| 640 px | 2 | 600 px | 600 → 608 px | 2603 → 2028 px | 22% |
| 390 px | 1 | 350 px | 358 → 358 px | 4052 → 3613 px | 11% |
| 360 px | 1 | 320 px | 328 → 328 px | 4125 → 3695 px | 10% |

Zrzuty całej głównej zawartości: [1920 przed](katalog-reorganizacja/1920-przed.png) / [po](katalog-reorganizacja/1920-po.png), [1366 przed](katalog-reorganizacja/1366-przed.png) / [po](katalog-reorganizacja/1366-po.png), [390 przed](katalog-reorganizacja/390-przed.png) / [po](katalog-reorganizacja/390-po.png).

## Weryfikacja

- `npm run build`, `npm run check:export` (100 stron, 16 przekierowań), `npx tsc --noEmit`, `git diff --check` — przeszły.
- Chromium/Playwright: 13 szerokości, dwa identycznie wyśrodkowane wąskie kontenery, brak poziomego przepełnienia i dzielenia kart między kolumnami, zgodność odnośników przed/po, 75 bezpośrednich odpowiedzi HTTP 200. Sprawdzono pełną kolejność Tab i otwarcie ostatniej pozycji klawiszem Enter na 1366 i 390 px. Nie uruchamiano osobnego czytnika ekranowego; kolejność i semantykę zweryfikowano w DOM i na klawiaturze.
- Test regresji stron tematów przeszedł. Jak wcześniej, dostawca Booksy zamykał połączenie w sandboxie. Osadzenia nie modyfikowano.
- Bez wdrożenia produkcyjnego.

## Zmienione pliki

- `app/kiedy-zglosic-sie-na-terapie/page.tsx` — trzy niezależne kontenery.
- `app/globals.css` — style ograniczone do katalogu.
- `components/HelpTopicIndex.tsx` — jeden katalog i docelowa klasyfikacja.
- `components/ServicePage.tsx` — usunięcie przeniesionego renderowania katalogu z szablonu usług.
- `components/ConsultationTopics.tsx` — usunięty komponent dodatkowej sekcji.
- `lib/pages.ts` — wspólne ograniczenia wyłącznie na stronie katalogu.
- `scripts/check-export.mjs`, `scripts/check-help-browser.cjs`, `scripts/check-catalogue-browser.cjs` — asercje i pomiary.
- `docs/REORGANIZACJA-KATALOGU.md` i `docs/katalog-reorganizacja/` — raport i zrzuty.

## Docelowy podział

### Nastrój i emocje

- Depresja i obniżony nastrój
- Poczucie pustki i braku sensu życia
- Brak satysfakcji z życia
- Trudności w regulacji emocji
- Trudności w rozumieniu emocji
- Problemy ze złością
- Intensywne emocje
- Impulsywność
- Nadmierne poczucie winy
- Wstyd

### Lęk, stres i przeciążenie

- Lęk i zaburzenia lękowe
- Lęk społeczny (fobia społeczna)
- Lęk przed porażką
- Przewlekły stres
- Wypalenie zawodowe
- Problemy ze snem
- Trudności z odpoczynkiem
- Natłok myśli
- Nadmierne analizowanie

### Relacje i funkcjonowanie społeczne

- Problemy w relacjach
- Samotność
- Lęk przed odrzuceniem
- Lęk przed bliskością
- Trudności z zaufaniem
- Trudności z asertywnością i stawianiem granic
- Trudności komunikacyjne
- Trudności w nawiązywaniu znajomości
- Powtarzające się trudności w relacjach
- Zależność emocjonalna
- Stres mniejszościowy i dyskryminacja

### Poczucie własnej wartości i rozumienie siebie

- Niskie poczucie własnej wartości
- Niestabilna samoocena
- Nadmierny samokrytycyzm
- Perfekcjonizm
- Trudności w radzeniu sobie z krytyką
- Zależność od akceptacji innych
- Poczucie bycia niewystarczającym
- Trudności w zrozumieniu siebie
- Trudności w podejmowaniu decyzji

### Osobowość i tożsamość

- Zaburzenia osobowości
- Zaburzenie osobowości borderline
- Narcyzm i trudności narcystyczne
- Niestabilny obraz siebie
- Trudności w określeniu własnej tożsamości

### Związki, bliskość i seksualność

- Kryzys w związku
- Zdrada w związku
- Rozstanie i rozwód
- Samotność w związku
- Wybieranie podobnych partnerów
- Trudności w budowaniu bliskich relacji
- Seksualność i intymność

### Kryzysy i zmiany życiowe

- Kryzysy życiowe
- Strata i żałoba
- Utrata pracy i zmiany zawodowe
- Trudności w przystosowaniu się do zmian

### Przeszłość i trudne doświadczenia

- Trudne doświadczenia z dzieciństwa
- Dorastanie w rodzinie z problemem alkoholowym (DDA)
- Doświadczenie przemocy
- Powracające wspomnienia trudnych wydarzeń
- Wpływ przeszłości na relacje

### Zdrowie fizyczne i psychiczne

- Zaburzenia psychosomatyczne
- Trudności związane z chorobą
- Zdrowie fizyczne i funkcjonowanie psychiczne

### Odżywianie i obraz ciała

- Trudności związane z odżywianiem
- Trudności związane z obrazem ciała

### Ciąża i rodzicielstwo

- Trudności emocjonalne w okresie okołoporodowym
- Trudności związane z rodzicielstwem

### Używanie substancji psychoaktywnych

- Problemowe używanie alkoholu lub innych substancji

### Młodzież od 15. roku życia

- Stres szkolny
- Trudności emocjonalne młodzieży
- Problemy w relacjach z rówieśnikami
- Problemy w relacjach rodzinnych
- Dorastanie i kształtowanie tożsamości
- Niska samoocena u młodzieży
