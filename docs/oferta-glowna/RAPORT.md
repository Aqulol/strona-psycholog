# Oferta gabinetu — przebudowa strony głównej

- Cztery kategorie, każda z własną ikoną SVG, opisem, dokładnie trzema pozycjami i odnośnikiem do szczegółów. Siatka 2 × 2 od 768 px; poniżej jedna kolumna. Delikatne obramowania i wyróżnienie psychoterapii istniejącym odcieniem zieleni. Nie dodano numeracji ani zagnieżdżonych kart.
- Odnośniki do konsultacji, poradnictwa, wsparcia w kryzysie, trzech diagnoz i psychoedukacji ADHD pochodzą z rejestru usług. Dwa ogólne obszary psychoedukacji pozostają zwykłym tekstem. Psychoterapia psychodynamiczna i TFP są linkami w opisie podejścia, nie dodatkowymi usługami.
- Konsultacja i sesja psychoterapii: **200 zł / 50 min** każda, odczytane z centralnego cennika. Bez dopisywania stawek lub warunków diagnozy.
- Pod siatką: główne działanie „Umów konsultację” (istniejący link Booksy), przycisk pomocniczy „Zobacz pełną ofertę” oraz link „Nie wiem, jakiej pomocy potrzebuję”.

## Weryfikacja

Playwright/Chromium przy wyłączonym JavaScripcie: cztery karty po trzy pozycje i jednej ikonie, dostępne teksty, właściwa liczba kolumn, brak wykrytego obcięcia lub niepotrzebnego dzielenia wyrazów i brak stałych podkreśleń. Wszystkie lokalne cele odnośników zwróciły bezpośrednie HTTP 200 w podglądzie eksportu; sprawdzono również identyfikatory docelowe fragmentów. Zewnętrzny odnośnik Booksy zachowuje adres z konfiguracji; nie wykonywano rezerwacji. Dodatkowo axe-core na sekcji i nawigacja klawiszem Tab przy 320, 768 i 1440 px — bez wykrytych naruszeń.

| Szerokość | Przed | Po |
|---|---|---|
| 320 px | [zrzut](przed-320.jpg) | [zrzut](po-320.jpg) |
| 375 px | [zrzut](przed-375.jpg) | [zrzut](po-375.jpg) |
| 390 px | [zrzut](przed-390.jpg) | [zrzut](po-390.jpg) |
| 768 px | [zrzut](przed-768.jpg) | [zrzut](po-768.jpg) |
| 1024 px | [zrzut](przed-1024.jpg) | [zrzut](po-1024.jpg) |
| 1440 px | [zrzut](przed-1440.jpg) | [zrzut](po-1440.jpg) |
| 1920 px | [zrzut](przed-1920.jpg) | [zrzut](po-1920.jpg) |

`npm run build`, `npm run check:sitemap`, `npm run check:links`, `npm run check:lastmod` i `git diff --check` przeszły. Porównanie 192 tras eksportu: meta, canonical, JSON-LD i treść poza sekcją bez zmian, mapa witryny identyczna bajtowo. Bez wdrożenia Firebase.

**Pliki:** `components/ServiceCards.tsx` (karty i linki), `app/page.tsx` (osadzenie sekcji), `app/editorial.css` (układ i wygląd), `content/lastmod.json` (odświeżony odcisk strony głównej, bez zmiany udokumentowanej daty, zgodnie z wymaganiem zachowania sitemapy), `docs/oferta-glowna/` (raport i 14 zrzutów).
