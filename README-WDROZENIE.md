# Wdrożenie strony gabinetu — instrukcja krok po kroku

Strona gabinetu psychologicznego Grzegorza Plebaniaka (Wrocław Gaj).
Projekt Firebase: **psychologplebaniak-e4480**.

Czas wdrożenia: ok. 1–2 godziny. Nie wymaga znajomości programowania —
wystarczy wykonywać polecenia w terminalu (na komputerze z systemem Windows,
macOS lub Linux).

> **Wariant darmowy (Spark).** Formularz kontaktowy zapisuje wiadomości
> bezpośrednio do bazy Firestore z przeglądarki — bez Cloud Functions i bez
> planu Blaze (płatnego). Wiadomości odczytuje Pan/Pani w konsoli Firebase.

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
4. **Uzupełnij placeholdery w kodzie** — dane do uzupełnienia są oznaczone
   `TU-WPISZ-...` lub `XXXX`:

   | Plik | Co uzupełnić |
   |---|---|
   | `lib/config.ts` | `firebaseConfig` — konfiguracja aplikacji webowej Firebase (patrz Krok 4). Pola `apiKey`, `messagingSenderId`, `appId` zawierają placeholder `TU-WPISZ-...`. |
   | `lib/config.ts` | opcjonalnie `gtmId` (GTM-XXXXXXX) i `ga4Id` (G-XXXXXXXXXX) z kont Google |
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
NODE_OPTIONS='--max-old-space-size=2048' npm run build
```

Na końcu w katalogu projektu powstanie folder **`out/`** — to gotowa strona.
(Polecenie `NODE_OPTIONS=...` to tylko zwiększenie pamięci dla procesu budowania.)

## Krok 4 — Wdróż na Firebase

1. **Uzupełnij `firebaseConfig` w `lib/config.ts`** — skąd wziąć wartości:
   1. Wejdź do konsoli Firebase: https://console.firebase.google.com
   2. Wybierz projekt **psychologplebaniak-e4480**.
   3. Kliknij ikonę koła zębatego → **Ustawienia projektu** (Project settings).
   4. W sekcji **„Twoje aplikacje" / „Your apps"** znajdź aplikację internetową
      (ikona `</>`). Jeśli jej nie ma — kliknij **„Utwórz aplikację internetową"**
      (Add app → Web) i przejdź kreatora (nazwa dowolna, hosting NIE trzeba włączać).
   5. W zakładce **„SDK setup and configuration"** wybierz **„Config"**
      i skopiuj cały obiekt `firebaseConfig`.
   6. Wklej poszczególne wartości do `lib/config.ts` ZAMIAST placeholderów
      `TU-WPISZ-...`. (Pola `authDomain`, `projectId`, `storageBucket` są już
      wpisane — sprawdź, czy zgadzają się z konsolą.)
   7. Zapisz plik.

   > **Uwaga:** `apiKey` w aplikacji webowej Firebase jest publiczny (widoczny
   > w przeglądarce) — to normalne i bezpieczne, jeśli reguły Firestore
   > pozwalają tylko na ograniczony zapis (patrz `firestore.rules`).

2. Po uzupełnieniu configu przebuduj stronę:
   ```bash
   NODE_OPTIONS='--max-old-space-size=2048' npm run build
   ```

3. Wdróż hosting i reguły Firestore (ID projektu jest już ustawione w `.firebaserc`):
   ```bash
   firebase deploy --only hosting,firestore
   ```
   (Cloud Functions NIE są używane w wariancie darmowym — katalog `functions/`
   pozostaje w repozytorium jako materiał do ewentualnego wariantu przyszłościowego;
   opisano to w `README-FUNCTIONS.md`.)

4. **Gdzie czytać wiadomości z formularza?**
   Wiadomości z formularza kontaktowego pojawiają się w konsoli Firebase:
   **Build → Firestore Database → kolekcja `messages`**.
   Każdy dokument zawiera pola `name`, `contact`, `message`, `rodoConsent`
   oraz `createdAt` (czas wysłania).

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
   - Adres: **ul. Śliczna 24/28, Wrocław**
   - Telefon: **+48 693087574**
   - E-mail: **g.plebaniak@somentiq.pl**

---

## Checklista wdrożeniowa

- [ ] `firebaseConfig` uzupełniony w `lib/config.ts`
- [ ] Opcjonalnie: GTM/GA4 oraz meta tag Search Console
- [ ] Zdjęcia profesjonalne gabinetu (w folderze `public/images/`; opcjonalnie w formacie WebP)
- [ ] Domena podpięta + SSL + przekierowanie www → bez www
- [ ] Sitemap zgłoszona w Google Search Console i Bing Webmaster
- [ ] Wizytówka Google Business z danymi NAP (zgodnymi ze stroną)
- [ ] Test formularza kontaktowego (wiadomość pojawia się w Firestore → `messages`) + zgoda RODO
- [ ] Lighthouse > 90 (wydajność, dostępność, SEO)
- [ ] Testy na urządzeniach: iPhone, Android, Safari, Chrome
