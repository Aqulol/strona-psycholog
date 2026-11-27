# Audyt typografii i responsywności

Porównanie dwóch lokalnych eksportów produkcyjnych: baza `e3b1844` i wersja po zmianie. Nie jest to pomiar działającej domeny ani wdrożenie. Lista **192 kanonicznych tras** pochodzi z wygenerowanej sitemapy i jest identyczna z listą rzeczywistych indeksowalnych dokumentów HTML. Obejmuje 74 tematy, 69 haseł, blog, strony oferty, diagnostyki, praktyczne i wszystkie pozostałe treści kanoniczne. Dziesięć nieindeksowalnych plików technicznych (m.in. przekierowania i szablon błędu) sprawdziły walidatory eksportu, nie zostały policzone jako podstrony treści.

## Co wykazał audyt

- `overflow-wrap:anywhere` w kartach bazy wiedzy, trzy wąskie kolumny w kontenerze ograniczonym do szerokości artykułu i duże nagłówki powodowały łamanie „psychologiczny”, „Informacje” i „pacjentów”. To nie było automatyczne dzielenie na sylaby. Nie wykryto ręcznych miękkich dywizów ani `wbr` w źródłach `app`, `components` i `lib`.
- Reguły `overflow-wrap:anywhere` oraz `break-word` maskowały niedopasowanie rozmiaru nagłówków do telefonu. Dotyczyło m.in. starszych szablonów bloga (klasy Tailwind `text-5xl`/`text-6xl`), oferty, polityki prywatności, usług i długich haseł słownika. Najdłuższy wyraz w nagłówku oferty rysował się na około 349 px przy kolumnie 280 px, gdy samo łamanie wyłączono.
- Długi akapit końcowy w katalogu pomocy był wyśrodkowany na wszystkich badanych szerokościach. Część kart za wcześnie przechodziła do trzech kolumn; dodatkowo ikonki i duże wypełnienie zmniejszały szerokość tytułów.

## Naprawy

- Nagłówki i etykiety łamią się między słowami; nagłówki używają `text-wrap: balance`, proza `pretty` w wybranych miejscach. Awaryjne łamanie zachowano dla bibliografii, wybranych linków zewnętrznych i danych kontaktowych. Nie ma globalnego `nowrap` ani masowych zmian tekstu, miękkich dywizów czy spacji. Nierozdzielny wygląd krótkich cen i etykiet czasu pozostał. Bilansowanie wierszy poprawia układ polskich nagłówków, ale nie jest gwarancją, że żaden jednoliterowy wyraz nie znajdzie się na końcu w każdej kombinacji fontu i viewportu.
- Współdzielona skala `clamp()` dla starszych i nowszych szablonów; ciaśniejszą skalę zastosowano tylko w wąskiej ofercie i mastheadach usług. Poszerzono miejsce na kartę w bazie wiedzy, nie na akapit (docelowa miara prozy 69 `ch`, orientacyjna). Usunięto podwójny gutter z nowych artykułów. Zmieniono progi siatek pomocy, wiedzy i usług, przestrzeń obok ikon oraz szerokość kolumny tytułów oferty. W prozie katalogu pomocy zastosowano wyrównanie do początku wiersza, zachowując wyśrodkowaną kompozycję krótkich elementów CTA. Definicje, źródła, FAQ i bloki czytania nie wymagają centrowania.

## Testy i materiały

- Przed i po: **192 × 10 = 1920** renderów w każdym przebiegu, przy 320/360/375/390/430/768/1024/1280/1440/1920 px. Skrypt liczy rozcięte słowa przez DOM Range, sprawdza przewijanie, wymiary nagłówków/akapitów/kontrolek i przecięcia w wybranych siatkach. To heurystyki, nie automatyczna ocena estetyczna. Bazowo: 29 kombinacji z wykryciami (23 przypadki podziału wyrazu, 10 wyśrodkowanych akapitów, niektóre widoki miały więcej niż jeden podział).
- [Wynik przed](przed.json), [wynik po](po.json): w końcowym przebiegu nie wykryto podziału słów, poziomego przewijania, przycięcia, konfliktów siatki ani długiej wyśrodkowanej prozy w zakresie pomiaru. [Zrzuty przed](zrzuty/przed/) i [zrzuty po](zrzuty/po/) — 14 reprezentatywnych/problemowych stron przy 320 i 1440 px, 56 plików. Przykłady: [baza wiedzy przed](zrzuty/przed/baza-wiedzy-1440.jpg) → [po](zrzuty/po/baza-wiedzy-1440.jpg), [oferta przed](zrzuty/przed/oferta-320.jpg) → [po](zrzuty/po/oferta-320.jpg).
- Interakcje Chromium: otwarcie menu, rozwinięcie grupy usług, wyszukiwanie „przeciwprzeniesienie”, rozwinięcie kategorii pomocy i odpowiedzi FAQ przy 320/768/1440 px. Główny audyt badał treść wyjściową bez JS, test interakcji osobno z JS. Bez prawdziwych urządzeń, Safari/Firefox, kontroli każdego pojedynczego wiersza w długiej prozie i bez badania zewnętrznego wnętrza iframe Booksy.
- `npm run build`, `check:sitemap`, `check:links`, `check:content`, `check:export`, `check:lastmod`, `git diff --check` — przeszły. Sitemap i globalny indeks identyczne bajtowo; canonical i odciski treści/metadanych/schema wszystkich 192 stron identyczne; 23 udokumentowane daty `lastmod`. Brak deployu Firebase.

## Pliki

`app/globals.css`, `app/editorial.css`, `.gitignore` (wyjątek dla zrzutów), `scripts/audit-typography.cjs`, `scripts/check-typography-controls.cjs`, raport, JSON i zrzuty w `docs/typografia/`.
