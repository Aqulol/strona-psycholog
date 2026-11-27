# Audyt osadzonego kalendarza Booksy

## Zakres i wynik

Porównano **192 kanoniczne podstrony** z dwóch statycznych eksportów przed i po zmianie. Przycisk „Pokaż kalendarz Booksy” był obecny na **76 stronach**: stronie głównej, `/kontakt/` i 74 stronach tematycznych `/w-czym-pomagam/<temat>/`. [Pełna lista tras](trasy.txt). Oferta, oddzielne strony usług, gabinet, cennik, strony odbiorców i pozostałe podstrony nie zawierały tego osadzenia; nie dodano im widgetu. Zwykłe odnośniki rezerwacji pozostawiono. Istniejący alternatywny komponent `ContactInfo` korzysta z tego samego `BooksyCalendar`, ale jego sekcja nie jest używana w obecnym eksporcie.

Usunięto przełączniki „Pokaż kalendarz Booksy” i „Ukryj: …”, zbędne kontenery oraz instrukcje ręcznego otwierania. Wszędzie używany jest jeden `BooksyCalendar`. Po zgodzie widget ładuje się automatycznie w odległości ok. 240 px od obszaru widocznego i pozostaje załadowany przy przewijaniu. Nie ma drugiego kliknięcia po zgodzie. Google Maps nadal działa niezależnie i wymaga ręcznej aktywacji.

## Prywatność, wydajność i ograniczenia

- Aktualny layout nie montuje starego `CookieBanner` ani `GtmScript`. Historyczna zgoda analityczna nie jest zgodą na Booksy. Booksy opisuje [integrację przez kod dostawcy](https://support.booksy.com/hc/en-us/articles/23480739244434-How-to-add-a-booking-widget-to-my-website-WordPress-Joomla-and-other-CMS-Platforms) oraz stosowanie cookies i podobnych technologii w [polskiej polityce prywatności](https://booksy.com/pl-pl/p/privacy). Dokumentacja nie potwierdza, że istniejący URL iframe jest wolny od cookies. Zachowano go i zastosowano osobny, dobrowolny wybór dotyczący osadzenia.
- Bez zgody komponent nie wysyła żądania do Booksy. Wybór zapamiętuje `localStorage` na tej domenie; można go wycofać w każdej sekcji z kalendarzem, także synchronicznie między otwartymi kartami. Wycofanie usuwa ramkę, nie cofa wcześniej przekazanych danych ani nie kasuje cookies dostawcy. Przy zgodzie Booksy otrzymuje dane połączenia (np. IP); żądanie iframe ma `referrerPolicy="no-referrer"`. Dostawca może uruchamiać skrypty lub stosować cookies w swojej ramce. Bez JS pozostaje zwykły link.
- Nie dodano skryptu Booksy do głównego dokumentu. Jedna ramka na trasę, dopiero po zgodzie i zbliżeniu. Po zgodzie miejsce na ramkę ma ustaloną responsywną wysokość, więc wczytanie odpowiedzi nie zmienia wysokości ramki. Nie wykonano pomiaru CLS na produkcji; przy pierwszej akceptacji sekcja celowo się rozszerza.
- Zwykły link rezerwacji jest zawsze widoczny. Przy długim ładowaniu pojawia się podpowiedź. Ze względu na izolację między domenami zdarzenie `load` nie dowodzi gotowości widgetu ani nie pozwala niezawodnie odczytać błędu HTTP z ramki; link jest dostępny również wtedy, gdy taka awaria nie zostanie wykryta.

## Testy

- `npm ci`, `npm run build`, `npm run check:sitemap`, `npm run check:links` i `git diff --check` przeszły. Sitemapa przed i po identyczna bajtowo (192 adresy, 23 daty); metadane, canonical i JSON-LD porównano na wszystkich 192 trasach. Profil Booksy i ceny bez zmian.
- Chromium/Playwright z kontrolowaną odpowiedzią testową **532/532**: wszystkie 76 stron × **320, 375, 390, 768, 1024, 1440 i 1920 px**. Sprawdzono pojedyncze żądanie iframe, automatyczne wczytanie, brak nagłówka `Referer`, brak poziomego przepełnienia dokumentu oraz dopasowanie ramki. Osobno: odmowa, brak żądania przed zgodą i z dala od sekcji, zapamiętanie wyboru, wycofanie między kartami, odnośnik bez JavaScriptu, komunikat po 12 s oraz stabilna wysokość po opóźnionej odpowiedzi.
- **Rzeczywisty widget:** narzędzie odczytu zewnętrznego URL zwróciło treść widgetu gabinetu z dwiema usługami. Nie zastępuje to próby osadzenia. W Chromium bez makiety na `/`, `/kontakt/` i `/w-czym-pomagam/depresja/` próby zakończyły się `net::ERR_CONNECTION_CLOSED`; także bezpośredni curl nie nawiązał TLS. Nie potwierdzono działania wyboru terminu na żywo, rzeczywistego zestawu cookies ani układu wewnątrz widgetu na telefonie. Przed wdrożeniem sprawdzić te elementy z sieci mającej dostęp do Booksy, w tym z blokadą cookies stron trzecich. Nie wykonano rezerwacji ani wdrożenia.

## Zmienione pliki

- `components/BooksyCalendar.tsx` — wspólny widget, zgoda, odroczenie i link awaryjny.
- `components/BookingAndContact.tsx`, `components/BookingSidebar.tsx` — podłączenie wspólnego komponentu i usunięcie przełączników.
- `app/globals.css` — obszar ramki, ułożenie kontrolek i wyrównanie kolumn rezerwacji.
- `app/polityka-prywatnosci/page.tsx` — opis zgody, połączenia, cookies i wycofania.
- `content/lastmod.json` — aktualizacja pięciu odcisków bez zmiany zapisanych dat, aby zachować sitemapę zgodnie z zakresem zadania.
- `docs/booksy/` — raport i lista tras.
