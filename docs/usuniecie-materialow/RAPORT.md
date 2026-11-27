# Usunięcie dedykowanych materiałów psychoedukacyjnych

## Zakres

- Usunięto jedną podstronę: `/materialy-psychologiczne/` (`app/materialy-psychologiczne/page.tsx`). Zawierała pięć arkuszy jako sekcje HTML z kotwicami, a nie osobne podstrony. Razem z nią zniknęły dane i kod renderujący arkusze oraz przycisk pobierania. Usunięto też alias Hosting `/materialy-psychologiczne.html`.
- Usunięto jeden plik PDF: `public/materialy/karty-psychologiczne.pdf`. Przed usunięciem sprawdzono repozytorium: plik pobierano z usuwanej strony, a pozostałe wystąpienia dotyczyły wyjątków w Hosting i walidatorach lub dokumentacji historycznej. To był jedyny wersjonowany PDF; nie usunięto dokumentów prawnych ani publikacji naukowych. Nie znaleziono osobnych plików dzienników ani skryptu generującego PDF. Nie było oddzielnego komponentu do usunięcia poza modułem strony; usunięto jego style druku i zastąpiono lokalne importy ikony pobierania ikoną dokumentu. Nie zmieniono zależności npm.
- Na stronie głównej, w Bazie wiedzy i w podmenu są trzy główne wejścia: artykuły, słownik i informacje dla pacjentów. Katalog trudności i FAQ pozostają dostępne. Zastąpiono jedno odwołanie do arkusza ADHD istniejącym artykułem o przygotowaniu do diagnozy. Nie dodano nowej funkcji ani przekierowań ze starych adresów: żaden zachowany zasób nie zastępuje całej kolekcji kart.
- Zachowano psychoedukację i psychoedukację ADHD, konsultacje, poradnictwo, diagnostykę psychologiczną, osobowości i ADHD, psychoterapię psychodynamiczną z TFP, artykuły, słownik, katalog trudności, informacje dla pacjentów i publikacje. Nie przywrócono wcześniejszych narzędzi interaktywnych.

## Zmienione pliki

| Obszar | Pliki |
|---|---|
| Strona główna, czytelnia, treści | `app/page.tsx`, `app/baza-wiedzy/page.tsx`, `app/informacje-dla-pacjentow/page.tsx`, `lib/knowledge.ts`, `lib/navigation.ts`, `lib/patient-articles.tsx` |
| Opisy usług i styl | `components/EditorialServicePage.tsx`, `components/ServiceDirectoryPage.tsx`, `app/editorial.css` |
| Hosting, SEO, walidacja | `firebase.json`, `content/lastmod.json`, `scripts/sitemap-lib.mjs`, `scripts/check-export.mjs`, `public/llms.txt` |
| Dokumentacja | `README-WDROZENIE.md`, `docs/usuniecie-materialow/RAPORT.md` |

Historyczne wzmianki w raportach z poprzednich etapów pozostawiono jako zapis wykonanych wówczas prac. Dokumentacja `docs/` nie wchodzi do publicznego `out/`.

## Wyniki

- **199 → 198 indeksowalnych adresów.** Porównanie map z dwóch buildów wykazało dokładnie jeden usunięty URL i żadnych nowych ani zmienionych adresów.
- Przeszły: `npm ci`, `npm run build`, `npm run check:sitemap`, `npm run check:links`, `npm run check:indexability`, `npm run check:redirects`, `npm run check:export`, `npm run check:content` i `node scripts/check-diagnostics-blog.mjs`. Brak zepsutych linków wewnętrznych, sierot i tras nieosiągalnych; maksymalna głębokość 2. Indeks wyszukiwania: 198 pozycji, słownik nadal 69 haseł.
- Przeszukanie źródeł aplikacji, konfiguracji Hosting, zasobów publicznych i `out/` nie znalazło adresu sekcji, nazwy PDF ani dawnego przycisku i stylów druku. Nie ma pliku PDF w `public/` ani w `out/`.
- `node scripts/check-hosting.mjs http://localhost:3010`: 198 kanonicznych odpowiedzi HTTP 200, 229 przekierowań i poprawna własna 404. Osobno sprawdzono stary URL strony (z ukośnikiem i bez), warianty `.html` i `/index.html`, adres PDF i wariant bez rozszerzenia oraz adres dawnych narzędzi: wszystkie zwróciły **404 bez przekierowania**.
- Chromium 390 i 1440 px: dokładnie trzy karty w Bazie wiedzy i na stronie głównej, kolejno jedna kolumna i trzy kolumny, bez poziomego przepełnienia; podmenu ma zachowane linki oraz FAQ; wyszukiwanie nie zwraca usuniętego adresu, nadal znajduje diagnozę ADHD i informacje dla pacjentów. Formularz i bezpośredni link Booksy są obecne; nie wysyłano wiadomości ani nie rezerwowano wizyty.

**Nie wykonano deployu.** Statusy dotyczą lokalnego podglądu eksportu z konfiguracją routingu z repozytorium. Po ręcznym wdrożeniu należy sprawdzić odpowiedzi 404 starych adresów na produkcji i aktualność produkcyjnej mapy witryny.
