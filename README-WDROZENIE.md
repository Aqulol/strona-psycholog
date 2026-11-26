# Wdrożenie strony psychologplebaniak.pl

Strona pozostaje na Firebase. Next.js jest potrzebny tylko podczas budowania. Folder **`out/` to gotowa paczka HTML/CSS/JS i zdjęć**: każda podstrona ma swój `index.html`. Nie trzeba uruchamiać serwera Node na hostingu.

## 1. Zabezpiecz obecną wersję

1. W konsoli Firebase projektu `psychologplebaniak-e4480` wejdź w **Hosting → Historia wersji**. Zapisz, która wersja jest obecnie aktywna. Tam można ją przywrócić poleceniem **Rollback**.
2. Zachowaj kopię starego folderu `out/` (jeśli jest dostępny) i numer starego commita. Zachowaj też kopię aktualnych **reguł Firestore** z konsoli; cofnięcie wersji Hosting nie cofa reguł. Nie eksportuj wiadomości z formularza do publicznej paczki.
3. Przed zmianą sprawdź tematy w sekcji „Do potwierdzenia”.

## 2. Zbuduj i sprawdź

Pobierz zmiany w swojej kopii repozytorium (`git pull`, gdy zmiany są już dostępne na pobieranej gałęzi). Jeśli zmienił się zestaw zależności lub folder `node_modules` jest pusty, wykonaj `npm ci`. Następnie:

```sh
npm run build
firebase hosting:channel:deploy podglad
```

Otwórz link zwrócony przez Firebase. Podgląd korzysta z aktualnych reguł i tego samego projektu Firestore; wysyłaj tylko wiadomości oznaczone jako test, bez danych pacjentów. Adresów roboczego podglądu nie dodawaj do Search Console.

## 3. Opublikuj

Sprawdź wybrany projekt przez `firebase use`. Dla tej zmiany publikuj Hosting oraz reguły formularza:

```sh
firebase deploy --only hosting,firestore:rules
```

Kolejne zmiany tylko w tekście lub wyglądzie można publikować przez `firebase deploy --only hosting`. Wiadomości formularza sprawdzisz w **Firestore Database → Data → messages**. Sam zapis w bazie nie oznacza, że przyszedł e-mail. Umieść w kalendarzu regularną kontrolę wiadomości i usuwanie testów oraz wpisów po upływie uzgodnionej retencji.

### Inny hosting, gdyby był potrzebny

Pobierz kopię starego katalogu publicznego przez menedżer plików lub SFTP, a następnie wgraj **zawartość** `out/` (w tym `_next/`, obrazy i foldery podstron) do katalogu publicznego. Hosting musi podawać `index.html` wewnątrz katalogów. Przekierowania 301 i nagłówki z `firebase.json` należy odtworzyć w panelu nowego hostingu; nie zadziałają samoistnie po wgraniu pliku konfiguracyjnego. Formularz wciąż korzysta z Firebase. Nie testuj adresów, klikając pliki HTML na dysku (`file://`); użyj podglądu HTTPS.

## 4. Lista kontrolna po wdrożeniu

- Otwórz `/`, `/kontakt/`, `/cennik/`, `/polityka-prywatnosci/` i cztery zachowane artykuły. Sprawdź też stary adres `/blog/artykul-3/` (301) i losowy nieistniejący adres (404).
- Na telefonie i komputerze sprawdź menu, podmenu, poruszanie się samą klawiaturą i powiększenie tekstu. W Lighthouse wykonaj pomiar mobilny na własnej domenie przed uznaniem wyniku >90 za osiągnięty. Sam build nie certyfikuje WCAG 2.2 AA.
- Sprawdź link Booksy, wyświetlanie jego kalendarza i mapy dopiero na żądanie, położenie znacznika oraz link pomocniczy ZnanyLekarz. Jeśli osadzenie Booksy nie działa po stronie dostawcy, wciąż dostępny jest bezpośredni link w nagłówku.
- Przetestuj formularz bez zgody, z błędnym kontaktem oraz poprawną wiadomością testową. Sprawdź potwierdzenie i dokument w kolekcji `messages`. Skasuj test. Dostęp do wiadomości wymaga uprawnień administracyjnych w konsoli, nie jest dostępny przez klienta webowego.
- W Search Console zgłoś `https://psychologplebaniak.pl/sitemap.xml` i zbadaj nowe adresy. Upewnij się, że canonical wskazuje właściwy adres z końcowym ukośnikiem. Sprawdź podgląd udostępniania `og-image.png`.
- Porównaj nazwę, adres, numer telefonu, opisy usług, grupy wiekowe, czas i ceny w Profilu Firmy w Google, Booksy i ZnanyLekarz. Sprawdź też kwalifikator statusu szkolenia.

## Gdzie zmieniać treści

- Strona główna: `app/page.tsx`; podstrony informacyjne: `lib/pages.ts` i `lib/service-notes.ts`; pytania: `lib/site.ts`.
- Wspólne menu, przycisk i stopka: `components/Site.tsx`. Linki i kontakt: `lib/config.ts`.
- Blog i plan: `lib/editorial.ts`; zachowane artykuły: `app/blog/<adres>/page.tsx`. Meta, adresy i linki planu są wypisane także w `docs/SEO.md`.
- Obrazy: `public/logo.webp`, `public/images/*.webp`, `public/og-image.png`. Zastąp plik o tej samej nazwie. Jeśli zmienia się kadr lub rozmiar, popraw `alt`, `width` i `height` w `app/page.tsx`, `components/Site.tsx` lub `components/ServicePage.tsx`. Szatę graficzną znajdziesz w `app/globals.css`.

## Do potwierdzenia przed publikacją

- **[DO ZWERYFIKOWANIA – sprawdź aktualność numerów]**: sprawdź, czy 116 123 i 116 111 są właściwe dla opisanych grup i działają całodobowo; potem usuń adnotację w stopce. 112 dotyczy nagłego zagrożenia.
- Potwierdź opis granic pracy (aktywne uzależnienie, ciężkie zaburzenia odżywiania, brak własnej gotowości). Nie publikuję reguły o bezwzględnej detoksykacji ani twierdzenia, że metoda „nie przyniesie efektów”. Potrzebę leczenia odstawienia ocenia właściwy specjalista.
- Potwierdź status szkolenia, opis klasycznego TFP, indywidualny dobór częstotliwości oraz opis udziału rodziców i poufności. Nie podaję porównawczego twierdzenia o skuteczności jednej lub dwóch sesji bez źródła dowodowego.
- **[DO UZUPEŁNIENIA po weryfikacji, jeśli treść nie odpowiada praktyce]**: zweryfikuj dotychczasową klauzulę prywatności: dane administratora, podstawy prawne dokumentacji i danych o zdrowiu, retencję, odbiorców, umowy powierzenia i transfery poza EOG. W szczególności potwierdź, czy faktycznie obowiązują okresy opisane w zachowanej polityce. Weryfikacji wymagają też cookies osadzanych usług po ich otwarciu. Nowy serwis nie uruchamia GA4 ani pikseli marketingowych. Nie jest to opinia prawna.
- Formularz nadal działa w dotychczasowym modelu bez publicznego odczytu, z bezpośrednim zapisem z przeglądarki. Ukryte pole klienta nie gwarantuje ochrony przed spamem; monitoruj kolekcję i limity. Jeśli spam się pojawi, rozważ rzeczywiste zabezpieczenie serwerowe przed dalszym używaniem formularza.
