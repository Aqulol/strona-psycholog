# Diagnostyka, kwalifikacje i blog — raport zmian

## Audyt diagnostyki

| Adres | Wniosek z audytu i zmiana |
| --- | --- |
| `/diagnoza-psychologiczna-wroclaw/` | Wywiad i różnicowanie były opisane, ale konkretne informacje ginęły wśród powtarzających się poleceń kontaktu. Panel pokazuje cel, wywiad i miejsce. Dodano przygotowanie z kartą do wydruku oraz pytanie o różnicę między oceną psychologiczną a psychiatryczną. Dalsze kroki (np. dodatkowa ocena, psychoedukacja lub konsultacja lekarska) pozostają przedstawione jako możliwości. |
| `/diagnoza-osobowosci-wroclaw/` | Rozdzielono zakres oceny od rozpoznania klinicznego. Na górze są informacje o wywiadzie i miejscu, w treści przygotowanie na podstawie przykładów z różnych okresów. FAQ nie zakłada wyniku ani wieku użytkownika. |
| `/diagnoza-adhd-wroclaw/` | Panel od razu wskazuje wywiad i historię rozwoju. Pozostawiono przygotowanie, przesiew a pełną ocenę, różnicowanie oraz dalszą ścieżkę; usunięto powtórzone zaproszenia do ustalania szczegółów. Poradnik przygotowania oraz porównanie z borderline są osobnymi, tematycznie powiązanymi lekturami. |
| `/konsultacja-diagnostyczna-wroclaw/` | To rozmowa o kierunku dalszej oceny w ramach standardowej konsultacji, nie osobno rezerwowana diagnoza. Panel pokazuje potwierdzony czas, cenę, grupę i tryb **standardowej konsultacji**; zawiera link do opisu spotkań online. Przygotowanie, możliwy wynik rozmowy, FAQ i CTA są odrębne. |
| `/psychoedukacja-adhd/` | Potwierdzony zakres i indywidualna forma w panelu; FAQ odróżnia psychoedukację od rozpoznania. Nie sugeruje obowiązkowego pakietu, innej stawki ani dostępności dla młodzieży. |
| `/cennik/`, `/oferta/` | Spójna informacja: stawka zwykłej konsultacji nie jest ceną całej diagnozy. Żadna pełna diagnoza nie zyskała w publicznym cenniku fikcyjnej ceny ani w Booksy odrębnej pozycji. |

W trzech pełnych diagnozach nie potwierdzono liczby spotkań, czasu, opłaty, granic wieku, dostępności online/hybrydowej, nazw narzędzi poza opisanym wywiadem, sposobu przekazania wyników ani wydawania dokumentów. Wspólny panel w `components/AssessmentPanel.tsx` czyta dane z `lib/services.ts`. Pola opcjonalne nie renderują wierszy, dopóki nie zostaną uzupełnione. Potwierdzona w przyszłości opłata z rejestru może trafić w to samo miejsce w panelu i do cennika. [Dokładna tabela braków i pytania do właściciela](BRAKI-DIAGNOSTYKA.md).

## Kwalifikacje, profile i publikacja

- Potwierdzono [Booksy](https://booksy.com/pl-pl/357056_psycholog-grzegorz-plebaniak_psychoterapia_13750_wroclaw) i [ZnanyLekarz](https://www.znanylekarz.pl/grzegorz-plebaniak/psycholog/wroclaw) po nazwisku i adresie gabinetu we Wrocławiu. Oba linki z istniejącego rejestru dodano do „O mnie”, bez ocen, opinii ani widgetów. Nie znaleziono wiarygodnego bezpośredniego adresu osobistego profilu TwójPsycholog ani Google Business Profile; odnośnik do wyznaczenia trasy nie jest profilem.
- [Elsevier/ScienceDirect](https://doi.org/10.1016/j.tsc.2026.102233) i [Crossref](https://api.crossref.org/works/10.1016/j.tsc.2026.102233) potwierdzają angielski tytuł, listę 22 autorów (w tym Grzegorza Plebaniaka), DOI `10.1016/j.tsc.2026.102233`, rocznik 2026, tom 62, część A, numer artykułu 102233. Wydawca przypisał go do numeru grudniowego; publiczny podgląd był dostępny w dniu audytu. Nie utożsamiano daty numeru z datą publikacji na blogu.
- Sprawdzono opis ze streszczeniem: próba 3612 dzieci w wieku 8–9 lat; po uwzględnieniu płci i otwartości na doświadczenie tworzenie opowieści nadal wiązało się z empatią poznawczą, a żaden z badanych składników twórczości nie wnosił wtedy dodatkowego wyjaśnienia empatii afektywnej. To związki statystyczne; badanie nie dotyczyło skuteczności psychoterapii. Uściślono to w sekcji publikacji, nie zmieniając kwalifikacji.

## Nowe artykuły

| Artykuł | Bibliografia | Główna powiązana usługa |
| --- | --- | --- |
| [Jak przygotować się do diagnozy ADHD u dorosłych?](/blog/jak-przygotowac-sie-do-diagnozy-adhd/) | [NICE NG87](https://www.nice.org.uk/guidance/ng87/chapter/recommendations), [Adamou i wsp., AQAS](https://doi.org/10.3389/fpsyt.2024.1380410) | Diagnoza ADHD |
| [Czy można mieć cechy borderline bez zaburzenia osobowości?](/blog/cechy-borderline-a-zaburzenie-osobowosci/) | [WHO ICD-11 CDDR](https://www.who.int/publications/i/item/9789240077263), [Bach i First](https://doi.org/10.1186/s12888-018-1908-3) | Diagnoza osobowości |
| [ADHD a borderline u dorosłych: podobieństwa i różnice](/blog/adhd-a-borderline-u-doroslych/) | NICE NG87, WHO ICD-11 CDDR, [przegląd Weiner, Perroud i Weibel](https://doi.org/10.2147/NDT.S192871) | Diagnoza ADHD, diagnoza osobowości |
| [Jak rozpoznać postępy w psychoterapii?](/blog/jak-rozpoznac-postepy-w-psychoterapii/) | Metaanalizy [Flückiger i wsp.](https://doi.org/10.1037/pst0000172), [Lambert i wsp.](https://doi.org/10.1037/pst0000167) | Psychoterapia indywidualna |
| [Czy można złościć się na psychoterapeutę?](/blog/czy-mozna-zloscic-sie-na-psychoterapeute/) | [Metaanaliza Eubanks, Muran i Safran](https://doi.org/10.1037/pst0000185), Gabbard, *Long-Term Psychodynamic Psychotherapy*, wyd. 3 (podręcznik) | Psychoterapia indywidualna |

Artykuły mają byline „Materiał redakcyjny witryny”, bez osobistego autorstwa lub deklaracji recenzji. Strona pokazuje obliczony czas czytania, bibliografię, powiązane materiały i odnośnik do adekwatnej pomocy. Użyto istniejących haseł i stron katalogu tylko jako linków. Daty publikacji istniejących artykułów pozostały nienaruszone; nowych tekstów nie oznaczono niepotwierdzonym dniem publikacji na produkcji. [Analiza intencji i kolejność pozostałych tematów](PLAN-REDAKCYJNY.md).

## Kontrole

`npm run build`, `npm run check:sitemap`, `npm run check:links`, `npm run check:content`, `npm run check:indexability`, `node scripts/check-diagnostics-blog.mjs`, `git diff --check`: poprawne. Eksport ma **199 indeksowalnych stron** (194 dotychczasowe + 5 nowych artykułów), bez sierot i bez zmiany istniejących adresów. Kontrola eksportu sprawdza m.in. brak niepotwierdzonych narzędzi w panelach, wyraźne rozdzielenie ceny konsultacji od diagnozy, metadane redakcyjne, wyszukiwanie, bibliografię i linki prowadzące do każdego nowego tekstu. Niczego nie wdrażano.
