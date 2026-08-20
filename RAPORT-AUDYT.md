# Audyt strony psychologplebaniak.pl — raport specjalisty IT + SEO + Google Search Console

**Data audytu:** 2026-08-20
**Domena:** https://psychologplebaniak.pl
**Stack:** Next.js 15 (App Router) → eksport statyczny → Firebase Hosting (plan Spark), Firestore, GA4

---

## 0. Ocena ogólna

**8,5/10.** Strona jest wykonana bardzo dobrze jak na tego typu serwis: lekki statyczny eksport, własne fonty, WebP z lazy loadingiem, poprawny JSON-LD, dostępność WCAG 2.2 AA (0 naruszeń w audycie axe), weryfikacja GSC i analityka zgodna z RODO. To rzadkość wśród stron gabinetów.

**Ale jest jeden poważny błąd SEO** (kanonikal), który blokował indeksację artykułów — **został już naprawiony w tym repo** (szczegóły w pkt 2). Po wdrożeniu builda na produkcję trzeba zrobić kilka kliknięć w Search Console (pkt 4.2).

---

## 1. Co działa dobrze (potwierdzone)

| Obszar | Stan |
|---|---|
| SSL + przekierowanie www → bez www | ✔ zweryfikowane na produkcji |
| Weryfikacja Google Search Console | ✔ **podwójna**: meta tag `google-site-verification` w `<head>` ORAZ plik `google2391dcad42225921.html` — oba działają (plik odpowiada poprawnie) |
| robots.txt + sitemap.xml | ✔ poprawne; sitemap ma adresy z końcówką `/` (bez błędu „Przekierowanie” w GSC — potwierdza ostatni commit) |
| Indeksacja domeny | ✔ strona główna w indeksie Google (od ok. stycznia 2026) |
| Tytuły i opisy meta | ✔ 55–68 znaków / 136–162 znaków — w granicach normy |
| H1 na stronę | ✔ dokładnie 1; hierarchia H1→H2→H3 poprawna |
| `lang="pl"` | ✔ |
| JSON-LD | ✔ LocalBusiness + MedicalBusiness + ProfessionalService + Person + FAQPage + BreadcrumbList (home), Article + BreadcrumbList + FAQPage (artykuły) |
| Wydajność | ✔ First Load JS ~103–112 kB, fonty self-hostowane, preload LCP (portret) z `fetchPriority=high`, WebP, lazy loading obrazów w galerii |
| Dostępność | ✔ udokumentowany audyt WCAG 2.2 AA (docs-a11y-audit.md) — 0 naruszeń |
| RODO / prywatność | ✔ GA4 ładuje się DOPIERO po zgodzie w banerze; polityka prywatności kompletna; formularz nie przyjmuje danych o zdrowiu |
| Analityka zdarzeń | ✔ `book_click`, `call_click`, `email_click`, `form_submit` (potwierdzone w docs-ga4-evidence.json) |
| Formularz | ✔ honeypot antyspamowy, walidacja, reguły Firestore blokujące nieznane pola |
| Nowoczesny AI-SEO | ✔ `llms.txt`, meta `ai-content`/`ai-audience`/`ai-topic`/`ai-region` |

---

## 2. 🔴 Błędy znalezione — NAPRAWIONE w tym repo

### 2.1. KRYTYCZNY: kanonikal strony głównej na wszystkich podstronach
**Objaw:** `app/layout.tsx` zawierał `alternates: { canonical: '/' }`. Metadata layoutu jest **dziedziczona przez wszystkie podstrony**, więc `/blog`, wszystkie 4 artykuły i `/polityka-prywatnosci` wysyłały Google kanonikal `https://psychologplebaniak.pl/`.

**Skutek:** Google traktował każdą podstronę jako duplikat strony głównej → artykuły bloga (publikowane 11.08.2026) praktycznie nie miały szans na indeksację. Potwierdzenie: wyszukiwarka zwraca frazę „dlaczego ciągle wybieram podobnych partnerów” z innych serwisów, a strona główna widnieje w SERP, ale żaden z artykułów nie — mimo że istnieją od ponad tygodnia.

**Naprawa (wdrożona):** usunięto globalny canonical; kanonikale ustawione per strona:

| Strona | Canonical po naprawie |
|---|---|
| `/` | `https://psychologplebaniak.pl/` |
| `/blog/` | `https://psychologplebaniak.pl/blog/` |
| 4 artykuły | `https://psychologplebaniak.pl/blog/<slug>/` |
| `/polityka-prywatnosci/` | `https://psychologplebaniak.pl/polityka-prywatnosci/` |

Zweryfikowane w wygenerowanym HTML (build 2026-08-20) — każda strona ma swój poprawny kanonikal z końcówką `/`.

### 2.2. Sitemap: `lastmod` zmieniał się przy każdym buildzie
`app/sitemap.ts` używał `lastModified: new Date()` → przy każdym deployu Google dostawał sygnał, że wszystkie 7 stron się zmieniły, i niepotrzebnie przeszukiwał wszystko. **Naprawa:** stałe daty — artykuły: data publikacji (2026-08-11), pozostałe: data ostatniej istotnej zmiany (2026-08-19).

### 2.3. Zduplikowane preloady obrazów
`logo.png` (232 kB!) i `portret.webp` były preloadowane **podwójnie** (ręcznie w layout/page + automatycznie przez Next.js 15). **Naprawa:** usunięto ręczne wpisy, zostawiono automatyczne (po 1 sztuce).

### 2.4. JSON-LD artykułów: adresy bez końcówki `/`
`mainEntityOfPage` i BreadcrumbList w `lib/articleJsonLd.ts` wskazywały `.../blog/slug` (bez `/`), podczas gdy rzeczywisty adres i canonical są z `/`. **Naprawa:** ujednolicono (z `/`).

### 2.5. Brak `og:url`
Podczas udostępniania w social media nie było jawnego `og:url`. **Naprawa:** dodany na stronie głównej, liście bloga, artykułach i polityce prywatności.

> **Do zrobienia po tej sesji:** `npm run build` → `firebase deploy --only hosting` → w GSC „Zażądaj ponownego zindeksowania” dla artykułów (pkt 4.2).

### 2.6. Dodatkowe poprawki wdrożone w tej sesji (P1+P2 z pkt 5)
- ✅ **Nowa podstrona `/cennik/`** — osobny adres pod frazy „cennik psychoterapia Wrocław”, dane strukturalne `OfferCatalog` z cenami (160 zł / 140 zł), linki w stopce, blogu i artykułach.
- ✅ **Nowy artykuł** „Jak wybrać psychoterapeutę? Praktyczny przewodnik” (`/blog/jak-wybrac-psychoterapeute/`, 2026-08-20) — z JSON-LD Article+FAQ, dodany do listy bloga, sitemap, llms.txt i sekcji „Przeczytaj także” innych wpisów.
- ✅ **Baner cookies:** dodany przycisk **„Tylko niezbędne”** (równoważna odmowa — zgodność ePrivacy/RODO); zdarzenia analityczne dodatkowo blokowane bez zgody (twarda brama w `lib/analytics.ts`).
- ✅ **Consent Mode v2** — deklaracja stanów zgody (`analytics_storage` itd.) przed konfiguracją GA4.
- ✅ **GTM:** placeholder usunięty (`gtmId: ''`) — GA4 działa bezpośrednio, bez ryzyka podwójnego zliczania.
- ✅ **LocalBusiness JSON-LD rozszerzony** o `url`, `@id`, `image`, `logo`, `hasMap`; `geo` dołączane automatycznie po uzupełnieniu współrzędnych w `lib/config.ts`.
- ✅ **301 redirecty** starych adresów bloga (artykul-1…4, jak-radzic-sobie-z-lekiem itd.) w `firebase.json` — zamiast stron z meta refresh (przekazują moc linków).
- ✅ **Logo:** `logo.webp` (12,7 kB zamiast 232 kB, −95%) używane w headerze; `logo.png` pozostaje tylko dla schema.org.
- ✅ **PWA/manifest:** `public/manifest.json`, `theme-color`, favicony z atrybutami `sizes` (32/192/512).
- ✅ **Bezpieczeństwo:** `Content-Security-Policy` + `Permissions-Policy` w nagłówkach Firebase Hosting.
- ✅ **Wzmianka o lokalizacji:** sekcja „Gabinet” informuje, że gabinet mieści się w Soméntiq – Centrum Psychologii i Psychoterapii (spójność NAP).
- ✅ **Porządek w repo:** usunięto z gita `workspace-*.zip` i oryginalne JPG-i (wersje WebP są w `public/images/`); wzorce dodane do `.gitignore`.

---

## 3. SEO — pełna analiza

### 3.1. Techniczne SEO
| Element | Ocena | Uwagi |
|---|---|---|
| Canonical | ✅ po naprawie | wcześniej krytyczny błąd (pkt 2.1) |
| Sitemap / robots | ✅ | adresy z `/`, brak 301 |
| Struktura URL-i | ✅ | krótkie, czytelne, polskie slugi |
| Nagłówki | ✅ | 1×H1, logiczna hierarchia |
| Obrazy | ✅ | alt, width/height, WebP, lazy |
| 404 | ✅ | statyczna 404.html |
| Prędkość | ✅ | lekka strona; logo zoptymalizowane (232 kB → 12,7 kB); pomiar CWV w terenie do zrobienia w GSC |
| Bezpieczeństwo | ✅ | dodane CSP + Permissions-Policy (do weryfikacji po wdrożeniu) |
| PWA/manifest | ✅ | manifest.json, theme-color, favicony z sizes |

### 3.2. SEO treści
- **Targetowanie fraz:** strona główna dobrze celuje w „psycholog Wrocław”, „psychoterapia psychodynamiczna Wrocław”, „psycholog Gaj”, „psycholog online”. ✔
- **Blog:** 5 wartościowych, długich artykułów (4 z 2026-08-11 + „Jak wybrać psychoterapeutę?” z 2026-08-20) z sekcjami FAQ — bardzo dobry materiał pod frazy informacyjne („jak wybrać psychoterapeutę”, „dlaczego wybieram podobnych partnerów”, „wypalenie zawodowe”, „lęk”). Tematy są trafne, ale jest ich **wciąż za mało** — Google lubi regularność (2–4 wpisy/mies.).
- **Cennik:** dodana osobna podstrona `/cennik/` (targetowanie fraz „psychoterapia Wrocław cennik”) z danymi strukturalnymi `OfferCatalog`. **„Kontakt” jako osobny URL** nadal można dodać w przyszłości.
- **Linkowanie wewnętrzne:** dobre — sekcja „Przeczytaj także” w artykułach, kotwice nawigacji. Można dodać linki kontekstowe w treści artykułów do sekcji strony głównej (już częściowo są).
- **Struktura danych:** LocalBusiness bez `url`, `logo`, `image`, `geo` i `openingHours` — warto uzupełnić (pkt 5.5).

### 3.3. SEO lokalne — ⚠️ najważniejsza rekomendacja poza kodem
W wynikach Google strona jest powiązana z bytem **„Gabinet SOMÉNTIQ”** (w snippetach widać „Gabinet SOMÉNTIQ, ul. Śliczna 28/24”, a w sieci funkcjonuje placówka SOMÉNTIQ – psychologia, psychoterapia, coaching, **tel. +48 880 882 172**, piętro 8), natomiast strona podaje **„Grzegorz Plebaniak”, ul. Śliczna 28/24, tel. +48 693 087 574** — bez piętra i z innym numerem.

**Niespójność NAP (Name/Address/Phone) między stroną, wizytówką Google, ZnanyLekarz (profil lekarza vs placówka) i katalogami (locarate.pl) osłabia lokalny ranking.** Google nie wie, czy to ta sama firma.

**Do decyzji właściciela:** ujednolicić wszędzie jeden zestaw (nazwa, adres z piętrem, jeden telefon) albo świadomie rozdzielić markę osobistą (Grzegorz Plebaniak) od placówki (SOMÉNTIQ). W obu wariantach: strona, Google Business Profile, ZnanyLekarz (profil + placówka), locarate i inne katalogi muszą mieć **identyczne** NAP.

### 3.4. Linki (off-page)
- Domenie brakuje sygnałów zewnętrznych — to naturalne (młoda domena). Najszybsze źródła wartościowych linków: **Google Business Profile**, profil **ZnanyLekarz** (już istnieje i jest mocny), strona placówki somentiq.pl (jeśli istnieje), lokalne media/katalogi, artykuły gościnne.
- Link do ZnanyLekarz z `rel="nofollow"` — OK (link partnerski); nie zmieniać na dofollow w sekcji kontakt.
- `sameAs` w JSON-LD zawiera tylko ZnanyLekarz — dodać URL wizytówki Google i profili social (jeśli są).

---

## 4. Google Search Console — analiza ustawień

### 4.1. Co jest skonfigurowane poprawnie ✅
1. **Weryfikacja zasobu — podwójna:** meta tag `google-site-verification` (content `CzlhzCDS5zGi-A7dtgAl5kU80WTzUisLFFLmqwd5wD4`, dodany 2026-08-19) w `<head>` **oraz** plik `google2391dcad42225921.html` w katalogu publicznym. Obie metody działają na produkcji (plik odpowiada `google-site-verification: google2391dcad42225921.html`).
2. **Sitemap:** `https://psychologplebaniak.pl/sitemap.xml` istnieje i jest wskazana w robots.txt; adresy z końcówką `/` — bez błędu „Przekierowanie” (poprawione w ostatnim commicie).
3. **Domena w indeksie:** strona główna zaindeksowana; przekierowanie www→bez-www działa.
4. **Brak oczywistych problemów technicznych:** poprawne nagłówki, 404, cache.

### 4.2. Checklista — co kliknąć w GSC (dane konta; z sandboxa nie da się ich odczytać)
- [ ] **Sitemaps** → czy `sitemap.xml` ma status **„Sukces”** (jeśli nie — wklej adres i zapisz).
- [ ] **URL Inspection** → wklej adresy 5 artykułów i `/cennik/` (np. `https://psychologplebaniak.pl/blog/jak-wybrac-psychoterapeute/`) → **„Zażądaj indeksowania”**. **Zrób to PO wdrożeniu naprawy kanonikali** (bez tego prośba nie ma sensu — strona kanonikalizowała na `/`).
- [ ] **Strony (Pages)** → sprawdź liczbę „Zaindeksowanych” i sekcję „Przeskanowano – obecnie nieindeksowana” / „Wykryto – obecnie nieindeksowana”. Po naprawie artykuły powinny trafić do zaindeksowanych w 1–2 tygodnie.
- [ ] **Skuteczność (Performance)** → ustaw filtr zapytania zawierające „wrocław” i „psycholog” — to Twoje główne frazy; obserwuj CTR i pozycje.
- [ ] **Core Web Vitals** → czy raport ma dane; jeśli nie, odpal PageSpeed Insights na `/` i `/blog/`.
- [ ] **Ręczne działania / Bezpieczeństwo** → powinny być puste.
- [ ] **Dodaj Bing Webmaster Tools** (www.bing.com/webmasters) — zgłoś tę samą sitemapę; darmowy ruch, a weryfikację można zrobić meta tagiem `msvalidate.01` (do dodania w `app/layout.tsx`).
- [ ] **GA4:** Administracja → Zdarzenia → oznacz jako konwersje: `book_click`, `call_click`, `email_click`, `form_submit` (bez tego GSC/GA4 nie pokaże, ile zapytań kończy się kontaktem).

### 4.3. Ocena ustawień GSC
**Dobrze ustawione (8/10).** Podwójna weryfikacja, poprawna sitemap i brak błędów technicznych to więcej, niż ma większość podobnych stron. Brakuje tylko: (a) aktywnego pilnowania raportów po stronie właściciela (sitemap zgłoszona?, artykuły zaindeksowane?), (b) Bing, (c) powiązania konwersji GA4. **Największym realnym problemem nie była konfiguracja GSC, lecz kanonikal w kodzie** — dlatego artykuły się nie indeksowały. To już naprawione.

---

## 5. Rekomendacje: poprawki / ulepszenia / dodatki (poza już naprawionymi)

### P0 — najwyższy priorytet
1. **Wdróż poprawki** (`npm run build && firebase deploy --only hosting,firestore`) i zrób checklistę 4.2. Bez deploya naprawa kanonikali nie dotrze na produkcję.
2. **Ujednolić NAP/markę.** Zgodnie z ustaleniem: marka osobista **Grzegorz Plebaniak** (JDG), a Soméntiq to placówka, w której mieści się gabinet (współpraca B2B). Na stronie dodano już wzmiankę „Gabinet mieści się w Soméntiq…”. Do ujednolicenia na zewnątrz: Google Business Profile, ZnanyLekarz (profil + placówka), katalogi (locarate) — NAP identyczne ze stroną, telefon +48 693 087 574.
3. **Google Business Profile:** utworzyć/zweryfikować wizytówkę „Grzegorz Plebaniak — psycholog”, dane NAP identyczne ze stroną, kategoria „Psychologist”, link do strony, zdjęcia gabinetu.

### P1 — ważne, nieduży wysiłek
4. ✅ **Baner cookies z przyciskiem „Tylko niezbędne”** — wdrożone (równoważna odmowa; ePrivacy/RODO).
5. ✅ **LocalBusiness JSON-LD** rozszerzony o `url`, `@id`, `image`, `logo`, `hasMap`. Do uzupełnienia przez właściciela: `geo` (współrzędne) w `lib/config.ts` oraz `openingHours` (godziny przyjęć — podaj, a wstawię).
6. ✅ **Podstrona `/cennik/`** z `OfferCatalog` — wdrożone.
7. ✅ **301 redirecty** starych adresów bloga w `firebase.json` — wdrożone (16 reguł).
8. ✅ **GTM:** placeholder usunięty (`gtmId: ''`) — wdrożone.
9. ✅ **Consent Mode v2** + twarda brama zgody w `track()` — wdrożone. **Pozostaje w GA4:** oznaczyć zdarzenia jako konwersje (Administracja → Zdarzenia): `book_click`, `call_click`, `email_click`, `form_submit`.

### P2 — drobne i strategiczne
10. 🟡 **Blog:** 1 nowy artykuł dodany („Jak wybrać psychoterapeutę?”, 2026-08-20). Kontynuować: 2–4 wpisy/mies. („pierwsza wizyta u psychologa — jak się przygotować”, „terapia online vs stacjonarnie”, „lęk przed zmianą”…), linkowanie do cennika/kontaktu, frazy lokalne („Wrocław Gaj”).
11. ✅ **Logo zoptymalizowane:** `logo.webp` 12,7 kB (zamiast 232 kB PNG) w headerze; `logo.png` pozostaje tylko dla schema.org.
12. ✅ **PWA/manifest:** `manifest.json`, `theme-color`, favicony z `sizes` — wdrożone.
13. ✅ **Bezpieczeństwo:** `Content-Security-Policy` + `Permissions-Policy` w `firebase.json` — wdrożone (do weryfikacji po deployu: formularz, widget ZL, mapa).
14. 🟡 **Formularz:** do rozważenia w przyszłości — reCAPTCHA v3 lub limit w Cloud Function (obecnie honeypot + reguły Firestore).
15. ✅ **Porządek w repo:** usunięte `workspace-*.zip` i JPG-i; wzorce w `.gitignore`.
16. 🟡 **Współrzędne geograficzne** — pola `geoLat`/`geoLng` w `lib/config.ts` czekają na wartości (instrukcja w komentarzu); **godziny przyjęć** (`openingHours`) do wstawienia po podaniu.

---

## 6. Wdrożenie na produkcję (krok po kroku)

Poprawki są w repo i zbudowane (`out/`). Wdrożenie wymaga zalogowania się na konto Firebase właściciela (w środowisku agenta nie ma sesji Firebase):

```bash
# w katalogu projektu
npm install
npm run build
npx firebase-tools login          # przeglądarka → konto Google właściciela projektu psychologplebaniak-e4480
npx firebase-tools deploy --only hosting,firestore
```

Po wdrożeniu (konieczne, aby poprawki trafiły na produkcję):

1. **Google Search Console** → Sitemaps → `https://psychologplebaniak.pl/sitemap.xml` (status „Sukces”).
2. **URL Inspection** → wklej po kolei adresy 5 artykułów i `/cennik/` → „Zażądaj indeksowania”.
3. **GA4** → Administracja → Zdarzenia → oznacz jako konwersje: `book_click`, `call_click`, `email_click`, `form_submit`.
4. **Uzupełnij współrzędne** w `lib/config.ts` (`geoLat`/`geoLng`) — instrukcja w komentarzu w pliku.
5. **Sprawdź po wdrożeniu** działanie formularza kontaktowego, widgetu ZnanyLekarz i mapy (nowa polityka CSP może wymagać korekty, jeśli któreś zewnętrzne zasoby zostaną zablokowane — patrz komentarz w `firebase.json`).

---

## 7. Podsumowanie

| Obszar | Ocena |
|---|---|
| Technika/wydajność | 9,5/10 |
| SEO on-page | 8,5/10 (było 5/10 przez kanonikal — naprawione; dodany /cennik/ i artykuł) |
| SEO lokalne (NAP) | 6/10 — marka ustalona (osobista + Soméntiq jako placówka); do dopięcia w GBP/katalogach |
| Konfiguracja GSC | 8/10 — brakuje aktywnego korzystania + Bing |
| Dostępność | 10/10 |
| RODO/prywatność | 9,5/10 (baner z odmową + Consent Mode v2; do dopięcia: retencja GA4) |

**Najważniejsze teraz:** (1) wdrożyć build na produkcję (pkt 6), (2) w GSC zażądać indeksacji 5 artykułów i /cennik/, (3) ujednolicić NAP w Google Business Profile, ZnanyLekarz i katalogach, (4) wstawić współrzędne/ godziny przyjęć w `lib/config.ts`, (5) regularnie publikować artykuły (2–4/mies.).
