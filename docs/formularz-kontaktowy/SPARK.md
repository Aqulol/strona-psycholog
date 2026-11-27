# Formularz kontaktowy na Firebase Spark

## Przyczyna i historia

`firebase.json` z PR #85 rejestrował katalog `functions`, hook kompilacji TypeScript i rewrite `/api/kontakt` do `sendContactForm`. Zwykłe `firebase deploy` próbowało zbudować i wdrożyć funkcję v2, co wymaga Cloud Build i powiązanej konfiguracji rozliczeń Blaze; błąd nie wynikał z Next.js, samego Hostingu ani z reguł Firestore. Usunięto cel Functions, jego kod i lockfile, rewrite oraz nieużywany SDK Firebase w Next.js. Nigdy nie usuwano danych Firebase. `firebase.json` ma teraz wyłącznie cel `hosting` ze statycznym `out/`; jego hook tylko sprawdza mapę. Test konfiguracji odrzuca dodatkowe typy wdrożeń i wszystkie rewrites.

Bezpośrednio przed [PR #71](https://github.com/Aqulol/strona-psycholog/pull/71) (`6126f84`) formularz na stronie głównej i `/kontakt/` korzystał z webowego `addDoc` do `/messages`. Zapis mógł działać na Spark, ale nie wysyłał e-maila i umożliwiał pisanie publicznemu klientowi. Oddzielna funkcja SMTP nie była wywoływana przez ten formularz. Dlatego nie przywrócono starej ścieżki. Nie znaleziono innej działającej funkcjonalności eksportu korzystającej z Firestore SDK. `firestore.rules` zachowano lokalnie bez zmian; sprawdź w konsoli, czy **wdrożona** reguła `/messages` blokuje publiczny odczyt i zapis. Jeżeli historycznie pozostało `allow create`, właściciel może osobno poprawić ten fragment w konsoli po przeglądzie pozostałych reguł. Zmiana Hostingu nie publikuje reguł i nie zmienia dokumentów.

## Porównanie (26 listopada 2026)

| Opcja | Darmowy limit i wymagania | Prywatność i bezpieczeństwo |
|---|---|---|
| **Formspree** | [50/mies.](https://formspree.io/plans), konto i publiczny URL formularza, AJAX, ograniczenie domeny i podstawowe filtry/antyspam. Free opisany jako dla testów i rozwoju. | Widok historii 30 dni to **nie** okres usunięcia; dostawca opisuje zapis do czasu usunięcia. [Deklaruje SCC](https://formspree.io/security/); nie potwierdzono gotowej umowy dla konkretnego konta Free. |
| **Web3Forms** | [250/mies.](https://web3forms.com/pricing), publiczny access key, wbudowane filtry/hCaptcha, ograniczenie domeny wymienione w Pro. | [DPA dla klientów](https://web3forms.com/dpa); [polityka](https://web3forms.com/privacy) opisuje przetwarzanie z udziałem dostawców infrastruktury w wielu regionach, Indie, retencję do 3 lat (możliwy krótszy okres) i potencjalne przekazanie IP/e-maila dostawcom antyspamu. |
| **EmailJS** | [200 żądań/mies.](https://www.emailjs.com/pricing/), plan Free oznaczony „For Testing”, publiczna integracja z uprzednio połączoną usługą pocztową i szablonem, domenowa allowlista poza Free. | [DPA](https://www.emailjs.com/legal/data-protection-agreement/); przekazuje dane do usługi pocztowej, domyślnie historia ze zmiennymi na 7 dni w Free, można ją wyłączyć. |
| **Google Apps Script** | [100 odbiorców/dzień](https://developers.google.com/apps-script/guides/services/quotas) dla konta konsumenckiego; publiczny web app, uprawnienie MailApp, osobna ochrona przed spamem i obsługa ograniczeń CORS/odpowiedzi. | [DPA Google Workspace](https://workspace.google.com/terms/dpa_terms.html) dotyczy objętych produktów/umów; nie należy zakładać powierzenia dla darmowego prywatnego Gmaila. Uruchamianie jako właściciel wymaga ograniczenia uprawnień. |
| **Cloudflare Workers + Resend** | [Workers Free: 100 tys. żądań/dobę](https://developers.cloudflare.com/workers/platform/limits/), [Resend Free: 100 e-maili/dobę, 3 tys./mies.](https://resend.com/docs/knowledge-base/what-is-resend-pricing), dwa konta, weryfikacja domeny pocztowej DNS i klucz o zakresie wysyłki. Nie wymaga przenoszenia hostingu ani DNS do Cloudflare. | Osobna walidacja, stały odbiorca, jawny kod, brak bazy zgłoszeń i brak skryptu analitycznego. [Cloudflare DPA](https://www.cloudflare.com/cloudflare-customer-dpa/) obejmuje umowę self-serve, [Resend DPA](https://resend.com/legal/dpa) jest częścią warunków; przejrzeć transfery i podprocesorów. [Resend deklaruje 30 dni retencji na Free](https://resend.com/pricing). |
| **Własny endpoint HTTPS i istniejący dostawca poczty** | Alternatywa przy już posiadanym serwerze i skrzynce z SMTP. Darmowy limit zależy od istniejących umów; nie ma podstaw do zagwarantowania kosztu 0. | Potencjalnie mniej dostawców; operator odpowiada za aktualizacje, rate limiting, retencję, DPA hostingu i poczty oraz obserwację doręczeń. Brak potwierdzonego istniejącego zaplecza do wykorzystania. |

Wybrano **Worker + Resend** zamiast publicznego relay z dashboardem zgłoszeń. Umożliwia wymuszenie dokładnego schematu, ograniczenie 8 KiB, stałego odbiorcy, jawnej retencji po stronie witryny (brak kopii) i rozdzielenie klucza pocztowego od przeglądarki. Kod używa wyłącznie funkcji z planów bezpłatnych, nie konfiguruje metod płatności ani nadwyżek. Limity i warunki zweryfikuj ponownie przy rejestracji; nie wybieraj planu płatnego ani nie podawaj karty, jeśli dostawca zmieni warunki. Nie utworzono kont.

## Przepływ i zabezpieczenia

Przeglądarka wysyła JSON bez cookies i bez nagłówka Referer bezpośrednio do podanego adresu `*.workers.dev`; przeglądarka ujawnia origin domeny dla CORS, nie ścieżkę. Worker widzi pola formularza i dane połączenia; adres IP z Cloudflare działa jako klucz krótkiego limitu. Resend otrzymuje imię, e-mail, opcjonalny numer telefonu, temat, treść oraz adresy nadawcy i skrzynki gabinetu. Nie otrzymuje adresu IP odwiedzającego z Workera. Poczta idzie tekstem przez HTTPS API i dalej do dostawcy skrzynki, bez załączników, automatycznej odpowiedzi czy zdarzeń analitycznych. Worker nie przechowuje zgłoszeń i nie loguje treści, a obserwowalność jest wyłączona w konfiguracji. Nie oznacza to braku metadanych u dostawców ani szyfrowania end-to-end poczty.

Ograniczenia: CORS z dokładną domeną jest ochroną przeglądarkową, nie uwierzytelnia bota. Są też walidacja serwerowa, pułapka oraz [limity Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) 3 próby/min/IP i 8 prób wysyłki/min/lokalizację. Liczniki Cloudflare są przybliżone, nie jest to limit globalny. Resend wymusza własny dzienny/miesięczny limit konta; po błędzie lub wyczerpaniu limitu formularz nie pokazuje sukcesu, a treść pozostaje w polach. Akceptacja i identyfikator Resend **nie są gwarancją doręczenia**; UI mówi wprost „przyjęta do wysyłki”. W razie niejednoznacznego błędu po przyjęciu wiadomości ręczne ponowienie może dać duplikat.

**Przed ruchem prawdziwych użytkowników** administrator musi zweryfikować [warunki Resend](https://resend.com/legal/terms-of-service), obie umowy i listy podprocesorów, transfery poza EOG, zasady retencji w Resend i skrzynce oraz obsługę przypadkowo przesłanych danych zdrowotnych. DPA nie oznacza automatycznej zgody na przesyłanie takich danych. Formularz jest organizacyjny; nie wymaga i nie powinien przyjmować dokumentacji medycznej. Wolny tekst oznacza, że nie da się technicznie zagwarantować braku przypadkowych danych zdrowotnych. Jeśli nie da się zaakceptować tego ryzyka u tych dostawców, nie kierować prawdziwych zgłoszeń do nich przed uzgodnieniem odpowiedniego kanału. Wyłączyć w Resend śledzenie kliknięć/otwarć dla domeny wysyłkowej i ograniczyć dostęp do kont oraz skrzynki.

## Konfiguracja jednorazowa — ręcznie przez właściciela

1. Załóż lub użyj **Cloudflare Workers Free** oraz **Resend Free**. Nie uruchamiaj planów płatnych. W Resend → **Domains → Add Domain** dodaj subdomenę pocztową pozostającą pod Twoją kontrolą (np. `poczta.psychologplebaniak.pl`), wprowadź rekordy pokazane przez panel u obecnego dostawcy DNS i zaczekaj na status **Verified**. Nie zmieniaj rekordów służących do odbioru istniejącej poczty lub hostingu głównej domeny. Utwórz klucz w **API Keys** z uprawnieniem **Sending access** ograniczonym do tej domeny.
2. Sprawdź `SITE_ORIGIN` w `contact-worker/wrangler.toml` (domyślnie `https://psychologplebaniak.pl`). Skonfiguruj subdomenę `workers.dev` w Cloudflare. Nadaj jej własną nazwę. Jeśli konto zawiera już te identyfikatory przestrzeni limitów, wybierz wolne wartości `namespace_id`. Uruchom z katalogu repozytorium (Node zgodny z używaną wersją Wrangler):

   ```sh
   npx wrangler@4.169.0 login
   npx wrangler@4.169.0 deploy --config contact-worker/wrangler.toml
   npx wrangler@4.169.0 secret put RESEND_API_KEY --config contact-worker/wrangler.toml
   npx wrangler@4.169.0 secret put MAIL_FROM --config contact-worker/wrangler.toml
   npx wrangler@4.169.0 secret put MAIL_TO --config contact-worker/wrangler.toml
   ```

   `MAIL_FROM` to pojedynczy adres na zweryfikowanej domenie, `MAIL_TO` to pojedyncza kontrolowana skrzynka. Dane wpisuj do interaktywnych poleceń, nie do repozytorium ani do zmiennych `NEXT_PUBLIC_*`. Pierwszy deploy Workera bez sekretów zwraca błąd `503`, nie wysyła poczty. Endpoint to `https://gabinet-kontakt.<twoja-subdomena>.workers.dev/kontakt`.
3. W nieśledzonym `.env.production.local` ustaw `NEXT_PUBLIC_CONTACT_ENDPOINT` na **pełny** URL z kroku 2. To publiczny URL, nie klucz. W `firebase.json`, w nagłówku `Content-Security-Policy`, zmień **tylko** `connect-src 'self';` na `connect-src 'self' https://gabinet-kontakt.<twoja-subdomena>.workers.dev;`, wpisując ten sam dokładny origin bez `/kontakt` i bez wildcard. URL jest wbudowywany w statyczny JS przy budowie. Bez konfiguracji formularz pozostaje widoczny i nie wysyła wpisanych danych nigdzie; po próbie informuje o niedostępności, nie udaje wysyłki.
4. Przed publikacją przetestuj osobnego Workera z inną nazwą/skrzynką testową i `SITE_ORIGIN` równym **dokładnemu** adresowi testowej witryny (np. znany adres kanału Firebase Preview); zmień publiczny endpoint i CSP tylko dla swojej paczki testowej. Wypełnij formularz neutralnym tekstem, sprawdź wpis w Resend i odbiór w skrzynce, `Reply-To` oraz odmowę dla obcej domeny. Nigdy nie dopisuj wildcard ani domeny podglądu do produkcyjnego Workera. Po teście zbuduj ponownie z produkcyjnym adresem. Gdy nie ma kompletnej konfiguracji testowej, nie uznawaj wysyłki za zweryfikowaną.
5. Ręczne wdrożenie strony, po przygotowaniu parametrów produkcyjnych:

   ```sh
   npm ci
   npm run build
   npm run check:sitemap
   npm run check:links
   firebase deploy --only hosting --project psychologplebaniak-e4480
   ```

   Następnie uzgodnij jeden test end-to-end ze strony produkcyjnej, potwierdź odbiór w skrzynce (również sprawdź spam), usuń wiadomość testową zgodnie z zasadami retencji. Zmiany wyglądu nie wymagają publikacji Workera. Cofnięcie Hostingu nie zmienia Workera ani reguł Firestore.

## Wykonana weryfikacja

- `npm ci`, `npm run build`, `npm run check:sitemap`, `npm run check:links`, kontrola 226 przekierowań i testy błędów mapy: OK. Porównano z eksportem bazowego commita `7c20e9f`: **195 kanonicznych tras**, identyczne bajtowo `sitemap.xml` i `robots.txt`, identyczne metadata/JSON-LD/canonical i reguły przekierowań. Z treści stron zmieniono tylko opis podmiotów przetwarzających w polityce prywatności; wygląd i miejsca formularzy pozostają bez zmian.
- Lokalny emulator uruchomił wyłącznie Hosting w projekcie `demo-contact-spark`. Hook walidacji przeszedł; stare `/api/kontakt` zwraca `404`. Chromium: formularze widoczne przy 390 i 1440 px, bez przepełnienia i bez zewnętrznego POST przy braku konfiguracji, dane pozostają w polach. `wrangler deploy --dry-run` zweryfikował pakiet i oba bindingi bez publikacji. Osobny eksport z testowym URL i dokładnym CSP wykonał w Chromium cztery preflighty i cztery rzeczywiste POST-y do lokalnego handlera HTTPS. Handler bez sekretów zwrócił cztery błędy `503`, bez wycieku nagłówka Referer; pola pozostały wypełnione, a ponowienie było możliwe. Nie zestawiano połączenia z Resend.
- `node --test contact-worker/index.test.mjs`: CORS, walidacja, rozmiar, pułapka, brak konfiguracji, limity i odrzucenie przy błędzie/złym potwierdzeniu usługi. Testy nie symulowały doręczenia. Brak konfiguracji testowego konta i skrzynki: nie wysłano wiadomości, nie zweryfikowano produkcyjnego odbioru ani nie wykonano `firebase deploy`. `npm ci` sygnalizuje znane luki w pozostawionych zależnościach witryny; ich aktualizacja jest niezależna od zmiany transportu.
