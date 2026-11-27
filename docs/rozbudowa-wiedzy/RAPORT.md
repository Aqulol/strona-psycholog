# Rozbudowa oferty i bazy wiedzy — raport roboczy (niepublikowany)

Porównanie z eksportem rewizji `44635a755c083f3f30ffb956c64218d72cdd93cb`. Nie wykonano wdrożenia. Dokumenty i szkice są poza `public/`, `app/` i `out/`.

## Stan po wdrożeniu w repozytorium

| Element | Przed | Po |
|---|---:|---:|
| Kanoniczne strony w sitemapie | 117 | 122 |
| Artykuły publiczne | 12 | 12 |
| Publiczne tematy trudności | 74 | 74 |
| Wykluczone pliki HTML | 10 | 10 |
| Przekierowania | 16 | 16 |
| Osierocone lub nieosiągalne strony | 0 | 0 |
| Maksymalna głębokość linkowania od strony głównej | 2 | 2 |

Nowe trasy: `/baza-wiedzy/`, `/informacje-dla-pacjentow/`, `/pomoc-w-kryzysie/`, `/jakiej-pomocy-potrzebuje/` i `/slownik-psychologiczny/`. Indeks słownika porządkuje dziewięć wyjaśnień już dostępnych w serwisie. Piętnaście odrębnych haseł w `content/glossary.json` pozostaje w statusie roboczym. `scripts/publish-term.mjs` wymaga ręcznej akceptacji, podpisu i daty. Nie opublikowano żadnego nowego artykułu ani szczegółowego hasła.

Główne zmiany: `lib/navigation.ts`, `components/{MainNavigation,Site,LocalSearch,CatalogueFilter,HelpTopicIndex}.tsx` — rozdzielenie linku i przycisku menu, lupa i filtry; `lib/search-core.mjs`, `scripts/build-search.mjs` — lokalne dopasowania i eksport indeksu; `lib/{content-relations,glossary,knowledge}.ts` oraz `components/{RelatedContent,GlossaryEntryPage,KnowledgePage}.tsx` — relacje i szablony; `app/{oferta,blog,kiedy-zglosic-sie-na-terapie}` i nowe trasy — treści i nawigacja. Przewodnik działa przez natywne sekcje wyboru celu bez zbierania odpowiedzi. Case studies w szkicach są fikcyjne.

## Oferta, intencje i priorytety

- **Lokalna intencja usługowa:** trzy osobne strony dla diagnozy ogólnej, osobowości i ADHD; konsultacja jako pierwszy krok, nie diagnoza. Nie dodawano pakietów „diagnozy borderline”, „depresji” lub „zaburzeń lękowych”. Omawiane są w materiałach edukacyjnych lub jako kontekst oceny ogólnej/osobowości.
- **Intencja informacyjna:** ADHD dorosłych na blogu (codzienne funkcjonowanie), diagnoza ADHD (ocena i kontakt) i psychoedukacja (rozumienie i strategie) mają różne cele. Wątek koncentracji, snu i ADHD lepiej rozwinąć w istniejącym artykule niż mnożyć bliskie adresy. Podobnie „borderline” w katalogu, organizacja osobowości i artykuł o TFP wymagają odmiennych pytań i opisów. Nie ustalano rzeczywistej kanibalizacji: bez danych GSC, zapytań ani pozycji.
- **Jedna psychoterapia:** karty oferty i cennik zachowują psychoterapię indywidualną; podejście psychodynamiczne, TFP i zdalna forma spotkania to informacje, nie trzy usługi. Zachowano dotychczasową rolę zawodową i superwizję. Standardowa konsultacja i sesja terapii: 200 zł/50 min według istniejącego cennika. Przy diagnozach nadal kontakt zamiast niepotwierdzonych cen, metod i rezerwacji.
- Mentali (`https://mentali.pl/sitemap.xml`) rozdziela usługi, trudności i edukację. Część oferty, w tym grupy i warsztaty, nie odpowiada zakresowi tego gabinetu. INTIMA (`https://poradniaintima.pl/diagnoza-adhd-i-add-u-doroslych-we-wroclawiu/`) szerzej odpowiada na pytania organizacyjne wokół ADHD; podobna przejrzystość jest przydatna po potwierdzeniu przebiegu i narzędzi. To przegląd jakościowy, nie badanie rynku ani wolumenu.
- **Priorytet P0 (potwierdzić):** kwalifikacja wiekowa dla każdej diagnozy i psychoedukacji, forma online, sposób rezerwacji, cena, czas, narzędzia, dokumenty końcowe, płatności, odwołania oraz ostateczne brzmienie zasad zgody/opieki/poufności. Nie dopisywać pomocy dla osób poniżej 15 lat ani zasad gabinetu na podstawie stron konkurencji. Oficjalne źródła pomocy kryzysowej: Ministerstwo Zdrowia oraz `116sos.pl` i `116111.pl`; 112 tylko dla nagłego zagrożenia.
- **P1 (redakcja kliniczna):** zacząć od diagnozy różnicowej, organizacji osobowości, funkcji wykonawczych, przeniesienia i granic poufności; sprawdzić źródła, usunąć powtórzenia, zatwierdzić podpis i datę. Trzy szkice są w [SZKICE-ARTYKULOW.md](SZKICE-ARTYKULOW.md). Pierwszy jest propozycją uzupełnienia istniejącego tekstu, nie nowej trasy.
- **P2 (kolejka):** rozróżnienie żałoby od utrzymującego się obniżenia nastroju, kiedy unikanie podtrzymuje lęk, różnica między nadmierną analizą a zamartwianiem, pojęcia testowanie rzeczywistości i regulacja emocji. Najpierw zestawić z obecnymi tekstami i zadecydować, czy lepsze jest uzupełnienie istniejącej strony. Nie tworzyć cienkich stron dla odmian zapytań. Pogłębiona ręczna redakcja wszystkich istniejących artykułów i 74 tematów pozostaje poza tym etapem.

## Linki i walidacja

[120 nowych trójek źródło–kotwica–cel](NOWE-LINKI.md) w treści HTML; w tym pięć oznaczonych nowych linków kontekstowych w trzech źródłach. Pozostałe są m.in. linkami strukturalnymi przewodnika, spisów treści i bloków materiałów powiązanych. `scripts/audit-knowledge-links.py` sprawdza nowe adresy i fragmenty. [TRASY](TRASY.md) porównuje eksporty, [LINKI](LINKI.md) dokumentuje wynik skanu pojęć. Skan objął 1854 akapity eksportu i dał 231 dopasowań do rozważenia; **nie jest** ręczną korektą każdego akapitu.

- Budowa statyczna, TypeScript, kontrola eksportu, sitemap/linków, indeksu, statusów haseł i kalkulatora lektury: zaliczone. Sitemap nie zawiera roboczych haseł, stanów filtrów ani wyszukiwania. Osiem dat `lastmod` ze znanym źródłem.
- Firebase Hosting Emulator: 122 bezpośrednie odpowiedzi 200 dla kanonicznych URL, 16 przekierowań, 3 rzeczywiste HTTP 404, typy XML/robots i zgodność sitemapy z eksportem. Nie badano statusów produkcji.
- Playwright/Chromium: 375/768/1024/1440/1920 px — otwieranie lupy klawiaturą, Escape i powrót fokusu, wynik wielowyrazowy i literówka, brak przepełnienia na sprawdzanych stronach, reset i stan zerowy filtrów, rozwijana ścieżka pilnej pomocy; test no-JS obejmuje katalog oraz przejście przewodnik → strona kryzysowa → widoczny 112. [375 px](zrzuty/szukaj-375.png), [1440 px](zrzuty/szukaj-1440.png). Nie jest to pełny audyt WCAG ani macierz wszystkich przeglądarek.
- W sprawdzonym eksporcie układ nie montuje komponentu GTM/GA4. W teście wpisanie kolejnej frazy i rozwinięcie wyboru w przewodniku nie powodowało żądań; indeks ładuje się po otwarciu lupy z własnej domeny, bez poświadczeń i referrera. To nie oznacza audytu konfiguracji usług zewnętrznych; włączenie zewnętrznych tagów wymaga ponownej weryfikacji.
- Techniczny pomiar paczek, nie Lighthouse/CWV: skompresowany JS strony głównej 146 233 → 147 745 B (+1512 B); indeks osobno ~72 kB gzip, na żądanie. Brak podstaw do wniosków o szybkości produkcji, pozycjach lub konwersji.
