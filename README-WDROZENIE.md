# Wdrożenie strony gabinetu — instrukcja krok po kroku

Strona gabinetu psychologicznego Grzegorza Plebaniaka (Wrocław).
Projekt Firebase: **psychologplebaniak-e4480**.

Czas wdrożenia: ok. 1–2 godziny. Nie wymaga znajomości programowania —
wystarczy wykonywać polecenia w terminalu (na komputerze z systemem Windows,
macOS lub Linux).

> **Wariant darmowy (Spark).** Formularz kontaktowy zapisuje wiadomości
> bezpośrednio do bazy Firestore z przeglądarki — bez Cloud Functions i bez
> planu Blaze (płatnego). Wiadomości można odczytać w konsoli Firebase albo
> lokalnym programem `tools/czytaj-wiadomosci/` (instrukcja w jego README).

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
4. Konfiguracja `firebaseConfig` w `lib/config.ts` jest już wpisana dla
   projektu `psychologplebaniak-e4480`. Nie zastępuj jej placeholderami.
   `gtmId` jest opcjonalne; `ga4Id` i weryfikacja Search Console są już
   skonfigurowane.

## Krok 2 — Pobierz kod

```bash
git clone --branch arena/01a03953-strona-psycholog https://github.com/Aqulol/strona-psycholog.git strona-psycholog
cd strona-psycholog
```
Jeśli otrzymałeś projekt jako spakowany folder — rozpakuj go i wejdź do środka.

## Krok 3 — Zbuduj projekt

W katalogu projektu (`strona-psycholog`) wykonaj po kolei:

```bash
npm ci
npm run build
```

Na końcu powstanie folder **`out/`** — to gotowa strona. Jeśli budowanie
zgłasza brak pamięci, w PowerShell przed buildem możesz ustawić:

```powershell
$env:NODE_OPTIONS="--max-old-space-size=2048"
npm run build
```

## Krok 4 — Wdróż na Firebase

1. W `lib/config.ts` jest już skonfigurowana aplikacja webowa Firebase.
   Sprawdź, że `.firebaserc` wskazuje projekt **psychologplebaniak-e4480**.
2. Po zmianach w kodzie zbuduj stronę ponownie:
   ```bash
   npm run build
   ```
3. Wdróż hosting i reguły Firestore:
   ```bash
   firebase deploy --project psychologplebaniak-e4480 --only hosting,firestore
   ```
   (Cloud Functions NIE są używane w wariancie darmowym — katalog `functions/`
   pozostaje w repozytorium jako materiał do ewentualnego wariantu przyszłościowego;
   opisano to w `README-FUNCTIONS.md`.)

4. **Odczyt wiadomości z formularza:**
   - Najprościej w konsoli Firebase: **Build → Firestore Database → kolekcja `messages`**.
   - Możesz też uruchomić lokalny program z GitHuba. Instrukcja, bezpieczne
     przechowywanie klucza i komendy są w `tools/czytaj-wiadomosci/README-narzedzie.md`.
     Klucz konta usługi nigdy nie może trafić do GitHuba ani do `public/`.

## Krok 5 — Domena i Google

1. **Własna domena + SSL:** konsola Firebase → *Build* → *Hosting* →
   *Add custom domain*. Wpisz domenę, np. `www.psychologplebaniak.pl` — SSL
   (certyfikat) zadziała automatycznie. Przekierowanie `www → bez www`
   (lub odwrotnie) ustawia się rekordami DNS w panelu dostawcy domeny.
2. **Google Search Console:** wejdź na https://search.google.com/search-console,
   dodaj zasób i wybierz metodę **„Tag HTML"** — skopiowany tag wklej w
   `app/layout.tsx` (odkomentuj przygotowany wiersz) albo wybierz weryfikację
   przez **DNS** (rekord TXT) — wtedy tag nie jest potrzebny.
   Po wdrożeniu zgłoś w GSC plik `https://psychologplebaniak.pl/sitemap.xml`.
3. **Bing Webmaster:** https://www.bing.com/webmasters — zgłoś tę samą sitemapę.
4. **Wizytówka Google Business** (dla lokalnego SEO) — dane NAP:
   - Nazwa: **Grzegorz Plebaniak — Gabinet Psychologiczny**
   - Adres: **Zygmunta Krasińskiego 13, 50-449 Wrocław**
   - Telefon: **+48 693087574**
   - E-mail: **gpplebaniak@gmail.com**

---

## Checklista wdrożeniowa

- [ ] `firebaseConfig` w `lib/config.ts` wskazuje właściwy projekt Firebase
- [ ] Lokalny program do czytania wiadomości działa (klucz zapisany poza repozytorium)
- [ ] Opcjonalnie: GTM/GA4 oraz meta tag Search Console
- [ ] Zdjęcia profesjonalne gabinetu (w folderze `public/images/`; opcjonalnie w formacie WebP)
- [ ] Domena podpięta + SSL + przekierowanie www → bez www
- [ ] Sitemap zgłoszona w Google Search Console i Bing Webmaster
- [ ] Wizytówka Google Business z danymi NAP (zgodnymi ze stroną)
- [ ] Test formularza kontaktowego (wiadomość pojawia się w Firestore → `messages`) + zgoda RODO
- [ ] Lighthouse > 90 (wydajność, dostępność, SEO)
- [ ] Testy na urządzeniach: iPhone, Android, Safari, Chrome
