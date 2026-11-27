# Audyt nawigacji, usług i linków wewnętrznych

## Zakres

Porównanie statycznego eksportu gałęzi z eksportem commitu bazowego `3b3e782`. Odczyt akapitów `<main>` na wszystkich **104** trasach indeksowalnych (w tym **11** artykułach, **74** tematach pomocy i **19** pozostałych stronach; **1661** akapitów). Porównanie treści i czasów czytania było automatyczne; dobór poniższych odsyłaczy sprawdzono na podstawie relacji źródło–fraza–cel. Nie jest to pełna ponowna recenzja redakcyjna i merytoryczna każdego zdania. Na stronach artykułów i tematów zachowano tekst akapitów, czasy czytania i bibliografie. Zwykłe doświadczenia nie są etykietowane jako diagnozy.

## Trasy i pliki

- Nowa: `/konsultacja-diagnostyczna-wroclaw/`
- Nowa: `/poradnictwo-psychologiczne-wroclaw/`
- Nowa: `/psycholog-wroclaw/`
- Nowa: `/psychoterapeuta-wroclaw/`
- Zmieniona treść: `/`, `/konsultacje-psychologiczne-wroclaw/`, `/psychoterapia-mlodziezy-od-15-roku-zycia/`. Zmienione odsyłacze śródtekstowe na pozostałych trasach podano w tabeli. Nagłówek zmienia się globalnie; breadcrumbs na stronach podrzędnych obu obszarów.
- Nawigacja i prezentacja: `components/MainNavigation.tsx`, `components/Site.tsx`, `components/ServiceCards.tsx`, `app/globals.css`, `app/page.tsx`.
- Treści usług: cztery nowe `app/*/page.tsx`, wspólne `components/ServiceDirectoryPage.tsx`, `components/ServicePage.tsx`, `lib/service-paths.ts`.
- Linki: `lib/context-links.tsx`, szablony artykułów `app/blog/*/page.tsx`, szablon `app/w-czym-pomagam/[topic]/page.tsx`. `scripts/check-export.mjs` sprawdza tekst wstępów i sekcji także z linkiem wewnątrz akapitu.

## SEO i weryfikacja

- Mapa: **100 → 104**, dodano tylko cztery powyższe kanoniczne adresy. Nadal 8 udokumentowanych dat `lastmod`, 10 wykluczeń technicznych/nieindeksowalnych, 0 sierot, 0 stron nieosiągalnych, maks. głębokość 2. Dotychczasowe URL i 16 reguł przekierowań zachowane. Walidacja dotyczy lokalnego eksportu, nie wdrożonej produkcji ani zewnętrznych linków.
- Strona główna odpowiada na intencję marki i gabinetu, dwa huby rozróżniają role, a podstrony szczegółowe odpowiadają na pytania o konkretne formy pomocy. Nowe strony mają własne H1, tytuły, opisy, kanoniki, `WebPage` i breadcrumbs. Strony informacyjne nie deklarują osobnych świadczeń w JSON-LD.
- Przeszły `npm run build`, `npm run check:export`, `npm run check:sitemap`, `npx tsc --noEmit`, `node scripts/check-reading-time.mjs` oraz `git diff --check`.
- Playwright/Chromium: 375, 768, 1024 px (dotyk) oraz 1152, 1440 i 1920 px (mysz). Sprawdzono pierwsze przejście do obu hubów, samodzielne linki wieku, oba podmenu, Tab/Enter/Escape, powrót fokusu, brak poziomego przepełnienia i nakładania elementów na tych szerokościach. [Zrzuty menu](menu-qa/). W teście blokowano zewnętrzne skrypty i zasoby, więc nie potwierdza on działania widżetów u dostawców. Brak wdrożenia.

## Do potwierdzenia przez gabinet

- Czy konsultacja diagnostyczna i poradnictwo psychologiczne w ogóle będą samodzielnie rezerwowalnymi usługami; jeśli tak, jaki jest zakres, odbiorcy, tryb, czas, cena i właściwy wpis w Booksy. Dla ewentualnej diagnostyki także jakie są granice kompetencji, narzędzia i dokumenty końcowe. Obecne strony objaśniają pojęcia i kierują wyłącznie do potwierdzonej konsultacji standardowej (50 min, 200 zł), nie obiecują diagnoz, testów, opinii ani osobnej rezerwacji.
- Aktualny rok szkolenia należy potwierdzić przed ewentualną zmianą opublikowanego roku. Zachowano status „w trakcie szkolenia”. Nie dodano nowych zasad zgody ani poufności dla młodzieży.

## Inwentarz: 86 nowych odsyłaczy w akapitach na 34 trasach

Poza tabelą pozostają odsyłacze nawigacyjne, karty, breadcrumbs i przyciski rezerwacji.

| Źródło | Kotwica | Cel |
|---|---|---|
| `/blog/dlaczego-sama-swiadomosc-nie-wystarcza/` | perfekcjonizm | `/w-czym-pomagam/perfekcjonizm/` |
| `/blog/dlaczego-sama-swiadomosc-nie-wystarcza/` | samotnością | `/w-czym-pomagam/samotnosc/` |
| `/blog/dlaczego-wybieram-podobnych-partnerow/` | lęk przed odrzuceniem | `/w-czym-pomagam/lek-przed-odrzuceniem/` |
| `/blog/narcyzm-wrazliwy/` | narcystycznym funkcjonowaniem | `/w-czym-pomagam/narcyzm/` |
| `/blog/narcyzm-wrazliwy/` | niska samoocena | `/w-czym-pomagam/niska-samoocena/` |
| `/blog/narcyzm-wrazliwy/` | psychoterapii psychodynamicznej | `/psychoterapia-psychodynamiczna-wroclaw/` |
| `/blog/poczucie-wlasnej-wartosci/` | Wahania samooceny | `/w-czym-pomagam/niestabilna-samoocena/` |
| `/blog/poczucie-wlasnej-wartosci/` | zaburzenia osobowości | `/w-czym-pomagam/zaburzenia-osobowosci/` |
| `/blog/poczucie-wlasnej-wartosci/` | potrzeba akceptacji | `/w-czym-pomagam/potrzeba-akceptacji/` |
| `/blog/samotnosc/` | samotności | `/w-czym-pomagam/samotnosc/` |
| `/blog/tfp-dla-kogo/` | psychoterapii skoncentrowanej na przeniesieniu | `/terapia-skoncentrowana-na-przeniesieniu-tfp/` |
| `/blog/tfp-dla-kogo/` | zaburzeniami osobowości | `/w-czym-pomagam/zaburzenia-osobowosci/` |
| `/konsultacja-diagnostyczna-wroclaw/` | problemy ze snem | `/w-czym-pomagam/trudnosci-ze-snem/` |
| `/konsultacja-diagnostyczna-wroclaw/` | konsultacja psychologiczna | `/konsultacje-psychologiczne-wroclaw/` |
| `/konsultacja-diagnostyczna-wroclaw/` | dolegliwościach fizycznych | `/w-czym-pomagam/zdrowie-fizyczne-i-psychiczne/` |
| `/konsultacja-diagnostyczna-wroclaw/` | poradnictwo psychologiczne | `/poradnictwo-psychologiczne-wroclaw/` |
| `/konsultacja-diagnostyczna-wroclaw/` | online | `/psychoterapia-online/` |
| `/konsultacja-diagnostyczna-wroclaw/` | cennik | `/cennik/` |
| `/konsultacja-diagnostyczna-wroclaw/` | skontaktować się telefonicznie lub mailowo | `/kontakt/` |
| `/konsultacje-psychologiczne-wroclaw/` | klasycznym TFP | `/terapia-skoncentrowana-na-przeniesieniu-tfp/` |
| `/konsultacje-psychologiczne-wroclaw/` | przewlekły stres | `/w-czym-pomagam/stres/` |
| `/konsultacje-psychologiczne-wroclaw/` | problemy w relacjach | `/w-czym-pomagam/problemy-w-relacjach/` |
| `/konsultacje-psychologiczne-wroclaw/` | odrębna ocena diagnostyczna | `/konsultacja-diagnostyczna-wroclaw/` |
| `/konsultacje-psychologiczne-wroclaw/` | wsparcie przy konkretnej decyzji | `/poradnictwo-psychologiczne-wroclaw/` |
| `/konsultacje-psychologiczne-wroclaw/` | katalog obszarów pomocy | `/kiedy-zglosic-sie-na-terapie/` |
| `/poradnictwo-psychologiczne-wroclaw/` | zmiana zawodowa | `/w-czym-pomagam/utrata-pracy-i-zmiany-zawodowe/` |
| `/poradnictwo-psychologiczne-wroclaw/` | konsultacji psychologicznej | `/konsultacje-psychologiczne-wroclaw/` |
| `/poradnictwo-psychologiczne-wroclaw/` | psychoterapia | `/psychoterapeuta-wroclaw/` |
| `/poradnictwo-psychologiczne-wroclaw/` | odrębna ocena | `/konsultacja-diagnostyczna-wroclaw/` |
| `/poradnictwo-psychologiczne-wroclaw/` | online | `/psychoterapia-online/` |
| `/poradnictwo-psychologiczne-wroclaw/` | cennik | `/cennik/` |
| `/poradnictwo-psychologiczne-wroclaw/` | skontaktować się telefonicznie lub mailowo | `/kontakt/` |
| `/psycholog-wroclaw/` | O mnie | `/o-mnie/` |
| `/psycholog-wroclaw/` | samotność | `/w-czym-pomagam/samotnosc/` |
| `/psycholog-wroclaw/` | problemy w relacjach | `/w-czym-pomagam/problemy-w-relacjach/` |
| `/psycholog-wroclaw/` | katalog obszarów pomocy | `/kiedy-zglosic-sie-na-terapie/` |
| `/psycholog-wroclaw/` | konsultacji psychologicznej | `/konsultacje-psychologiczne-wroclaw/` |
| `/psycholog-wroclaw/` | psychoterapeutą (w trakcie szkolenia) | `/psychoterapeuta-wroclaw/` |
| `/psycholog-wroclaw/` | spotkania dla dorosłych | `/psychoterapia-dorosli/` |
| `/psycholog-wroclaw/` | pomoc dla młodzieży od 15. roku życia | `/psychoterapia-mlodziezy-od-15-roku-zycia/` |
| `/psycholog-wroclaw/` | online | `/psychoterapia-online/` |
| `/psycholog-wroclaw/` | cennik | `/cennik/` |
| `/psycholog-wroclaw/` | skontaktować się telefonicznie lub mailowo | `/kontakt/` |
| `/psychoterapeuta-wroclaw/` | lęk przed odrzuceniem | `/w-czym-pomagam/lek-przed-odrzuceniem/` |
| `/psychoterapeuta-wroclaw/` | trudności w relacjach | `/w-czym-pomagam/powtarzajace-sie-trudnosci-w-relacjach/` |
| `/psychoterapeuta-wroclaw/` | Konsultacje wstępne | `/konsultacje-psychologiczne-wroclaw/` |
| `/psychoterapeuta-wroclaw/` | relacja terapeutyczna | `/blog/relacja-terapeutyczna-zrodlo-zmiany/` |
| `/psychoterapeuta-wroclaw/` | O mnie | `/o-mnie/#superwizja` |
| `/psychoterapeuta-wroclaw/` | psychoterapię dorosłych | `/psychoterapia-dorosli/` |
| `/psychoterapeuta-wroclaw/` | psychoterapię młodzieży od 15. roku życia | `/psychoterapia-mlodziezy-od-15-roku-zycia/` |
| `/psychoterapeuta-wroclaw/` | zasady spotkań online | `/psychoterapia-online/` |
| `/psychoterapeuta-wroclaw/` | online | `/psychoterapia-online/` |
| `/psychoterapeuta-wroclaw/` | cennik | `/cennik/` |
| `/psychoterapeuta-wroclaw/` | skontaktować się telefonicznie lub mailowo | `/kontakt/` |
| `/psychoterapia-dorosli/` | psychoterapię psychodynamiczną | `/psychoterapia-psychodynamiczna-wroclaw/` |
| `/psychoterapia-dorosli/` | lęk przed odrzuceniem | `/w-czym-pomagam/lek-przed-odrzuceniem/` |
| `/psychoterapia-dorosli/` | trudność z zaufaniem | `/w-czym-pomagam/trudnosci-z-zaufaniem/` |
| `/psychoterapia-mlodziezy-od-15-roku-zycia/` | konsultację psychologiczną | `/konsultacje-psychologiczne-wroclaw/` |
| `/psychoterapia-online/` | psychoterapię psychodynamiczną | `/psychoterapia-psychodynamiczna-wroclaw/` |
| `/psychoterapia-psychodynamiczna-wroclaw/` | poczucie pustki | `/w-czym-pomagam/poczucie-pustki/` |
| `/terapia-skoncentrowana-na-przeniesieniu-tfp/` | psychoterapia psychodynamiczna | `/psychoterapia-psychodynamiczna-wroclaw/` |
| `/terapia-skoncentrowana-na-przeniesieniu-tfp/` | zaburzeniami osobowości | `/w-czym-pomagam/zaburzenia-osobowosci/` |
| `/terapia-skoncentrowana-na-przeniesieniu-tfp/` | zaburzenia osobowości borderline | `/w-czym-pomagam/borderline/` |
| `/w-czym-pomagam/borderline/` | poczucie pustki | `/w-czym-pomagam/poczucie-pustki/` |
| `/w-czym-pomagam/depresja/` | nadmierne poczucie winy | `/w-czym-pomagam/nadmierne-poczucie-winy/` |
| `/w-czym-pomagam/depresja/` | trudności w podejmowaniu decyzji | `/w-czym-pomagam/trudnosci-w-podejmowaniu-decyzji/` |
| `/w-czym-pomagam/depresja/` | trudności w relacjach | `/w-czym-pomagam/problemy-w-relacjach/` |
| `/w-czym-pomagam/dorastanie-i-tozsamosc/` | obawa przed odrzuceniem | `/w-czym-pomagam/lek-przed-odrzuceniem/` |
| `/w-czym-pomagam/doswiadczenie-przemocy/` | Trudności ze snem | `/w-czym-pomagam/trudnosci-ze-snem/` |
| `/w-czym-pomagam/doswiadczenie-przemocy/` | trudność z zaufaniem | `/w-czym-pomagam/trudnosci-z-zaufaniem/` |
| `/w-czym-pomagam/lek-przed-porazka/` | perfekcjonizmu | `/w-czym-pomagam/perfekcjonizm/` |
| `/w-czym-pomagam/nawiazywanie-kontaktow-spolecznych/` | lęk społeczny | `/w-czym-pomagam/lek-spoleczny/` |
| `/w-czym-pomagam/obraz-ciala/` | zaburzeń odżywiania | `/w-czym-pomagam/trudnosci-z-odzywianiem/` |
| `/w-czym-pomagam/poczucie-pustki/` | psychoterapii psychodynamicznej | `/psychoterapia-psychodynamiczna-wroclaw/` |
| `/w-czym-pomagam/problemowe-uzywanie-substancji/` | trudności ze snem | `/w-czym-pomagam/trudnosci-ze-snem/` |
| `/w-czym-pomagam/samotnosc-w-zwiazku/` | samotności | `/w-czym-pomagam/samotnosc/` |
| `/w-czym-pomagam/samotnosc/` | Samotność | `/blog/samotnosc/` |
| `/w-czym-pomagam/stabilny-obraz-siebie/` | niestabilna samoocena | `/w-czym-pomagam/niestabilna-samoocena/` |
| `/w-czym-pomagam/stres/` | problemy ze snem | `/w-czym-pomagam/trudnosci-ze-snem/` |
| `/w-czym-pomagam/trudnosci-emocjonalne-mlodziezy/` | samotności | `/w-czym-pomagam/samotnosc/` |
| `/w-czym-pomagam/trudnosci-emocjonalne-mlodziezy/` | problemy ze snem | `/w-czym-pomagam/trudnosci-ze-snem/` |
| `/w-czym-pomagam/trudnosci-w-okresleniu-tozsamosci/` | Niestabilny obraz siebie | `/w-czym-pomagam/stabilny-obraz-siebie/` |
| `/w-czym-pomagam/trudnosci-z-odzywianiem/` | Perfekcjonizm | `/w-czym-pomagam/perfekcjonizm/` |
| `/w-czym-pomagam/wypalenie-zawodowe/` | przewlekłym stresem | `/w-czym-pomagam/stres/` |
| `/w-czym-pomagam/zaburzenia-osobowosci/` | trudności w relacjach | `/w-czym-pomagam/problemy-w-relacjach/` |
| `/w-czym-pomagam/zaburzenia-osobowosci/` | psychoterapii psychodynamicznej | `/psychoterapia-psychodynamiczna-wroclaw/` |
