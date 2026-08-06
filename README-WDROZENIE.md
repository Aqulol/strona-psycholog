# Wdrożenie strony gabinetu — instrukcja krok po kroku

Strona gabinetu psychologicznego Grzegorza Plebaniaka (Wrocław Gaj).
Projekt Firebase: **psychologplebaniak-e4480** (region funkcji: `europe-west1`).

Czas wdrożenia: ok. 1–2 godziny. Nie wymaga znajomości programowania —
wystarczy wykonywać polecenia w terminalu (na komputerze z systemem Windows,
macOS lub Linux).

---

## Krok 1 — Przygotowanie

1. Zainstaluj **Node.js LTS** (wersja 20 lub nowsza) ze strony
   https://nodejs.org — podczas instalacji zaznacz domyślne opcje.
2. Zainstaluj **Firebase CLI** (w terminalu):
   ```bash
   npm install -g firebase-tools
   ```
3. Zaloguj się do Firebase (konto Google już istnieje):
   ```bash
   firebase login
   ```
   Przeglądarka otworzy stronę logowania — wybierz konto właściciela projektu.
4. **Uzupełnij placeholdery w kodzie** — wszystkie dane, których jeszcze nie ma,
   są oznaczone `[do uzupełnienia]`. Wpisz prawdziwe dane w tych miejscach:

   | Plik | Co uzupełnić |
   |---|---|
   | `lib/config.ts` | `formEndpoint` (adres funkcji — patrz Krok 4), opcjonalnie `gtmId` i `ga4Id` z kont Google |
   | `lib/config.ts` | `formEndpoint` (adres funkcji — patrz Krok 4), `gtmId` (opcjonalnie) i `ga4Id` (opcjonalnie) z kont Google |
   | `app/layout.tsx` | meta tag weryfikacji Search Console (opcjonalnie, patrz Krok 5) |

## Krok 2 — Pobierz kod

```bash
git clone <adres-repozytorium-wlasciciela> gabinet-plebaniak
cd gabinet-plebaniak
```
Jeśli otrzymałeś projekt jako spakowany folder — rozpakuj go i wejdź do środka.

## Krok 3 — Zbuduj projekt

W katalogu projektu (`gabinet-plebaniak`) wykonaj po kolei:

```bash
npm install
cd functions
npm install
npm run build
cd ..
NODE_OPTIONS='--max-old-space-size=2048' npm run build
```

Na końcu w katalogu projektu powstanie folder **`out/`** — to gotowa strona.
(Polecenie `NODE_OPTIONS=...` to tylko zwiększenie pamięci dla procesu budowania.)

## Krok 4 — Wdróż na Firebase

1. Ustaw **sekrety** (hasła i dane SMTP) — CLI zapyta o każdą wartość po kolei.
   Wykonaj w katalogu projektu:
   ```bash
   firebase functions:secrets:set SMTP_HOST
   firebase functions:secrets:set SMTP_PORT
   firebase functions:secrets:set SMTP_USER
   firebase functions:secrets:set SMTP_PASS
   firebase functions:secrets:set MAIL_TO
   firebase functions:secrets:set SITE_URL
   ```
   Podpowiedzi:
   - `SMTP_PORT` — zwykle `587` (STARTTLS) albo `465` (TLS),
   - `MAIL_TO` — adres, na który mają trafiać wiadomości z formularza
     (domyślnie `g.plebaniak@somentiq.pl`),
   - `SITE_URL` — `https://psychologplebaniak.pl`.
2. Wdróż wszystko (ID projektu jest już ustawione w `.firebaserc`):
   ```bash
   firebase deploy --only functions,firestore,storage,hosting
   ```
3. Na końcu komunikatu deploya zobaczysz adres funkcji. Skopiuj go
   (powinien wyglądać tak):
   ```
   https://europe-west1-psychologplebaniak-e4480.cloudfunctions.net/sendContactForm
   ```
   i wklej w `lib/config.ts` → pole `formEndpoint`.
4. Ponownie zbuduj i wdróż sam hosting (formularz będzie wysyłał maile):
   ```bash
   NODE_OPTIONS='--max-old-space-size=2048' npm run build
   firebase deploy --only hosting
   ```

## Krok 5 — Domena i Google

1. **Własna domena + SSL:** konsola Firebase → *Build* → *Hosting* →
   *Add custom domain*. Wpisz domenę, np. `www.gabinetplebaniak.pl` — SSL
   (certyfikat) zadziała automatycznie. Przekierowanie `www → bez www`
   (lub odwrotnie) ustawia się rekordami DNS w panelu dostawcy domeny.
2. **Google Search Console:** wejdź na https://search.google.com/search-console,
   dodaj zasób i wybierz metodę **„Tag HTML”** — skopiowany tag wklej w
   `app/layout.tsx` (odkomentuj przygotowany wiersz) albo wybierz weryfikację
   przez **DNS** (rekord TXT) — wtedy tag nie jest potrzebny.
   Po wdrożeniu zgłoś w GSC plik `https://psychologplebaniak.pl/sitemap.xml`.
3. **Bing Webmaster:** https://www.bing.com/webmasters — zgłoś tę samą sitemapę.
4. **Wizytówka Google Business** (dla lokalnego SEO) — dane NAP:
   - Nazwa: **Grzegorz Plebaniak — Gabinet Psychologiczny**
   - Adres: **ul. Śliczna 24/28, Wrocław**
   - Telefon: **+48 693087574**
   - E-mail: **g.plebaniak@somentiq.pl**

---

## Checklista wdrożeniowa

- [ ] Opcjonalnie: GTM/GA4 oraz meta tag Search Console
- [ ] Zdjęcia profesjonalne gabinetu (w folderze `public/images/`; opcjonalnie w formacie WebP)
- [ ] Domena podpięta + SSL + przekierowanie www → bez www
- [ ] Sitemap zgłoszona w Google Search Console i Bing Webmaster
- [ ] Wizytówka Google Business z danymi NAP (zgodnymi ze stroną)
- [ ] Test formularza kontaktowego (wiadomość dociera na e-mail) + zgoda RODO
- [ ] Lighthouse > 90 (wydajność, dostępność, SEO)
- [ ] Testy na urządzeniach: iPhone, Android, Safari, Chrome
