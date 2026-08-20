import type { Metadata } from 'next';
import { articleJsonLd } from '../../../lib/articleJsonLd';

const description =
  'Jak wybrać psychoterapeutę? Praktyczny przewodnik: psycholog czy psychoterapeuta, nurt terapii, na co zwrócić uwagę podczas pierwszej konsultacji i czego unikać.';

export const metadata: Metadata = {
  title: 'Jak wybrać psychoterapeutę? Praktyczny przewodnik',
  description,
  alternates: { canonical: '/blog/jak-wybrac-psychoterapeute/' },
  openGraph: { url: 'https://psychologplebaniak.pl/blog/jak-wybrac-psychoterapeute/' },
};

const faq: [string, string][] = [
  [
    'Czy każdy psychoterapeuta jest psychologiem?',
    'Nie. Psychoterapeuta to osoba, która ukończyła akredytowane szkolenie psychoterapeutyczne. Może mieć wykształcenie psychologiczne, medyczne lub inne kierunkowe. Warto pytać o wykształcenie, ukończone szkolenie i przynależność do towarzystwa psychoterapeutycznego.',
  ],
  [
    'Czy droższy terapeuta znaczy lepszy?',
    'Nie. Cena zależy głównie od doświadczenia, rodzaju praktyki i lokalizacji. Najważniejszy jest dobry kontakt i poczucie bezpieczeństwa. Warto wybrać osobę, u której można regularnie pracować w ramach własnego budżetu — terapia bywa długim procesem.',
  ],
  [
    'Po ilu spotkaniach powinienem/powinnam wiedzieć, że to dobry wybór?',
    'Pierwsza konsultacja powinna dać wstępne poczucie bezpieczeństwa i jasność co do zasad współpracy. Pełną ocenę relacji warto zrobić po kilku spotkaniach. Jeśli po 3–4 sesjach nie czujesz, że jest to przestrzeń dla Ciebie, warto o tym powiedzieć terapeucie — to też część pracy.',
  ],
];

const ld = articleJsonLd({
  headline: 'Jak wybrać psychoterapeutę? Praktyczny przewodnik',
  description,
  slug: 'jak-wybrac-psychoterapeute',
  datePublished: '2026-08-20',
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  return (
    <>
      <main id="tresc" className="container section max-w-3xl">
        <a href="/" className="text-green underline">
          ← Strona główna
        </a>
        <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
          Jak wybrać psychoterapeutę? Praktyczny przewodnik
        </h1>
        <p className="mt-4 text-sm text-ink/70">20 sierpnia 2026</p>
        <p className="mt-6 leading-8 text-ink/80">
          Wybór terapeuty to jedna z najbardziej osobistych decyzji, jakie można podjąć.
          Odpowiedź na pytanie „do kogo pójść” rzadko jest jednoznaczna — nie ma jednego
          „najlepszego” specjalisty dla wszystkich. Liczą się kompetencje, nurt pracy,
          logistyka i przede wszystkim to, czy w kontakcie z daną osobą czujesz się
          wystarczająco bezpiecznie, aby mówić o trudnych sprawach. Poniżej praktyczny
          przewodnik, który pomoże zawęzić wybór i dobrze wykorzystać pierwsze spotkanie.
        </p>

        <h2 className="mt-12 text-4xl text-green">Psycholog, psychoterapeuta czy psychiatra?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          To pierwszy krok: wiedzieć, jakich kompetencji szukasz. Psycholog to osoba po
          studiach psychologicznych — może prowadzić konsultacje, diagnozę i wsparcie,
          ale tytuł psychologa nie uprawnia sam w sobie do prowadzenia psychoterapii.
          Psychoterapeuta to osoba, która ukończyła dodatkowe, kilkuletnie szkolenie
          psychoterapeutyczne (akredytowane przez towarzystwo, np. Polskie Towarzystwo
          Psychoterapii Psychodynamicznej, lub podobne organizacje). Psychiatra jest
          lekarzem — diagnozuje zaburzenia i może włączyć leczenie farmakologiczne.
        </p>
        <p className="mt-4 leading-8 text-ink/80">
          Te role często się uzupełniają: część osób korzysta równolegle z psychoterapii
          i opieki psychiatrycznej. Nie ma „lepszych” i „gorszych” zawodów — chodzi o to,
          co jest potrzebne w Twojej sytuacji.
        </p>

        <h2 className="mt-12 text-4xl text-green">Czy nurt terapii ma znaczenie?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Tak, ale inaczej, niż się często sądzi. Badania wskazują, że skuteczność terapii
          w większym stopniu zależy od jakości relacji terapeutycznej niż od samej nazwy
          nurtu. Nurt opisuje jednak sposób myślenia o problemach i charakter pracy:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>
            <strong>Psychoterapia psychodynamiczna</strong> — koncentruje się na emocjach,
            nieświadomych wzorcach, relacjach i wpływie przeszłości na teraźniejszość.
            Dobra opcja, jeśli chcesz rozumieć „skąd się to bierze” i pracować głębiej.
          </li>
          <li>
            <strong>Terapia poznawczo-behawioralna (CBT)</strong> — pracuje głównie z
            myślami i zachowaniami w teraźniejszości; częściej polecana przy konkretnych
            objawach (np. lęk napadowy, fobie) i krótszych, celowanych formach pracy.
          </li>
          <li>
            <strong>Inne nurty</strong> (humanistyczny, Gestalt, systemowy, psychoterapia
            online) — różnią się akcentami; warto zapytać terapeutę, jak pracuje, zamiast
            wybierać wyłącznie po nazwie nurtu.
          </li>
        </ul>
        <p className="mt-4 leading-8 text-ink/80">
          Jeśli nurt nie jest dla Ciebie oczywisty, zadaj pytanie podczas konsultacji.
          Dobry terapeuta potrafi w prostych słowach opisać, na czym polega jego praca.
        </p>

        <h2 className="mt-12 text-4xl text-green">Na co zwrócić uwagę przy wyborze</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Zanim umówisz pierwszą wizytę, warto sprawdzić kilka rzeczy — to standard,
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
            <strong>Doświadczenie w Twoim obszarze.</strong> Jeśli zgłaszasz się z lękiem,
            kryzysem, trudnościami w relacjach czy wypaleniem — zapytaj, czy pracował
            z podobnymi sprawami.
          </li>
          <li>
            <strong>Zasady współpracy.</strong> Cena, czas sesji, częstotliwość, zasady
            odwołań i kontrakt — powinny być jasne od początku.
          </li>
        </ul>

        <h2 className="mt-12 text-4xl text-green">Pierwsza konsultacja — jak ją wykorzystać</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Pierwsze spotkanie to nie egzamin, tylko wzajemne poznanie. Możesz przygotować
          sobie kilka pytań — to sygnał zaangażowania, a nie przeszkoda:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-8 text-ink/80">
          <li>Jak wygląda Pana/Pani sposób pracy? Jak często i jak długo zwykle trwa terapia?</li>
          <li>Jakie ma Pan/Pani doświadczenie z podobnymi trudnościami?</li>
          <li>Jak ustalamy cele i kiedy wracamy do ich oceny?</li>
          <li>Jakie są zasady kontaktu między sesjami i odwołań?</li>
        </ul>
        <p className="mt-4 leading-8 text-ink/80">
          Po spotkaniu warto zapytać siebie: czy czułem/czułam się wysłuchany? Czy nie
          było oceniania i pośpiechu? Czy zasady były jasne? Intensywność pierwszych emocji
          jest naturalna — ale poczucie bezpieczeństwa i szacunku to fundament, na którym
          można budować dalszą pracę.
        </p>

        <h2 className="mt-12 text-4xl text-green">Czerwone flagi — czego unikać</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Są zachowania, które zawsze powinny wzbudzić czujność, niezależnie od tytułów
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
          Terapia online sprawdza się dobrze w wielu przypadkach — eliminuje dojazdy i
          ułatwia regularność. Terapia stacjonarna daje pełny kontakt, własną przestrzeń
          i rytuał wyjścia z codzienności. Nie ma jednej słusznej opcji; warto uwzględnić
          to, co realnie utrzyma Cię w regularnym rytmie spotkań. Często można też łączyć
          obie formy.
        </p>
        <p className="mt-4 leading-8 text-ink/80">
          Jeśli mieszkasz we Wrocławiu lub okolicach, gabinet przy ul. Ślicznej 28/24
          (osiedle Gaj) jest łatwo dostępny; dla osób spoza Wrocławia i podróżujących
          prowadzę również sesje online.
        </p>

        <h2 className="mt-12 text-4xl text-green">Ile to kosztuje?</h2>
        <p className="mt-4 leading-8 text-ink/80">
          Ceny są zróżnicowane i zależą od miasta, doświadczenia i formy pracy. Aktualny
          cennik znajdziesz na{' '}
          <a href="/cennik/" className="text-green underline">
            podstronie z cennikiem
          </a>{' '}
          — tam też opisane są różnice między konsultacją a regularną psychoterapią.
        </p>

        <h2 className="mt-12 text-4xl text-green">Najczęściej zadawane pytania</h2>
        {faq.map(([q, a]) => (
          <div key={q}>
            <h3 className="mt-6 text-2xl text-green">{q}</h3>
            <p className="mt-2 leading-8 text-ink/80">{a}</p>
          </div>
        ))}

        <h2 className="mt-12 text-4xl text-green">Przeczytaj także</h2>
        <ul className="mt-4 space-y-4">
          <li>
            <a href="/blog/relacja-terapeutyczna-zrodlo-zmiany/" className="text-lg font-medium text-green underline hover:text-green/80">
              Co dzieje się między pacjentem a terapeutą? Relacja terapeutyczna jako źródło zmiany
            </a>
            <p className="mt-1 leading-7 text-ink/70">jak wygląda praca w relacji terapeutycznej</p>
          </li>
          <li>
            <a href="/blog/dlaczego-sama-swiadomosc-nie-wystarcza/" className="text-lg font-medium text-green underline hover:text-green/80">
              „Wiem, skąd to się bierze, ale nadal tak robię” — dlaczego sama świadomość nie wystarcza?
            </a>
            <p className="mt-1 leading-7 text-ink/70">czym różni się rozumienie od przepracowania</p>
          </li>
          <li>
            <a href="/cennik/" className="text-lg font-medium text-green underline hover:text-green/80">
              Cennik wizyt — Wrocław
            </a>
            <p className="mt-1 leading-7 text-ink/70">konsultacja i psychoterapia, stacjonarnie i online</p>
          </li>
        </ul>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
