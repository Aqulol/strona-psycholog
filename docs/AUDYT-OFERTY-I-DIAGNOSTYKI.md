# Rozbudowa oferty gabinetu i audyt SEO

**Zakres:** lokalny eksport gałęzi `arena/e1c2c022-strona-psycholog` względem commitu `f8348544390a14ff6255a302078f48631b9d3e8b`. Nie wykonano wdrożenia; wyniki walidacji nie są pomiarem widoczności produkcyjnej.

## Co zmieniono

- `/oferta/` zawiera pięć obszarów: pomoc psychologiczną, diagnostykę, psychoedukację, psychoterapię i pomoc online. Karty mają indywidualne ikony SVG oraz wyświetlają cenę, czas i odbiorców tylko tam, gdzie te dane są potwierdzone. Są tylko dwie główne grupy odbiorców: dorośli i młodzież od 15. roku życia.
- „Psycholog” i „Psychoterapeuta” mają oddzielne elementy `<a>` i `<button>`. Mega menu psychologa ma trzy kolumny na komputerze i trzy niezależne, początkowo zwinięte sekcje na urządzeniach mobilnych. „Oferta”, „Dorośli” i „Młodzież od 15. roku życia” to samodzielne pozycje. Na stronach nadrzędnych są dostępne linki do treści także bez aktywacji podmenu w JS.
- Strona główna odróżnia usługi od obszarów trudności. Konsultacja online to nie to samo co regularna terapia online, a format psychoterapii indywidualnej to inna intencja niż opis metody psychodynamicznej lub TFP.
- Dane usług są w `lib/services.ts`. Istniejące stawki nadal mają jedno źródło w `lib/config.ts`. Dotychczasowy ogólny przycisk Booksy służy umawianiu konsultacji standardowej. Na stronach trzech diagnoz CTA w treści prowadzi do kontaktu, nie do Booksy. Nie dodano cen, narzędzi, osi z wymyśloną liczbą wizyt, dokumentów, terminów, wyników ani farmakoterapii jako obietnicy.

## Nowe trasy (13)

| Obszar | Trasy |
|---|---|
| Katalog | `/oferta/` |
| Diagnoza | `/diagnoza-psychologiczna-wroclaw/`, `/diagnoza-osobowosci-wroclaw/`, `/diagnoza-adhd-wroclaw/` |
| Psychoedukacja | `/psychoedukacja/`, `/psychoedukacja-adhd/` |
| Psychoterapia i forma online | `/psychoterapia-indywidualna-wroclaw/`, `/konsultacje-psychologiczne-online/` |
| Przewodniki informacyjne | `/wsparcie-psychologiczne-w-kryzysie/`, `/konsultacja-psychologiczna-dla-rodzicow/`, `/konsultacja-psychologiczna-problemy-w-relacjach/`, `/konsultacja-dotyczaca-wyboru-psychoterapii/` |
| Edukacja na blogu | `/blog/adhd-u-doroslych/` |

**Zmienione istniejące trasy:** `/`, `/psycholog-wroclaw/`, `/psychoterapeuta-wroclaw/`, `/cennik/`, `/faq/`, `/kiedy-zglosic-sie-na-terapie/`, `/konsultacje-psychologiczne-wroclaw/`, `/konsultacja-diagnostyczna-wroclaw/`, `/poradnictwo-psychologiczne-wroclaw/`, `/psychoterapia-dorosli/`, `/psychoterapia-mlodziezy-od-15-roku-zycia/`, `/psychoterapia-psychodynamiczna-wroclaw/`, `/psychoterapia-online/`, `/terapia-skoncentrowana-na-przeniesieniu-tfp/`, `/blog/`, `/blog/narcyzm-wrazliwy/`, `/blog/tfp-dla-kogo/` oraz tematy `depresja`, `zaburzenia-lekowe`, `zaburzenia-osobowosci`, `borderline`, `narcyzm`, `impulsywnosc`, `niska-samoocena`, `trudnosci-ze-snem` pod `/w-czym-pomagam/`. Globalny nagłówek zmienił się na wszystkich trasach. [Macierz wszystkich tras i intencji](audyt-oferty/TRASY.md) obejmuje również strony, których treści zachowano.

## Rejestr świadczeń i informacji

| Obszar | W publicznej ofercie | Nie jako odrębna usługa |
|---|---|---|
| Pomoc psychologiczna | Konsultacja psychologiczna | Poradnictwo; wsparcie w kryzysie; rozmowa dla rodziców o nastolatkach; rozmowa o relacjach; rozmowa o wyborze terapii |
| Diagnostyka | Diagnoza psychologiczna, diagnoza osobowości, diagnoza ADHD | Konsultacja diagnostyczna: objaśnienie roli rozmowy wstępnej, bez osobnej pozycji rezerwacyjnej |
| Psychoedukacja | Psychoedukacja indywidualna i psychoedukacja ADHD, bez deklaracji trybu online lub granic wiekowych | Bez zajęć grupowych, warsztatów i obietnic leczenia |
| Psychoterapia | Psychoterapia indywidualna, psychodynamiczna, TFP jako podejście psychodynamiczne | Brak terapii par i rodzin, grup i usług coachingowych |
| Online | Konsultacje psychologiczne online i psychoterapia online | Brak deklaracji diagnostyki lub psychoedukacji online |

Sześć treści niepotwierdzonych jako samodzielne świadczenia ma oznaczenie „Informacja” w menu. Prowadzą do materiałów o zakresie rozmowy, nie do oddzielnej rezerwacji. Nie są kartami usług w `/oferta/` ani encjami `Service` w JSON-LD. Planowe wsparcie w kryzysie nie jest interwencją ratunkową; opis zawiera 112, 116 123 i 116 111. Informacja o pomocy dla młodzieży nie przesądza zakresu specjalistycznej diagnozy.

## Intencje i lokalne SEO

| Klaster | Główna intencja | Co oddzielono i czego nie deklarowano |
|---|---|---|
| „Psycholog Wrocław”, „psycholog prywatnie”, „pomoc psychologiczna Wrocław” | `/psycholog-wroclaw/` – osoba, zakres pracy, kwalifikacje i lokalizacja | `/` to marka i skrót oferty; `/oferta/` to katalog; `/konsultacje-psychologiczne-wroclaw/` odpowiada o przebiegu pierwszej wizyty; tematy pomocy nie są katalogiem świadczeń. |
| „Diagnoza psychologiczna Wrocław”, „diagnoza kliniczna”, „diagnoza różnicowa”, „jak wygląda” | `/diagnoza-psychologiczna-wroclaw/` – pogłębiona ocena objawów i funkcjonowania | Ogólne „badanie psychologiczne” może oznaczać zupełnie inną usługę. Wykluczono psychotechnikę, badania kierowców i medycynę pracy. Brak osobnych stron pod dzieci, młodzież, testy lub cennik diagnozy. |
| „Diagnoza osobowości Wrocław”, „diagnoza zaburzeń osobowości”, „diagnoza borderline” | `/diagnoza-osobowosci-wroclaw/` – cel i granice oceny funkcjonowania i ewentualnego rozpoznania | Tematy borderline, narcyzmu i zaburzeń osobowości pozostają edukacyjne. Model organizacji osobowości nie jest równoważny rozpoznaniu kategorialnemu. Nie mnożono stron sprzedażowych per rozpoznanie. |
| „Diagnoza ADHD Wrocław”, „test ADHD Wrocław”, „ile kosztuje”, „jak wygląda” | `/diagnoza-adhd-wroclaw/` – lokalna usługa, historia rozwoju, przesiew a pełna ocena, dalsze kroki | `/blog/adhd-u-doroslych/` to edukacja; `/psychoedukacja-adhd/` to odrębna pomoc. Zapytania o online, DIVA-5, opinię i wiek mogą odzwierciedlać intencję zakupową, ale nie są obietnicą, tytułem, zakładką ani metadanymi usługi bez potwierdzenia. |
| „Psychoedukacja Wrocław”, „psychoedukacja ADHD” | Dwie strony z odrębnymi celami i przykładami | Pomoc edukacyjna nie zastępuje diagnozy, psychoterapii ani leczenia farmakologicznego. |
| „Psychoterapeuta Wrocław”, „psychoterapia indywidualna”, „psychodynamiczna”, „TFP” | Nadrzędna strona kwalifikacji, format jeden na jeden, metoda, specjalistyczne podejście | Największe potencjalne nakładanie się zapytań: psychoterapia indywidualna i psychodynamiczna. Pierwsza opisuje decyzję, kontrakt i organizację; druga relację i metodę. Monitorować po indeksacji. |
| „Poradnictwo psychologiczne Wrocław” | `/poradnictwo-psychologiczne-wroclaw/` – wyjaśnienie rodzaju pomocy | Do czasu potwierdzenia nie przedstawia się jako samodzielna usługa lokalna. |

**Próbka wyników wyszukiwania i konkurencji (26.11.2026).** [Mentali](https://mentali.pl/) mocno eksponuje diagnozę i kieruje do osobnej ścieżki; [INTIMA](https://poradniaintima.pl/diagnoza-adhd-i-add-u-doroslych-we-wroclawiu/) oddziela przebieg, narzędzia oraz FAQ; [Medfile](https://www.medfile.pl/gabinety/adhd/wroclaw) reprezentuje intencję porównania specjalistów i rezerwacji. Jest to jakościowa próbka typu wyników, nie pomiar pozycji Google, Local Pack ani wolumenów. Wniosek: rozdzielić pytania „czy to może być ADHD?” od pytań „jak wygląda ocena i jak umówić się we Wrocławiu?”. Nie przeniesiono cen, metod, formularzy ani obietnic konkurencji.

**Lokalna spójność i ograniczenia:** zachowano nazwę, rzeczywisty adres, telefon, e-mail, mapę, dane `Person` i `LocalBusiness`. Usunięto zbiorcze `priceRange` sugerujące tę samą cenę dla całego gabinetu. `Service` opisuje potwierdzoną usługę, a `Offer` tylko potwierdzoną stawkę; article/BlogPosting, breadcrumbs i canonical pozostają. Nie dodano ocen, sztucznych lokalizacji ani obietnic rich results. Bez dostępu do GSC/GBP nie sprawdzono CTR, zapytań, indeksowania, lokalnych pozycji ani profilu gabinetu. Po publikacji warto monitorować stronę kanoniczną przypisaną do klastrów i uzupełnić faktyczne usługi w GBP/Booksy po potwierdzeniu zakresu.

## Linkowanie, źródła i redakcja

- Przeanalizowano automatycznie **1 831** pełnych akapitów `<main>` na **117** trasach, w tym **12 artykułów i 74 tematy pomocy**. Skrypt porównuje treść i adresy z bazą, skanuje akapity według mapy [`editorial-concepts.json`](../scripts/editorial-concepts.json) i kontroluje kanoniczne cele. Odsyłacze dodano w konkretnych kontekstach; mapa pojęć nie zamienia tekstu automatycznie. Nie była to pełna ręczna recenzja każdego zdania na 117 stronach.
- Dodano **83 odsyłacze kontekstowe na 30 trasach**. Szczegółowy wykaz: [źródło → kotwica → cel](audyt-oferty/LINKI.md). Nie liczy on menu, kart, breadcrumbs ani końcowych list i przycisków. Istniejące czasy czytania stron artykułów i tematów są takie same jak w bazie; dodano osobny automatyczny pomiar na nowym artykule. Nie zmieniono bibliografii istniejących artykułów.
- Podstawa kliniczna: [WHO, ICD-11 CDDR (2024)](https://www.who.int/publications/i/item/9789240077263) – wymagania diagnostyczne, psychopatologia i funkcjonowanie; [NICE NG87, rozdz. 1.2–1.3 i 1.7](https://www.nice.org.uk/guidance/ng87/chapter/recommendations) – ocena ADHD, przesiew, ocena lekarska; [Adamou i wsp., AQAS (2024)](https://doi.org/10.3389/fpsyt.2024.1380410) – wywiad dorosłych, wpływ na funkcjonowanie i różnicowanie. Pojęcia organizacji osobowości i mechanizmów obronnych oznaczono jako model psychodynamiczny, nie rozpoznania klasyfikacyjne; zob. źródła kliniczne TFP wymienione w istniejącym [`docs/ZRODLA-MERYTORYCZNE.md`](ZRODLA-MERYTORYCZNE.md). Źródła nie są dowodem realizacji konkretnego protokołu w gabinecie. Publiczna bibliografia dotyczy artykułu na blogu, nie stron usług.

**Kolejne artykuły do opracowania, nieopublikowane:**

1. **Diagnoza psychologiczna:** „Gdy objawy się nakładają: od pytania klinicznego do diagnozy różnicowej”; „Co warto powiedzieć w wywiadzie klinicznym, gdy trudno uporządkować historię objawów?”.
2. **Osobowość:** „Organizacja osobowości a rozpoznanie kliniczne: dwie różne perspektywy”; „Idealizacja i dewaluacja: co opisuje teoria, a czego nie pozwala rozpoznać?”. Wskazać istniejące materiały o borderline, narcyzmie, tożsamości, pustce i TFP zamiast powielać ich treść.
3. **ADHD:** „Przesiew, wywiad i ocena funkcjonowania: dlaczego sam kwestionariusz nie wystarcza?”; „Uwaga pod wpływem niewyspania, nastroju i rozwoju”. Po potwierdzeniu zakresu rozważyć praktyczny artykuł o przygotowaniu do diagnozy w gabinecie, bez powielenia strony usługi.

## Testy i ograniczenia pomiaru

- `npm run build`, `npm run check:export`, `npm run check:sitemap`, `npx tsc --noEmit`, `node scripts/check-reading-time.mjs`, `git diff --check`: zaliczone. Kontrola obejmuje jeden H1, canonical, tytuły i opisy, JSON-LD, lokalne cele `<a>`, zgodność cennika i brak niepotwierdzonych ofert lub osobnej rezerwacji diagnoz.
- Sitemap **104 → 117**; zero usuniętych URL, 8 udokumentowanych `lastmod`, 10 wykluczonych HTML, 0 sierot i 0 nieosiągalnych, maks. głębokość 2. Nie zmieniono `firebase.json`, konfiguracji 404 ani mechanizmu sitemap.
- Firebase Hosting w projekcie demo, `node scripts/check-hosting.mjs http://127.0.0.1:5000`: 117 bezpośrednich HTTP 200, sitemap zgodna z eksportem, poprawny MIME sitemap i robots, 16 prawidłowych przekierowań oraz rzeczywiste odpowiedzi 404. Nie sprawdzano HTTP na produkcji.
- Playwright/Chromium: 375, 768, 1024, 1152, 1440 i 1920 px, dotyk na węższych i mysz na szerszych ekranach. Sprawdzono niezależnie pierwszy klik nazw obu kategorii, osobne przełączniki, mobilne sekcje, właściwe cele, Tab/Enter/Escape, powrót fokusu, brak przepełnienia i siatkę oferty 1/2/3. Bez JS: natywny panel menu → Oferta → diagnoza ADHD → Kontakt. [Zrzuty ekranów](audyt-oferty/zrzuty/). Nie testowano działania zewnętrznych widgetów, bo połączenia poza lokalnym preview były blokowane w teście.
- Wydajność: Next podaje **107 kB First Load JS** dla strony głównej przed i po oraz **103 kB współdzielonego JS**. Porównanie lokalnych skryptów `<script src>` strony głównej z jednakowym gzip: **146 661 → 146 354 B**. Skompresowany HTML strony głównej wzrósł z **33 700 do 36 390 B** wraz z treścią i linkami menu. To porównanie rozmiarów zbudowanych artefaktów, nie pomiar Lighthouse, LCP, INP ani ruchu zewnętrznego. Brak nowych paczek produkcyjnych i skryptów śledzących.

## Dane do uzupełnienia przez gabinet

Dla **każdej z trzech diagnoz osobno**: zakres wiekowy (w tym ewentualna dostępność od 15. roku życia), możliwość badania zdalnego, typowy przebieg i liczba spotkań, ich czas, cena poszczególnego spotkania i całego procesu, faktyczne narzędzia, forma omówienia i realnie dostępne dokumenty, sytuacje wyłączające oraz właściwa pozycja w Booksy, jeśli powstanie. Dla oceny osobowości: zakres oceny funkcjonowania i rozpoznań. Dla ADHD: przebieg oceny historii rozwojowej, ewentualne źródła informacji, stosowane narzędzia i przeznaczenie dokumentu. Nie przenosić warunków jednej diagnozy na inne.

Dla **psychoedukacji i psychoedukacji ADHD**: adresaci, dostępność online, koszt, czas i sposób zgłoszenia. Dla **sześciu przewodników**: czy mają pozostać tematami rozmowy w ramach konsultacji, czy istnieje odrębna usługa; jeśli istnieje, trzeba potwierdzić jej zakres, cenę i rezerwację. Specjalistyczna interwencja kryzysowa wymaga osobnego potwierdzenia. Zweryfikować aktualny rok szkolenia przed ewentualną aktualizacją publicznej bio; status „w trakcie szkolenia” pozostał bez zmian.

## Pliki

- Strony: 12 nowych `app/<slug>/page.tsx` zgodnie z tabelą; artykuł generuje istniejący `app/blog/[article]/page.tsx` wraz z `lib/adhd-article.tsx`. Zmieniono `app/page.tsx`, `app/blog/page.tsx`, `app/blog/narcyzm-wrazliwy/page.tsx`, `app/cennik/page.tsx`, `app/kiedy-zglosic-sie-na-terapie/page.tsx`, `app/w-czym-pomagam/[topic]/page.tsx`, `app/globals.css`.
- Komponenty: `MainNavigation.tsx`, `Site.tsx`, `ServiceCards.tsx`, `ServiceDirectoryPage.tsx`, `ServicePage.tsx`, `EditorialServicePage.tsx`, `DiagnosticConnections.tsx` w `components/`.
- Dane: `lib/services.ts`, `lib/navigation.ts`, `lib/service-editorial.tsx`, `lib/config.ts`, `lib/pages.ts`, `lib/site.ts`, `lib/entities.ts`, `lib/blog-content.tsx`, `lib/blog-reading.ts`.
- Test i audyt: `scripts/check-export.mjs`, `scripts/audit-editorial.py`, `scripts/editorial-concepts.json`, `docs/AUDYT-OFERTY-I-DIAGNOSTYKI.md`, `docs/audyt-oferty/` (tabele i zrzuty). Powtórzenie porównania: `python scripts/audit-editorial.py BAZOWY_OUT out docs/audyt-oferty` po kompilacji obu wersji.
