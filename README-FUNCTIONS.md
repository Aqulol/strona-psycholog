# Firebase Functions — formularz kontaktowy

Funkcja `sendContactForm` zapisuje zgłoszenia w Firestore i wysyła je przez SMTP.
Nie zawiera żadnych sekretów w repozytorium — wszystkie wrażliwe wartości są
deklarowane w kodzie przez `defineSecret` (z `firebase-functions/params`)
i dostarczane funkcji przez Cloud Functions (opcja `secrets` w `onRequest`).

Zadeklarowane sekrety: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `SITE_URL`.

## Ustawienie sekretów (wymagane przed wdrożeniem)

W katalogu projektu (tam, gdzie jest `.firebaserc`):

```bash
firebase login
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase functions:secrets:set MAIL_TO
firebase functions:secrets:set SITE_URL
```

CLI poprosi o wartość każdego sekretu po kolei. Sugerowane wartości:

- `SMTP_HOST` — serwer poczty wychodzącej (np. `smtp.somentiq.pl`),
- `SMTP_PORT` — zwykle `587` (STARTTLS) albo `465` (TLS),
- `SMTP_USER` — login do skrzynki nadawcy,
- `SMTP_PASS` — hasło do skrzynki nadawcy,
- `MAIL_TO` — adres odbiorcy wiadomości z formularza; domyślnie (jeśli nie ustawisz) `g.plebaniak@somentiq.pl`,
- `SITE_URL` — domena produkcyjna, np. `https://twojadomena.pl`; jeśli nie ustawisz, CORS użyje `*` (wygodne testowo, ale nie na produkcję).

> **Ważne:** sekret musi istnieć ZANIM wdrożysz funkcję. Wdrożenie funkcji,
> która odwołuje się do nieustawionego sekretu, zakończy się błędem
> (CLI wskaże, którego sekretu brakuje). Po ustawieniu (lub zmianie) sekretu
> trzeba **ponownie wdrożyć funkcję**: `firebase deploy --only functions`.

Sekrety są przechowywane w Google Cloud Secret Manager — nie ma ich w repo,
więc można bezpiecznie commitować kod.

## Instalacja i wdrożenie

Z katalogu projektu:

```bash
cd functions
npm install
npm run build
cd ..
firebase login
firebase deploy --only functions,firestore,storage,hosting
```

ID projektu jest już wpisane w `.firebaserc`:
`psychologplebaniak-e4480`.

Funkcja działa w regionie `europe-west1`, więc jej adres będzie miał postać:

```
https://europe-west1-psychologplebaniak-e4480.cloudfunctions.net/sendContactForm
```

## Podpięcie formularza

W `lib/config.ts` ustaw `formEndpoint` na powyższy adres
(po wdrożeniu funkcji skopiuj go z konsoli Firebase lub z komunikatu deploya).
`components/Contact.tsx` wysyła metodą `POST` JSON z polami `name`, `contact`,
`message`, `rodo` oraz `honeypot` (puste pole honeypot jest prawidłowe).
Funkcja akceptuje również docelową nazwę `rodoConsent`.

Odpowiedzi:

- `200` — `{ "ok": true }` (także dla wypełnionego honeypota, bez zapisu),
- `400` — `{ "ok": false, "error": "..." }` dla niepoprawnych danych,
- `405` — `{ "ok": false, "error": "..." }` dla innej metody,
- `500` — `{ "ok": false, "error": "..." }` przy błędzie zapisu lub wysyłki.

## Do wdrożenia potrzebne są

ID projektu Firebase (gotowe: `psychologplebaniak-e4480`), dane SMTP
(4 sekrety `SMTP_*`), docelowy adres e-mail (`MAIL_TO`, opcjonalnie —
domyślny jest już w kodzie) oraz produkcyjna domena (`SITE_URL`).
