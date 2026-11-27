# Uruchomienie produkcyjne — instrukcja właściciela

Kroki wykonaj ręcznie w PowerShellu, w katalogu repozytorium. Potrzebujesz Node.js 22, dostępu właściciela do Firebase, obecnego panelu DNS oraz bezpłatnych kont Cloudflare Workers i Resend. **Nie włączaj Blaze, planu płatnego, płatnych nadwyżek ani nie podawaj karty.** Jeśli panel wymaga płatności lub nie możesz zaakceptować zasad przetwarzania danych, przerwij konfigurację. Formularz bez transportu uczciwie informuje, że wysyłka jest niedostępna.

## 1. Przygotuj wysyłkę poczty

1. Wybierz **Resend Free** (100 wiadomości dziennie, 3000 miesięcznie). W Resend → **Domains → Add Domain** dodaj nieużywaną subdomenę wysyłkową, np. `poczta.psychologplebaniak.pl`. W obecnym panelu DNS dodaj tylko rekordy **Sending** pokazane przez Resend (DKIM, SPF i zwrotny MX na wskazanym hoście). Użyj wartości z własnego panelu. Nie zmieniaj istniejących rekordów odbiorczych, rekordów Firebase ani serwerów nazw. Kliknij **Verify** i poczekaj na **Verified**. Nadawca np. `formularz@poczta.psychologplebaniak.pl` musi używać tej zweryfikowanej domeny. Adres odbiorczy Gmail jest stały w Workerze; nie ustawiaj `MAIL_TO`.
2. W Resend → **API Keys → Create API Key** wybierz **Sending access** dla tej domeny. Nie wklejaj klucza do pliku, polecenia ani czatu. Wyłącz tracking otwarć i kliknięć. Przed przyjęciem realnych zgłoszeń potwierdź [DPA Resend](https://resend.com/legal/dpa), [DPA Cloudflare](https://www.cloudflare.com/cloudflare-customer-dpa/), transfery i dostęp do danych, włącz MFA i wyłącz dodatkowe logowanie ruchu Workera. Resend podaje 30 dni retencji w Free. W skrzynce i archiwum stosuj zasady opisane w polityce gabinetu; korespondencję organizacyjną usuwaj po obsłudze i nie przechowuj dłużej niż przyjęty okres, a dokumentację traktuj osobno.
3. W Cloudflare → **Workers & Pages** nie zmieniaj planu **Free**. Utwórz subdomenę `workers.dev`, jeśli jej nie ma. Jeżeli Worker `gabinet-kontakt` już istnieje, najpierw potwierdź projekt i zachowaj możliwość cofnięcia wersji. Sprawdź `SITE_ORIGIN` w `contact-worker/wrangler.toml`: `https://psychologplebaniak.pl`, bez ukośnika. Wykonaj:

```powershell
npx wrangler@4.169.0 login
npx wrangler@4.169.0 deploy --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret put RESEND_API_KEY --config contact-worker/wrangler.toml
npx wrangler@4.169.0 secret put MAIL_FROM --config contact-worker/wrangler.toml
```

Podaj klucz i adres nadawcy wyłącznie po wyświetleniu zaproszeń. Odbiorcą jest `gpplebaniak@gmail.com`. Skopiuj rzeczywisty URL Workera z panelu; dopisz `/kontakt`. Sprawdź CORS — to jeszcze nie jest test dostarczenia:

```powershell
$endpoint = Read-Host 'Wklej adres HTTPS Workera kończący się na /kontakt'
$site = 'https://psychologplebaniak.pl'
curl.exe -i -X OPTIONS $endpoint -H "Origin: $site" -H 'Access-Control-Request-Method: POST' -H 'Access-Control-Request-Headers: content-type'
```

Oczekiwane: `204`, `Access-Control-Allow-Origin: https://psychologplebaniak.pl`, dopuszczone `POST` i `Content-Type`. Przy innej odpowiedzi nie wdrażaj jeszcze witryny.

## 2. Sprawdź aktywne reguły Firebase i przygotuj eksport

W [konsoli projektu](https://console.firebase.google.com/project/psychologplebaniak-e4480/overview) potwierdź **Spark**. Otwórz **Firestore Database → Rules** oraz **Storage → Rules**, jeśli usługa istnieje. Porównaj aktywne reguły z `firestore.rules` i `storage.rules`. W **Project settings → Users and permissions** sprawdź osoby i konta techniczne z dostępem, również w Google Cloud IAM. Zweryfikuj bez pobierania treści, czy inne aplikacje potrzebują zasobów i czy dawne `/messages` nie są dostępne dla zwykłego zalogowanego użytkownika. Storage nie jest potrzebny tej witrynie i nie trzeba go aktywować. Nie publikuj reguł w ciemno, nie usuwaj danych i nie generuj klucza konta usługi tylko do audytu. `deploy --only hosting` nie zmienia reguł. Alternatywny PowerShell do obsługi nowych wiadomości nie jest potrzebny: nie zapisujemy ich do Firestore.

W tej samej konsoli PowerShell wykonaj:

```powershell
$env:NEXT_PUBLIC_CONTACT_ENDPOINT = $endpoint
Remove-Item Env:NEXT_PUBLIC_CONVERSION_ENDPOINT -ErrorAction SilentlyContinue
$workerOrigin = ([uri]$endpoint).GetLeftPart([System.UriPartial]::Authority)
Write-Output "connect-src 'self' $workerOrigin;"
```

Otwórz `firebase.json`. W nagłówku `Content-Security-Policy` reguły `**` zastąp dokładnie fragment `connect-src 'self';` wypisanym wierszem. Nie dopisuj wildcardów ani domen GA4. Usuń ewentualną wartość `NEXT_PUBLIC_CONVERSION_ENDPOINT` z lokalnych plików `.env*`, aby pomiar pozostał wyłączony. Zmienna `NEXT_PUBLIC_CONTACT_ENDPOINT` jest publiczna, nie wpisuj do niej klucza. Następnie:

```powershell
npm ci
node --test contact-worker/*.test.mjs
npm run build
npm run check:sitemap
npm run check:links
npm run check:indexability
npm run check:redirects
```

Jeśli wszystko przejdzie, zaloguj się i opublikuj wyłącznie Hosting:

```powershell
npx firebase-tools login
npx firebase-tools deploy --only hosting --project psychologplebaniak-e4480
node scripts/check-hosting.mjs https://psychologplebaniak.pl
```

## 3. Potwierdź działanie po wdrożeniu

- W `/kontakt/` prześlij **jedną syntetyczną wiadomość** z kontrolowanym adresem zwrotnym. W zakładce **Network** sprawdź odpowiedź `200` i `status: accepted`, a w Resend status dostawy. Następnie odbierz wiadomość w Gmailu, sprawdź Spam i pole odpowiedzi. Sam komunikat witryny oznacza przyjęcie do wysyłki, nie dostarczenie. Przy braku potwierdzenia nie wysyłaj wielokrotnie tej samej wiadomości; sprawdź wpis dostawcy i konfigurację CSP/Workera.
- Otwórz stronę w oknie prywatnym na telefonie i komputerze. „Sprawdź dostępne terminy” ma otworzyć publiczny profil Booksy bez zgody w witrynie. Nie twórz próbnej wizyty.
- **GA4: niczego nie instaluj ani nie konfiguruj na stronie.** Dawna właściwość nie jest używana przez ten kod, nie zakładaj nowej. Opcjonalny licznik także pozostaje wyłączony. W czystym profilu przeglądarki w **Network** sprawdź brak `google-analytics`, `googletagmanager` i żądań `/zdarzenie`, również po wyszukiwaniu i kliknięciu linków. Jeżeli stary skrypt nadal działa na produkcji, najpierw sprawdź opublikowaną wersję i ustawienia hostingu, nie dodawaj kolejnego tagu.
