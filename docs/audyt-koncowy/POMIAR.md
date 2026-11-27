# Pomiar skuteczności — domyślnie wyłączony

**Nie uruchamiać bez decyzji właściciela.** Firebase pozostaje na Spark, nie ma wdrożonej analityki ani skonfigurowanego endpointu. Brak `NEXT_PUBLIC_CONVERSION_ENDPOINT` oznacza brak wysyłki i brak opcji pomiaru w UI. Same ustawienia kalendarza Booksy nie uruchamiają pomiaru. Projekt nie wymaga GA, GTM, Firebase Auth ani zmian DNS.

## Co i jak liczymy

| Zdarzenie | Warunek | Czego nie oznacza |
|---|---|---|
| `booking_click` | Aktywacja bezpośredniego linku do profilu Booksy | Otwarcia aplikacji, rozpoczęcia rezerwacji, wizyty |
| `phone_click` | Aktywacja odnośnika `tel:` z numerem gabinetu | Zrealizowanej rozmowy; numery kryzysowe nie są liczone |
| `email_click` | Aktywacja odnośnika e-mail gabinetu | Wysłania wiadomości |
| `contact_submit_success` | Odpowiedź kontaktu HTTP 2xx **i** `status: accepted` po akceptacji przez dostawcę | Dostarczenia w skrzynce, przeczytania, wizyty |
| `pricing_click` | Aktywacja linku do cennika z innej podstrony | Odsłony, zakupu, kosztu diagnozy |

Zdarzenie to dokładnie jeden tekst z zatwierdzonej listy. Nie ma właściwości niestandardowych, czasu klienta, formularza, tytułu, adresu podstrony, parametrów, referrera, historii, cookies, sesji, fingerprintingu ani automatycznego pomiaru. Pomiar wyklucza interakcje wewnątrz Booksy. Jeden nasłuch kliknięć na dokument, brak ponowień i brak dodatkowej obsługi na linkach; wielokrotne świadome kliknięcia to wielokrotne działania, nie unikalni użytkownicy. Dzień UTC przypisuje baza. Brak klucza użytkownika, nie liczymy współczynnika konwersji ani nie dopasowujemy danych do GSC czy Booksy. Bez oficjalnego mechanizmu raportującego wyłącznie nieidentyfikowalne sumy nie dodawać pomiaru startów ani wizyt. Nie importować danych pacjentów, webhooków rezerwacji ani identyfikatorów.

Przeglądarka łączy się z dokładnie jednym skonfigurowanym HTTPS adresem `/zdarzenie` bez poświadczeń i nagłówka `Referer`. Jak przy każdym połączeniu Cloudflare widzi IP, nagłówki transportowe (np. agent przeglądarki) i `Origin` zawierający **domenę**, nie ścieżkę. Tych danych kod nie zapisuje. Nie obiecujemy anonimowości samego połączenia. Worker zapisuje wyłącznie `day, event, total`; nie udostępnia publicznego odczytu. Odczyt po zalogowaniu, w **Workers & Pages → D1 → baza statystyk → Console**:

```sql
SELECT event, SUM(total) AS liczba_dzialan FROM counters
WHERE day >= date('now','-27 days') GROUP BY event ORDER BY event;
```

Nie publikować małych liczebności ani łączyć ich z kalendarzem pacjentów. Cron usuwa z aktywnej tabeli dni starsze niż 90 dni licząc z dniem bieżącym; sprawdzić wykonania crona. D1 Free ma 7 dni Time Travel. Liczniki są przybliżone: blokery, odmowa, utrata żądania, awarie i limity zaniżają; publiczny kolektor nie ma uwierzytelniania odwiedzających, więc automat może zawyżać. Limit 30/min jest przybliżony **per punkt Cloudflare**, wspólny, bez klucza per osoba; nie chroni całkowicie limitów konta. Nie używać do rozliczeń ani rozpoznawania pacjentów.

## Warianty i zweryfikowane limity

| Wariant | Prywatność i funkcja | Koszt / ograniczenia |
|---|---|---|
| Bez pomiaru | Najmniejsze ryzyko, brak nowego odbiorcy i dodatkowego ruchu; GSC do oceny wyszukiwania, bez połączenia z wizytami | 0 dodatkowych usług. Zalecany stan do zatwierdzenia poniższych warunków |
| Workers Free + D1 Free (przygotowane) | Jeden dodatkowy transport do Cloudflare, opt-in bez cookie/ID, wyłącznie sumy dzienne; brak zewnętrznego skryptu | [Workers](https://developers.cloudflare.com/workers/platform/limits/): 100 tys. żądań/dzień, 10 ms CPU/żądanie, 5 cronów/konto na Free. [D1](https://developers.cloudflare.com/d1/platform/pricing/) 100 tys. zapisów/5 mln odczytów wierszy dziennie, 5 GB/konto; [limity](https://developers.cloudflare.com/d1/platform/limits/) 10 baz, 500 MB/baza. Na Free przekroczenie limitu oznacza błędy, nie zgodę na plan płatny. Potwierdzić rezerwy na koncie; jeśli współdzielony limit może zaszkodzić kontaktowi, nie uruchamiać. |
| Sam Firebase Spark | Hosting statyczny nie przyjmuje POST do własnego procesu. Firestore: 1 GiB, 20 tys. zapisów i 50 tys. odczytów dokumentów dziennie w standardowym limicie; otwarty zapis nie jest bezpieczną alternatywą | [Cennik Firebase](https://firebase.google.com/pricing): Hosting na Spark; Functions i Storage niedostępne w bieżącej tabeli Spark. Nie zmieniać planu, nie otwierać reguł, nie podpinać licznika do archiwum kontaktu. |
| Simple Analytics | Bez cookies wg dostawcy, ale standardowe wdrożenie zbiera metadane ruchu; nie zatwierdzono trybu wyłącznie pięciu zdarzeń. Brak instalacji | [Cennik](https://www.simpleanalytics.com/pricing): 20 USD/mies. przy pokazanych 100 tys. odsłon, Free dla hobby z badge i 30 dniami historii; nie zakładamy kwalifikacji gabinetu. [Zakres danych](https://docs.simpleanalytics.com/what-we-collect). |
| GA4 / GTM | GA4 raportuje również automatyczne pola lokalizacji, tytułu, referrera i rozdzielczości, także dla custom events. GTM to mechanizm publikacji tagów, nie baza sum; nie gwarantuje minimalizacji danych. Odrzucone | Standardowa Analytics wg [Firebase](https://firebase.google.com/pricing) bez opłaty; koszt nie rozwiązuje tego przepływu danych. [Domyślne parametry GA4](https://support.google.com/analytics/answer/9234069). |

## Warunki przed decyzją o uruchomieniu

1. **Prywatność:** zatwierdzić cel, dobrowolną odrębną zgodę (RODO art. 6 ust. 1 lit. a i art. 7; ocena art. 399 [PKE](https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221) także dla pamięci urządzenia). Nie powoływać się na wyjątek „niezbędne” dla zbierania statystyk. Zweryfikować art. 9 w kontekście wnioskowania o zdrowiu, choć payload nie zawiera diagnozy ani ścieżki; ocenić ryzyko i potrzebę DPIA. Jeśli administrator nie potwierdzi podstawy i minimalizacji, pozostawić wyłączone. Nie tworzyć identyfikatora tylko dla dowodu zgody; zachować wersje UI, polityki i testów oraz potwierdzić, czy taki dowód jest wystarczający w tej konfiguracji. Uzasadnić trwałość preferencji; zmiana celu lub dostawcy wymaga nowej wersji klucza i ponownej decyzji.
2. **Dostawca:** potwierdzić [DPA](https://www.cloudflare.com/cloudflare-customer-dpa/), wykonawców, transfery/DPF albo SCC, deklarowaną lokalizację D1 i przetwarzania na brzegu, ustawienia przechowywania i wyłączenie request logs/Tail/Logpush dla kolektora. Sprawdzić, co platforma zachowuje mimo wyłączenia logów aplikacji. Uzupełnić warunkową informację z art. 13 o ustalone mechanizmy transferu/dostępu do kopii zabezpieczeń oraz retencję i odbiorców. Nie deklarować wyłączności przetwarzania w UE bez dowodu. Brak zatwierdzenia oznacza brak uruchomienia.
3. **Konfiguracja:** tylko na zatwierdzonym koncie Free. Osobna baza D1 i Worker od formularza; użyć `analytics-worker/schema.sql` oraz kopii `analytics-worker/wrangler.example.toml` jako nieśledzonego `wrangler.toml`. Wpisać rzeczywisty identyfikator D1, zweryfikowany origin witryny i osobną przestrzeń limitera. Upewnić się, że nie tworzy się dodatkowych zbiorów danych; wyłączyć publiczny preview Workera. Właściciel uruchamia zasoby ręcznie dopiero po akceptacji.
4. **Frontend:** na osobnym buildzie ustawić pełny URL w `NEXT_PUBLIC_CONVERSION_ENDPOINT`, dodać do `connect-src` tylko jego origin, pozostawić `'self'` i dokładny origin kontaktu (jeśli włączony). Bez wildcardów; walidacja odrzuci rozjazd. Wykonać testy syntetyczne i sprawdzić najpierw wariant testowy, bez danych pacjentów. Rozpoznać różnicę między konfiguracją testową i produkcyjną. Potwierdzić osobną zgodę i odwołanie z dowolnej podstrony, blokadę logów, retencję i brak nowych żądań przy odmowie również w produkcyjnej konfiguracji przed publiczną aktywacją.
5. **Wycofanie:** zbudować bez `NEXT_PUBLIC_CONVERSION_ENDPOINT` i usunąć jego origin z CSP w tej samej wersji; zatrzymać przyjmowanie nowych zdarzeń po stronie Workera. Nie usuwać istniejących zasobów/danych bez ustaleń retencji. Cofnięcie zgody użytkownika zatrzymuje następne wysyłki; nie anuluje pakietów już wysłanych i nie pozwala wskazać jego wkładu w agregat.

## Dowody i powtórzenie testów

`npm run check:conversions`; `node --test contact-worker/*.test.mjs`. Browser smoke: opcjonalny Playwright poza zależnościami witryny; `node scripts/check-conversions-browser.mjs http://localhost:3010 off` na zwykłym eksporcie; na **osobnej kopii** `NEXT_PUBLIC_CONVERSION_ENDPOINT=https://stat.synthetic.workers.dev/zdarzenie`, `NEXT_PUBLIC_CONTACT_ENDPOINT=https://mail.synthetic.workers.dev/kontakt`, dokładne dwa originy CSP, nowy build i preview na 3011; `node scripts/check-conversions-browser.mjs http://localhost:3011 on`. Można wskazać `PLAYWRIGHT_MODULE` i `CHROMIUM_EXECUTABLE`. Test przechwytuje zewnętrzne żądania (syntetyczna akceptacja i błąd formularza, atrapowy dokument Booksy); nie dotyka kont, poczty ani rezerwacji. Uruchomienie realnego D1/Worker pozostaje niezweryfikowane. Brak wyników rzeczywistych użytkowników.
