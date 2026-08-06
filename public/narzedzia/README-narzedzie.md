# Narzędzie: czytaj-wiadomości z formularza

Prosty program do wyświetlania wiadomości wysłanych przez formularz kontaktowy
na stronie. Wiadomości są zapisywane w Firebase (Firestore, kolekcja `messages`),
a ten program pobiera je i pokazuje w oknie wiersza poleceń.

## Co jest potrzebne

- **Node.js** (ten sam, którym budujesz stronę — wersja 18 lub nowsza).
  Sprawdź w wierszu poleceń: `node --version`
- **Plik klucza** z Firebase (generowany raz, ważny bezterminowo).

## Przygotowanie klucza (wystarczy raz, ok. 1 minuta)

1. Wejdź na: https://console.firebase.google.com/project/psychologplebaniak-e4480/settings/serviceaccounts/adminsdk
   (zaloguj się kontem, na którym założony jest projekt).
2. Kliknij **„Generuj nowy klucz prywatny"** → **„Wygeneruj klucz"**.
   Przeglądarka pobierze plik JSON (np. `psychologplebaniak-e4480-firebase-adminsdk-xxx.json`).
3. Skopiuj ten plik do **tego samego folderu**, w którym znajduje się
   `czytaj-wiadomosci.js` i zmień jego nazwę na **`service-account.json`**.
   (Ten plik jest Twoim hasłem — nie udostępniaj go nikomu, nie wgrywaj na stronę.)

## Uruchomienie

Na Windows (najprościej):

1. Otwórz folder z programem, kliknij w pasek adresu Eksploratora,
   wpisz `cmd` i naciśnij Enter (otworzy się wiersz poleceń w tym folderze).
2. Wpisz: `czytaj-wiadomosci.cmd` i naciśnij Enter.

Na Mac/Linux:

```
node czytaj-wiadomosci.js
```

Jeśli klucz ma inną nazwę lub jest w innym miejscu:

```
node czytaj-wiadomosci.js sciezka/do/klucz.json
```

## Co zobaczysz

Program wypisze listę wiadomości od najnowszej: data i godzina, imię,
dane kontaktowe, zgodę RODO i treść wiadomości.

## Bezpieczeństwo

- Program tylko **czyta** wiadomości — nic nie kasuje ani nie modyfikuje.
- Klucz `service-account.json` daje pełny dostęp administracyjny do projektu
  Firebase — trzymaj go w bezpiecznym miejscu (poza folderem strony
  publikowanej w internecie) i nie wysyłaj nikomu.
