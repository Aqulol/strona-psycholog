# Jedna usługa psychoterapii indywidualnej

| Trasa | Funkcja i korekta |
|---|---|
| `/`, `/oferta/` | Jedna karta „Psychoterapia indywidualna”, odnośniki edukacyjne o nurcie i modelu, opis trybu zdalnego i jedno CTA konsultacji wstępnej na karcie. |
| `/cennik/` | Jedna stawka za sesję psychoterapii indywidualnej w gabinecie lub online. Oferta w Schema.org odnosi się do tej samej encji usługi. |
| `/psychoterapeuta-wroclaw/` | Kwalifikacje, szkolenie, superwizja i przebieg pracy; linki edukacyjne zamiast kart konkurencyjnych usług. |
| `/psychoterapia-indywidualna-wroclaw/` | Główna strona usługi dla intencji „psychoterapia Wrocław”: kwalifikacja, kontrakt, regularność i CTA konsultacji wstępnej. |
| `/psychoterapia-psychodynamiczna-wroclaw/` | Nurt: emocje, konflikty psychiczne, wcześniejsze doświadczenia i relacja; link do TFP jako modelu i do usługi. |
| `/terapia-skoncentrowana-na-przeniesieniu-tfp/` | Model oparty na teorii relacji z obiektem; rozróżnienie modelu, przeniesienia, kontraktu i integracji. Bez deklaracji pełnego protokołu lub certyfikatu. |
| `/psychoterapia-online/` | Tryb zdalny tej samej usługi, prywatność, warunki połączenia i kwalifikacja. Bez odrębnej oferty w JSON-LD. |
| `/psychoterapia-dorosli/`, `/o-mnie/`, `/faq/`, `/konsultacje-psychologiczne-wroclaw/` | H1 strony dorosłych odróżniony od strony usługi; opis stosowania modelu pod superwizją i wyraźne oddzielenie częstotliwości opisanej w literaturze od indywidualnych ustaleń. |
| `/diagnoza-osobowosci-wroclaw/`, `/konsultacja-dotyczaca-wyboru-psychoterapii/`, `/blog/tfp-dla-kogo/` | Zamiast sugerować wybór z metod gabinetu, mowa o zasadności proponowanej psychoterapii po konsultacjach. |
| `/w-czym-pomagam/zaburzenia-osobowosci/`, `/w-czym-pomagam/borderline/`, `/w-czym-pomagam/narcyzm/` | Zamiast „jedna z opcji” lub „psychoterapia, w tym TFP” – model wykorzystywany w prowadzonej psychoterapii indywidualnej; brak samokwalifikacji na podstawie diagnozy. |
| `/kiedy-zglosic-sie-na-terapie/`, `/w-czym-pomagam/problemowe-uzywanie-substancji/` | Przy aktywnym uzależnieniu pierwszeństwo ma specjalistyczne leczenie; nie sugeruje się alternatywnego wariantu terapii w gabinecie. |

Menu zachowuje link „Psychoterapeuta” i osobny przycisk; podmenu prowadzi do nurtu, modelu i trybu online. Rejestr `lib/services.ts` oznacza te trzy pozycje jako materiały referencyjne, bez odrębnej stawki i bez `Service`/`Offer` na ich stronach. Zaktualizowano też eksperymentalne `llms.txt` / `llms-full.txt`. Nie zmieniano klinicznej bibliografii ani warunków konsultacji, ceny, wieku przyjmowanych osób czy zakresu diagnostyki.

## Audyt i weryfikacja

Przeskanowano pełne akapity `<main>` 117 kanonicznych tras (ok. 1,8 tys. akapitów). Sprawdzono konteksty TFP, kwalifikacji, online, architekturę menu, stopki, cennika i CTA. To ukierunkowany audyt sformułowań i prezentacji usługi, nie ponowna ręczna recenzja całej witryny. Rozdzielenie lokalnej intencji usługowej, zawodowej, edukacyjnej i dotyczącej trybu ogranicza nakładanie się treści. Nie mierzono wyników Google ani faktycznej kanibalizacji w Search Console.

`npm run build`, `npm run check:export` (w tym nowe asercje pojedynczej karty, CTA i braku osobnych encji), `npm run check:sitemap`, TypeScript i test czasu czytania. Sitemap: 117 tras, zero sierot i nieosiągalnych stron, bez nowych URL. Bez wdrożenia.
