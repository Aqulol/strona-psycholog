# Audyt bibliografii, katalogu i panelu Booksy

Porównanie bazowego eksportu `27e02b4` z lokalnym eksportem po zmianach. Bez wdrożenia produkcyjnego.

## Bibliografia

Poniżej pełna lista adresów, z których usunięto publiczną sekcję źródeł:

- `/terapia-skoncentrowana-na-przeniesieniu-tfp/`
- `/w-czym-pomagam/borderline/`
- `/w-czym-pomagam/depresja/`
- `/w-czym-pomagam/doswiadczenie-przemocy/`
- `/w-czym-pomagam/lek-spoleczny/`
- `/w-czym-pomagam/nadmierne-analizowanie/`
- `/w-czym-pomagam/powracajace-wspomnienia/`
- `/w-czym-pomagam/relacje-z-rowiesnikami/`
- `/w-czym-pomagam/samotnosc/`
- `/w-czym-pomagam/stres-szkolny/`
- `/w-czym-pomagam/trudnosci-emocjonalne-mlodziezy/`
- `/w-czym-pomagam/trudnosci-ze-snem/`
- `/w-czym-pomagam/wypalenie-zawodowe/`
- `/w-czym-pomagam/zaburzenia-lekowe/`
- `/w-czym-pomagam/zaburzenia-osobowosci/`

Źródła tematów pozostały w danych repozytorium; podręczniki ze strony TFP oraz odniesienia redakcyjne są w [rejestrze wewnętrznym](ZRODLA-MERYTORYCZNE.md). Link Policji zachowano jako informację pomocową. Nie zmieniano tekstów tematów poza przeniesieniem źródeł i zachowaniem tego odnośnika.

| Wpis `/blog/…/` | Literatura i źródła |
| --- | --- |
| `psychoterapia-psychodynamiczna-pierwsze-spotkanie` | Gabbard — ocena i technika psychodynamiczna |
| `tfp-dla-kogo` | Yeomans, Clarkin i Kernberg — podręcznik modelu; Clarkin i wsp. — badanie porównawcze u dorosłych |
| `pierwsze-spotkanie-mlodziez-rodzic` | WHO — szerszy kontekst zdrowia psychicznego nastolatków, nie procedura pierwszej wizyty |
| `czy-przeszlosc-ma-znaczenie` | Gabbard — ujęcie kliniczne |
| `dlaczego-sama-swiadomosc-nie-wystarcza` | McWilliams i Gabbard — podręczniki kliniczne |
| `dlaczego-wybieram-podobnych-partnerow` | Park i MacDonald — porównanie opisów osobowości, bez wnioskowania o przyczynie |
| `jak-wybrac-psychoterapeute` | Kodeks etyczny psychologa PTP — kompetencje i poufność |
| `relacja-terapeutyczna-zrodlo-zmiany` | Flückiger i wsp. — metaanaliza związku przymierza z wynikiem; Gabbard — ujęcie kliniczne |
| `narcyzm-wrazliwy` | Cain i wsp.; Pincus i Lukowitsky — przeglądy |
| `samotnosc` | Hawkley i Cacioppo; de Jong Gierveld i van Tilburg; Winnicott — badania i odrębna perspektywa teoretyczna |
| `poczucie-wlasnej-wartosci` | Harris i Orth; Sorjonen i wsp.; Crocker i Wolfe — metaanaliza, ponowna analiza i model |

`ArticleSources` i `BlogReading` spajają wygląd i format źródeł. `HelpTopicIndex` renderuje 10 kart i 66 linków w dotychczasowej kolejności bez klientowego filtra, pola, komunikatów, licznika ani CSS wyszukiwarki. Nie dodano zastępczego filtra.

## Booksy i pomiary Chromium

Główna zmiana dotyczy wyłącznie `.topic-page` i `.topic-layout`. Poprzednie maksimum kontenera 1152 px, podział 2:1 od 928 px i 65:35 od 1056 px. Teraz maksimum 1376 px, przerwa 32 px i kolumny 58:42 od 1088 px (minimum prawego panelu 448 px, minimum światła ramki 414 px). Poniżej 1088 px jest układ pionowy z linkiem skoku do panelu. Kolumna tekstu ma maksimum 76ch, panel w układzie pionowym zajmuje pełną dostępną szerokość.

| Ekran | Artykuł / panel / iframe przed | Artykuł / panel / iframe po | Układ po |
| ---: | --- | --- | --- |
| 1920 px | 728 / 392 / 350 | 760 / 564 / 530 | obok |
| 1440 px | 728 / 392 / 350 | 760 / 564 / 530 | obok |
| 1366 px | 728 / 392 / 350 | 751 / 543 / 509 | obok |
| 1280 px | 728 / 392 / 350 | 701 / 507 / 473 | obok |
| 1024 px | 635 / 317 / 254 | 760 / 1000 / 966 | pod tekstem |
| 768 px | 728 / 728 / 680 | 744 / 744 / 711 | pod tekstem |
| 430 px | 390 / 390 / 346 | 406 / 406 / 380 | pod tekstem |
| 390 px | 350 / 350 / 306 | 366 / 366 / 340 | pod tekstem |
| 360 px | 320 / 320 / 276 | 336 / 336 / 310 | pod tekstem |

Na 1024 px wcześniej do ramki zostawało 254 z 317 px kolumny: to mierzalny skutek wąskiego toru, paddingu i obramowań. Na 1366 px ramka miała tylko 350 px pomimo 392 px panelu. Lokalny panel przed zmianą miał `word-break: normal`, `overflow-wrap: normal`, `hyphens: manual`; po zmianie `hyphens: none`. Nie stosowano wymuszonego łamania słów, zmniejszania kroju, skalowania ani CSS wewnątrz ramki dostawcy. Nie ustalono, czy konkretny podział „Psychoterap-ia” pochodził z wewnętrznego CSS Booksy: serwer w środowisku testowym zamykał połączenie.

Sprawdzono 66 bezpośrednich odpowiedzi HTTP 200 oraz macierz dziewięciu szerokości dla katalogu, artykułu o samotności, lęku społecznego, depresji, borderline i stresu szkolnego. Brak poziomego przepełnienia. Sprawdzono skok do panelu w układzie pionowym i widoczność odnośnika Booksy. Konfiguracja ramki, profil, `no-referrer` i natywne doładowanie przy zbliżeniu do widoku bez wymaganego kliknięcia pozostały niezmienione. Chromium wysłał żądania widgetu bez nagłówka `Referer`; nie potwierdzono wyglądu treści wewnątrz Booksy, dostępności terminów, wyboru usługi ani rezerwacji (`ERR_CONNECTION_CLOSED`; część żądań anulowała nawigacja).

Zrzuty lokalnego układu, nie potwierdzenie działania zewnętrznego kalendarza: [1366 px przed](booksy-porownanie/booksy-1366-przed.png), [1366 px po](booksy-porownanie/booksy-1366-po.png), [390 px panel po](booksy-porownanie/booksy-390-po.png).

Wynik: `npm run build`, `npm run check:export` (92 strony, 16 przekierowań), `npx tsc --noEmit`, `git diff --check` i test Chromium przeszły. Repozytorium nie ma osobnego skryptu lint.
