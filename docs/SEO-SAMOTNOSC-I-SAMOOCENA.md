# Rozbudowa serwisu: psychoterapia indywidualna, samotność i samoocena

## Decyzje i ryzyka

Localo (listopad 2026) to punkt odniesienia: „psycholog Wrocław” 2500/290, „psychoterapia Wrocław” 1300/232 i „psychoterapia indywidualna Wrocław” 100/176 (szacunek miesięczny / pozycja w pomiarze). Nie są to bieżące pozycje ani liczby unikalnych osób. Strona główna nadal odpowiada na ogólną potrzebę znalezienia psychologa, strona metody wyjaśnia nurt, a `/psychoterapia-dorosli/` opisuje konkretną usługę indywidualną. Nie ma duplikatu usługi ani zmiany trasy. Google może nadal wybierać różne adresy dla ogólnego hasła „psychoterapia Wrocław”; po publikacji porównać zapytania i strony docelowe w Search Console, zamiast powielać frazę w tytułach.

Trends porządkuje priorytety redakcyjne: samotność (43,51) i poczucie własnej wartości (11,11) w przekazanym zestawie. Nie są to wolumeny. Zapytania szczegółowe pełnią rolę tematów w ramach artykułów, nie osobnych stron. Szeroki ruch edukacyjny nie jest równoznaczny z lokalnymi rezerwacjami. Nie prognozowano wyników w Google Maps ani cytowań AI.

## Metadane i adresy do sprawdzenia w Search Console

| Adres | Fraza główna | Title | Meta description |
|---|---|---|---|
| `/psychoterapia-dorosli/` | psychoterapia indywidualna Wrocław; uzupełniająco psychoterapia Wrocław | Psychoterapia indywidualna dorosłych we Wrocławiu | Psychoterapia indywidualna dorosłych we Wrocławiu i online. Pracuję psychodynamicznie. Sprawdzi Pan/Pani, jak wyglądają konsultacje i regularne spotkania. |
| `/blog/samotnosc/` | samotność | Samotność: skąd się bierze i co może pomóc? | Czym samotność różni się od przebywania w pojedynkę? O samotności emocjonalnej, bliskości w związku i o tym, kiedy warto rozważyć rozmowę z psychologiem. |
| `/blog/poczucie-wlasnej-wartosci/` | poczucie własnej wartości | Poczucie własnej wartości: skąd się biorą wahania? | Czym poczucie własnej wartości różni się od samooceny i pewności siebie? O tym, jak na sposób widzenia siebie wpływają relacje, krytyka i osiągnięcia. |

Strona usługi zachowuje konsultacje, zasady częstotliwości, podejście psychodynamiczne, cenę i czas spotkania. Dodano adres gabinetu, lokalny H1, przykłady doświadczeń i bezpośrednie przejścia do konsultacji i Booksy. Nie zmieniono cen, kwalifikacji ani zasad współpracy. Nowe wpisy mają widoczne autorstwo, canonical, Open Graph, semantyczne nagłówki i BlogPosting. Są też w sitemapie. Historyczne daty istniejących wpisów nie zmieniły się z powodu dodania linków.

### Data publikacji i wdrożenie

Datę publikacji obu artykułów ustawiono na 26 listopada 2026 r. w `lib/feature-articles.ts`. Nie trzeba konfigurować zmiennej środowiskowej przed buildem. Data trafia do widocznego `<time>`, Open Graph, BlogPosting i sitemap. Daty aktualizacji nie deklarujemy przed rzeczywistą aktualizacją merytoryczną. Nie wdrożono na Firebase; na podglądzie sprawdzić wygląd na telefonie, 404, kanoniczne adresy i odnośniki. Po pierwszej publikacji zgłosić powyższe trzy adresy i odświeżyć sitemapę w Search Console.

## Dodane powiązania

- Strona główna i indeks bloga → oba nowe wpisy.
- Usługa dla dorosłych → oba wpisy, opis metody, konsultacje i kontakt; dodatkowo bezpośredni link Booksy.
- Samotność → wybieranie podobnych partnerów, znaczenie przeszłości, metoda, konsultacje; na dole także usługa dla dorosłych i FAQ.
- Poczucie własnej wartości → narcyzm wrażliwy, samotność, ograniczenia samej świadomości, terapia dorosłych i konsultacje; na dole także FAQ.
- Wybieranie podobnych partnerów → oba wpisy; narcyzm wrażliwy → poczucie własnej wartości; znaczenie przeszłości → samotność.

## Publikacje zweryfikowane

- [Hawkley i Cacioppo (2010)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3874845/) — przegląd definiujący samotność jako doświadczenie, nie sam brak kontaktu.
- [de Jong Gierveld i van Tilburg (2006)](https://doi.org/10.1177/0164027506289723) — badanie pomiaru samotności emocjonalnej i społecznej.
- [Winnicott (1958)](https://pubmed.ncbi.nlm.nih.gov/13610513/) — publikacja teoretyczno-kliniczna o zdolności do bycia samemu, nie dowód przyczynowy.
- [Harris i Orth (2020)](https://doi.org/10.1037/pspp0000265) oraz [Sorjonen i in. (2023)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10520822/) — metaanaliza badań podłużnych i reanaliza ograniczeń wnioskowania o przyczynach.
- [Crocker i Wolfe (2001)](https://pubmed.ncbi.nlm.nih.gov/11488379/) — model poczucia własnej wartości zależnego od dziedzin ważnych dla osoby.

## Pliki i kontrola

- Nowe: `lib/feature-articles.ts`, `components/FeatureArticleContent.tsx`, ten raport.
- Zmienione: `lib/pages.ts`, `components/ServicePage.tsx`, `app/page.tsx`, `app/blog/page.tsx`, `app/blog/[article]/page.tsx`, `app/sitemap.ts`, `scripts/check-export.mjs` oraz trzy strony artykułów: podobni partnerzy, narcyzm wrażliwy, znaczenie przeszłości.
- `npm run build`, `npm run check:export` i `npx tsc --noEmit` przeszły, w tym test wariantu z datą. Eksport: 26 stron i 16 przekierowań. Repozytorium nie ma osobnego lintingu. Nie wykonano pomiaru mobilnego w przeglądarce ani testu HTTP na Firebase.
