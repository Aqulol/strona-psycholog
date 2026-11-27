# Rozbudowa słownika i katalog pomocy — raport wewnętrzny

Porównanie eksportu z `b85fed28` z aktualnym eksportem. Dokumenty, kandydaci do podlinkowania i zrzuty są w repozytorium, poza `public/` i eksportem Firebase. Nie wykonywano wdrożenia.

| Miara | Przed | Po |
|---|---:|---:|
| Pełne hasła opublikowane | 0 | 0 |
| Pozycje indeksu odsyłające do istniejących materiałów | 9 | 9 |
| Szkice w rejestrze | 15 | 60 |
| Nowe / istotnie rozwinięte / tylko migrowane | — | 45 / 5 / 10 |
| Tematy katalogu pomocy w HTML | 74 | 74 |
| Kanoniczne URL-e / indeks globalny | 123 / 123 | 123 / 123 |
| Udokumentowane `lastmod` | 23 | 23 |
| Nowe kontekstowe linki w istniejących artykułach i usługach | — | 0 |

`INWENTARZ.md` wymienia wszystkie szkice, planowane slugi, szacunkowe czasy, źródła i relacje. Z dziewięciu publicznych pozycji pięć (diagnoza różnicowa, funkcje wykonawcze, kontrakt terapeutyczny, organizacja osobowości, przeniesienie) ma szkic definicji; pozostałe to borderline, ruminacje, superwizja i integracja obrazów siebie i innych. Odsyłacze wskazują działające strony, ale nie stanowią pełnych definicji; nie mają osobnych canonical, czasu czy bibliografii. Nie wypełniono sekcji „ostatnio” sztucznymi datami.

## Agresja: zakres i weryfikacja

Nowy szkic (nie zmiana istniejącej strony) pod przyszłym `/slownik-psychologiczny/agresja/`. Definicja zachowania i granice ujęcia psychodynamicznego, Freud, Klein, Winnicott i Kernberg, miejsce TFP, sześć fikcyjnych przykładów, odniesienia do złości i kryzysu. Rozdziela emocję, impuls, intencję, zachowanie, przemoc i stanowczość. Nie wyprowadza ryzyka przemocy z poziomu organizacji ani rozpoznania. Funkcja dziś nie publikuje szkicu ani jako strony, ani jako fragmentu indeksu.

- [Kernberg 1994, PubMed](https://pubmed.ncbi.nlm.nih.gov/7877899/): sprawdzony abstrakt (afekt, fantazja i zachowanie, znaczenie przeniesienia); nie pełny artykuł. [Kernberg 1992, rozdział The Psychopathology of Hatred](https://doi.org/10.12987/9780300159462-003): metadane rozdziału i książki wydawcy, s. 21–32. Nie mylić tego rozdziału z osobną publikacją o tym samym tytule w JAPA z 1991 r.; przed recenzją porównać oba teksty. [Kernberg 2001](https://doi.org/10.1080/07351692109348963): dane bibliograficzne; sprawdzić pełny tekst i terminologię motywacyjną.
- Winnicott: [Winnicott Trust](https://winnicott-trust.org.uk/wp-content/uploads/2024/08/Donald-Winnicott.pdf) i [bibliografia w repozytorium Tavistock](https://repository.tavistockandportman.ac.uk/635/1/Horne%20-%20Winnicott.pdf) potwierdzają tytuł i zakres dat tekstu o agresji; przed publikacją skonfrontować tezy z wybranym wydaniem źródłowym. Freud 1920/1923, Klein 1946/1957 i podręcznik Yeomansa, Clarkina i Kernberga 2015 są wskazane do kontroli tekstu podstawowego, nie oznaczone jako opracowania zweryfikowane w pełni. W szkicu nie ma cytatów dosłownych ani deklaracji skuteczności.
- [Anderson i Bushman](https://doi.org/10.1146/annurev.psych.53.100901.135231) i [Dodge i Coie](https://doi.org/10.1037/0022-3514.53.6.1146): punkty odniesienia odpowiednio do definicji zachowania i rozróżnienia reaktywna/proaktywna. Nie przenosić wprost wniosków z badania grup dzieci na ryzyko przemocy u dorosłych. Źródła WHO, NICE i Diamond przypisano do odpowiednich haseł diagnostycznych i poznawczych, nie jako potwierdzenie metod stosowanych w gabinecie.

## Porównanie redakcyjne i SEO — próbka, nie pełny crawl

| Serwis i próbka | Pokrycie i różnica | Wniosek |
|---|---|---|
| [Mentali](https://mentali.pl/aktualnosci/slownik), [Przeciwprzeniesienie](https://mentali.pl/aktualnosci/slownik/przeciwprzeniesienie) | Deklaruje 890; indeks literowy i adres hasła, pytanie definicyjne w title; próbka: altruizm, wyparcie, tłumienie, przeciwprzeniesienie. Na podstronie widoczna ścieżka i odsyłacze do innych definicji, nie zawsze tematycznie bliskie. | Łączyć bliskie pojęcia celowo; w przeciwprzeniesieniu oddzielać reakcję terapeuty, sytuację i hipotezę. Nie rozszerzać na wszystkie dziedziny dla licznika. |
| [Dobry Terapeuta](https://dobryterapeuta.org/slownik/), [Asertywność](https://dobryterapeuta.org/slownik/asertywnosc/) | Licznik 21, w pobranym archiwum widoczne 10. Asertywność ma H1, sekcje pytań, sąsiadów oraz blok zapisu; trauma, kryzys, niska samoocena znajdują pokrycie w naszych materiałach o trudnościach, nie w osobnych definicjach. | Leksykon ma wyjaśniać i rozróżniać, nie powielać poradnika objawowego i wezwania do rezerwacji. |
| [Somentiq](https://somentiq.pl/slownik/), [Acting-out](https://somentiq.pl/slownik/a/acting-out/), [Agresja](https://somentiq.pl/slownik/a/agresja/) | Deklaruje 1251; widoczne osobne adresy dla agresji i agresji instrumentalnej, acting out, testowania rzeczywistości, afektu; równolegle ścieżki katalogowe i płaski adres Afazja. Część wyników podaje bibliografię podręcznikową. | Wąskie rozróżnienia i spójny model URL; instrumentalna na razie w proaktywnej, z wyjaśnieniem odrębności, nie jako rzekomy synonim. |
| [Laboratorium Psychoedukacji](https://www.lps.pl/polecamy/slownik-wazniejszych-pojec-dotyczacych-psychoterapii-psychodynamicznej/) | Jedna długa strona z nagłówkami, m.in. adolescencja, psychoanaliza, psychoza, regresja, psychoterapia podtrzymująca. Mocna specjalizacja, lecz inna architektura. | Osobne cytowalne hasło, krótkie objaśnienie i granice pojęcia; „psychoza” nie jako odpowiednik organizacji psychotycznej. |

Wielkości są deklaracjami serwisów, nie zweryfikowanymi liczbami unikatowych URL-i. Nie zweryfikowano kompletu podstron, canonical/schema konkurentów, ruchu, fraz, pozycji ani profili backlinków. Hipoteza do sprawdzenia po publikacji: cytowalne rozróżnienia np. organizacja borderline vs rozpoznanie, agresja vs złość i przemoc, holding vs kontenerowanie są użyteczne dla uczelnianych list lektur, organizacji psychoedukacyjnych oraz autorów materiałów szkoleniowych. Nie oznacza to pozyskania linków ani gwarancji rankingu. Nie kopiowano definicji.

## Intencje, linki i dalsze etapy

Hasło odpowiada „co to znaczy?”, temat „jak rozumieć tę trudność i kiedy szukać pomocy?”, poradnik rozwija przypadek lub proces, a usługa opisuje potwierdzony zakres gabinetu. Kolizje: agresja vs temat o złości; organizacja vs diagnoza osobowości; przeniesienie i techniki vs opis TFP; funkcje wykonawcze vs artykuł ADHD i oferta diagnostyczna. Zachować wszystkie publiczne trasy, bez canonical między różnymi intencjami. Gniew, acting-out i formacja reaktywna są wariantami indeksowymi, bez nowych tras. Nie tworzyć duplikatów TFP według polskiej i angielskiej pisowni czy rozwinięcia skrótu. `check:content` sprawdza odsyłacze szkiców do istniejącego kontekstu i blokuje obecność niedopuszczonego hasła niezależnie od tego, czy jest indeksowalne.

`node scripts/audit-glossary-links.mjs` przejrzał akapity 123 publicznych stron dla wskazanych odmian 11 pojęć (pierwszy trafiony fragment dla pary strona–hasło, bez linków i nawigacji). **48 kandydatów na 37 stronach**, wszyscy zablokowani, bo cele nieopublikowane. `kandydaci-linkowania.json` to lista do ręcznego przeglądu, nie obietnica 48 linków. Są możliwe przypadki wieloznaczności; po akceptacji wybierać jedynie miejsca użyteczne dla czytelnika, bez zmian klinicznego znaczenia, samolinków i linków w linku. Nowa nawigacja katalogu pomocy ma 11 kotwic kategorii; słownik ma 3 wyróżnione odsyłacze do istniejących materiałów, nie nowych definicji.

Kolejność dalej: (1) recenzja Agresji i rozróżnień agresja/przemoc, wrogość, gniew, obrona/odwet i bezpieczeństwo; (2) obrony, teoria relacji, TFP — koncepcje historyczne id/ego/superego, reparacja, obiekt przejściowy, opór, wolne skojarzenia i autorzy; (3) style, poziomy i zaburzenia osobowości według oddzielnych modeli ICD/DSM, różnice z zaburzeniami nastroju, dysocjacją i psychozą; (4) psychopatologia, ocena, ADHD, uwaga i neuropsychologia; (5) przywiązanie i rozwój, emocje, procesy interpersonalne, trauma i kryzys; (6) psychologia ogólna/społeczna — atrybucje, normy, wpływ, stereotypy; osobne biogramy tylko gdy wnoszą wartość i mają źródła. Nie dodawać ofert na podstawie haseł edukacyjnych.

## Jak zatwierdzić hasło i co sprawdzono

1. Recenzent porównuje treść z konkretnymi wydaniami, potwierdza źródła, rozróżnienia, język i bezpieczeństwo. Ustalić i wpisać **rzeczywistych** `author`, `reviewer`, `reviewedAt`, udokumentowane `published` i ewentualne `updated`. Po weryfikacji `verification: verified`; dopiero publikacja `status: published`. Daty edycji kodu nie liczą się jako `lastmod`. Nie wpisywać fikcyjnych danych w rejestrze projektu.
2. `npm run build` generuje tylko dopuszczone trasy, usuwa wycofane generowane pliki, tworzy sitemapę i lokalny indeks. `npm run check:content` bada rejestr, statusy i pliki. Po pierwszej akceptacji potwierdzić stronę i linki w podglądzie przed osobną decyzją wdrożeniową.
3. Przeszły `npm ci`, `npm run build`, `check:sitemap`, `check:content`, `check:export`, `check:lastmod`, `check:sitemap:failures`, `tsc --noEmit` i `git diff --check`. Identyczna bajtowo sitemapa przed/po; 0 osieroconych/niedostępnych kanonicznych tras, głębokość 2. W odrębnej kopii w `/tmp` pozytywny fikcyjny fixture zweryfikował 124. stronę, `DefinedTerm`, breadcrumb, cytowanie, `lastmod` i alias w indeksie. Fixture nie znajduje się w projekcie ani w podglądzie.
4. Chromium/Playwright: obie trasy przy 320, 375, 390, 768, 1024, 1440 i 1920 px. Brak przewijania poziomego, select ≥44 px, fokus i klawiaturowa zmiana oraz reset kategorii i kotwic; przy wyłączonym JS 9/74 odsyłacze SSR. axe (390 i 1440 px) bez wykrytych naruszeń w czterech przebiegach. `zrzuty/` zawiera cztery widoki. Nie zastępuje to testów czytnika ekranu, urządzeń dotykowych ani innych silników. Rozmiar gzip samego dokumentu HTML w lokalnym eksporcie: słownik 8 901→9 057 B, pomoc 32 840→33 342 B. Nie mierzono danych terenowych ani Core Web Vitals.

Pliki: `app/slownik-psychologiczny/page.tsx`, style `app/{editorial,globals}.css`, `components/{CategoryCatalogue,CatalogueFilter,HelpTopicIndex,GlossaryEntryPage,GlossaryCitation}.tsx`, `components/help/HelpCategoryCard.tsx`; `content/glossary*.json`, `lib/glossary*`; generowanie, audyt i testy w `scripts/`, npm i `.gitignore`. Dokumentacja wcześniejszej wersji pozostaje zapisem historycznym.
