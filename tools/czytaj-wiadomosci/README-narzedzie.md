# Program do odczytu wiadomości z formularza

To lokalny program wiersza poleceń: pobiera najnowsze wiadomości z kolekcji
`messages` w Firestore i wyświetla datę, imię, dane kontaktowe oraz treść.
Nie wymaga instalowania pakietów npm; potrzebny jest Node.js 20 lub nowszy.

Program jest w `tools/`, poza katalogiem `public/`, więc nie zostanie opublikowany
jako plik strony na Firebase Hosting.

## 1. Przygotuj klucz dostępu (raz)

1. Zaloguj się do [konsoli Firebase](https://console.firebase.google.com/project/psychologplebaniak-e4480/settings/serviceaccounts/adminsdk)
   i pobierz klucz JSON konta usługi projektu.
2. Zapisz go **poza repozytorium**, pod nazwą `service-account.json`:
   - Windows: `%USERPROFILE%\.strona-psycholog\service-account.json`
   - macOS/Linux: `~/.strona-psycholog/service-account.json`
3. Jeśli folder `.strona-psycholog` nie istnieje, utwórz go. Na Windows możesz
   użyć PowerShell:
   ```powershell
   New-Item -ItemType Directory -Force "$HOME\.strona-psycholog"
   ```
   Na macOS/Linux:
   ```bash
   mkdir -p "$HOME/.strona-psycholog"
   ```

Klucz jest poufny i może dawać kontu usługi szeroki dostęp do projektu Firebase.
**Nigdy nie umieszczaj go w repozytorium, folderze `public/`, na stronie ani w
wiadomości do kogokolwiek.** Repozytorium ignoruje typowe nazwy takich kluczy jako
dodatkowe zabezpieczenie, ale nie należy na tym polegać. Jeśli klucz wycieknie,
unieważnij go w Google Cloud Console i wygeneruj nowy.

> **Ważne:** starsza wersja instrukcji sugerowała zapisanie klucza obok skryptu
> w `public/narzedzia/`. Jeśli kiedykolwiek tak zrobiłeś i wdrożyłeś stronę,
> potraktuj klucz jako ujawniony: usuń go w Google Cloud Console → IAM i administracja
> → Konta usługi → Klucze, a następnie wygeneruj nowy. Samo usunięcie pliku ze strony
> nie unieważnia klucza.

## 2. Uruchom program

Otwórz terminal w głównym katalogu repozytorium i wpisz:

```bash
node tools/czytaj-wiadomosci/czytaj-wiadomosci.js
```

Na Windows można też uruchomić `tools\czytaj-wiadomosci\czytaj-wiadomosci.cmd`.

Jeśli klucz przechowujesz w innym miejscu, podaj jego ścieżkę jako argument:

```bash
node tools/czytaj-wiadomosci/czytaj-wiadomosci.js "C:\bezpieczne-miejsce\service-account.json"
```

Możesz też ustawić zmienną środowiskową `GOOGLE_APPLICATION_CREDENTIALS` na
pełną ścieżkę do pliku klucza. Program wyświetla maksymalnie 500 najnowszych
wiadomości. Odczytuje dane — niczego nie usuwa ani nie zmienia.
