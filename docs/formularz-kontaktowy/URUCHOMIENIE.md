> Dokument historyczny. Aktualne czynności opisuje [instrukcja produkcyjna](../URUCHOMIENIE-PRODUKCYJNE.md). Odbiorca jest obecnie stały w kodzie Workera; nie ustawiaj `MAIL_TO`.

# Formularz kontaktowy — stan i uruchomienie (PowerShell)

## Ustalenia

- Publiczna strona `/kontakt/` zwróciła treść z widocznym formularzem. Bezpośredni odczyt nagłówków produkcyjnych z tego środowiska nie powiódł się (błąd TLS). Nie potwierdzono nagłówka CSP na serwerze ani adresu zaszytego w opublikowanym JavaScript.
- W repozytorium i środowisku audytu nie ma produkcyjnej wartości `NEXT_PUBLIC_CONTACT_ENDPOINT` ani zweryfikowanej nazwy subdomeny konta Workers. `name = "gabinet-kontakt"` i `workers_dev = true` deklarują konfigurację, nie dowodzą wdrożenia. Nie potwierdzono stanu konta Cloudflare, domeny nadawcy w Resend ani sekretów `MAIL_FROM`, `MAIL_TO` i `RESEND_API_KEY`. Widoczny publicznie e-mail gabinetu nie dowodzi, że jest ustawiony jako odbiorca.
- Repozytorium ma `connect-src 'self'`. Taki nagłówek, jeśli obowiązuje na produkcji, blokuje `fetch` do Workera nawet przy prawidłowym CORS. Bez zmiennej frontend w ogóle nie próbuje wysyłki. Są to odrębne warunki, nie ustalona diagnoza produkcyjna. Nie dopisano niezweryfikowanego adresu do CSP. Kompilacja produkcyjna odrzuca skonfigurowany endpoint, jeśli origin nie jest dokładnie dopuszczony w `firebase.json`. Bez konfiguracji można nadal zbudować statyczną witrynę, z widocznym formularzem komunikującym brak wysyłki.
- Po poprawnej konfiguracji frontend wysyła JSON bez cookies i adresu odsyłającego. Worker sprawdza dokładny origin `https://psychologplebaniak.pl`, metodę, typ treści, rozmiar strumienia do 8 KiB, schemat pól, honeypot, e-mail/telefon i znaki sterujące przed przycięciem. Limit wiadomości: 1000 jednostek UTF-16. Ustawia stały temat, nadawcę i odbiorcę; użytkownik steruje wyłącznie poprawnie zwalidowanym `Reply-To` oraz tekstem. Limity: 3 próby/min/IP, 8 prób wysyłki/min/lokalizację Cloudflare. Są przybliżone i nie tworzą globalnego limitu; CORS nie blokuje bezpośrednich klientów podszywających się pod origin. Worker nie loguje treści ani odpowiedzi Resend i nie przechowuje zgłoszeń; obserwowalność Workera jest wyłączona w pliku. Dostawcy nadal mogą widzieć metadane i pocztę.

## 1. Konta, prywatność i DNS

1. Użyj **Workers Free** i **Resend Free**; nie przełączaj Firebase Spark, nie uruchamiaj płatnych nadwyżek. [Cloudflare](https://developers.cloudflare.com/workers/platform/limits/) podaje 100 tys. żądań dziennie i 10 ms CPU na żądanie; [Resend](https://resend.com/pricing) podaje 100 wiadomości dziennie, 3000 miesięcznie, 3 domeny i 30 dni retencji danych w planie Free. Sprawdź warunki kont przy zakładaniu. Hosting i DNS mogą pozostać u dotychczasowych dostawców.
2. Przed udostępnieniem formularza odwiedzającym przejrzyj [DPA Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), [DPA Resend](https://resend.com/legal/dpa), warunki usług, podprocesorów, podstawy transferu oraz retencję poczty i wpisów w panelu. Uwzględnij dostawcę skrzynki i przypadkowo wpisane dane zdrowotne. Nie jest to potwierdzenie zgodności konkretnego konta ani rekomendacja do przesyłania danych medycznych. Wyłącz śledzenie otwarć i kliknięć w Resend; ogranicz dostęp do paneli i włącz MFA tam, gdzie jest dostępne.
3. W Resend → **Domains → Add Domain** dodaj osobną, wolną subdomenę wysyłkową, np. `poczta.psychologplebaniak.pl`. W panelu obecnego dostawcy DNS dodaj dokładnie rekordy dla **Sending** z panelu Resend: DKIM (`TXT`, nazwa z `_domainkey`) oraz SPF (`TXT`) i zwrotny `MX` na wskazanym hoście Return-Path (zwykle `send` w obrębie subdomeny). Użyj dokładnych nazw, wartości i priorytetów z własnego panelu, nie wartości przykładowych; nie duplikuj domeny, jeśli panel DNS dopisuje ją automatycznie. Nie włączaj odbioru przez Resend, nie wymieniaj DNS/nameserverów, nie zmieniaj istniejących rekordów MX, SPF, DKIM ani rekordów Firebase. Jeśli pod wskazaną nazwą jest kolizja, użyj innej, wolnej subdomeny zamiast nadpisywać rekord. Więcej: [domeny Resend](https://resend.com/docs/dashboard/domains/introduction).
4. Wciśnij **Verify** i zaczekaj na **Verified**. Utwórz klucz **Sending access** ograniczony do tej domeny. Przygotuj `MAIL_FROM`, np. `formularz@poczta.psychologplebaniak.pl` dla powyższego przykładu, oraz potwierdzoną przez właściciela skrzynkę `MAIL_TO`. Nie zapisuj tych wartości jako sekretów w publicznym repozytorium i nie podawaj klucza w czacie.

## 2. Worker — ręcznie, z katalogu repozytorium

Utwórz w Cloudflare subdomenę `workers.dev`. Sprawdź, czy Worker `gabinet-kontakt` już istnieje. Jeśli tak, uzgodnij aktualizację zamiast bez sprawdzenia nadpisywać działającą wersję. Pozostaw `SITE_ORIGIN` równy faktycznemu origin witryny (domyślnie `https://psychologplebaniak.pl`, bez końcowego ukośnika). Jeśli alias `www` nie przekierowuje na domenę kanoniczną, ustal docelowy origin; nie dodawaj wildcardów. Zachowaj oddzielne identyfikatory limitów dla osobnego Workera testowego.

```powershell
npx wrangler@4.169.0 login
npx wrangler@4.169.0 deploy --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret put RESEND_API_KEY --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret put MAIL_FROM --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret put MAIL_TO --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret list --config contact-worker/wrangler.toml
```

Wartości wpisz na interaktywne zaproszenia. `secret list` pokazuje nazwy, nie weryfikuje wartości. Przy pierwszym wdrożeniu bez sekretów poprawne zgłoszenie zwróci `503`. Skopiuj **rzeczywisty** URL z konsoli (nie zgaduj subdomeny); do origin dopisz `/kontakt`. Sprawdź CORS bez wysyłania wiadomości:

```powershell
$endpoint = Read-Host 'Zweryfikowany URL Workera wraz z /kontakt'
$site = 'https://psychologplebaniak.pl'
curl.exe -i -X OPTIONS $endpoint -H "Origin: $site" -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'
curl.exe -i -X OPTIONS $endpoint -H 'Origin: https://nieuprawniona.example' -H 'Access-Control-Request-Method: POST'
```

Pierwszy wynik: `204`, `Access-Control-Allow-Origin` równy `$site`, dopuszczony `POST` i `Content-Type`. Drugi: `403` bez nagłówka zezwalającego. Preflight potwierdza komunikację i reguły CORS, **nie** konfigurację Resend.

## 3. Hosting — dopiero po weryfikacji URL

```powershell
$env:NEXT_PUBLIC_CONTACT_ENDPOINT = $endpoint
$workerOrigin = ([uri]$endpoint).GetLeftPart([System.UriPartial]::Authority)
Write-Output "connect-src 'self' $workerOrigin;"
```

W `firebase.json` w `Content-Security-Policy` reguły `**` zastąp tylko `connect-src 'self';` wypisanym wierszem. Bez ścieżki, wildcardów lub zmian w innych dyrektywach. Zmienna jest **publiczna** i musi być ustawiona podczas `npm run build`. Można alternatywnie ustawić `NEXT_PUBLIC_CONTACT_ENDPOINT=...` w ignorowanym `.env.production.local`; zmienna PowerShell ma pierwszeństwo i znika po zamknięciu konsoli. Nie ustawiaj żadnego sekretu w `NEXT_PUBLIC_*`.

```powershell
npm ci
node --test contact-worker/index.test.mjs contact-worker/hosting.test.mjs
npm run build
npm run check:sitemap
npm run check:links
```

Jeśli testy albo build zwrócą błąd, nie publikuj. Najpierw przetestuj odrębną wersję z Workerem, skrzynką i originem przeznaczonymi do testów; nie rozszerzaj produkcyjnego CORS na domeny podglądu. Po weryfikacji zbuduj jeszcze raz z produkcyjnym URL i produkcyjną polityką CSP. Polecenie ręczne właściciela, nie część kompilacji:

```powershell
firebase deploy --only hosting --project psychologplebaniak-e4480
curl.exe -sSI https://psychologplebaniak.pl/kontakt/
```

Sprawdź faktyczny CSP w odpowiedzi i w narzędziach deweloperskich przeglądarki. Wykonaj jedno uzgodnione zgłoszenie z syntetyczną treścią i kontrolowanym adresem testowym. Sprawdź `OPTIONS`, `POST`, komunikat i wpis w Resend, a następnie rzeczywisty odbiór w docelowej skrzynce (również spam) i `Reply-To`. `200` z `status: accepted` oznacza tylko akceptację przez Resend; dostarczenie potwierdza dopiero skrzynka. Nie powtarzaj automatycznie wysyłki po timeout: usługa mogła przyjąć wiadomość przed utratą odpowiedzi. Po zakończeniu możesz usunąć zmienną z bieżącej konsoli poleceniem `Remove-Item Env:NEXT_PUBLIC_CONTACT_ENDPOINT`.

## Wynik audytu a produkcja

Testy jednostkowe Workera z syntetycznymi danymi i atrapą API sprawdzają poprawną akceptację, niepoprawne zgłoszenie, honeypot, przekroczenie rozmiaru, brak konfiguracji, niedostępność sieci, oba limity lokalne, limit i błąd usługi pocztowej oraz błędne potwierdzenie. Test konfiguracji sprawdza dopasowanie CSP i odrzucanie wildcardu. Nie wykonano wdrożenia, nie zmieniono DNS, nie wysłano wiadomości przez Resend i **nie potwierdzono dostarczenia do skrzynki**.

Wyniki lokalne: **8/8** testów (`node --test contact-worker/*.test.mjs`), `npm run build`, sitemap i linki (**194** trasy). Faktyczna próba kompilacji z syntetycznym endpointem i `connect-src 'self'` została odrzucona; osobna paczka z dokładnie dopasowanym originem zbudowała się. W Chromium uruchomiono tę osobną paczkę z nagłówkiem CSP i przechwycono **14 POST-ów** (po 7 na `/` i `/kontakt/`): błędy sieci, `400`, dwa warianty `429`, `503`, nieprawidłowe `200` i symulowane `accepted`. Błędny adres nie wysyłał nic; niepowodzenia zachowały treść, a pola czyściły się tylko po symulowanej akceptacji. Przechwycone POST-y nie miały Referer. Żądania były przechwycone lokalnie, więc ten test nie potwierdza połączenia z Cloudflare ani z Resend.
