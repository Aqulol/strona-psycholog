# W czym pomagam? — etap 1

Katalog pozostaje pod `/kiedy-zglosic-sie-na-terapie/`. Etykieta w menu, stopce i na stronie głównej: „W czym pomagam?”. Nie ma drugiej strony zbiorczej. Pięć kart zawiera wyłącznie linki do dziesięciu samodzielnych, ukończonych stron. Dodatkowe potwierdzone przykłady pozostają w rozwijanej sekcji; pomoc dla młodzieży od 15. roku życia prowadzi do istniejącej usługi. Nie dodano stron o atakach paniki, adopcji ani wsparciu wychowawczym jako osobnej usłudze — zakres tych tematów wymaga potwierdzenia. Leczenie uzależnień pozostaje poza zakresem.

## Adresy i intencje

| Kategoria | Adres po `/w-czym-pomagam/` | Intencja |
| --- | --- | --- |
| Nastrój i emocje | `depresja/` | konsultacja przy rozpoznanej depresji lub obniżonym nastroju |
| Lęk, stres i przeciążenie | `zaburzenia-lekowe/` | konsultacja dotycząca utrzymującego się lęku |
| Lęk, stres i przeciążenie | `stres/` | pomoc przy przeciążeniu w różnych obszarach życia |
| Lęk, stres i przeciążenie | `wypalenie-zawodowe/` | konsultacja w związku z wyczerpaniem w pracy |
| Relacje i bliskość | `problemy-w-relacjach/` | psychoterapia indywidualna w związku z trudnościami relacyjnymi |
| Relacje i bliskość | `samotnosc/` | konsultacja dotycząca braku bliskości lub kontaktu |
| Samoocena i osobowość | `niska-samoocena/` | konsultacja dotycząca surowej oceny siebie |
| Samoocena i osobowość | `zaburzenia-osobowosci/` | dalsza pomoc po rozpoznaniu lub przy trwałych trudnościach |
| Samoocena i osobowość | `borderline/` | możliwości pomocy przy borderline, w tym rozmowa o TFP |
| Zmiany i kryzysy | `kryzys-zyciowy/` | planowa konsultacja po ważnej zmianie, nie pomoc ratunkowa |

Blog pozostaje edukacyjny; tematy służą decyzji o konsultacji i opisują możliwy przebieg pracy. Linki w obu kierunkach pomagają odróżnić te funkcje, ale nie gwarantują braku kanibalizacji. Po publikacji warto obserwować zapytania i strony docelowe dla samotności, samooceny, borderline/TFP oraz stresu/wypalenia. Dane Localo (ok. 2500 / 1300 / 100 dla trzech głównych fraz lokalnych) i wcześniejsze porównanie Trends to kontekst, nie estymacja wolumenu nowych stron.

## Implementacja i Booksy

Rejestr `lib/help-topics.ts`, statyczna trasa `app/w-czym-pomagam/[topic]`, `HelpTopicIndex` i `BookingSidebar`. Uzupełniono istniejące `ServicePage`, `ConsultationTopics`, `Site`, `BooksyCalendar` (współdzielenie adresu widżetu), stronę główną, szablon artykułów, politykę prywatności i style. Sitemap zawiera 10 nowych canonicali z datą aktualizacji treści 2026-11-26. Tematy mają odrębne metadane i `WebPage`/`BreadcrumbList`, bez deklarowania osobnych usług medycznych w schemacie.

Panel używa tego samego adresu widżetu i identyfikatora co kalendarz kontaktowy. Na tematach kalendarz ładuje się automatycznie w pobliżu widocznej części strony (`loading="lazy"`), bez przycisku otwierającego. Ramka i link używają `no-referrer`/`noreferrer`, bez przekazywania slugu w parametrach lub analityce. Po otwarciu Booksy otrzymuje dane połączenia i może używać własnych cookies. Przycisk bezpośredni działa niezależnie od iframe; są też telefon i e-mail. Panel jest po prawej na komputerze, a pod treścią na telefonie. Panel kalendarza nie jest przyklejony, aby dało się przewinąć całą jego wysokość. Obecne osadzenie kontaktowe pozostaje automatyczne.

Nie jest potrzebny nowy identyfikator ani ręczna konfiguracja w Booksy dla tego kodu. Przed publikacją zalecane sprawdzenie w przeglądarce na telefonie i komputerze: wyświetlenie prawdziwych terminów w wąskiej ramce z `no-referrer`, przejście do rezerwacji i działanie linku przy blokadzie ramki. Z tego środowiska nie potwierdzono zewnętrznej dostępności terminów ani procesu rezerwacji. Nie wykonano wdrożenia.

## Źródła kliniczne

- [NICE NG222: depresja u dorosłych](https://www.nice.org.uk/guidance/ng222)
- [NICE CG113: lęk uogólniony i zaburzenie paniczne u dorosłych](https://www.nice.org.uk/guidance/cg113)
- [NICE CG78: zaburzenie osobowości borderline](https://www.nice.org.uk/guidance/cg78)
- [WHO: ICD-11, opisy kliniczne i wymagania diagnostyczne](https://www.who.int/publications/i/item/9789240077263)
- [WHO: wypalenie jako zjawisko zawodowe](https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon)
- [Clarkin i wsp. (2007): porównanie trzech psychoterapii w borderline](https://doi.org/10.1176/ajp.2007.164.6.922)

`npm run build`, `npm run check:export` i `git diff --check` zakończyły się poprawnie. Eksport: 36 indeksowalnych adresów w sitemapie i 16 przekierowań; jest to weryfikacja plików, nie raport indeksacji Google.

## Etap 2

Katalog ma teraz sześć kategorii i 17 tematów. Nowe gotowe strony korzystają z tego samego szablonu, metadanych, sitemapy i panelu Booksy. Widżet nadal ładuje się automatycznie w pobliżu panelu, bez kliknięcia.

| Adres po `/w-czym-pomagam/` | Intencja |
| --- | --- |
| `poczucie-pustki/` | Konsultacja przy poczuciu pustki lub braku sensu, bez założenia rozpoznania |
| `trudnosci-emocjonalne/` | Rozpoznawanie i wyrażanie emocji, a nie osobna strona o diagnozie |
| `natlok-mysli/` | Nawracające analizowanie rozmów i decyzji; zakres odrębny od strony o zaburzeniach lękowych |
| `asertywnosc-i-granice/` | Trudność z odmową, wyrażaniem sprzeciwu i proszeniem o zmianę |
| `trudne-doswiadczenia-z-dziecinstwa/` | Znaczenie dawnych doświadczeń dla obecnego życia; blog zachowuje funkcję edukacyjną |
| `dda/` | Własne doświadczenie dorastania w rodzinie z problemem alkoholowym, nie diagnoza ani leczenie uzależnienia |
| `doswiadczenie-przemocy/` | Pierwszeństwo bezpieczeństwa i konsultacja dotycząca emocjonalnych następstw, nie deklaracja specjalistycznego leczenia |

Wskazówki dotyczące pomocy po przemocy domowej: [Komenda Powiatowa Policji w Nidzicy](https://nidzica.policja.gov.pl/o12/aktualnosci/141999,Jestes-swiadkiem-lub-doswiadczasz-przemocy-domowej-Reaguj.html). Powracające wspomnienia są omówione jako możliwy temat rozmowy po przemocy; nie powstał odrębny, powielający adres. Tematy młodzieżowe i kolejne zagadnienia nie otrzymały pustych tras.

## Etap 3

Dodano `/w-czym-pomagam/lek-spoleczny/` (obawa przed oceną i unikanie; [NICE CG159](https://www.nice.org.uk/guidance/cg159)) oraz `/w-czym-pomagam/zaloba/` (życie po śmierci bliskiej osoby, bez narzucania etapów żałoby). Katalog obejmuje 19 podstron tematycznych oraz odnośniki do trzech sekcji istniejącej strony dla młodzieży od 15. roku życia: emocje, relacje oraz dorastanie i tożsamość. Build i kontrola eksportu przeszły poprawnie: 45 adresów w sitemapie i 16 przekierowań. Nadal do sprawdzenia przed publikacją: widoczność terminów i przejście do rezerwacji Booksy w przeglądarce na telefonie i komputerze.
