# Przywrócenie formularza kontaktowego

## Co usunięto

[PR #71](https://github.com/Aqulol/strona-psycholog/pull/71), commit `6126f84`, zastąpił formularz kartą „Pytanie organizacyjne” z telefonem, e-mailem i opisem. Według metadanych GitHuba PR scalono **27 listopada 2026 o 11:20 UTC**; data scalenia nie jest datą potwierdzonej publikacji na Firebase. Raport tego etapu (`docs/etap-lastmod/RAPORT.md`) wskazuje ograniczenie zbierania dowolnej treści oraz potrzebę sprawdzenia retencji i reguł Firestore przed przywróceniem formularza.

Tuż przed usunięciem widok `BookingAndContact` pokazywał kartę formularza obok kalendarza Booksy na `/` i `/kontakt/`. Formularz miał pola imienia, wspólne pole e-mail lub telefon, pole wiadomości i wymagany checkbox; klient ładował `firebase/app` i `firebase/firestore` i wyświetlał sukces po `addDoc` w `/messages`. To był zapis, nie potwierdzona wysyłka e-mail. Osobna funkcja `sendContactForm` zawierała Nodemailer, lecz frontend jej nie wywoływał, a stara funkcja mogła zwracać sukces nawet bez SMTP. Nie potwierdzono użycia SMTP w dawnym środowisku produkcyjnym.

W starszej jednostronicowej wersji formularz był elementem `Contact` na stronie głównej (m.in. #26/#27 z kalendarzem ZnanyLekarz). W późniejszej wersji wielostronicowej pozostawał też nieużywany komponent `Contact`; aktywny formularz korzystał z `BookingAndContact`. Nie znaleziono osobnych wystąpień wycofanego formularza na stronach usług, diagnozy, psychoterapii ani podstronach tematycznych. Nie dodano tam nowych formularzy; ich mechanizmy kontaktowe i Booksy pozostają bez zmian.

## Co zmieniono

- Jeden `ContactForm`, w tych samych dwóch aktywnych miejscach. Booksy pozostał po lewej na szerokich ekranach i nad formularzem na wąskich. E-mail i telefon są dodatkowymi opcjami, nie zastępują przycisku wysyłki.
- Wymagane imię, e-mail i treść, opcjonalny numer telefonu i temat. Jasne etykiety, stan wysyłki, komunikaty dla klawiatury/czytników i zachowanie danych po błędzie. Pod formularzem informacja o nieprzesyłaniu danych medycznych z linkiem do polityki prywatności.
- `POST /api/kontakt` do istniejącej funkcji Firebase przez dokładną regułę Hosting. Walidacja i limity długości po stronie serwera, filtr pochodzenia, pole pułapka, transakcyjny limit na IP i globalny. To nie zastępuje ochrony infrastruktury; produkcyjne zachowanie `req.ip` i TTL wymagają sprawdzenia.
- Brak zapisu treści w Firestore, brak analityki formularza. Stary publiczny zapis do `/messages` zamknięty w regułach, bez usuwania dokumentów. SMTP wymaga szyfrowania i serwerowych sekretów. Bez akceptacji SMTP dla docelowego odbiorcy nie ma komunikatu sukcesu.

## Weryfikacja

- `npm run build`, `check:sitemap`, `check:links`, `check:indexability`, `check:redirects`, `check:lastmod`, `check:sitemap:failures`: OK. Eksport obejmuje 195 indeksowalnych tras, 31 dat `lastmod` i 226 reguł przekierowań. Zachowano daty i adresy mapy. `check:export` nie przechodzi w całości: obecny walidator nie obsługuje istniejącego wewnętrznego odnośnika do działającego PDF na `/materialy-psychologiczne/`; po tymczasowym uwzględnieniu PDF dalsza asercja wymaga autorskiego podpisu w artykule podpisanym redakcyjnie. Nie zmieniono treści materiałów ani reguł podpisu w tym zadaniu.
- Skan wszystkich eksportowanych HTML wykazał pojedynczy formularz tylko na `/` i `/kontakt/`. Chromium: obie trasy w 320, 390, 719, 720, 1024 i 1440 px — 12 układów, brak poziomego przewijania, kolejność Tab, obrys fokusu oraz linki telefonu, poczty i polityki prywatności. Zrzuty: [desktop 1440](uklad-1440.jpg), [mobile 390](uklad-390.jpg); detale: [desktop](formularz-1440.jpg), [mobile](formularz-390.jpg).
- Test SMTP nie był atrapą odpowiedzi HTTP: statyczny eksport i rzeczywisty handler uruchomiono lokalnie za Express, a Nodemailer po STARTTLS przekazał **trzy testowe wiadomości** do kontrolowanego odbiornika SMTP. Sprawdzono treść, pola opcjonalne i `Reply-To`. Wymuszona odmowa SMTP `550` dała `503`, niedostarczony tekst pozostał w formularzu; ponowienie po korekcie doszło do odbiornika. Sprawdzono blokadę błędnego e-maila, wypełnionej pułapki, niepoprawnego telefonu, zbyt długiej wiadomości, obcego pochodzenia oraz `429` po wyczerpaniu limitu. Test podmieniał implementację licznika na lokalną; nie udaje weryfikacji transakcji na wdrożonym Firestore. Nieistniejąca trasa zwróciła `404` w lokalnym serwerze eksportu.
- `npm test --prefix functions`: 3 testy regresji, w tym brak sukcesu przy niekompletnej konfiguracji SMTP. `npm audit --prefix functions --omit=dev`: 0 znanych podatności w momencie sprawdzenia.

## Status produkcji

Nie wdrożono zmian i nie wysłano wiadomości do gabinetu. Status planu Blaze, sekretów SMTP i konfiguracji poczty nie został potwierdzony. Żeby zamknąć odbiór, właściciel musi potwierdzić istniejący plan oraz dostęp do Firebase i dostawcy poczty, skonfigurować sekrety i TTL, sprawdzić rewrite i limity w Firebase, zatwierdzić ręczne wdrożenie oraz odebrać uzgodnioną wiadomość z prawdziwej domeny. Kroki: [README-FUNCTIONS.md](../../README-FUNCTIONS.md). Nie włączono nowej płatnej usługi.
