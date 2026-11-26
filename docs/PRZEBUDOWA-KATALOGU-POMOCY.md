# Przebudowa strony „W czym mogę Ci pomóc?”

Zmiana dotyczy wyłącznie `/kiedy-zglosic-sie-na-terapie/`. Dziewięć kart siatki: Nastrój i emocje; Lęk i stres; Samoocena i rozumienie siebie; Relacje z innymi; Związki i bliskość; Osobowość i tożsamość; Kryzysy i trudne doświadczenia; Ciało i zdrowie; Ciąża i rodzicielstwo. Po siatce znajduje się osobny panel dla młodzieży, panel zakresu pomocy z odnośnikiem o substancjach, odnośniki uzupełniające i CTA Booksy z telefonem i e-mailem.

Karty mają wyrównane wysokości na tabletach i komputerach w stanie domyślnym. Maksymalnie cztery tematy są od razu widoczne; pozostałe rozwija natywne `details/summary`. Na telefonie karty mają naturalną wysokość. Użyto istniejącego Lucide, bez nowych zależności produkcyjnych. Wyszukiwanie w React działa lokalnie i nie wysyła wpisanych fraz do serwera ani do Booksy. Dopasowanie ignoruje wielkość liter i polskie znaki, obejmuje wszystkie tematy (w tym zwinięte, młodzieżowe i używanie substancji); wskazówki kliniczne pozostają dostępne także po odfiltrowaniu tematów. Wszystkie 74 odnośniki do podstron tematów i odnośnik do konsultacji dla młodzieży znajdują się w początkowym HTML. Bez JavaScriptu działa przeglądanie oraz rozwijanie kart, nie działa filtrowanie.

## Weryfikacja

| Widok | Kolumny | Szerokość siatki | Zrzut |
| ---: | ---: | ---: | --- |
| 375 px | 1 | 343 px | [Telefon](katalog-premium-qa/katalog-375.png) |
| 768 px | 2 | 736 px | [Tablet](katalog-premium-qa/katalog-768.png) |
| 1024 px | 3 | 992 px | [Laptop](katalog-premium-qa/katalog-1024.png) |
| 1440 px | 3 | 1240 px | [Komputer](katalog-premium-qa/katalog-1440.png) |
| 1920 px | 3 | 1240 px | [Monitor](katalog-premium-qa/katalog-1920.png) |

- Chromium/Playwright: brak poziomego przepełnienia; 75 bezpośrednich odpowiedzi HTTP 200; rozwijanie bez JS, nawigacja klawiaturą, otwarcie wyniku wyszukiwania, czyszczenie przyciskiem i Escape, komunikat pustych wyników, widoczne informacje bezpieczeństwa podczas wyszukiwania.
- axe-core: brak wykrytych naruszeń w automatycznej kontroli głównej zawartości przy 1440 px w stanie domyślnym, rozwiniętym i po wyszukaniu. Nie jest to pełny audyt zgodności WCAG.
- `npm run build`, `npm run check:export` (100 stron, 16 przekierowań), `npx tsc --noEmit`, `git diff --check` i dotychczasowy test przeglądarkowy stron tematów przeszły. Nie ma oddzielnego polecenia lint.
- Bez zmian w adresach, canonicalach, metadanych, danych strukturalnych i Firebase. Booksy pozostaje dotychczasowym odnośnikiem, bez wdrożenia produkcyjnego i bez testowania rzeczywistej rezerwacji.
