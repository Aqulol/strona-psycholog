# Booksy: usunięcie osobnej aktywacji w sekcji rezerwacji

## Przyczyna i decyzja

Przycisk nie był wymagany przez API Booksy. Renderowanie iframe blokował kod witryny: `BooksyCalendar` czekał na `gabinet-booksy-consent-v1=granted` w `localStorage`, a jedyny interfejs tego wyboru był bezpośrednio nad kalendarzem. `sessionStorage` ani pliki cookies witryny nie sterowały osadzeniem. Stare `CookieBanner` i `GtmScript` nie są montowane w layoucie; nie wolno traktować poprzedniej zgody analitycznej jako zgody na Booksy.

Art. 399 ust. 1–3 [Prawa komunikacji elektronicznej](https://eli.gov.pl/eli/DU/2024/1221/ogl) dotyczy zapisu i odczytu informacji na urządzeniu, z wyjątkiem m.in. operacji koniecznych do dostarczenia usługi wyraźnie żądanej przez użytkownika. Samo połączenie z inną domeną nie przesądza o obowiązku zgody na cookies. Natomiast [dokumentacja osadzenia Booksy](https://support.booksy.com/hc/en-us/articles/23480739244434-How-to-add-a-booking-widget-to-my-website-WordPress-Joomla-and-other-CMS-Platforms) opisuje kod dostawcy, nie gwarantuje beztrackingowego wariantu, a [polityka Booksy](https://booksy.com/pl-pl/p/privacy) opisuje cookies i technologie pokrewne. Wprowadzanie opcjonalnego widgetu na podstronach o problemach psychologicznych nie jest konieczne do wyświetlenia ich treści. Nie potwierdzono, że aktualna ramka ogranicza się do operacji objętych wyjątkiem, dlatego zachowano uprzedni wybór. Nie jest to twierdzenie, że przepis zawsze wymaga zgody na dowolny widget Booksy.

## Zmiany

- Jeden panel ustawień prywatności dla witryny. Pierwsza wizyta na stronie z kalendarzem wywołuje go automatycznie, nie dopiero przy kalendarzu. Ten sam panel można otworzyć na każdej stronie przez stopkę. Akceptacja i odmowa są równorzędne. Zachowano wcześniejsze zapisane wybory; nie ustawiono żadnej domyślnej zgody.
- Z sekcji kalendarza usunięto kontrolki zgody, tekst zachęcający do aktywacji i kontener zastępczy przed zgodą. Po akceptacji istniejąca ramka ładuje się automatycznie w pobliżu sekcji. Odmowa i wycofanie zostawiają bezpośredni link. Nie dodano skryptu Booksy do dokumentu głównego.
- Zewnętrzny URL nie zawiera ścieżki tematu, a `no-referrer` zapobiega przekazaniu adresu podstrony w nagłówku `Referer`. Po zgodzie dostawca może otrzymać IP, dane przeglądarki i uruchomić własny kod w ramce; brak nagłówka nie jest gwarancją braku wszystkich możliwych korelacji po stronie dostawcy.
- Zmodyfikowano `PrivacyPreferences.tsx`, `BooksyCalendar.tsx`, `Site.tsx`, style globalne, instrukcję w polityce prywatności oraz odciski `lastmod` bez zmiany zapisanych dat. Bez wdrożenia.

## Testy

- `npm run build`, `npm run check:sitemap`, `npm run check:links` przeszły; sitemapa identyczna bajtowo z bazą. Audyt 192 tras statycznych: te same 76 miejsc osadzenia, brak starego przycisku i ramki Booksy w HTML przed zgodą.
- Chromium, osobne czyste konteksty przy 320, 390, 768, 1440 i 1920 px: pierwsza wizyta, odmowa, odświeżenie, przejście na kontakt, zmiana decyzji w stopce, powrót na stronę główną i wycofanie. Z kontrolowaną odpowiedzią potwierdzono pojedyncze żądanie po zbliżeniu do każdej sprawdzanej ramki, brak `Referer`, brak żądania po odmowie i brak przepełnienia strony. Nie testowano treści obcej ramki na makiecie jako rzeczywistego UI Booksy.
- Odczyt zewnętrznego URL zwrócił listę usług gabinetu. Próba nieprzechwyconego żądania w Chromium zakończyła się `net::ERR_CONNECTION_CLOSED`, a bezpośredni curl nie nawiązał TLS. Pusty magazyn cookies w tym kontekście **nie dowodzi**, że działający widget nie zapisuje cookies. Z sieci z dostępem do Booksy pozostaje sprawdzić rzeczywiste żądania, cookies, dostępność terminów i układ wewnątrz mobilnej ramki. Uzyskanie od dostawcy oficjalnego wariantu bez zbędnego dostępu do urządzenia pozwoliłoby ponownie ocenić konieczność zgody.
