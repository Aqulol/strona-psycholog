# Optymalizacja strony gabinetu — raport

Porównanie z `0331ff6`. Bez wdrożenia, nowych tras, zmiany hostingu ani zmiany zdjęć. Pozostał statyczny eksport Next.js 15 na Firebase Hosting (Spark).

## Strona główna

1. **Hero** — H1 „Gabinet psychologiczny we Wrocławiu”, lead „Pomoc w lepszym zrozumieniu siebie, własnych emocji i relacji”, informacja o szkoleniu, 200 zł / 50 min z centralnego cennika. „Umów konsultację” prowadzi bezpośrednio do Booksy; „Poznaj mnie” do `/o-mnie/`.
2. **Kwalifikacje** — magisterium, czteroletnie szkolenie w toku, regularna superwizja, nurt psychodynamiczny z TFP, Wrocław/online. Przy 320 px pasek korzysta z jednej kolumny zamiast przepełniać ekran.
3. **Oferta** — zachowano cztery grupy po trzy pozycje: pomoc psychologiczna, diagnoza, psychoedukacja i psychoterapia indywidualna. TFP to podejście stosowane w psychoterapii, a online to forma spotkania, nie nowa metoda. Uproszczono opisy.
4. **O mnie** — cztery krótkie informacje: wykształcenie (UWr, psychologia kliniczna i zdrowia dorosłych), II rok szkolenia, superwizja i współautorstwo. [DOI publikacji](https://doi.org/10.1016/j.tsc.2026.102233) i [rekord Crossref](https://api.crossref.org/works/10.1016/j.tsc.2026.102233) potwierdzają współautorstwo; lista autorów jest dostępna na `/o-mnie/#publikacje`. Do profili i `Person.sameAs` trafiają tylko Booksy i ZnanyLekarz. Nie potwierdzono profili TwójPsycholog i Google Business Profile; link do mapy to wskazówki dojazdu, nie profil.
5. **W czym mogę pomóc?** — osiem grup i 24 linki do istniejących treści: nastrój, lęk i stres, relacje, kryzysy, samoocena, osobowość i emocje, ADHD, dorastanie. Odnośnik do pełnego katalogu pod listą.
6. **Współpraca** — rezerwacja, pierwsze spotkanie, rozpoznanie potrzeb i decyzja o dalszych krokach. Zwykle cztery konsultacje *przed psychoterapią*, a nie obowiązkowy pakiet; częstotliwość psychoterapii uzgadniana indywidualnie, zwykle raz lub dwa razy w tygodniu. Konsultacja nie zobowiązuje.
7. **Dorośli i młodzież** — równorzędne sekcje; młodzież od 15. roku życia, zaproszenie rodzica lub rodziców na pierwsze spotkanie osoby niepełnoletniej, zgodnie z dotychczasową informacją na stronie usługi.
8. **Gabinet** — adres, oficyna Centrum Równowagi, dojazd i online. Zachowano prawdziwe zdjęcia i warianty responsywne.
9. **FAQ** — osiem rozwijanych odpowiedzi obecnych w początkowym HTML: nieumiejętność nazwania problemu, koszt i czas, pierwsza konsultacja, brak zobowiązania, częstotliwość, online, osoba niepełnoletnia, skierowanie i diagnoza. Istniejące oznaczenie FAQPage odpowiada widocznym treściom; nie jest obietnicą rozszerzonego wyniku Google.
10. **Kontakt i rezerwacja** — kalendarz i formularz obok siebie na większym ekranie, poniżej siebie na małym. Telefon i e-mail pozostają alternatywami, nie zastępują formularza.
11. **Baza wiedzy i stopka** — cztery skróty (blog, słownik, materiały, narzędzia), a w menu dodatkowo informacje dla pacjentów i FAQ, z osobnym linkiem i kontrolką podmenu. Trzy najnowsze artykuły z udokumentowaną datą wybierane automatycznie: o poczuciu własnej wartości, samotności i narcyzmie wrażliwym. Czas czytania obliczany z treści; artykuły bez daty nie dostają daty domyślnej.

## Booksy: decyzja i wyniki

[Instrukcja Booksy Biz](https://support.booksy.com/hc/en-us/articles/23480739244434-How-to-add-booking-widget-to-my-website-WordPress-Joomla-and-other-CMS-Platforms) proponuje zewnętrzny skrypt. Nie znaleziono udokumentowanego trybu bez cookies albo bez przetwarzania danych połączenia. [Informacja Booksy o prywatności](https://legal.booksy.com/doc/7834bda995c87f1be6d453aa4700ad0a27c51534fd59dce8f8bd511542ad222f) opisuje m.in. adres IP, logi i dane związane z rezerwacjami. Nie było podstaw do ładowania od pierwszej wizyty przed zgodą ani do zastąpienia izolowanego iframe skryptem dostawcy w głównym dokumencie.

- **76 adresów**, bez nowych osadzeń: [pełna lista](booksy-trasy.txt). Przy świeżej wizycie lub odmowie iframe się nie pojawia. Po ogólnej zgodzie ładuje się automatycznie w pobliżu ekranu (240 px marginesu, bez dodatkowego kliknięcia w kalendarzu). Zmiana ustawień na odmowę usuwa iframe; nie usuwa danych zapisanych wcześniej przez samą domenę Booksy. Bezpośredni odnośnik działa niezależnie od preferencji. Iframe i odnośnik nie przekazują adresu strony w `Referer`.
- **228 prób kontrolowanych** (76 × 390/768/1440 px): przeglądarka załadowała i wyświetliła dokument zastępczy wewnątrz ramki, bez nagłówka `Referer`. Sprawdzono też świeży profil, odmowę, zgodę, odświeżanie i cofnięcie zgody. Po 13 s sztucznego opóźnienia na `/kontakt/` był widoczny komunikat i dostępny link zapasowy. Przeglądarki nie sygnalizują niezawodnie błędu cross-origin przez `onError`, a `onLoad` nie potwierdza działania kalendarza — dlatego link pozostaje dostępny także po załadowaniu ramki.
- **Próba rzeczywista**: odczyt [dokumentu dostawcy](https://booksy.com/widget/index.html?id=357056&lang=pl&country=pl) pokazał właściwy gabinet, usługi, ceny i przycisk „Umów”. Chromium w środowisku podglądu zakończyło żądanie jako [`net::ERR_CONNECTION_CLOSED`](booksy-live.json). Nie potwierdzono w rzeczywistej ramce wyboru terminu, pełnej listy żądań, cookies i storage; nie dokonano rezerwacji. Zrzuty `booksy-mock-*.jpg` przedstawiają wyłącznie dokument testowy.

## Formularz

Testy Worker: 4/4 (CORS, walidacja i limit wejścia, brak sekretów i limity prób, odmowa dostawcy poczty i niepoprawne potwierdzenia). Chromium: walidacja adresu e-mail na `/`, poprawne dane na `/` i `/kontakt/` bez skonfigurowanej wysyłki zachowują treść i wyświetlają uczciwy komunikat. Na `/kontakt/` (320/390/768/1440 px) nie odnotowano POST bez konfiguracji. Niczego nie wysłano. Mechanizmy ochrony przed spamem i prośbę, by nie przesyłać danych medycznych, zachowano; treść formularza nie trafia do analityki.

## Kontrole i porównanie

- `npm ci`, `npm run build`, `check:sitemap`, `check:links`, `check:indexability`, `check:redirects`, `check:lastmod`, `check:content`, `git diff --check` i testy Workera zakończyły się poprawnie.
- **195 → 195** identycznych adresów kanonicznych w sitemapie; bez różnic w tytułach, metatagach, canonical i `robots.txt`. 31 dat lastmod ze źródłem, 2 wyłączone pliki HTML, zero stron osieroconych lub nieosiągalnych, maksymalna głębokość 2, 226 przekierowań jednoetapowych. Struktura Person i FAQ została zmieniona celowo.
- Chromium na stronie głównej: 320, 375, 390, 430, 768, 1024, 1280, 1440 i 1920 px; hierarchia sekcji, brak poziomego przewijania, FAQ i menu obsługiwane klawiaturą, widoczny fokus, walidacja formularza. Zrzuty pełnej strony z odczytanymi zdjęciami: [390 przed](home-390-przed.jpg), [390 po](home-390-po.jpg), [1440 przed](home-1440-przed.jpg), [1440 po](home-1440-po.jpg).
- Audyt bazowej wersji uwzględnił ostatnie zmiany formularza, Spark, zdjęć i oferty. Zachowano globalną wyszukiwarkę, podkreślenia linków, dotychczasową numerację oraz CSS ramki portretu. Nie przywrócono lokalnego wyszukiwania w katalogu ani akcji cytowania haseł. [Skan powtórzeń](audyt-jezyka.tsv) obejmuje 195 tras; to przegląd pomocniczy, nie deklaracja ręcznej redakcji wszystkich tekstów.
- Pliki: `app/page.tsx`, `app/{editorial,globals}.css`, polityka prywatności, sześć stron bloga; `components/{BooksyCalendar,PrivacyPreferences,ServiceCards}.tsx`; `lib/{home-content,professional-profiles,blog-publication,blog-content,entities,navigation,pages,research,site}.*`, `content/lastmod.json` oraz artefakty raportu.

## Przed publikacją

1. Właściciel potwierdza aktualny rok szkolenia, cenę i zasady spotkań z osobami niepełnoletnimi. Może podać bezpośrednie adresy profili, których nie udało się zidentyfikować.
2. Sprawdzić Booksy na rzeczywistej domenie z normalnym połączeniem na telefonie i komputerze: wyświetlenie usług, przejście do wyboru terminu bez potwierdzania wizyty, żądania i dane klienta po zgodzie oraz po jej cofnięciu.
3. Skonfigurować nadawcę, sekrety i publiczny endpoint Workera, dopuścić adres w CSP oraz wykonać test dostarczenia do skrzynki według [instrukcji Spark](../formularz-kontaktowy/SPARK.md). Bez tego formularz nie przyjmuje wiadomości do wysyłki. Żadna płatna usługa nie została aktywowana.
