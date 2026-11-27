import BlogReading from '../../../components/BlogReading';
import {config} from '../../../lib/config';
import ArticleBookingCta from '../../../components/ArticleBookingCta';

export const faq: [string, string][] = [
  [
    'Czy każdy psychoterapeuta jest psychologiem?',
    'Nie. Role psychologa i psychoterapeuty nie są tożsame. Warto zapytać o wykształcenie, etap szkolenia psychoterapeutycznego, superwizję i ewentualny certyfikat.',
  ],
  [
    'Czy droższy terapeuta znaczy lepszy?',
    'Nie. Cena zależy głównie od doświadczenia, rodzaju praktyki i lokalizacji. Najważniejszy jest dobry kontakt i poczucie bezpieczeństwa. Warto wybrać osobę, u której można regularnie pracować w ramach własnego budżetu - terapia bywa długim procesem.',
  ],
  [
    'Po ilu spotkaniach powinienem/powinnam wiedzieć, że to dobry wybór?',
    'Pierwsza konsultacja powinna dać wstępne poczucie bezpieczeństwa i jasność co do zasad współpracy. Pełną ocenę relacji warto zrobić po kilku spotkaniach. Jeśli po kilku sesjach trudno Panu/Pani rozmawiać swobodnie, warto o tym powiedzieć terapeucie - to też część pracy.',
  ],
];

export const body = <>
        <p className="mt-6 leading-8 text-ink/80">
          Wybór terapeuty to jedna z najbardziej osobistych decyzji, jakie można podjąć.
          Odpowiedź na pytanie „do kogo pójść” rzadko jest jednoznaczna - nie ma jednego
          „najlepszego” specjalisty dla wszystkich. Liczą się kompetencje, nurt pracy,
          logistyka i przede wszystkim to, czy w kontakcie z daną osobą może Pan/Pani czuć się
          wystarczająco bezpiecznie, aby mówić o trudnych sprawach. Poniżej praktyczny
          przewodnik, który pomoże zawęzić wybór i dobrze wykorzystać pierwsze spotkanie.
        </p>

        <h2 className="mt-12 text-4xl text-green">Psycholog, psychoterapeuta czy psychiatra?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Wykształcenie psychologiczne nie jest tym samym co szkolenie do prowadzenia psychoterapii.
          Warto zapytać o etap takiego szkolenia, o superwizję i o certyfikat, jeśli ktoś się na niego powołuje.
          Psychiatra jest lekarzem, który może m.in. zaproponować leczenie farmakologiczne.
        </p>
        <p className="mt-4 leading-8 text-ink/80">
          Te role często się uzupełniają: część osób korzysta równolegle z psychoterapii
          i opieki psychiatrycznej. Nie ma „lepszych” i „gorszych” zawodów - chodzi o to,
          co jest potrzebne w Pana/Pani sytuacji.
        </p>

        <h2 className="mt-12 text-4xl text-green">Czy nurt terapii ma znaczenie?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Nurt opisuje sposób rozumienia trudności i charakter pracy. Oprócz nazwy podejścia warto wziąć pod uwagę także jakość kontaktu podczas konsultacji:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>
            <strong>Psychoterapia psychodynamiczna</strong> - koncentruje się na emocjach,
            nieświadomych wzorcach, relacjach i wpływie przeszłości na teraźniejszość.
            Ważne jest także to, co dzieje się w relacji podczas sesji.
          </li>
          <li>
            <strong>Terapia poznawczo-behawioralna (CBT)</strong> - pracuje głównie z
            myślami i zachowaniami w teraźniejszości; częściej polecana przy konkretnych
            objawach (np. lęk napadowy, fobie) i krótszych, celowanych formach pracy.
          </li>
          <li>
            <strong>Inne nurty</strong> (humanistyczny, Gestalt, systemowy) - różnią się akcentami; warto zapytać terapeutę, jak pracuje, zamiast
            wybierać wyłącznie po nazwie nurtu.
          </li>
        </ul>
        <p className="mt-4 leading-8 text-ink/80">
          Jeśli sposób pracy nie jest dla Pana/Pani jasny, można o niego zapytać podczas konsultacji.
          Dobry terapeuta potrafi w prostych słowach opisać, na czym polega jego praca.
        </p>

        <h2 className="mt-12 text-4xl text-green">Na co zwrócić uwagę przy wyborze</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Przed umówieniem pierwszej wizyty, warto sprawdzić kilka rzeczy - to standard,
          a nie przejaw braku zaufania:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>
            <strong>Wykształcenie i szkolenie.</strong> Czy osoba ma ukończone studia
            psychologiczne lub inne kierunkowe oraz akredytowane szkolenie
            psychoterapeutyczne? Czy informacje o tym są publicznie dostępne?
          </li>
          <li>
            <strong>Superwizja i etyka.</strong> Czy terapeuta regularnie korzysta z
            superwizji? Przynależność do towarzystwa i deklaracja pracy pod superwizją to
            dobry znak jakości i bezpieczeństwa.
          </li>
          <li>
            <strong>Doświadczenie z podobnymi trudnościami.</strong> Jeśli zgłasza się Pan/Pani z lękiem,
            kryzysem, trudnościami w relacjach czy wypaleniem - można zapytać, czy dana osoba pracowała
            z podobnymi sprawami.
          </li>
          <li>
            <strong>Zasady współpracy.</strong> Cena, czas sesji, częstotliwość, zasady
            odwołań i kontrakt - powinny być jasne od początku.
          </li>
        </ul>

        <h2 className="mt-12 text-4xl text-green">Pierwsza konsultacja - jak ją wykorzystać</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Pierwsze spotkanie to nie egzamin, tylko wzajemne poznanie. Konsultacja trwa 50 minut
          i nie zobowiązuje do rozpoczęcia psychoterapii. Może Pan/Pani przygotować sobie kilka pytań
          - to sygnał zaangażowania, a nie przeszkoda:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>Jak wygląda Pana/Pani sposób pracy? Jak często i jak długo zwykle trwa terapia?</li>
          <li>Jakie ma Pan/Pani doświadczenie z podobnymi trudnościami?</li>
          <li>Jak ustalamy cele i kiedy wracamy do ich oceny?</li>
          <li>Jakie są zasady kontaktu między sesjami i odwołań?</li>
        </ul>
        <p className="mt-4 leading-8 text-ink/80">
          Rozpoczęcie psychoterapii poprzedza zazwyczaj kilka spotkań konsultacyjnych, podczas
          których przyglądamy się aktualnym trudnościom, historii życia oraz sposobowi
          funkcjonowania w relacjach. Pozwala to lepiej zrozumieć zgłaszane problemy i ocenić,
          jaka forma pomocy będzie odpowiednia. Po zakończeniu konsultacji omawiamy możliwość
          rozpoczęcia regularnej psychoterapii, jej cele oraz zasady współpracy, w tym
          częstotliwość spotkań, płatności i odwoływanie wizyt.
        </p>
        <p className="mt-4 leading-8 text-ink/80">
          Po spotkaniu warto zapytać siebie: czy czułem/czułam się wysłuchany? Czy nie
          było oceniania i pośpiechu? Czy zasady były jasne? Intensywność pierwszych emocji
          jest naturalna - ale poczucie bezpieczeństwa i szacunku to fundament, na którym
          można budować dalszą pracę.
        </p>

        <h2 className="mt-12 text-4xl text-green">Co powinno wzbudzić wątpliwości?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Warto zwrócić uwagę na poniższe zachowania, niezależnie od tytułów
          i referencji:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>obietnice szybkiego „wyleczenia” lub gwarancje konkretnych efektów,</li>
          <li>nacisk na długi kontrakt finansowy lub zobowiązania bez jasnych zasad,</li>
          <li>przekraczanie granic: spotkania poza gabinetem, kontakty prywatne, zależność,</li>
          <li>brak zgody na pytania o kwalifikacje, superwizję czy zasady pracy,</li>
          <li>poczucie, że rozmowa jest oceniająca albo że „to Twoja wina”.</li>
        </ul>
        <p className="mt-4 leading-8 text-ink/80">
          Dobra relacja terapeutyczna bywa wymagająca, ale nigdy nie opiera się na
          poniżaniu, manipulacji ani strachu.
        </p>

        <h2 className="mt-12 text-4xl text-green">Logistyka: online czy stacjonarnie?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Terapia online sprawdza się dobrze w wielu przypadkach - eliminuje dojazdy i
          ułatwia regularność. Terapia stacjonarna daje pełny kontakt, własną przestrzeń
          i rytuał wyjścia z codzienności. Nie ma jednej słusznej opcji; warto uwzględnić
          to, co ułatwi regularne spotkania. Często można też łączyć
          obie formy.
        </p>
        <p className="mt-4 leading-8 text-ink/80">
          Przyjmuję w gabinecie przy ul. {config.address}. Prowadzę również sesje online.
        </p>

        <h2 className="mt-12 text-4xl text-green">Ile to kosztuje?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Ceny są zróżnicowane i zależą od miasta, doświadczenia i formy pracy. Ceny i różnice między konsultacją a regularną psychoterapią opisuję w{' '}
          <a href="/cennik/" className="text-green underline">
            cenniku
          </a>.
        </p>

        <h2 className="mt-12 text-4xl text-green">Najczęściej zadawane pytania</h2>
        {faq.map(([q, a]) => (
          <div key={q}>
            <h3 className="mt-6 text-2xl text-green">{q}</h3>
            <p className="mt-2 leading-8 text-ink/80">{a}</p>
          </div>
        ))}

        <ArticleBookingCta />

        <h2 data-reading-ignore className="mt-12 text-4xl text-green">Zobacz także</h2>
        <ul data-reading-ignore className="mt-4 space-y-4">
          <li>
            <a href="/blog/relacja-terapeutyczna-zrodlo-zmiany/" className="text-lg font-medium text-green underline hover:text-green/80">
              Co dzieje się między pacjentem a terapeutą? Relacja terapeutyczna jako źródło zmiany
            </a>
            <p className="mt-1 leading-7 text-ink/70">jak wygląda praca w relacji terapeutycznej</p>
          </li>
          <li>
            <a href="/blog/dlaczego-sama-swiadomosc-nie-wystarcza/" className="text-lg font-medium text-green underline hover:text-green/80">
              „Wiem, skąd to się bierze, ale nadal tak robię” - dlaczego sama świadomość nie wystarcza?
            </a>
            <p className="mt-1 leading-7 text-ink/70">czym różni się rozumienie od przepracowania</p>
          </li>
          <li>
            <a href="/cennik/" className="text-lg font-medium text-green underline hover:text-green/80">
              Cennik wizyt - Wrocław
            </a>
            <p className="mt-1 leading-7 text-ink/70">konsultacja i psychoterapia, stacjonarnie i online</p>
          </li>
        </ul>
      <BlogReading slug="jak-wybrac-psychoterapeute"/>
</>;
