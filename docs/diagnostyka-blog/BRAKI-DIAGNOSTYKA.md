# Dane do potwierdzenia przed uzupełnieniem usług

Warto odpowiedzieć **osobno dla każdej usługi**. Nie kopiujemy cennika, narzędzi ani zasad z profili innych gabinetów. Nie trzeba przekazywać żadnych danych pacjentów ani rzeczywistych dokumentów.

| Usługa | Brakująca informacja | Dlaczego jest ważna | Miejsce w kodzie wymagające uzupełnienia |
| --- | --- | --- | --- |
| Diagnoza psychologiczna | Wiek, dostępność online/hybrydowa, liczba i długość spotkań, całkowity czas i koszt | Pozwala wybrać odpowiednią ścieżkę i zaplanować dojazd oraz wydatki | `lib/services.ts` → `services.general.assessment`: `audience`, `setting`, `meetings`, `duration`, `fee` |
| Diagnoza psychologiczna | Metody poza wywiadem, wymagane materiały, sposób omówienia wyników i dokumentacja | Rozróżnia pogłębioną ocenę od pojedynczego testu i pozwala zawczasu ustalić cel dokumentu | `services.general.assessment`: `tools`, `feedback`, `documentation`; przygotowanie: `components/EditorialServicePage.tsx` |
| Diagnoza osobowości | Wiek, tryb, liczba i długość spotkań, czas procesu i koszt | Wiek i organizacja tej oceny nie wynikają z zasad psychoterapii | `services.personality.assessment`: `audience`, `setting`, `meetings`, `duration`, `fee` |
| Diagnoza osobowości | Dodatkowe metody, wymagane materiały, rezultat i dokumentacja | Pacjent może potrzebować opisu funkcjonowania albo dokumentu do konkretnego celu; to nie to samo | `services.personality.assessment`: `tools`, `feedback`, `documentation`; przygotowanie: `components/EditorialServicePage.tsx` |
| Diagnoza ADHD | Potwierdzona grupa wiekowa, forma, liczba i długość spotkań, czas procesu i koszt | Artykuł o dorosłych oraz dostępność konsultacji online nie są dowodem na kryteria przyjęcia do oceny | `services.adhd.assessment`: `audience`, `setting`, `meetings`, `duration`, `fee` |
| Diagnoza ADHD | Metody poza wywiadem, czy i w jakiej formie zbierane są informacje z dzieciństwa, wyniki, dokumentacja i dalsza ścieżka | Ułatwia przygotowanie bez zgadywania, czy trzeba dostarczyć dokumenty, zaprosić bliską osobę albo odbyć konsultację lekarską | `services.adhd.assessment`: `tools`, `feedback`, `documentation`; opis przygotowania i dalszych kroków: `lib/service-editorial.tsx` → `editorial.adhd` |
| Konsultacja ukierunkowana diagnostycznie | Czy to nadal temat standardowej konsultacji, a nie odrębna rezerwacja? Czy pierwsza konsultacja może być rozliczana jako część procesu? | Pozwala zachować rozróżnienie między stawką standardowej wizyty a kosztem oceny | `services.diagnostic`, `services.consult` i `components/ServiceDirectoryPage.tsx` |
| Psychoedukacja ADHD | Wiek, tryb, cena, długość i typowa liczba spotkań, wymaganie wcześniejszej diagnozy, ewentualne podsumowanie | Wyjaśnia warunki dostępu do odrębnej formy pomocy bez utożsamiania jej z diagnostyką | `services.eduAdhd.assessment`; kryteria i FAQ: `lib/service-editorial.tsx` → `editorial.eduAdhd` |
| Cennik / oferta | Czy cena jest podana za jedno spotkanie czy za cały proces? Czy obejmuje omówienie i dokument? | Umożliwia porównanie usług bez sugerowania, że 200 zł to cena pełnej diagnozy | `services.*.assessment.fee`; ten sam wpis pojawi się w panelu i w `/cennik/` |

## Pytania do właściciela

1. Dla jakich dokładnie grup wiekowych jest każda usługa? Czy są wyjątki lub odrębne zasady dla osób niepełnoletnich?
2. Które etapy odbywają się stacjonarnie, a które mogą odbywać się online? Czy cała ocena może odbyć się na odległość?
3. Jakie są typowe etapy, ich liczba i czas trwania? Co może zmienić liczbę spotkań i termin zakończenia?
4. Ile kosztuje spotkanie, całość i ewentualne dodatkowe etapy? Czy konsultacja wstępna, omówienie wniosków i dokument mają odrębne ceny?
5. Jakie narzędzia rzeczywiście wykorzystujesz w danej ścieżce? Czy są stosowane zawsze czy zależnie od pytania? Jakie przygotowanie jest niezbędne, a co jest wyłącznie pomocne?
6. Jak pacjent poznaje wnioski? Czy istnieje wersja ustna/pisemna, opinia lub inny dokument? Jaki ma zakres, termin, sposób bezpiecznego wydania i ograniczenia zastosowania?
7. Co zwykle proponujesz dalej, gdy wynik jest niejednoznaczny albo potrzebna jest konsultacja psychiatryczna lub dodatkowa ocena? Czy przy psychoedukacji ADHD potrzebne jest wcześniejsze rozpoznanie?
8. Czy prowadzisz własny profil TwójPsycholog lub Google Business Profile? Jeśli tak, podaj publiczny link do **Twojego** profilu, nie do ogólnej mapy ani do profilu placówki.

`AssessmentDetails` w `lib/services.ts` ma opcjonalne pola. Brak wartości nie generuje pustego pola ani placeholdera. Zanim podasz wartości, pozostaje opis zakresu, sposobu pracy, przygotowania i możliwych następstw — bez obietnicy konkretnego wyniku lub dokumentu.
