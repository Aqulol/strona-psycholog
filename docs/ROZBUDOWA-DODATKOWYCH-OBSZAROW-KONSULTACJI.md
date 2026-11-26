# Rozbudowa dodatkowych obszarów konsultacji psychologicznych

## Nowe podstrony i granice zakresu

Poniższe odnośniki to jednocześnie komplet **ośmiu nowych adresów do zgłoszenia w Google Search Console po publikacji**. Nie zmieniono dotychczasowych URL-i, nie dodano przekierowań i nie zgłaszano adresów do indeksowania.

| Podstrona i canonical | Zakres i odrębność |
| --- | --- |
| [Zdrowie fizyczne i funkcjonowanie psychiczne](https://psychologplebaniak.pl/w-czym-pomagam/zdrowie-fizyczne-i-psychiczne/) | Przekrojowy temat o dwukierunkowym związku stresu, bólu, sprawności i funkcjonowania psychicznego. Linkuje do psychosomatyki, choroby i przewlekłego stresu. Strona o chorobie opisuje adaptację do choroby, a psychosomatyka koncentruje się na rozumieniu objawów cielesnych z uwzględnieniem oceny lekarskiej. Nie powstała osobna strona o przewlekłym bólu: istniejący tekst o bólu był szkicem, nie publicznym URL-em. Konsultacja nie zastępuje diagnostyki ani leczenia. |
| [Trudności emocjonalne w okresie okołoporodowym](https://psychologplebaniak.pl/w-czym-pomagam/trudnosci-okoloporodowe/) | Ciąża, poród, zmiany roli i obrazu ciała, więź z dzieckiem, baby blues, depresja i pilne sygnały, w tym objawy możliwej psychozy poporodowej. Odnośniki do depresji, rodzicielstwa i obrazu ciała. Bez deklaracji specjalistycznej opieki okołoporodowej. |
| [Trudności związane z rodzicielstwem](https://psychologplebaniak.pl/w-czym-pomagam/rodzicielstwo/) | Wyczerpanie i dystans emocjonalny związane z rolą rodzica, poczucie winy, granice i wzorce relacyjne. Nie jest to artykuł o pierwszej wizycie nastolatka ani rozszerzenie oferty o terapię rodzinną, terapię dzieci czy trening wychowawczy. |
| [Stres mniejszościowy i dyskryminacja](https://psychologplebaniak.pl/w-czym-pomagam/stres-mniejszosciowy/) | Skutki stygmatyzacji, przewidywanie odrzucenia, bezpieczeństwo, ukrywanie części tożsamości i przynależność. Odrębny kontekst społeczny, nie powtórzenie stron o samotności lub lęku społecznym. Tożsamość ani orientacja nie są celem leczenia; konsultacja nie zastępuje ochrony przed przemocą ani pomocy prawnej. |
| [Seksualność i intymność](https://psychologplebaniak.pl/w-czym-pomagam/seksualnosc-i-intymnosc/) | Zgoda, granice, potrzeby, wstyd i ambiwalencja w sferze seksualnej, a nie ogólne omówienie lęku przed bliskością. Wskazuje, kiedy skierować się do lekarza, psychiatry lub seksuologa. Bez deklaracji diagnostyki lub terapii seksuologicznej i terapii par. |
| [Trudności związane z odżywianiem](https://psychologplebaniak.pl/w-czym-pomagam/trudnosci-z-odzywianiem/) | Zachowania związane z jedzeniem, regulacja emocji i kontrola. Rozróżniono trudności i kliniczne zaburzenia odżywiania; w razie zagrożenia pierwszeństwo ma pomoc medyczna i stabilizacja. Bez instrukcji szkodliwych zachowań i deklaracji specjalistycznego leczenia. |
| [Trudności związane z obrazem ciała](https://psychologplebaniak.pl/w-czym-pomagam/obraz-ciala/) | Koncentracja na wyglądzie, społeczne standardy i ograniczanie aktywności lub bliskości. Temat odrębny od samooceny, narcyzmu, seksualności i zachowań żywieniowych. Odróżnia dysmorfofobię wymagającą specjalistycznej oceny. Istniejący szkic nie był publiczną trasą. |
| [Problemowe używanie alkoholu lub innych substancji](https://psychologplebaniak.pl/w-czym-pomagam/problemowe-uzywanie-substancji/) | Różnica między używaniem, używaniem problemowym i uzależnieniem; ambiwalencja, emocje, szkody i czynniki wielopoziomowe. Poradnia przy podejrzeniu uzależnienia, bez porad samodzielnego odstawiania. Brak specjalistycznego leczenia uzależnień; przy aktywnym uzależnieniu nie rozpoczyna się TFP. |

Audyt wykonano w rejestrze tematów, trasach, sitemapie, katalogu i istniejących szkicach. Nie znaleziono publicznej strony o tym samym zakresie co którekolwiek z ośmiu zagadnień. Potencjalne nakładanie ograniczono przez rozdzielenie intencji i linkowanie do treści szczegółowych zamiast powtarzania ich opisów.

## Źródła i implementacja

[Rejestr źródeł merytorycznych](ZRODLA-MERYTORYCZNE.md#dodatkowe-obszary-konsultacji-psychologicznych) przypisuje konkretny materiał i uzasadniane twierdzenia każdej podstronie. Obejmuje m.in. NICE, WHO, NHS, badania nad wypaleniem rodzicielskim i stresem mniejszościowym oraz literaturę o obrazie ciała i psychoterapii psychodynamicznej. Przykłady psychodynamiczne to hipotezy kliniczne, nie wyniki badań ani twierdzenia o skuteczności metod. Publiczne bibliografie pozostały wyłącznie na blogu.

Wspólny szablon generuje H1, osobny title i description, canonical, Open Graph, `WebPage` i `BreadcrumbList`. Nowe trasy i sitemapę generuje istniejący rejestr. Osobna sekcja katalogu zawiera osiem linków, uzgodnione wprowadzenie i krótkie ograniczenia; główny katalog pozostał bez zmian. Nie zmieniono `BookingSidebar`, adresu ani konfiguracji widgetu, cennika, czasu konsultacji, kwalifikacji, usług, bloga, strony głównej ani ogólnych stylów.

Zmienione pliki:

- `lib/consultation-topics.ts` — osiem rekordów treści i metadanych, odnośniki powiązane oraz opis pierwszej konsultacji dla każdego tematu.
- `lib/help-topics.ts` — integracja z rejestrem tematów i wspólna walidacja etykiet odnośników.
- `components/ConsultationTopics.tsx` — osobna karta katalogowa z ośmioma pozycjami.
- `scripts/check-export.mjs`, `scripts/check-help-browser.cjs` — asercje dla tras, katalogu, eksportu i układu w Chromium.
- `docs/ZRODLA-MERYTORYCZNE.md`, niniejszy raport oraz `docs/dodatkowe-obszary-qa/` — dokumentacja i zrzuty.

## Wyniki kontroli

- `npm run build`, `npm run check:export`, `npx tsc --noEmit`, `git diff --check` — przeszły. **100 adresów w eksporcie, 16 istniejących przekierowań, 74 podstrony tematów.** Nie ma odrębnego skryptu lint w `package.json`.
- Eksport: wszystkie osiem adresów w osobnej sekcji i sitemapie; sprawdzono metadane, dane strukturalne, odnośniki wewnętrzne, brak bibliografii oraz wyrenderowanie współdzielonej ramki i odnośnika Booksy.
- Chromium/Playwright: bezpośredni HTTP 200 dla wszystkich 74 tras. Nowe podstrony sprawdzono przy 1920, 1440, 1366, 1280, 1024, 768, 430, 390 i 360 px: brak poziomego przepełnienia, panel po prawej na szerszych ekranach, pod tekstem na węższych; widoczny odnośnik Booksy. Sprawdzono przejście z dodatkowego katalogu i skok mobilny do panelu. Przy 1366 px podstrona okołoporodowa miała panel 543 px i ramkę 509 px; przy 390 px odpowiednio 366 i 340 px. Lokalny panel nie wymusza dzielenia wyrazów.
- Zrzuty: [dodatkowa sekcja katalogu](dodatkowe-obszary-qa/katalog-1366.png), [temat na komputerze](dodatkowe-obszary-qa/okoloporodowe-1366.png), [temat mobilnie](dodatkowe-obszary-qa/okoloporodowe-390.png), [panel mobilnie](dodatkowe-obszary-qa/okoloporodowe-panel-390.png).
- Ramka Booksy wysyłała żądania automatycznie bez nagłówka `Referer`. Sandbox nie uzyskał odpowiedzi od dostawcy (`ERR_CONNECTION_CLOSED`), więc nie zweryfikowano zawartości i zawijania tekstu wewnątrz ramki, terminów ani przebiegu rezerwacji. Nie wykonano rezerwacji. Zrzuty dokumentują lokalny układ, nie działający kalendarz dostawcy.

**Decyzje właściciela:** nie trzeba potwierdzać nowej usługi, ponieważ żadnej nie dodano. Przed publikacją warto odrębnie sprawdzić wygląd i działanie osadzenia Booksy w sieci mającej dostęp do dostawcy; po publikacji można zgłosić powyższe osiem canonicali w GSC. Nie wykonano wdrożenia produkcyjnego.
