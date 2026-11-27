# Słownik psychologiczny — publikacja w eksporcie produkcyjnym

Stan porównano z bazą `56275e2`. „Publiczne” oznacza dostępne dla użytkownika i robotów w paczce `out/` po standardowym wdrożeniu. Nie uruchamiano Firebase deploy i nie potwierdzono dostępności nowych treści na żywej domenie.

| Miara | Baza | Nowy eksport |
|---|---:|---:|
| Pełne publiczne definicje | 0 | **69** |
| Wszystkie pozycje widoczne w indeksie | 9 | **73** (69 definicji + 4 odsyłacze) |
| Dokumenty HTML definicji | 0 | 69 |
| URL-e słownika w sitemapie, łącznie z jego indeksem | 1 | 70 |
| Wszystkie indeksowalne strony w sitemapie i globalnym indeksie | 123 | 192 |
| Wszystkie pliki HTML w `out/` po `postbuild` | 133 | 202 |
| URL-e z udokumentowanym `lastmod` | 23 | 23 |
| Szkice nieopublikowane | 60 | 0 |

**69 nowych adresów** to 60 opracowań przejętych z dotychczasowego rejestru i 9 definicji napisanych w tym etapie. Nie rozbudowywano wcześniej opublikowanych pełnych definicji, ponieważ takich nie było. Pięć dotychczasowych pozycji indeksu (przeniesienie, organizacja osobowości, diagnoza różnicowa, funkcje wykonawcze, kontrakt terapeutyczny) prowadzi teraz do własnych definicji. Ich dotychczasowe strony kontekstowe nie zmieniły URL. W poprzednim etapie pięć tekstów w rejestrze istotnie rozwinięto; nie są to dodatkowe pozycje poza 69.

- [Wszystkie nowe adresy i bibliografia przypisana do każdego hasła](HASLA.md)
- [Wykaz 20 nowych kontekstowych odsyłaczy w istniejących materiałach](LINKI.md). W samych hasłach jest 207 kierunkowych powiązań z innymi definicjami i 71 odsyłaczy do materiałów kontekstowych, bez liczenia sąsiadów alfabetycznych. Przeskanowano akapity eksportu pod kątem odmian m.in. organizacji osobowości, złości, przeniesienia i mechanizmów obronnych. Wybrano konkretne miejsca; nie wstawiano linków automatycznie do każdego trafienia.
- [Zrzuty Chromium](zrzuty/): oba katalogi oraz Agresja, Projekcja, Formacja kompromisowa, Organizacja osobowości i ADHD, przy 390 i 1440 px.

## Co zmieniło się w publikacji

`status: published` decyduje o dostępności, `status: draft` pozwala wyłączyć niekompletne hasło. Recenzja, autor i daty są opcjonalne. Przy braku nazwiska strona pokazuje „Materiał redakcyjny witryny”, nie przypisuje przygotowania właścicielowi i nie oznacza niezależnej recenzji. Jedna trasa `[slug]` i `generateStaticParams` eksportują komplet publicznych definicji. Nie ma już generatora osobnych plików tras. Sitemap i lokalne wyszukiwanie powstają z kanonicznych plików eksportu; wyszukiwanie rozpoznaje też zapis synonimiczny i angielski.

Sekcje „Ostatnio dodane” i „Ostatnio zaktualizowane” wyświetlą się po wpisaniu prawdziwych dat wydarzeń. Nie nadano daty publikacji z daty commitu, buildu ani planowanego wdrożenia. W diagnozie ogólnej zachowano istniejący `lastmod`: po usunięciu z HTML nowego znacznika odsyłacza hash wracał do poprzedniej udokumentowanej wartości, czyli tekst był ten sam. Pozostałe daty nie zostały masowo przeliczone.

## Zakres sprawdzenia treści i źródeł

Sprawdzono kompletność, definicję, opis, przykłady, odróżnienia, bibliografię i powiązania wszystkich 60 wpisów. Przykłady są fikcyjne i nie służą do rozpoznawania zaburzeń. Usunięto m.in. powtórzenia w przeniesieniu i identyfikacji projekcyjnej, doprecyzowano testowanie rzeczywistości i różnice między organizacją a rozpoznaniem. Agresja zachowała obszerny tekst, w tym sześć przykładów, różnice Freud–Klein–Winnicott–Kernberg, rozgraniczenia zachowania i afektu oraz część o TFP i bezpieczeństwie.

| Zakres | Podstawa i granice |
|---|---|
| Obrony | [Di Giuseppe i Perry, otwarty tekst z definicjami](https://doi.org/10.3389/fpsyg.2021.718440) uzupełnia publikacje Anny Freud, Vaillanta i McWilliams. Nie utożsamiano ich klasyfikacji. Formację kompromisową oparto na [APA](https://dictionary.apa.org/compromise-formation). |
| Przeniesienie, techniki, organizacja | [Kernberg 2021, dostępny artykuł o TFP i psychoanalizie](https://formazionecontinuainpsicologia.it/wp-content/uploads/2021/12/Kernberg-2021-Dynam-Psych.pdf), [przegląd modeli organizacji w PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8238706/) i [APA: enactment](https://dictionary.apa.org/enactment) uzupełniają podręczniki. Model strukturalny nie zastępuje formalnej klasyfikacji ICD. Nie jest to informacja, że gabinet stosuje wymieniane w literaturze narzędzia. |
| Agresja, afekt i teoria historyczna | Rozróżnienie behawioralne: Anderson i Bushman, Dodge i Coie, [Farrell i in. w CDC Stacks](https://stacks.cdc.gov/view/cdc/81070/cdc_81070_DS1.pdf), hasła APA. Dla Kernberga 1994 i syntezy 2001 podstawą są dostępne opisy/abstrakty oraz uzupełniający tekst o technice TFP. Rozdział o nienawiści zweryfikowano bibliograficznie; nie cytowano go bezpośrednio. Wątki historyczne osadzono w tekstach źródłowych wskazanych w bibliografii, uzupełnionych opracowaniami Melanie Klein Trust i Winnicott Trust. Nie deklaruje się przeglądu całych książek ani empirycznego dowodu popędu śmierci. |
| Rozwój i relacje | Hasła APA o środowisku podtrzymującym, obiekcie wewnętrznym, separacji–indywiduacji, regulacji emocji i relacji. Klasyczne prace Klein, Biona, Fairbairna i Mahler służą jako wskazanie pochodzenia pojęć; ich modele nie są uniwersalnymi kalendarzami czy normami diagnozy. |
| Diagnostyka i poznanie | [WHO ICD-11 CDDR](https://www.who.int/publications/i/item/9789240077263), [NICE NG87](https://www.nice.org.uk/guidance/ng87/chapter/recommendations), [APA: ocena psychologiczna](https://dictionary.apa.org/psychological-assessment) i [Diamond, dostępny pełny tekst](https://pmc.ncbi.nlm.nih.gov/articles/PMC4084861/). Oddzielono przesiew, ocenę funkcjonowania, różnicowanie i rozpoznanie; definicje nie opisują uprawnień ani procedur konkretnego gabinetu. |

Bibliografie nie są systematycznym przeglądem literatury, a prace historyczne nie wszędzie były dostępne w pełnym tekście. Nie przeprowadzono niezależnej recenzji eksperckiej i strona jej nie deklaruje.

## Testy

- `npm ci` i `npm run build` z `postbuild`: przeszły. `parse5` już był zadeklarowany i zablokowany w `package.json`/`package-lock.json`; czysta instalacja i postbuild potwierdziły jego obecność.
- `npm run check:sitemap`, `check:links`, `check:content`, `check:export`, `check:lastmod`, `check:sitemap:failures`, `npx tsc --noEmit`, `git diff --check`: przeszły. Sitemap zawiera 192 kanoniczne adresy, w tym 69 nowych definicji; zero uszkodzonych, osieroconych i nieosiągalnych linków/stron w audycie. Każde hasło znajduje się też w fizycznym globalnym indeksie i jest wyszukiwalne po nazwie oraz zapisanych synonimach.
- Lokalny statyczny serwer: HTTP 200 dla wszystkich 69 definicji (w tym **Agresji**) oraz sitemapy, HTTP 404 dla nieistniejącego hasła. Test porównał canonical, definicję w HTML, powiązania i obecność w sitemapie.
- Playwright: katalogi przy 320, 375, 390, 768, 1024, 1440 i 1920 px; strony pięciu haseł przy 390 i 1440 px. Bez wykrytego poziomego przewijania. Kategoria działa z klawiatury, kotwica Ł działa, a globalne wyszukiwanie prowadzi do Agresji. Bez JS dostępne linki SSR; na obu katalogach brak lokalnej wyszukiwarki. Cztery automatyczne testy axe katalogów bez wykrytych naruszeń w wybranym zestawie reguł. Bez testów czytników ekranu i innych silników.

## Zmienione pliki
- `.gitignore`
- `app/editorial.css`
- `app/slownik-psychologiczny/[slug]/page.tsx`
- `app/slownik-psychologiczny/page.tsx`
- `app/w-czym-pomagam/[topic]/page.tsx`
- `components/CategoryCatalogue.tsx`
- `components/GlossaryEntryPage.tsx`
- `components/GlossaryLink.tsx`
- `components/HelpTopicIndex.tsx`
- `components/ServicePage.tsx`
- `content/glossary-sources.json`
- `content/glossary.json`
- `content/lastmod.json`
- `docs/publikacja-slownika/HASLA.md`
- `docs/publikacja-slownika/LINKI.md`
- `docs/publikacja-slownika/RAPORT.md`
- `lib/context-links.tsx`
- `lib/glossary-policy.d.mts`
- `lib/glossary-policy.mjs`
- `lib/glossary.ts`
- `lib/search-core.d.mts`
- `lib/search-core.mjs`
- `lib/service-editorial.tsx`
- `package.json`
- `scripts/build-search.mjs`
- `scripts/check-catalogues-browser.cjs`
- `scripts/check-export.mjs`
- `scripts/check-glossary-http.mjs`
- `scripts/check-knowledge.mjs`
- `scripts/generate-glossary.mjs`
- `scripts/glossary-registry.mjs`

Dodatkowo 14 plików JPEG w `docs/publikacja-slownika/zrzuty/`.
