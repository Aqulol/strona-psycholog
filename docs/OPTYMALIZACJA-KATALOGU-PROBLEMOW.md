# Katalog „W czym mogę pomóc?” — porównanie układu

Pomiar w Chromium przy wysokości okna 900 px. Wersja przed zmianą: eksport bazowego commitu `9a68d506`. Wersja po zmianie: lokalny eksport. Wysokość katalogu liczona od początku głównej sekcji do końca sekcji dodatkowej, łącznie z jej nagłówkiem i ograniczeniami klinicznymi. Wysokość strony oznacza `<main>`, bez nagłówka i stopki serwisu.

## Układ i dostępność

- Główny katalog: 10 kart w dotychczasowej kolejności. Dodatkowe obszary to osobna karta z listą rozłożoną na kolumny. Wszystkie 74 zagadnienia i dodatkowy odnośnik dotyczący konsultacji dla młodzieży pozostają widoczne i zachowują kolejność tabulacji.
- CSS Grid w naturalnej kolejności od lewej do prawej, potem do kolejnego rzędu. Karty mają wysokość wynikającą z treści. Wybór zwykłej siatki zamiast masonry zachowuje zgodność układu wizualnego z kolejnością czytania i fokusu. Kosztem są miejscowe przerwy pod krótszymi kartami oraz wolne pola w ostatnim rzędzie; nie wypełniają ich sztucznie rozciągnięte karty.
- Maksymalna szerokość katalogu: 86 rem zamiast 52 rem. Boczne marginesy minimum 16 px na telefonie i 20 px na większym ekranie. Wstęp i późniejsze bloki tekstowe nadal mają maksimum 52 rem. Bez zmian w pozostałych częściach witryny.
- 1 kolumna poniżej 640 px, 2 od 640 px, 3 od 976 px i 4 od 1344 px (przy bazowym rozmiarze 16 px). Szerokość karty przy wejściu w układ 4-kolumnowy wynosi około 316 px. Linki zachowują rozmiar tekstu 16 px, podkreślenie i czytelny obrys fokusu. Klikalny jest pełny wiersz o wysokości co najmniej 32 px; dłuższe nazwy zawijają się na granicach słów. Usunięto powtarzalne strzałki i punktory, ale zachowano semantykę list.

## Pomiary

| Okno | Kolumny po | Szerokość katalogu przed → po | Wysokość katalogu przed → po | Skrócenie | Wysokość strony przed → po |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 1920 px | 4 | 832 → 1376 px | 3545 → 1529 px | 57% | 5247 → 3175 px |
| 1440 px | 4 | 832 → 1376 px | 3545 → 1529 px | 57% | 5247 → 3175 px |
| 1366 px | 4 | 832 → 1326 px | 3544 → 1608 px | 55% | 5245 → 3253 px |
| 1344 px | 4 | 832 → 1304 px | 3541 → 1606 px | 55% | 5236 → 3245 px |
| 1280 px | 3 | 832 → 1240 px | 3531 → 1851 px | 48% | 5208 → 3473 px |
| 1024 px | 3 | 832 → 984 px | 3337 → 1983 px | 41% | 4892 → 3482 px |
| 976 px | 3 | 832 → 936 px | 3316 → 2058 px | 38% | 4820 → 3506 px |
| 768 px | 2 | 728 → 728 px | 3358 → 2251 px | 33% | 4951 → 3788 px |
| 640 px | 2 | 600 → 600 px | 5301 → 2603 px | 51% | 6981 → 4255 px |
| 639 px | 1 | 599 → 607 px | 5301 → 3650 px | 31% | 6981 → 5301 px |
| 430 px | 1 | 390 → 398 px | 5536 → 3889 px | 30% | 7685 → 5982 px |
| 390 px | 1 | 350 → 358 px | 5676 → 4052 px | 29% | 7963 → 6277 px |
| 360 px | 1 | 320 → 328 px | 5837 → 4125 px | 29% | 8265 → 6524 px |

Odstępy między i pod kartami stanowiły około 34% obrysu siatki głównej przy 1366 px. Większość różnicy względem wersji bazowej wynika z tego, że tło krótszych kart nie jest rozciągane; katalog mimo tych przerw jest niższy o 1936 px. Na telefonie udział odstępów wynosił około 4% obrysu siatki.

### Zrzuty samej siatki głównej

- 1366 px: [przed](katalog-porownanie/1366-przed.png) · [po](katalog-porownanie/1366-po.png)
- 390 px: [przed](katalog-porownanie/390-przed.png) · [po](katalog-porownanie/390-po.png)

## Weryfikacja

- `npm run build`, `npm run check:export` (100 stron, 16 przekierowań), `npx tsc --noEmit`, `git diff --check` — przeszły. Repozytorium nie ma osobnego polecenia lint.
- `scripts/check-catalogue-browser.cjs`: 13 szerokości, także na progach układu, porównanie przed/po, niezmienione odnośniki i kolejność kategorii, brak przepełnienia, wszystkie pozycje widoczne, 75 bezpośrednich odpowiedzi HTTP 200. Pełne przejście klawiszem Tab i otworzenie ostatniego odnośnika klawiszem Enter zweryfikowano na 1366 i 390 px.
- Dotychczasowy test Chromium `scripts/check-help-browser.cjs` przeszedł. Stan połączenia do zewnętrznego Booksy w środowisku testowym pozostaje ograniczony; kod widgetu nie był modyfikowany.

Nie wdrażano na produkcję.
