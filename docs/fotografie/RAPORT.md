# Portret w Hero — korekta i audyt zdjęć

## Co zmieniono

Usunięto przesuniętą złotą obwódkę, duży łuk w tle, asymetryczne odsunięcie fotografii oraz podpis „Grzegorz Plebaniak / Gabinet indywidualny” z linią. Nazwisko pozostaje w tekście nad nagłówkiem. Jedynym obrysem jest teraz symetryczne zaokrąglenie górnej krawędzi obrazu. Portret jest wyśrodkowany w kolumnie obok tekstu, a poniżej 760 px pod nim. Pole ma proporcje 1:1 i maksymalnie 428 px; nie ma rozciągania, dodatkowej dekoracji ani filtra.

**Źródła:** w historii Git, przed zmianą `b93c6c9`, zachowały się `portret2.jpg` (1280 × 855, 126 580 B) i `portret.jpg` (1280 × 1280, 142 781 B); to najstarsze dostępne pliki, nie negatywy ani pliki z aparatu. Obecne pełne WebP mają odpowiednio 67 084 i 60 114 B; historyczna konwersja deklarowała jakość 75. Warianty portretów w `public/images/responsive/` przed zmianą miały 288–960 px szerokości (Hero: 320–960 px). Największy stary kandydat Hero był ograniczony do 960 × 641 mimo pełnego pliku o szerokości 1280 px.

Nowe WebP Hero powstały bezpośrednio z historycznego JPEG-a: centralny kadr 855 × 855 zachowuje pełną wysokość i usuwa tylko równe boczne marginesy. Nie zmieniono twarzy, sylwetki, stroju ani tła; nie użyto retuszu, filtrów ani wyostrzania. Oryginalne pliki WebP zostały bez zmian. Nowe warianty mają 288, 360, 428, 576, 720 i 855 px (WebP `quality 77`, parametr kodera, nie procent utraty jakości). Kadrowanie w CSS: `aspect-ratio: 1`, `object-fit: cover`, `object-position: 50% center`; wszystkie warianty mają już docelowe proporcje. Nie trzeba więc pobierać pikseli, które wcześniej wycinał CSS. `sizes` opisuje szerokość kolumny i jej limit; obraz ma wymiary, tekst alternatywny, preload responsywny i `fetchPriority="high"`, bez lazy loadingu.

## Chromium — pobrane pliki

Poniżej rzeczywiste wymiary zdekodowanego WebP wybranego przez przeglądarkę, nie wartości deklarowane w HTML. Pełne dane, w tym DPR 3 i rozmiary plików w bajtach: [pomiary.json](pomiary.json).

| Szerokość okna | Pole portretu po zmianie | DPR 1 przed → po | DPR 2 przed → po | Zrzuty |
|---:|---:|---:|---:|---|
| 320 | 288 px | 320×214 → 288×288 | 640×428 → 576×576 | [przed](porownanie/hero-320-przed.jpg) · [po](porownanie/hero-320-po.jpg) |
| 375 | 343 px | 480×321 → 360×360 | 800×534 → 720×720 | [przed](porownanie/hero-375-przed.jpg) · [po](porownanie/hero-375-po.jpg) |
| 390 | 358 px | 480×321 → 360×360 | 800×534 → 720×720 | [przed](porownanie/hero-390-przed.jpg) · [po](porownanie/hero-390-po.jpg) |
| 768 | 280 px | 320×214 → 288×288 | 640×428 → 576×576 | [przed](porownanie/hero-768-przed.jpg) · [po](porownanie/hero-768-po.jpg) |
| 1024 | 373 px | 480×321 → 428×428 | 960×641 → 855×855 | [przed](porownanie/hero-1024-przed.jpg) · [po](porownanie/hero-1024-po.jpg) |
| 1440 | 428 px | 480×321 → 428×428 | 960×641 → 855×855 | [przed](porownanie/hero-1440-przed.jpg) · [po](porownanie/hero-1440-po.jpg) |
| 1920 | 428 px | 480×321 → 428×428 | 960×641 → 855×855 | [przed](porownanie/hero-1920-przed.jpg) · [po](porownanie/hero-1920-po.jpg) |

Przy DPR 3 największy kadr wykorzystuje dostępne 855 pikseli bez sztucznego powiększania źródła; na szerokim ekranie odpowiada to w przybliżeniu 2×. Rozmiar obrazu Hero na telefonie 390 px przy DPR 1 spadł z 16 372 do 14 854 B. Na komputerze 1440 px przy DPR 2 wzrósł z 42 558 do 57 428 B, ponieważ zachowano więcej rzeczywistych pikseli kadru (wcześniej cały plik miał tylko 641 px wysokości). Pozostałe duże fotografie pozostają lazy-loaded.

**Wydajność lokalna:** w 24 zimnych próbach Chromium (10 Mb/s, opóźnienie 40 ms) Hero pobrał dokładnie jeden wariant przy każdym wejściu. Mediana LCP przed → po, 3 próby na konfigurację: 390 px / DPR 1: 400 → 392 ms; DPR 2: 396 → 404 ms; 1440 px / DPR 1: 396 → 392 ms; DPR 2: 412 → 424 ms. To mała próbka lokalna; w obu próbach DPR 2 poprawa jakości kosztowała większy transfer i niewielki wzrost zmierzonej mediany. Nie jest to pomiar produkcyjny ani gwarancja LCP. [Surowe wyniki](lokalny-lcp.json).

## Pozostałe fotografie

- Skan wszystkich **195** indeksowalnych HTML: zdjęcia w treści są na stronie głównej, „O mnie”, w galerii i we wspólnym panelu 74 stron tematycznych. Sprawdzono wymiary, obecność `alt` i pliki wszystkich kandydatów. Usługi, kontakt i artykuły nie mają odrębnych zdjęć ani aktywnych miniatur artykułów do wymiany. Logo i obraz udostępniania pozostawiono bez zmian.
- **O mnie:** pełny kwadrat bez dodatkowego cięcia. Ograniczono szerokość z 832 do 576 px na desktopie; na telefonie 390 px / DPR 2 używany plik zmalał z 60 114 do 29 842 B. [Telefon po](porownanie/o-mnie-390-po.jpg) · [desktop po](porownanie/o-mnie-1440-po.jpg).
- **Gabinet:** mobilne miniatury zachowują rozmiar; desktopowa galeria nie pobiera już wariantów 480 px dla kafli 411 CSS px przy DPR 2. Używa odpowiednio źródeł 960, 840, 720 (maksimum źródła) i 840 px, nadal leniwie. Po powiększeniu zdjęcia pozostają w pełnej proporcji: sprawdzono osiem otwarć, Escape i powrót fokusu na 390 i 1440 px. Na stronie głównej dopasowano `sizes` do dwóch rzeczywistych kolumn zdjęć; drugie zdjęcie przy 390 px / DPR 2 pobiera 79 696 zamiast 118 370 B. Usunięto górną kreskę i padding z mniejszego ujęcia. [Galeria po](porownanie/gabinet-wroclaw-1440-po.jpg) · [gabinet na stronie głównej po](porownanie/office-home-390-po.jpg).
- **Strony tematyczne:** wymuszono 64 × 64 CSS px zamiast faktycznych 64 × 43 px i użyto właściwego kwadratowego wariantu. DPR 2 pobiera 6 344 zamiast 9 854 B. [Panel po](porownanie/depresja-390-po.jpg).

## Weryfikacja i odtworzenie

`npm run build`, `npm run check:sitemap`, `npm run check:links` i `npm run check:indexability` przeszły. `sitemap.xml`, `robots.txt`, nagłówki SEO, canonical i JSON-LD są identyczne z bazą `a8dfb56`; utrzymano 195 adresów. Zrzuty pokazują lokalne eksporty przed zmianą i po zmianie, z odrzuconymi opcjonalnymi treściami w profilu testowym. Sprawdzono brak poziomego przewijania przy siedmiu szerokościach. Nie wykonano wdrożenia na Firebase.

Źródło do ponownego przygotowania kwadratowych wariantów: `git show b93c6c9^:public/images/portret2.jpg > /tmp/hero-source.jpg`, potem `HERO_PORTRAIT_SOURCE=/tmp/hero-source.jpg sh scripts/resize-site-images.sh` (ImageMagick; wymaga dostępnej historii Git). Przy zmianie fotografii sprawdź kadr i wymiary, zamiast automatycznie stosować te same ustawienia do innego źródła.
