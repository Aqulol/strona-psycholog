# Strona główna — numeracja, kompozycja i odstępy

- **Od konsultacji do dalszych kroków:** zastąpiono `ol` i widoczne etykiety 01–04 listą `ul` z czterema równorzędnymi kartami. Każda zachowuje swój nagłówek i opis. Ikony SVG (kalendarz, dialog, kompas, rozwidlenie) są dekoracyjne i pomijane przez technologie asystujące. Karty nie mają łączników ani strzałek; samodzielny odnośnik pod kartami zachował swoją ikonę linku.
- **W czym mogę pomóc?:** osiem kategorii już miało poprawną listę `ul` i osiem różnych ikon. Numery nie pochodziły z markerów listy, liczników CSS ani pseudoelementów: widoczne „02” dodawał komponent nagłówka całej sekcji. Usunięto numer w komponencie i na pozostałych nagłówkach redakcyjnych strony głównej (Oferta, Pierwsza wizyta, Baza wiedzy). Minimalna korekta siatki pozwala kolumnie tekstowej listy się zwężać.
- **Audyt 192 stron eksportu:** po zmianie `ol` występuje tylko w przewidywalnej kolejności okruszków nawigacyjnych (191, bez widocznych numerów) oraz w spisach treści (9 artykułów, 3 strony diagnostyczne). Nie wykryto dekoracyjnej numeracji kart usług, katalogów pomocy, kategorii diagnostycznych, słownika ani kwalifikacji. Zachowano liczby mające znaczenie, np. liczniki haseł, wiek, rok szkolenia, ceny i czas.
- **Typografia i dostępność:** przed zmianą Chromium już oddzielał elementy wizualnie oraz podczas serializacji zaznaczenia. Odczyt surowego `textContent` sklejał m.in. podpis zdjęcia, przyciski i odnośniki w stopce. Dodano jawne separatory tekstowe w tych miejscach, bez zmiany układu i widocznego tekstu. Etykieta hero i H1 już zawierały odstępy; w H1 pozostawiono także wizualne przełamanie wiersza. Zweryfikowano nazwę H1, strukturę list, ukrycie dekoracji i osobne odnośniki w drzewie dostępności Chromium; bez ręcznych testów na konkretnym czytniku ekranu.

## Zrzuty Playwright — Chromium

Każda para ma cztery kadry: hero, obszary pomocy, konsultacja i stopka. Na wszystkich trzech szerokościach axe-core nie zgłosił naruszeń na stronie głównej; bez poziomego przewijania po zmianie. W sekcji konsultacji widoczne są odpowiednio 1, 2 i 4 kolumny.

| Szerokość | Hero | Obszary pomocy | Konsultacja | Stopka |
|---|---|---|---|---|
| 390 px | [przed](przed-390-hero.jpg) / [po](po-390-hero.jpg) | [przed](przed-390-pomoc.jpg) / [po](po-390-pomoc.jpg) | [przed](przed-390-konsultacja.jpg) / [po](po-390-konsultacja.jpg) | [przed](przed-390-stopka.jpg) / [po](po-390-stopka.jpg) |
| 768 px | [przed](przed-768-hero.jpg) / [po](po-768-hero.jpg) | [przed](przed-768-pomoc.jpg) / [po](po-768-pomoc.jpg) | [przed](przed-768-konsultacja.jpg) / [po](po-768-konsultacja.jpg) | [przed](przed-768-stopka.jpg) / [po](po-768-stopka.jpg) |
| 1440 px | [przed](przed-1440-hero.jpg) / [po](po-1440-hero.jpg) | [przed](przed-1440-pomoc.jpg) / [po](po-1440-pomoc.jpg) | [przed](przed-1440-konsultacja.jpg) / [po](po-1440-konsultacja.jpg) | [przed](przed-1440-stopka.jpg) / [po](po-1440-stopka.jpg) |

## Kontrole i pliki

`npm run build`, `npm run check:sitemap`, `npm run check:links`, `npm run check:lastmod` i `git diff --check` przeszły. Sitemapa jest identyczna bajtowo. Porównanie eksportu 192 podstron potwierdziło zgodność adresów odnośników, tytułów, metadanych, canonical i JSON-LD. Kod wyszukiwarki i rezerwacji bez zmian; wygenerowany indeks uwzględnia jedynie zmianę tokenów strony głównej wynikającą z usunięcia etykiet liczbowych i rozdzielenia tekstu. Bez wdrożenia Firebase.

- `app/page.tsx`, `app/editorial.css`: struktura, ikony, układ i separatory tekstowe strony głównej.
- `components/EditorialHeading.tsx`: usunięcie dekoracyjnej numeracji.
- `components/Site.tsx`: separatory odnośników w stopce.
- `content/lastmod.json`: dopasowanie odcisku `/` po zmianie prezentacji, bez zmiany źródła i daty redakcyjnej.
- `docs/strona-glowna/`: raport i 24 zrzuty przed/po.
