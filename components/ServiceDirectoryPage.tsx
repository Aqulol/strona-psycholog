import AssessmentPanel from './AssessmentPanel';
import { services, offerPath, type ServiceKey } from '../lib/services';
import type { ReactNode } from 'react';
import { config } from '../lib/config';
import { webPage } from '../lib/entities';
import { servicePaths } from '../lib/service-paths';
import { meta, paths } from '../lib/site';
import { Booking, Crumbs, Json, Questions } from './Site';
import { OfferGroups, TherapyReadingLinks } from './ServiceCards';

type Kind = keyof typeof servicePaths;
const metadataByKind = {
  psychologist: {
    h1: 'Psycholog we Wrocławiu', title: 'Psycholog we Wrocławiu | Grzegorz Plebaniak',
    description: 'Prywatny gabinet psychologa we Wrocławiu. Poznaj dostępne konsultacje, diagnostykę psychologiczną i indywidualną psychoedukację oraz zasady kontaktu.',
  },
  therapist: {
    h1: 'Psychoterapeuta we Wrocławiu', title: 'Psychoterapeuta we Wrocławiu | Grzegorz Plebaniak',
    description: 'Jak zaczyna się psychoterapia we Wrocławiu lub online? Poznaj zasady pracy, rolę konsultacji oraz miejsce podejścia TFP w psychoterapii psychodynamicznej.',
  },
  diagnostic: {
    h1: 'Konsultacja diagnostyczna', title: 'Konsultacja diagnostyczna – zakres i dalsze kroki',
    description: 'Czym różni się rozpoznawanie trudności podczas rozmowy z psychologiem od formalnej diagnozy? Wyjaśniam zakres konsultacji i kiedy poszukać specjalisty.',
  },
  counselling: {
    h1: 'Poradnictwo psychologiczne', title: 'Poradnictwo psychologiczne – czym jest wsparcie?',
    description: 'Czym jest poradnictwo psychologiczne i kiedy może pomóc w decyzji lub zmianie życiowej? Wyjaśniam, czym różni się od konsultacji i psychoterapii.',
  },
};

export function serviceMetadata(kind: Kind) {
  const { title, description } = metadataByKind[kind];
  return meta(servicePaths[kind], title, description);
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
function Practical({ orientational = false }: { orientational?: boolean }) {
  return <>
    <Section title="Informacje praktyczne">
      {orientational && <p>Informacje poniżej dotyczą standardowej konsultacji psychologicznej, nie odrębnego świadczenia opisanego na tej stronie.</p>}
      <p>Przyjmuję we Wrocławiu przy ul. {config.address} oraz <a href={services.onlineConsult.href}>online</a>. Standardowa konsultacja trwa {services.consult.rate?.duration} i kosztuje {services.consult.rate?.price} zł. Szczegóły zawiera <a href="/cennik/">cennik</a>.</p>
    </Section>
    <Section title="Rezerwacja wizyty">
      <p>W Booksy można umówić standardową konsultację psychologiczną. W sprawach organizacyjnych można też <a href={paths.contact}>skontaktować się telefonicznie lub mailowo</a>.</p>
      <p><Booking/></p>
    </Section>
  </>;
}
function Psychologist() {
  return <>
    <p className="hero-copy">Jestem psychologiem, absolwentem Uniwersytetu Wrocławskiego. W prywatnym gabinecie prowadzę konsultacje dla dorosłych i młodzieży od 15. roku życia. Nie trzeba mieć diagnozy, żeby zacząć rozmowę.</p>
    <Section title="Kim jestem jako psycholog?">
      <p>Ukończyłem psychologię ze specjalnością psychologia kliniczna i zdrowia dorosłych. Na stronie <a href={paths.about}>O mnie</a> opisuję wykształcenie, doświadczenie oraz szkolenie i superwizję.</p>
    </Section>
    <Section title="W czym mogę pomóc i kiedy się zgłosić?">
      <p>Powodem zgłoszenia może być <a href="/w-czym-pomagam/samotnosc/">samotność</a>, powtarzające się <a href="/w-czym-pomagam/problemy-w-relacjach/">problemy w relacjach</a> lub trudność w odnalezieniu się po ważnej zmianie. Konsultację można rozważyć również wtedy, gdy nie wiadomo, co właściwie się zmieniło, ale zwykłe sprawy kosztują więcej wysiłku. Więcej przykładów zawiera <a href={paths.signs}>katalog obszarów pomocy</a>.</p>
    </Section>
    <OfferGroups categories={['support','diagnosis','education']} compact/>
    <p><a href={offerPath}>Zobacz całą ofertę</a>, w tym <a data-context-link href={services.onlineConsult.href}>konsultacje psychologiczne online</a>.</p>
    <Section title="Przewodniki po konsultacjach">
      <p>Jak przygotować się do rozmowy na wybrany temat? Poniższe materiały nie są dodatkowymi pozycjami do rezerwacji.</p>
      <ul>{(['counselling','crisis','parents','relationships','choice','diagnostic'] satisfies ServiceKey[]).map(key => <li key={key}><a href={services[key].href}>{services[key].name}</a></li>)}</ul>
    </Section>
    <Section title="Jak wygląda pierwsze spotkanie?">
      <p>Można zacząć od tego, co skłoniło Pana/Panią do kontaktu właśnie teraz. Pytam o okoliczności, oczekiwania i ewentualną wcześniejszą pomoc. Pierwsza rozmowa nie zobowiązuje do psychoterapii; więcej wyjaśniam w opisie <a href={paths.consult}>konsultacji psychologicznej</a>.</p>
    </Section>
    <Section title="Psycholog a psychoterapeuta">
      <p>Wykształcenie psychologiczne i szkolenie psychoterapeutyczne nie oznaczają tego samego. Konsultacja psychologiczna pomaga zrozumieć sytuację i ustalić dalszy krok; psychoterapia to uzgodniona, regularna praca. Jestem psychologiem i <a href={servicePaths.therapist}>psychoterapeutą (w trakcie szkolenia)</a>.</p>
    </Section>
    <Section title="Pomoc dla dorosłych i młodzieży">
      <p>Osobno opisuję <a href={paths.adults}>spotkania dla dorosłych</a> i <a href={paths.youth}>pomoc dla młodzieży od 15. roku życia</a>. Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców. Kolejne spotkania z młodą osobą odbywają się indywidualnie, a udział rodziców i granice poufności omawiamy podczas konsultacji.</p>
    </Section>
    <Section title="Najczęściej zadawane pytania"><Questions items={[
      ['Czy trzeba mieć rozpoznanie?', 'Nie. Można opowiedzieć o tym, co budzi niepokój, bez nazywania tego diagnozą.'],
      ['Czy konsultacja musi prowadzić do terapii?', 'Nie. Może pomóc określić, czy potrzeba psychoterapii, innej pomocy lub dalszej oceny.'],
    ]}/></Section>
    <Practical/>
  </>;
}
function Therapist() {
  return <>
    <p className="hero-copy">Jestem psychologiem i psychoterapeutą (w trakcie szkolenia). Prowadzę psychoterapię indywidualną w nurcie psychodynamicznym, wykorzystując podejście skoncentrowane na przeniesieniu (TFP). Swoją pracę poddaję superwizji.</p>
    <Section title="Czym jest psychoterapia i kiedy ją rozważyć?">
      <p>Psychoterapia to regularne spotkania, podczas których można przyglądać się temu, jak przeżywane są emocje i relacje. Warto ją rozważyć, gdy mimo prób zmiany powraca np. <a href="/w-czym-pomagam/lek-przed-odrzuceniem/">lęk przed odrzuceniem</a> albo utrzymują się <a href="/w-czym-pomagam/powtarzajace-sie-trudnosci-w-relacjach/">trudności w relacjach</a>. Sama nazwa problemu nie przesądza, czy psychoterapia jest właściwą formą pomocy.</p>
    </Section>
    <Section title="Jak pracuję"><p>Proponuję jedną formę regularnej pracy: <a href={services.individual.href}>psychoterapię indywidualną</a>. TFP jest modelem w obrębie nurtu psychodynamicznego, a online oznacza formę spotkań. Przy rezerwacji umawia się konsultację wstępną, nie wybiera metody.</p><TherapyReadingLinks/></Section>
    <Section title="Od pierwszej rozmowy do regularnych spotkań">
      <p><a href={paths.consult}>Konsultacje wstępne</a> to zwykle około czterech spotkań. Pozwalają poznać powód zgłoszenia i omówić oczekiwania. Jeśli wspólnie zdecydujemy się kontynuować, ustalimy kontrakt terapeutyczny, czyli zasady współpracy, w tym rytm sesji. Spotkania odbywają się raz lub dwa razy w tygodniu, w zależności od indywidualnych ustaleń. Psychoterapia jest długoterminowa, bez z góry ustalonej liczby sesji.</p>
    </Section>
    <Section title="Relacja, szkolenie i superwizja">
      <p>Ważna jest dla mnie <a href="/blog/relacja-terapeutyczna-zrodlo-zmiany/">relacja terapeutyczna</a>: podczas spotkań można omówić także to, jak przebiega rozmowa i co się w niej przeżywa. Ukończyłem psychologię na Uniwersytecie Wrocławskim. Szkolę się w Międzynarodowej Szkole Psychoterapii Psychodynamicznej i regularnie korzystam z superwizji. Więcej o tych ramach piszę na stronie <a href={`${paths.about}#superwizja`}>O mnie</a>.</p>
    </Section>
    <Section title="Dla dorosłych, młodzieży i osób korzystających z wizyt online">
      <p>Prowadzę <a href={paths.adults}>psychoterapię dorosłych</a> oraz <a href={paths.youth}>psychoterapię młodzieży od 15. roku życia</a>. Jeśli dojazd jest trudny, można sprawdzić <a href={paths.online}>zasady spotkań online</a> i omówić podczas konsultacji, czy ta forma jest odpowiednia.</p>
    </Section>
    <Practical/>
  </>;
}
function Diagnostic() {
  return <>
    <p className="hero-copy">Rozpoznanie, jak trudności wpływają na życie, to nie to samo co postawienie formalnej diagnozy. Ta strona wyjaśnia rolę rozmowy wstępnej. Taka konsultacja nie zastępuje procesu diagnostycznego i nie jest osobną pozycją do rezerwacji na tej stronie.</p>
    <AssessmentPanel id="diagnostic"/>
    <Section title="Jak się przygotować?"><p>Zapisz, czego chcesz się dowiedzieć, i przypomnij sobie konkretny przykład z codzienności. Możesz skorzystać z <a href="/materialy-psychologiczne/#diagnoza">listy pytań przed diagnostyką</a>.</p></Section>
    <Section title="Kiedy potrzebne jest pogłębienie obrazu trudności?">
      <p>Na przykład gdy <a href="/w-czym-pomagam/trudnosci-ze-snem/">problemy ze snem</a>, napięcie i wycofywanie się z kontaktów pojawiły się równocześnie, a nie jest jasne, od czego zacząć. Dla dorosłych i młodzieży od 15. roku życia punktem wyjścia w tym gabinecie jest <a href={paths.consult}>konsultacja psychologiczna</a>.</p>
    </Section>
    <Section title="Co można ustalić podczas rozmowy?">
      <p>Warto opisać, od kiedy trudność trwa, gdzie się pojawia i co zmieniła w pracy, nauce albo relacjach. Można też wspomnieć o dotychczasowej pomocy i powiedzieć, czego oczekuje się od oceny. Rozmowa pomaga określić, czy właściwym krokiem może być konsultacja lekarska, ocena psychiatryczna lub zgłoszenie do specjalisty zajmującego się konkretną diagnostyką.</p>
    </Section>
    <Section title="Konsultacja a pełny proces diagnostyczny">
      <p>Na zwykłej konsultacji można rozmawiać szerzej o aktualnej sytuacji i oczekiwanej pomocy. Rozmowa ukierunkowana diagnostycznie służy przede wszystkim określeniu pytania do oceny. Nie należy oczekiwać, że pojedyncze spotkanie wystarczy do rozpoznania. Pogłębiona ocena może wymagać analizy historii objawów i porównania kilku możliwych wyjaśnień.</p>
    </Section>
    <Section title="Jakie formy pogłębionej diagnostyki prowadzę?">
      <p>Prowadzę <a data-context-link href={services.general.href}>ogólną diagnozę psychologiczną</a>, <a data-context-link href={services.personality.href}>diagnozę osobowości</a> oraz <a data-context-link href={services.adhd.href}>diagnozę ADHD</a>. Każda odpowiada na inne pytania.</p>
    </Section>
    <Section title="Najczęściej zadawane pytania"><Questions items={[
      ['Czy rozmowa kończy się rozpoznaniem?', 'Nie jest to usługa formalnej diagnozy. Można omówić, czy potrzebna będzie odrębna ocena i gdzie jej szukać.'],
      ['Czy trzeba samodzielnie wybrać specjalistę przed zgłoszeniem?', 'Jeżeli kierunek nie jest jasny, można zapytać o niego na standardowej konsultacji psychologicznej.'],
    ]}/></Section>
    <Section title="Umów standardową konsultację"><p><Booking/></p></Section>
  </>;
}
function Counselling() {
  return <>
    <p className="hero-copy">Poradnictwo psychologiczne skupia się na określonej sytuacji i dostępnych możliwościach działania. Nie jest udzielaniem gotowych rad ani tym samym co regularna psychoterapia. Ta strona wyjaśnia tę formę wsparcia; w gabinecie można umówić standardową konsultację psychologiczną.</p>
    <Section title="Komu może odpowiadać takie wsparcie?">
      <p>Przykładem jest <a href="/w-czym-pomagam/utrata-pracy-i-zmiany-zawodowe/">zmiana zawodowa</a>, trudność w ustaleniu granic w nowej sytuacji albo wybór, którego konsekwencje trudno ocenić. Pomoc w uporządkowaniu sytuacji nie wymaga uznania jej za objaw zaburzenia. W gabinecie konsultuję dorosłych i młodzież od 15. roku życia.</p>
    </Section>
    <Section title="Jaki może być cel rozmowy?">
      <p>Można oddzielić to, co wymaga decyzji teraz, od tego, na co nie ma się wpływu. Warto nazwać dostępne wsparcie, obawy i możliwe następstwa każdego wyboru. Psycholog nie podejmuje decyzji za osobę zgłaszającą się ani nie zastępuje porady prawnej lub medycznej.</p>
    </Section>
    <Section title="Od czego zacząć w gabinecie?">
      <p>Na <a href={paths.consult}>konsultacji psychologicznej</a> można opisać konkretną sprawę i powiedzieć, czy potrzebna jest pomoc w uporządkowaniu sytuacji, czy raczej praca nad trudnościami, które powtarzają się w różnych okolicznościach. W tym drugim przypadku warto omówić, czy odpowiednia byłaby <a href={servicePaths.therapist}>psychoterapia</a>. Przy uporczywych objawach może być potrzebna <a href={servicePaths.diagnostic}>odrębna ocena</a>.</p>
    </Section>
    <Section title="Najczęściej zadawane pytania"><Questions items={[
      ['Czy mogę przyjść z jedną konkretną sprawą?', 'Tak, można rozpocząć konsultację od jednej decyzji albo zmiany. Nie trzeba zobowiązywać się do psychoterapii.'],
      ['Czy mogę zarezerwować osobną wizytę poradniczą?', 'Przycisk prowadzi do standardowej konsultacji psychologicznej; nie wskazuje osobnej usługi poradniczej ani jej ceny.'],
    ]}/></Section>
    <Section title="Bieżące trudności zawodowe i samopoznanie">
      <p>W konsultacji można omówić zmianę lub utratę pracy, napięcie w rozmowie z przełożonym, presję osiągnięć albo trudność w odpoczynku, gdy praca przenosi się na wieczory. Rozmowa psychologiczna nie jest doradztwem zawodowym. Więcej o przewlekłym stresie i jego granicach piszę w materiale o <a data-context-link href="/w-czym-pomagam/wypalenie-zawodowe/">wypaleniu zawodowym</a>.</p>
      <p>Rozpoznanie zaburzenia nie jest warunkiem rozmowy. W ramach <a data-context-link href="/w-czym-pomagam/zrozumienie-siebie/">lepszego rozumienia siebie</a> można przyjrzeć się własnym potrzebom, motywacjom i temu, dlaczego trudno wyrazić odmienne zdanie lub podjąć decyzję. Pomocny kontekst daje artykuł o <a data-context-link href="/blog/poczucie-wlasnej-wartosci/">poczuciu własnej wartości</a>.</p>
    </Section>
    <Section title="Wsparcie wokół jednej sprawy a pilna pomoc">
      <p>Rozmowa może skupiać się na jednej aktualnej sprawie, np. rozstaniu lub przeciążeniu, bez zobowiązania do długoterminowej psychoterapii. Nie jest to osobna usługa ani gwarancja określonej liczby spotkań. Interwencja kryzysowa służy pomocy w nagłej sytuacji; gabinet nie prowadzi dyżuru interwencyjnego. Sprawdź <a data-context-link href="/pomoc-w-kryzysie/">gdzie szukać pilnej pomocy</a>.</p>
    </Section>
    <Practical orientational/>
  </>;
}

const content = { psychologist: Psychologist, therapist: Therapist, diagnostic: Diagnostic, counselling: Counselling };
export default function ServiceDirectoryPage({ kind }: { kind: Kind }) {
  const { h1, description } = metadataByKind[kind];
  const path = servicePaths[kind];
  const Content = content[kind];
  return <main id="tresc" className="reading directory-editorial">
    <Crumbs path={path} title={h1}/><Json data={webPage(path, h1, description)}/>
    <p className="eyebrow">Gabinet psychologiczny · Wrocław i online</p><h1>{h1}</h1><Content/>
  </main>;
}
