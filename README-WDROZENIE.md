# Wdrożenie strony psychologplebaniak.pl

Strona pozostaje na Firebase. Next.js jest potrzebny tylko podczas budowania. Folder **`out/` to gotowa paczka HTML/CSS/JS i zdjęć**: każda podstrona ma swój `index.html`. Nie trzeba uruchamiać serwera Node na hostingu.

Lokalny podgląd po `npm ci && npm run build`: `npm run preview` (statyczny HTTP; nie `next start`). Formularz korzysta z osobnego Workera i Resend po konfiguracji. Pomiar konwersji jest wyłączony w zwykłym buildzie; [warunki ewentualnego uruchomienia](docs/audyt-koncowy/POMIAR.md). Booksy to osobna decyzja użytkownika, nie statystyka strony.

## 1. Zabezpiecz obecną wersję

1. W konsoli Firebase projektu `psychologplebaniak-e4480` wejdź w **Hosting → Historia wersji**. Zapisz, która wersja jest obecnie aktywna. Tam można ją przywrócić poleceniem **Rollback**.
2. Zachowaj kopię starego folderu `out/` (jeśli jest dostępny) i numer starego commita. Zachowaj też kopię aktualnych **reguł Firestore** z konsoli; cofnięcie wersji Hosting nie cofa reguł. Nie eksportuj wiadomości z formularza do publicznej paczki.
3. Przed zmianą sprawdź tematy w sekcji „Do potwierdzenia”. Przed publikacją formularza do użytku skonfiguruj [niezależny transport pocztowy](docs/formularz-kontaktowy/SPARK.md).

## 2. Zbuduj i sprawdź

Pobierz zmiany w swojej kopii repozytorium (`git pull`, gdy zmiany są już dostępne na pobieranej gałęzi). Jeśli zmienił się zestaw zależności lub folder `node_modules` jest pusty, wykonaj `npm ci`. Następnie:

```sh
npm run build
npm run check:sitemap
firebase hosting:channel:deploy podglad
```

Otwórz link zwrócony przez Firebase. Podgląd testuje wygląd i routing, ale produkcyjny Worker nie przyjmuje zgłoszeń z adresu podglądu. Użyj osobnej konfiguracji testowej opisanej w instrukcji formularza. Adresów roboczego podglądu nie dodawaj do Search Console.

Mapa witryny powstaje **po eksporcie HTML** w `npm run build` (etap `postbuild`), w `out/sitemap.xml`. Hosting przed standardowym `firebase deploy` sprawdza gotową paczkę i odmawia publikacji, gdy mapa nie przejdzie walidacji. Hook nie buduje paczki; przed publikacją nadal wykonaj `npm run build`. Przy podglądach i w CI jawnie uruchamiaj `npm run check:sitemap`. Nie zastępuj tego polecenia samym `next build`. Nie dopisuj nowych adresów do ręcznej listy: generator uwzględnia wyeksportowane strony kanoniczne, pomija `noindex`, zweryfikowane aliasy 301 i pliki techniczne. `lastmod` pochodzi z metadanych redakcyjnych albo wersjonowanego rejestru zweryfikowanych zmian; nieznana data jest pomijana. Kontrolę odpowiedzi hostingu można wykonać poleceniem `node scripts/check-hosting.mjs <adres-podglądu-lub-produkcji>`.

## 3. Opublikuj

Konfiguracja `firebase.json` wdraża **wyłącznie statyczny Hosting** na Spark. Nie zawiera Cloud Functions, rewrite do backendu ani celu wdrożenia Firestore. Po zbudowaniu i sprawdzeniu paczki:

```sh
firebase deploy --only hosting --project psychologplebaniak-e4480
```

Zwykłe `firebase deploy` dla tej konfiguracji również wybierze tylko Hosting. Nie wdraża osobnego Workera i nie zmienia danych bądź reguł Firestore. Zachowane `firestore.rules` i `storage.rules` nie dowodzą stanu produkcji i nie są objęte tym wdrożeniem. Historyczną kolekcję `/messages` i uprawnienia IAM sprawdź w konsoli, bez pobierania wiadomości do repozytorium.

### Inny hosting, gdyby był potrzebny

Pobierz kopię starego katalogu publicznego przez menedżer plików lub SFTP, a następnie wgraj **zawartość** `out/` (w tym `_next/`, obrazy i foldery podstron) do katalogu publicznego. Hosting musi podawać `index.html` wewnątrz katalogów. Przekierowania 301 i nagłówki z `firebase.json` należy odtworzyć w panelu nowego hostingu; nie zadziałają samoistnie po wgraniu pliku konfiguracyjnego. Formularz wymaga osobnego Workera i dopisania dokładnego originu witryny do jego konfiguracji. Nie testuj adresów, klikając pliki HTML na dysku (`file://`); użyj podglądu HTTPS.

## 4. Lista kontrolna po wdrożeniu

- Otwórz `/`, `/kontakt/`, `/cennik/`, `/polityka-prywatnosci/` i cztery zachowane artykuły. Sprawdź też stary adres `/blog/artykul-3/` (301) i losowy nieistniejący adres (404).
- Na telefonie i komputerze sprawdź menu, podmenu, poruszanie się samą klawiaturą i powiększenie tekstu. W Lighthouse wykonaj pomiar mobilny na własnej domenie przed uznaniem wyniku >90 za osiągnięty. Sam build nie certyfikuje WCAG 2.2 AA.
- Sprawdź link Booksy, wyświetlanie kalendarza po zgodzie na Booksy i przewinięciu oraz otwieranie mapy na żądanie, położenie znacznika oraz link pomocniczy ZnanyLekarz. Jeśli osadzenie Booksy nie działa po stronie dostawcy, wciąż dostępny jest bezpośredni link w nagłówku.
- Wyślij jedną uzgodnioną wiadomość testową bez danych osobowych, sprawdź rzeczywisty odbiór w skrzynce gabinetu i działanie `Reply-To`. Sprawdź błędny e-mail i zachowanie wpisanej treści przy awarii transportu. Nowe wiadomości nie trafiają do Firestore.
- W Search Console zgłoś `https://psychologplebaniak.pl/sitemap.xml` i zbadaj nowe adresy. Upewnij się, że canonical wskazuje właściwy adres z końcowym ukośnikiem. Sprawdź podgląd udostępniania `og-image.png`.
- Porównaj nazwę, adres, numer telefonu, opisy usług, grupy wiekowe, czas i ceny w Profilu Firmy w Google, Booksy i ZnanyLekarz. Sprawdź też kwalifikator statusu szkolenia.

## Gdzie zmieniać treści

- Strona główna: `app/page.tsx`; podstrony informacyjne: `lib/pages.ts` i `lib/service-notes.ts`; pytania: `lib/site.ts`.
- Wspólne menu, przycisk i stopka: `components/Site.tsx`. Linki i kontakt: `lib/config.ts`.
- Blog i plan: `lib/editorial.ts`; zachowane artykuły: `app/blog/<adres>/page.tsx`. Meta, adresy i linki planu są wypisane także w `docs/SEO.md`.
- Obrazy: `public/logo.webp`, `public/images/*.webp`, `public/og-image.png`. Zastąp plik o tej samej nazwie. Jeśli zmienia się kadr lub rozmiar, popraw `alt`, `width` i `height` w `app/page.tsx`, `components/Site.tsx` lub `components/ServicePage.tsx`. Szatę graficzną znajdziesz w `app/globals.css`.

## Do potwierdzenia przed publikacją

- **[DO ZWERYFIKOWANIA - sprawdź aktualność numerów]**: sprawdź, czy 116 123 i 116 111 są właściwe dla opisanych grup i działają całodobowo; potem usuń adnotację w stopce. 112 dotyczy nagłego zagrożenia.
- Potwierdź opis granic pracy (aktywne uzależnienie, ciężkie zaburzenia odżywiania, brak własnej gotowości). Nie publikuję reguły o bezwzględnej detoksykacji ani twierdzenia, że metoda „nie przyniesie efektów”. Potrzebę leczenia odstawienia ocenia właściwy specjalista.
- Potwierdź status szkolenia, opis klasycznego TFP, indywidualny dobór częstotliwości oraz opis udziału rodziców i poufności. Nie podaję porównawczego twierdzenia o skuteczności jednej lub dwóch sesji bez źródła dowodowego.
- **[DO UZUPEŁNIENIA po weryfikacji, jeśli treść nie odpowiada praktyce]**: zweryfikuj dotychczasową klauzulę prywatności: dane administratora, podstawy prawne dokumentacji i danych o zdrowiu, retencję, odbiorców, umowy powierzenia i transfery poza EOG. W szczególności potwierdź, czy faktycznie obowiązują okresy opisane w zachowanej polityce. Weryfikacji wymagają też cookies osadzanych usług po ich otwarciu. Nowy serwis nie uruchamia GA4 ani pikseli marketingowych. Nie jest to opinia prawna.
- Sprawdź w konsoli, że archiwalne `/messages` nie pozwala na bezpośredni publiczny zapis, nawet ze starej wersji strony. Nie usuwaj danych ani nie zastępuj innych reguł bez przeglądu.

Jeśli podmieniasz `logo.webp`, `images/portret2.webp` lub `images/gabinet.webp`, zaktualizuj również ich mniejsze warianty w `public/images/responsive/`. Można je odtworzyć z nowych oryginałów poleceniem `sh scripts/resize-site-images.sh` (wymaga ImageMagick; nie jest potrzebne podczas zwykłego wdrożenia).
