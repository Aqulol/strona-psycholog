# Usunięcie narzędzi interaktywnych

Usunięto `/narzedzia-psychologiczne/` wraz z kalkulatorem kosztów sesji, dziennikami emocji i relacji oraz formularzem notatek przed konsultacją. Usunięto również przekierowanie z `/narzedzia-psychologiczne.html`. Nie ma bezpośredniego zamiennika: cennik i statyczne materiały PDF pełnią inne funkcje, dlatego nie dodano przekierowania. Eksport nie zawiera żadnego z tych adresów i zachowuje `404.html`. Lokalny podgląd statyczny zwrócił 404 bez przekierowania dla wariantów z ukośnikiem, bez niego i z `.html`. Statusu produkcyjnego nie sprawdzano — nie wykonano wdrożenia.

## Pliki

- **Usunięte:** `app/narzedzia-psychologiczne/page.tsx`, `components/ReflectionNotes.tsx`, `components/SessionCost.tsx`.
- **Uprzątnięte:** `app/editorial.css` (style kalkulatora i dzienników), `app/page.tsx` (karta i jej ikona), `app/{baza-wiedzy,cennik,materialy-psychologiczne,polityka-prywatnosci}/page.tsx`, `lib/{knowledge,navigation}.ts`, `content/lastmod.json`, `firebase.json`. Nie znaleziono osobnych testów, typów współdzielonych ani paczek npm używanych wyłącznie przez usunięte narzędzia.
- `public/materialy/karty-psychologiczne.pdf`: usunięto ukryty odnośnik do dawnej sekcji i poprawiono dwa istniejące linki z localhost na domenę witryny. Obie strony i treść kart pozostały bez zmian.
- Sitemap i globalny indeks wyszukiwania są generowane od nowa z eksportu. `llms.txt` i `llms-full.txt` nie zawierały odnośników do narzędzi. Skan kodu witryny i plików eksportu (w tym danych strukturalnych w HTML) nie znalazł pozostałości. Wzmianki w archiwalnych raportach i zrzutach dokumentują stan wcześniejszy i nie są publikowane z `out/`.

## Dane w przeglądarce

Oba usunięte komponenty używały wyłącznie stanu React; nie zapisywały danych w `localStorage` ani `sessionStorage` i ich nie wysyłały. Nie ma kluczy do migracji lub usunięcia. Ustawienia prywatności pozostają bez zmian.

## Układ i weryfikacja

Strona główna i baza wiedzy mają po trzy kategorie: **Artykuły psychologiczne**, **Słownik psychologiczny**, **Materiały psychologiczne do pobrania**. Układ ma trzy kolumny od 62 rem i jedną poniżej tej szerokości. Informacje dla pacjentów pozostają w menu i w bazie wiedzy, poza trzema kartami. Psychoedukacja, psychoedukacja ADHD, pozostałe usługi i katalog tematów pozostają dostępne. Pobranie PDF sprawdzono: odpowiedź 200 z sygnaturą `%PDF`.

Chromium: obie sekcje na szerokościach 320, 390, 768, 1024 i 1440 px, dokładnie trzy kategorie, bez poziomego przewijania. Zrzuty: [główna, telefon](glowna-390.jpg), [główna, komputer](glowna-1440.jpg), [baza, telefon](baza-390.jpg), [baza, komputer](baza-1440.jpg).

Kontrole: `npm run build`, `npm run check:sitemap`, `npm run check:links`, `npm run check:indexability`, `npm run check:redirects`, `npm run check:content`, `git diff --check`. Liczba adresów indeksowalnych i wpisów wyszukiwarki: **195 → 194**. Brak stron osieroconych i nieosiągalnych. Firebase Spark i statyczny eksport pozostają bez zmian.
