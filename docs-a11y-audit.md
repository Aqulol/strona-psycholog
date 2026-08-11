# Audyt dostępności WCAG 2.2 AA — dokumentacja

Data: 2026-08-11
Zakres: strona główna, `/blog`, jeden artykuł blogowy (`/blog/relacja-terapeutyczna-zrodlo-zmiany`)
Repozytorium: Aqulol/strona-psycholog, branch `feature/a11y` (z `main` @ d758757)
Narzędzia: axe-core 4.10.2 (tagi wcag2a, wcag2aa, wcag21aa, wcag22aa) w agent-browser
na lokalnie serwowanym eksporcie statycznym (`out/`), plus ręczne obliczenia kontrastu
(wzór WCAG, kompozycja koloru z alfa na tle) i test klawiatury (focus-visible).

## Metoda

1. Build eksportu statycznego (`NODE_OPTIONS='--max-old-space-size=2048' npm run build`)
   i serwowanie `out/` na localhost:3000.
2. Dla każdej z 3 stron: wstrzyknięcie axe-core, przewinięcie do sekcji Kontakt
   (komponent ładuje się leniwie — bez przewinięcia formularza nie ma w DOM),
   `axe.run` z tagami WCAG A/AA (2.0, 2.1, 2.2).
3. Ręczne obliczenie kontrastu kluczowych par kolorów (patrz niżej).
4. Test focus-visible: iteracja po wszystkich 25–35 widocznych elementach
   fokusowalnych z klawiaturą (a[href], button, input, textarea, [tabindex]).
5. Sprawdzenie alt w wyrenderowanym DOM (wszystkie `<img>`).

## Wynik audytu (stan przed poprawkami)

- Strona główna (pełna, z zamontowanym formularzem): **0 naruszeń** axe,
  31 reguł przeszło, color-contrast sprawdzony na 110 węzłach.
- `/blog`: **0 naruszeń** axe.
- Artykuł: **1 naruszenie** axe (color-contrast, serious) — data artykułu
  `text-ink/60` na tle kremowym: **4.46:1** przy wymaganym 4.5:1 (WCAG 1.4.3).

### Znalezione problemy (potwierdzone)

| # | Problem | Kryterium | Gdzie |
|---|---------|-----------|-------|
| 1 | Kontrast daty artykułu `text-ink/60` (#747372) na kremowym #FAF8F5 = **4.46:1** < 4.5:1 | WCAG 1.4.3 (AA) | 4 strony artykułów: `czy-przeszlosc-ma-znaczenie`, `dlaczego-sama-swiadomosc-nie-wystarcza`, `dlaczego-wybieram-podobnych-partnerow`, `relacja-terapeutyczna-zrodlo-zmiany` (linia 47) oraz `app/blog/_BlogRedirect.tsx` (tekst przekierowania; obejmuje też strony-redirecty: `artykul-1..4`, `jak-radzic-sobie-z-lekiem`, `pierwsza-wizyta-u-psychologa`, `psychoterapia-psychodynamiczna`, `wypalenie-zawodowe`) |
| 2 | `aria-describedby="rodo-error"` wskazuje na nieistniejący element (id istnieje tylko przy błędzie) — zgłoszone przez axe jako **critical** (aria-valid-attr-value) | ARIA / WCAG 4.1.2 | `components/Contact.tsx`, checkbox RODO |
| 3 | Kontrast placeholderów pól formularza `text-ink/40` na białym = **2.52:1** < 4.5:1 (placeholder przekazuje treść: przykład formatu kontaktu) | WCAG 1.4.3 (AA) | `components/Input.tsx` (`placeholder:text-ink/40`) |
| 4 | Wskaźnik fokusa: złota obwódka #C9A96A na kremowym/białym = **2.11:1 / 2.24:1** < 3:1 (non-text contrast; na zielonej stopce 3.49:1 — przechodzi) | WCAG 1.4.11 (AA) | `app/globals.css`, globalna reguła `*:focus-visible` |

### Obliczenia kontrastu (wszystkie pary z zadania + sprawdzone dodatkowo)

| Para (tekst/tło) | Kontrast | Wynik |
|---|---|---|
| text-ink/70 (#5d5d5c) na kremowym #FAF8F5 | 6.22:1 | ✅ ≥ 4.5 |
| text-green #2D5A4E na kremowym #FAF8F5 | 7.38:1 | ✅ |
| biały #FFF na zielonym #2D5A4E (przyciski) | 7.82:1 | ✅ |
| text-ink/60 (#747372) na kremowym | 4.46:1 | ❌ (naprawione) |
| text-ink/60 na białym | 4.54:1 | ✅ (zostawione, patrz niżej) |
| text-ink/80 na białym/kremowym | ≥ 12:1 | ✅ |
| biały/70–85 na zielonym (stopka) | 4.81–6.19:1 | ✅ |
| text-green/80 (hover linków) na białym | 4.69:1 | ✅ |
| placeholder text-ink/40 na białym | 2.52:1 | ❌ (naprawione) |
| placeholder text-ink/70 na białym | 6.39:1 | ✅ (po poprawce) |
| czerwony tekst błędu #b91c1c na #fef2f2 / białym | 5.91 / 6.47:1 | ✅ |
| złoty focus #C9A96A na kremowym / białym / zielonym | 2.11 / 2.24 / 3.49:1 | ❌ / ❌ / ✅ |
| zielony pierścień focus #2D5A4E na kremowym / białym | 7.38 / 7.82:1 | ✅ (po poprawce) |

## Wprowadzone poprawki (minimalne, bez zmian treści i bez przeprojektowania)

1. **4 artykuły + `_BlogRedirect.tsx`**: `text-ink/60` → `text-ink/70` (data / tekst
   przekierowania) → kontrast na kremowym **4.46:1 → 6.22:1**.
2. **`components/Contact.tsx`**: `aria-describedby="rodo-error"` → warunkowe
   `aria-describedby={errors.rodo ? 'rodo-error' : undefined}` (atrybut obecny tylko,
   gdy istnieje komunikat błędu). Usuwa critical axe.
3. **`components/Input.tsx`**: `placeholder:text-ink/40` → `placeholder:text-ink/70`
   → kontrast placeholderów na białym **2.52:1 → 6.39:1** (wszystkie 3 pola formularza).
4. **`app/globals.css`**: reguła `*:focus-visible` zyskała `box-shadow:0 0 0 2px #2D5A4E`
   (ciemny pierścień obok złotej obwódki): na jasnych tłach wskaźnik fokusa ma teraz
   7.38:1 (kremowy) / 7.82:1 (biały); na zielonej stopce złota obwódka nadal daje 3.49:1.
   Wygląd złotej obwódki bez zmian — dodany tylko kontrastujący pierścień.

## Weryfikacja po poprawkach

- Build: `✓ Compiled successfully`, eksport statyczny OK.
- axe-core po poprawkach: strona główna (z formularzem) **0 naruszeń**, `/blog` **0**,
  artykuł **0**.
- Focus-visible: wszystkie 25 (strona główna, góra) / 35 (po zamontowaniu sekcji
  Kontakt) elementów fokusowalnych ma widoczną obwódkę fokusa.
- W wyrenderowanym DOM: checkbox RODO bez zbędnego `aria-describedby`;
  skompilowany CSS zawiera `placeholder\:text-ink\/70::placeholder{color:#1a1a1ab3}`
  i `box-shadow:0 0 0 2px #2d5a4e`.

## Świadomie zostawione (z uzasadnieniem)

- **`text-ink/60` na białym tle** (data na kartach bloga na stronie głównej i `/blog`,
  etykiety w sekcji Kontakt, tekst „Ładowanie sekcji kontaktowej…”) — 4.54:1 > 4.5:1,
  przechodzi; nie zmieniane zgodnie z zasadą minimalnych zmian (margines cienki —
  warto pamiętać przy przyszłych zmianach kolorów).
- **Przycisk wyłączony (disabled) `white/60` na zielonym = 3.99:1** — elementy
  wyłączone są wprost wyłączone z wymogu kontrastu WCAG 1.4.3.
- **Baner cookies: `text-ink/80` i link `text-green` na białym** — axe zgłaszał
  „incomplete” tylko dlatego, że baner (fixed) nachodzi na inne elementy; realny
  kontrast to ~13:1 i 7.82:1 — przechodzi z ogromnym zapasem.
- **Ikony dekoracyjne (lucide, `aria-hidden="true"`)** w kolorze gold na jasnym tle
  (~2.1:1) — dekoracyjne, nie niosą informacji (mają tekstowe etykiety obok),
  więc wymóg 1.4.11 (non-text contrast) ich nie obejmuje.
- **Złota obwódka fokusa na zielonej stopce (3.49:1)** — przechodzi 3:1; nie zmieniano.
- **Animacja Reveal (opacity 0 przed wejściem w viewport)** — treść znika/pojawia się
  przy przewijaniu; przy fokusie klawiaturowym elementy odsłaniają się po przewinięciu
  (IntersectionObserver), co jest zgodne z zachowaniem strony; celowo nie zmieniane
  (wykracza poza wąski zakres zadania).
- **Strona 404 i /polityka-prywatnosci** — nie mają `text-ink/60`; nie były w zakresie
  audytu (strona główna, /blog, artykuł), ale wszystkie wspólne komponenty
  (Header/Footer/Input) są objęte powyższymi poprawkami.

## Podsumowanie

Strona przechodzi kontrolę WCAG 2.2 AA (axe-core: 0 naruszeń na wszystkich trzech
sprawdzanych stronach) w zakresie objętym audytem. Wprowadzono 4 minimalne poprawki
(8 plików, 8 linii), wszystkie potwierdzone realnymi pomiarami kontrastu lub
zgłoszeniem axe (critical). Żadnych zmian treści ani przeprojektowań.
