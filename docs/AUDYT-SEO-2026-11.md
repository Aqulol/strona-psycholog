# Audyt SEO, lokalny, GEO i konwersji — 26.11.2026

## Najważniejsze decyzje

- Strona główna miała ten sam główny temat co podstrona metody. Rozdzielono intencję lokalnego wyboru psychologa od intencji poznania psychoterapii psychodynamicznej. Fraza „psychoterapia Wrocław” wspiera stronę indywidualnej terapii dorosłych, bez tworzenia drugiej kopii usługi. „Wrocław centrum” nie jest pozycjonowany osobno bez potwierdzenia nazewnictwa lokalizacji; nie deklarujemy aktualnej dostępności terminów.
- W poprzednim pierwszym ekranie brakowało ceny i krótkiej drogi do informacji o konsultacji. Dodano obie, zachowując główne CTA Booksy, identyfikację, zakres usług i oznaczenie szkolenia. Mobilne menu i sposób działania kalendarza nie zostały zmienione bez danych o problemie.
- Artykuł o powtarzających się relacjach jest wartościowym wejściem edukacyjnym; utrzymano URL, rozwinięto zastrzeżenia naukowe i dodano kontekstowe przejście do konsultacji bez zawłaszczania intencji wyszukiwania.
- Rozproszone encje osoby i gabinetu zastąpiono powiązanymi identyfikatorami, a autorstwo połączono z widocznym profilem. Nie nadano specjalizacji medycznej, certyfikatu ani ocen. FAQ mogą wspierać odpowiedzi, ale nie obiecują rich results ani cytowań AI.

### Dane wejściowe i priorytety

Localo (dane przekazane, nie odczyt z Search Console): psycholog Wrocław 2500/290, psychoterapia Wrocław 1300/232, psychoterapia indywidualna Wrocław 100/176, gabinet psychoterapii Wrocław <15/184, konsultacja psychologiczna Wrocław <15/210, wybieranie podobnych partnerów <15/25 (szacunek miesięczny / pozycja). Brak danych wolumenowych dla pozostałych fraz. Trends pokazuje relacje, nie liczbę zapytań; sezonowość początku roku i jesieni warto uwzględnić przy porównaniach, nie uznawać za efekt zmian.

Poniższa ocena jest jakościowa (W = wysoki, Ś = średni, N = niski), nie jest prognozą wzrostu.

| Działanie | SEO | Local | AI | Rezerwacje | Nakład | Ryzyko | Dowód |
|---|---|---|---|---|---|---|---|
| Rozdzielenie intencji, linki, metadata | W | Ś | Ś | Ś | N | Ś | Localo + nakładanie tematów w kodzie; efekt do sprawdzenia w GSC |
| Cena i przebieg konsultacji przy CTA | N | Ś | N | W | N | N | konkretna luka w hero; bez dotychczasowego testu konwersji |
| Artykuł: źródło, autor, link | Ś | N | Ś | Ś | N | N | pozycja w Localo, konkretna publikacja empiryczna |
| NAP, encje, profile, weryfikacja pinezki | Ś | W | Ś | Ś | Ś | N | spójność danych; brak dowodu na ranking z samego schema |
| Kontrola 404, dostępności botów i CWV | Ś | N | Ś | Ś | Ś | N | statyczny eksport sprawdzony; produkcja do pomiaru |
| Analityka i zgodność pomiaru | N | N | N | Ś | Ś | W | dane zdrowotne i kontekst serwisu wymagają oceny prywatności |

Pełna mapa 24 publicznych adresów: [SEO.md](SEO.md). Historyczne aliasy nie dostają własnych fraz: mają przekierowania 301, nie są w sitemap. Nie zmieniono adresów. Klastry: **relacje** (podobni partnerzy, narcyzm wrażliwy, przeszłość) → konsultacje; **mechanizmy terapii** (wgląd, relacja terapeutyczna, TFP) → metoda; **pierwszy kontakt** (wybór terapeuty, pierwsze spotkanie, rodzice) → konsultacje, cennik i podstrona młodzieży. Pierwszeństwo mają istniejące artykuły, nie mnożenie podobnych stron.

## Techniczna weryfikacja i granice audytu

Next.js statycznie generuje treści, canonical, Open Graph, breadcrumbs oraz sitemap. Przetestowano 24 dokumenty i 16 konfiguracji 301, linki wewnętrzne, rozmiary metadanych, JSON-LD, obecność autora, NAP, responsive obrazy i brak blokującego arkusza w HTML strony głównej. `firebase.json` serwuje `out`, bez ogólnego rewrite na stronę główną; wygenerowany `out/404.html` ma `noindex`. Nie jest to dowód kodu odpowiedzi na produkcji: połączenie do domeny z tego środowiska było niedostępne. Na wdrożonym podglądzie uruchomić `node scripts/check-hosting.mjs https://ADRES-PODGLADU` (200, 301, rzeczywiste 404, żądania z nazwami botów); powtórzyć na domenie produkcyjnej. User-Agent w teście nie dowodzi dostępu autentycznego robota; sprawdzić logi, Search Console i Bing Webmaster Tools.

Poprzedni załączony pomiar PSI: LCP mobilny 2,90 s, desktop 0,59 s, laboratorium; nie jest bieżącym pomiarem tego wdrożenia. Zachowano lokalne fonty, responsywne WebP, priorytet portretu, statyczny HTML, ładowanie mapy po kliknięciu, Booksy lazy oraz Firebase dynamicznie przy wysyłce. Przed/po: Lighthouse kilka razy w tym samym profilu i portalu, a następnie dane CrUX/GSC z 28 dni, jeśli są dostępne (p75: LCP ≤2,5 s, INP ≤200 ms, CLS ≤0,1). TBT nie jest INP. Sprawdzić klawiaturą menu, fokus, formularz i booking; test eksportu nie jest audytem WCAG. Zweryfikować canonical i dane strukturalne w validatorach po wdrożeniu. Repo nie ma skonfigurowanego lintingu; wykonano oddzielny TypeScript i build.

## Ręcznie poza kodem

1. **Google Business Profile:** potwierdzić pinezkę dla oficyny, faktyczne wejście i ewentualne wskazówki (nie dodano domniemanych bram, parkingu ani linii). Wprowadzić spójny adres `Zygmunta Krasińskiego 13A Oficyna, 50-449 Wrocław`, nazwę bez dopisków, telefon, link do strony i prawdziwy link rezerwacji. Podać zweryfikowany URL wizytówki do dodania na stronie; link do wyszukiwania w Mapach nie jest identyfikatorem zweryfikowanej wizytówki.
2. **Bing Places, Apple Business Connect:** przejąć lub zweryfikować istniejące profile, zlikwidować duplikaty, porównać pinezkę, NAP, adres strony i rezerwację. **Booksy, ZnanyLekarz i inne rzeczywiste katalogi:** porównać adres, ofertę, wiek, koszt, status szkolenia. Nie zakładać fikcyjnych lokalizacji.
3. **Search Console:** zachowano dotychczasowy znacznik; zweryfikować dostęp i zgłosić sitemap. Priorytet inspekcji i ewentualnego zgłoszenia: `/`, `/psychoterapia-psychodynamiczna-wroclaw/`, `/psychoterapia-dorosli/`, `/konsultacje-psychologiczne-wroclaw/`, `/psychoterapia-mlodziezy-od-15-roku-zycia/`, `/gabinet-wroclaw/`, `/cennik/`, `/kontakt/`, `/blog/dlaczego-wybieram-podobnych-partnerow/`. Reszta przez sitemap, bez wielokrotnego zgłaszania. Bing Webmaster Tools: potwierdzić własność (brak widocznego aktywnego tagu w layout), przesłać sitemap, sprawdzić inspekcję URL. Nie dodawać cudzych tokenów.
4. **GA4/GTM:** zachowane identyfikatory repo; layout nie ładuje aktywnie GA4, GTM ma pusty identyfikator. Nie reaktywowano skryptów. Najpierw ocena podstawy prawnej, zasad zgody, dostawców i okresów retencji. Preferować zagregowane pomiary bez łączenia tożsamości: `booking_outbound`, `phone_click`, `contact_open` jako liczniki; bez treści formularza, numerów osób, identyfikatorów, pełnych referrerów, URL artykułów o problemach, historii użytkownika i remarketingu. Przejście na Booksy nie oznacza rezerwacji; potwierdzone wizyty porównywać zagregowanie w panelu rezerwacji, nie przez przesyłanie danych pacjentów. Źródła organiczne mierzyć w GSC/Bing, a AI tylko jako niepełną zagregowaną kategorię źródeł, jeśli zatwierdzoną; część ruchu może wyglądać jak bezpośredni.
5. **GEO:** publiczny HTML dostępny wg robots dla botów wyszukujących. Kontrolować cytowania w testowych pytaniach i widoczność marki, bez automatyzacji wysyłania danych osób. `llms.txt` pozostaje eksperymentalny, nie jest warunkiem indeksowania ani potwierdzonym czynnikiem rankingu.
6. Zatwierdzić aktualność etapu szkolenia i numery wsparcia kryzysowego w stopce. Nowym artykułom bez wiarygodnego dnia publikacji nie dopisano fikcyjnych dat; ustalić je na podstawie historii wdrożeń. Zaktualizować daty tylko po rzeczywistej zmianie merytorycznej.

## Monitoring

- **30 dni:** sprawdzić indeksację, błędy 404 i 301, poprawność pinezki, formularz/Booksy oraz bazowe wyświetlenia i kliknięcia według zapytania i strony. Zapisać bazową liczbę nowych konsultacji zagregowaną, jeśli właściciel ma do niej dostęp.
- **60 dni:** porównać pełne okresy z uwzględnieniem sezonowości; sprawdzić, czy Google wybiera inną stronę dla „psycholog” i frazy nurtu, oraz czy artykuł o partnerach nadal utrzymuje widoczność. Skontrolować CWV na urządzeniach mobilnych i desktopie.
- **90 dni:** ocenić trend nowych konsultacji, nie tylko pozycje. Jeśli użytkownicy klikają, ale nie rezerwują, zweryfikować proces Booksy i dostępność zamiast poszerzać listę słów. Rozwijać treści tylko dla intencji potwierdzonych danymi.

## Zmienione pliki

- `app/page.tsx`, `lib/pages.ts`, `app/cennik/page.tsx`, `components/ServicePage.tsx` — cel stron, cena, linki i encje usług.
- `app/layout.tsx`, `lib/entities.ts`, `lib/articleJsonLd.ts` — wspólne encje i ich powiązania.
- `app/blog/[article]/page.tsx`, sześć istniejących tras artykułów w `app/blog/`, `components/ArticleByline.tsx` — widoczny autor; artykuł o partnerach dodatkowo ma źródło, datę aktualizacji i link do konsultacji.
- `app/robots.ts`, `app/not-found.tsx`, `app/sitemap.ts` — boty, noindex strony błędu i data zmiany artykułu.
- `scripts/check-export.mjs`, `scripts/check-hosting.mjs`, `docs/SEO.md`, niniejszy raport — kontrola eksportu, kontrola HTTP i dokumentacja.

Bez wdrożenia produkcyjnego.
