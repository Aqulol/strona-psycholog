import { consultationGroup, consultationTopics } from './consultation-topics';
import { newTopics } from './help-topic-new';
import { additions } from './help-topic-additions';

export const helpGroups = ['Nastrój i emocje', 'Lęk, stres i przeciążenie', 'Relacje i funkcjonowanie społeczne', 'Poczucie własnej wartości i rozumienie siebie', 'Kryzysy i zmiany życiowe', 'Przeszłość i trudne doświadczenia', 'Osobowość i tożsamość', 'Związki i relacje partnerskie', 'Młodzież od 15. roku życia', 'Zdrowie fizyczne i psychiczne'] as const;

type Topic = {
  slug: string; group: typeof helpGroups[number] | typeof consultationGroup; label: string; h1?: string;
  title: string; description: string; intro: string;
  sections: [string, string][]; related: [string, string][];
  firstVisit?: string;
  faq?: [string, string];
  sources?: [string, string][]; urgent?: boolean;
};

export const topicPath = (slug: string) => `/w-czym-pomagam/${slug}/`;
const tfp: [string, string] = ['/terapia-skoncentrowana-na-przeniesieniu-tfp/', 'Jak wygląda praca w TFP'];
const borderlineGuide: [string, string] = ['https://www.nice.org.uk/guidance/cg78', 'NICE: rozpoznawanie i leczenie zaburzenia osobowości borderline'];

const existingTopics: Topic[] = [
  {
    slug: 'depresja', group: helpGroups[0], label: 'Depresja i obniżony nastrój', title: 'Depresja i obniżony nastrój - konsultacja we Wrocławiu',
    description: 'Konsultacja psychologiczna we Wrocławiu przy obniżonym nastroju lub rozpoznanej depresji. O czym można porozmawiać i kiedy potrzebna jest inna pomoc?',
    intro: 'Zwykłe czynności mogą zacząć wymagać dużego wysiłku, a to, co wcześniej sprawiało przyjemność, przestaje cieszyć. Można porozmawiać o takiej zmianie także wtedy, gdy nie wiadomo, czy ma ona związek z depresją.',
    sections: [
      ['Kiedy przygnębienie zaczyna utrudniać codzienność', 'Nie każdy okres przygnębienia oznacza depresję. Istotne jest, od kiedy samopoczucie się zmieniło, czy trudniej się skupić, spać albo spotykać z ludźmi i jak przekłada się to na codzienne życie. W ocenie sytuacji mogą być ważne również stan zdrowia, stosowane leki i wcześniejsze epizody.'],
      ['Ocena trudności i znaczenie psychoterapii', 'Punktem wyjścia może być opis jednego dnia i tego, co zmieniło się w porównaniu z wcześniejszym okresem. Jeśli istotne są strata, poczucie winy lub trudności w relacjach, w psychoterapii psychodynamicznej można przyglądać się temu, jak są przeżywane. Nie zakładam, że wyjaśniają one depresję. W zależności od nasilenia trudności warto omówić konsultację lekarską lub psychiatryczną oraz dotychczasowe leczenie.'],
    ],
    urgent: true, related: [[topicPath('kryzys-zyciowy'), 'Kryzys życiowy i trudne zmiany']], sources: [['https://www.nice.org.uk/guidance/ng222', 'NICE: depresja u dorosłych']],
  },
  {
    slug: 'zaburzenia-lekowe', group: helpGroups[1], label: 'Lęk i zaburzenia lękowe', title: 'Lęk i zaburzenia lękowe - konsultacja we Wrocławiu',
    description: 'Gdy zamartwianie się, napięcie lub unikanie zaczynają ograniczać codzienne życie, można omówić je na konsultacji psychologicznej we Wrocławiu lub online.',
    intro: 'Czasem lęk sprawia, że coraz więcej decyzji podejmuje się z myślą o tym, jak uniknąć trudnej sytuacji. Innym razem trudno przerwać rozważanie tego, co może pójść nie tak, nawet gdy nic szczególnego się nie wydarzyło.',
    sections: [
      ['Kiedy lęk zaczyna ograniczać codzienność', 'Lęk bywa zwykłą reakcją na zagrożenie lub niepewność. Warto omówić go, jeśli często powraca i utrudnia sen, pracę, podróżowanie albo spotkania. Znaczenie ma to, czego dotyczy i jak wpływa na życie. Żaden z tych przykładów sam w sobie nie oznacza zaburzenia lękowego.'],
      ['Jak można pracować z lękiem', 'Na konsultacji można opisać sytuację, w której pojawił się lęk, i to, co zmieniło się przez niego w zachowaniu. W pracy psychodynamicznej można badać, czy napięcie wiąże się na przykład z obawą przed oceną lub konsekwencjami wyrażenia sprzeciwu. Nie każdy lęk będzie miał taki kontekst. Zależnie od objawów potrzebna może być ocena lekarska albo inna metoda leczenia.'],
    ],
    related: [[topicPath('lek-spoleczny'), 'Lęk społeczny i obawa przed oceną'], [topicPath('stres'), 'Przewlekły stres i przeciążenie']], sources: [['https://www.nice.org.uk/guidance/cg113', 'NICE: zaburzenie lękowe uogólnione i zaburzenie paniczne u dorosłych']],
  },
  {
    slug: 'problemy-w-relacjach', group: helpGroups[2], label: 'Problemy w relacjach', h1: 'Problemy w relacjach a psychoterapia indywidualna', title: 'Problemy w relacjach - psychoterapia indywidualna',
    description: 'Konsultacja indywidualna we Wrocławiu, gdy trudno stawiać granice, mówić o potrzebach albo zrozumieć powtarzające się konflikty w bliskich relacjach.',
    intro: 'Można chcieć bliskości i wycofywać się, gdy druga osoba staje się ważna. Można też ustępować w obawie przed konfliktem, a później czuć żal, że własne potrzeby pozostają niezauważone.',
    sections: [
      ['Jedna trudna relacja czy powtarzająca się sytuacja?', 'Warto rozróżnić to, jak druga osoba faktycznie się zachowuje, od tego, czego się po niej spodziewamy. Na spotkaniu można przyjrzeć się jednej rozmowie, w której trudno było odmówić lub powiedzieć, co jest ważne. Wcześniejsze doświadczenia mogą mieć znaczenie, ale nie umniejszają wpływu aktualnego zachowania innych osób.'],
      ['Dlaczego konsultacja jest indywidualna?', 'Nie trzeba przychodzić z drugą osobą. W psychoterapii indywidualnej można pracować nad rozpoznawaniem własnych potrzeb, znaczeniem konfliktów i sposobami reagowania na nie. Także w rozmowie podczas terapii można przyjrzeć się temu, jak ktoś przeżywa niezgodę lub niedopowiedzenie. Nie jest to terapia par ani rodzinna.'],
    ],
    related: [['/blog/dlaczego-wybieram-podobnych-partnerow/', 'Dlaczego wybieram podobnych partnerów?'], [topicPath('samotnosc'), 'Samotność i trudności w budowaniu bliskości']],
  },
  {
    slug: 'niska-samoocena', group: helpGroups[3], label: 'Niskie poczucie własnej wartości', title: 'Niskie poczucie własnej wartości - konsultacja',
    description: 'Na konsultacji można porozmawiać o surowej ocenie siebie, poczuciu, że trzeba stale udowadniać swoją wartość, oraz o wpływie samooceny na decyzje.',
    intro: 'Jedna uwaga potrafi przesłonić wszystko, co się udało. Pochwała przynosi ulgę tylko na chwilę, a przed kolejnym zadaniem wraca wrażenie, że znów trzeba udowodnić swoją wartość.',
    sections: [
      ['Kiedy samoocena wpływa na wybory', 'Trudność może ujawniać się w pracy, w bliskich relacjach lub przy podejmowaniu decyzji. Przykładem jest rezygnacja z zadania, zanim będzie można sprawdzić swoje możliwości. Znaczenie mogą mieć zarówno własne wymagania, jak i realna krytyka, porównywanie się lub brak wsparcia.'],
      ['Czemu może służyć rozmowa', 'Na konsultacji można prześledzić, jak po konkretnym niepowodzeniu ocena działania zmienia się w ocenę całej osoby. W psychoterapii można badać, skąd biorą się tak surowe wymagania i jaką rolę odgrywa w nich uznanie innych. Celem nie musi być przekonywanie siebie, że wszystko robi się dobrze, lecz dostrzeganie możliwości i ograniczeń bez sprowadzania do nich własnej wartości.'],
    ],
    related: [['/blog/poczucie-wlasnej-wartosci/', 'Jak kształtuje się poczucie własnej wartości?'], [topicPath('problemy-w-relacjach'), 'Problemy w relacjach']],
  },
  {
    slug: 'samotnosc', group: helpGroups[2], label: 'Samotność', h1: 'Samotność i trudności w budowaniu bliskości', title: 'Samotność - konsultacja psychologiczna we Wrocławiu',
    description: 'Można porozmawiać o samotności także wtedy, gdy wokół są ludzie. Konsultacja pozwala przyjrzeć się temu, jakiego kontaktu brakuje i co utrudnia bliskość.',
    intro: 'Samotność można odczuwać także w związku, wśród znajomych albo w domu pełnym ludzi. Nie trzeba rezygnować z czasu spędzanego samemu, żeby zastanowić się, jakich relacji brakuje.',
    sections: [
      ['Brak osób do rozmowy czy brak poczucia bliskości?', 'Po przeprowadzce lub stracie może być mniej okazji do spotkań. W innej sytuacji ludzi wokół jest wielu, ale trudno porozmawiać z nimi o ważnych sprawach. Rozróżnienie tych doświadczeń pomaga określić, czy większym problemem jest dostęp do kontaktu, czy możliwość poczucia się w nim swobodnie.'],
      ['Od czego zacząć na spotkaniu', 'Nie trzeba wiedzieć, dlaczego jest się samotnym. Można opowiedzieć o tym, kiedy najbardziej odczuwa się brak kontaktu i co dzieje się, gdy ktoś próbuje się zbliżyć. W terapii można przyglądać się obawie przed odrzuceniem, o ile jest istotna. Psychoterapia nie zastępuje więzi społecznych. Rozmowa powinna uwzględniać również praktyczne przeszkody, takie jak izolacja po zmianie miejsca zamieszkania.'],
    ],
    related: [['/blog/samotnosc/', 'Więcej o różnych doświadczeniach samotności'], [topicPath('problemy-w-relacjach'), 'Problemy w relacjach']],
  },
  {
    slug: 'zaburzenia-osobowosci', group: helpGroups[6], label: 'Zaburzenia osobowości', h1: 'Zaburzenia osobowości - konsultacja i możliwości psychoterapii', title: 'Zaburzenia osobowości - konsultacja i psychoterapia',
    description: 'Konsultacja przy rozpoznaniu zaburzenia osobowości lub trwałych trudnościach. Można omówić dotychczasową pomoc i zasadność psychoterapii psychodynamicznej.',
    intro: 'Po rozpoznaniu zaburzenia osobowości można mieć pytania o jego znaczenie i dalsze możliwości leczenia. Na konsultację można też zgłosić się bez rozpoznania, jeśli od dłuższego czasu powtarzają się trudności w relacjach lub przeżywaniu emocji.',
    sections: [
      ['Rozpoznanie a rozumienie trudności', 'Pojedyncza reakcja lub trudny okres nie wystarcza, by wnioskować o zaburzeniu osobowości. W rozmowie znaczenie ma to, co utrzymuje się z czasem, w jakich sytuacjach i z jakimi konsekwencjami. Organizacja osobowości to pojęcie psychodynamiczne opisujące sposób funkcjonowania, a nie zamiennik rozpoznania klinicznego. Konsultacja nie jest ofertą diagnostyki klinicznej.'],
      ['Kiedy można rozważyć TFP?', 'W psychoterapii psychodynamicznej przyglądam się powtarzającym się sposobom przeżywania siebie i innych. W tej psychoterapii wykorzystuję model TFP w trakcie szkolenia i pod superwizją. Decyzja o rozpoczęciu pracy zależy od potrzeb, bezpieczeństwa, gotowości i możliwości regularnych spotkań. Rozpoznanie nie oznacza automatycznej kwalifikacji do TFP.'],
    ],
    related: [tfp, [topicPath('borderline'), 'Zaburzenie osobowości borderline'], ['/blog/narcyzm-wrazliwy/', 'Artykuł o narcyzmie wrażliwym']], sources: [['https://www.who.int/publications/i/item/9789240077263', 'WHO: opisy kliniczne i wymagania diagnostyczne ICD-11']],
  },
  {
    slug: 'borderline', group: helpGroups[6], label: 'Zaburzenie osobowości borderline', h1: 'Zaburzenie osobowości borderline - konsultacje i psychoterapia we Wrocławiu', title: 'Borderline - konsultacja i psychoterapia we Wrocławiu',
    description: 'Na konsultacji można omówić rozpoznanie borderline, dotychczasową pomoc i możliwości leczenia, w tym to, czy psychoterapia TFP odpowiada potrzebom.',
    intro: 'Po rozpoznaniu borderline można mieć pytania o dotychczasowe leczenie albo o to, jakiej pomocy szukać dalej. W rozmowie można zacząć od tego, co w obecnej sytuacji jest najtrudniejsze.',
    sections: [
      ['O czym można porozmawiać po rozpoznaniu', 'Dla jednej osoby ważne będą gwałtowne zmiany emocji w bliskich relacjach, dla innej trudność w utrzymaniu stabilniejszego obrazu siebie. Takie doświadczenia występują także u osób bez tego rozpoznania. Na spotkaniu można omówić ich przebieg, wpływ na życie i to, czy potrzebna jest również opieka psychiatryczna lub kontynuacja trwającego leczenia.'],
      ['Co odróżnia pracę w TFP', 'Jeśli TFP jest odpowiednią możliwością, można w niej przyglądać się temu, jak przy silnym napięciu zmienia się postrzeganie siebie i drugiej osoby, również podczas spotkania. Przed rozpoczęciem omawiam zasady współpracy, cele i możliwość regularnych spotkań. Model TFP wykorzystuję w psychoterapii indywidualnej pod superwizją. Nie jest to jedyna możliwa forma leczenia borderline.'],
    ],
    urgent: true, related: [tfp, [topicPath('zaburzenia-osobowosci'), 'Zaburzenia osobowości: możliwości dalszej pomocy']], sources: [borderlineGuide, ['https://doi.org/10.1176/ajp.2007.164.6.922', 'Clarkin i wsp.: porównanie trzech form psychoterapii w zaburzeniu osobowości borderline']],
  },
  {
    slug: 'stres', group: helpGroups[1], label: 'Przewlekły stres', h1: 'Przewlekły stres i przeciążenie', title: 'Przewlekły stres i przeciążenie - konsultacja',
    description: 'Konsultacja psychologiczna przy długotrwałym przeciążeniu. Można omówić źródła stresu, jego wpływ na odpoczynek i to, na co jest się w stanie wpłynąć.',
    intro: 'Trudno odpocząć, jeśli po zakończeniu jednego obowiązku od razu trzeba zająć się kolejnym. Przeciążenie może się nasilać, gdy sprawy zawodowe, opieka nad bliską osobą lub niepewność finansowa nakładają się na siebie.',
    sections: [
      ['Co podtrzymuje przeciążenie', 'Przy długotrwałym obciążeniu można mieć mniej cierpliwości, trudniej się skupić lub zasnąć. Warto rozpoznać nie tylko własne reakcje, ale też warunki, których nie da się zmienić samą organizacją czasu. Utrzymujące się problemy ze snem lub objawy fizyczne warto omówić również z lekarzem.'],
      ['Co można rozdzielić w rozmowie', 'Na konsultacji można przyjrzeć się temu, które obowiązki można renegocjować i gdzie potrzebne jest wsparcie z zewnątrz. W podejściu psychodynamicznym można też badać, czy proszenie o pomoc uruchamia poczucie winy albo obawę, że ktoś uzna je za oznakę słabości. Te pytania nie odwracają uwagi od realnego obciążenia.'],
    ],
    related: [[topicPath('wypalenie-zawodowe'), 'Wypalenie zawodowe'], [topicPath('kryzys-zyciowy'), 'Kryzys życiowy i trudne zmiany']],
  },
  {
    slug: 'kryzys-zyciowy', group: helpGroups[4], label: 'Kryzysy życiowe', h1: 'Kryzys życiowy i trudne zmiany', title: 'Kryzys życiowy i trudne zmiany - konsultacja',
    description: 'Konsultacja psychologiczna po stracie, rozstaniu lub innej ważnej zmianie. Rozmowa o najpilniejszych potrzebach i o tym, czy warto rozważyć dalszą pomoc.',
    intro: 'Rozstanie, strata, przeprowadzka lub zmiana pracy mogą sprawić, że dotychczasowy sposób radzenia sobie przestaje wystarczać. Nawet oczekiwana zmiana może nieść ze sobą niepewność.',
    sections: [
      ['Trudna reakcja nie musi oznaczać zaburzenia', 'Po ważnym wydarzeniu inaczej może wyglądać organizacja dnia, kontakt z bliskimi i sposób podejmowania decyzji. Nie każda osoba reaguje tak samo i nie każda będzie potrzebowała psychoterapii. Na spotkaniu można omówić, co wymaga uwagi teraz, a z czym można poczekać.'],
      ['Kiedy rozważyć dalszą pracę', 'Konsultacja może służyć ustaleniu potrzeb i możliwości wsparcia. Jeśli zmiana odsłoniła także dawniejsze trudności, na przykład obawę przed pozostaniem bez pomocy po rozstaniu, można rozważyć pracę psychoterapeutyczną. Planowa konsultacja nie jest interwencją kryzysową.'],
    ],
    urgent: true, related: [[topicPath('zaloba'), 'Strata bliskiej osoby i żałoba'], [topicPath('samotnosc'), 'Samotność po zmianie lub stracie'], [topicPath('stres'), 'Przewlekły stres i przeciążenie']],
  },
  {
    slug: 'wypalenie-zawodowe', group: helpGroups[1], label: 'Wypalenie zawodowe', h1: 'Wypalenie zawodowe i trudności związane z pracą', title: 'Wypalenie zawodowe - konsultacja we Wrocławiu',
    description: 'Konsultacja psychologiczna, gdy wyczerpanie i dystans wobec pracy utrzymują się mimo odpoczynku. O warunkach pracy, granicach i możliwościach pomocy.',
    intro: 'Wolny weekend może nie wystarczyć, gdy w pracy od dawna brakuje czasu, wsparcia lub poczucia wpływu. Oprócz zmęczenia może pojawić się dystans do obowiązków, które wcześniej miały znaczenie.',
    sections: [
      ['Co odróżnia wypalenie od przeciążenia w innych obszarach', 'WHO opisuje wypalenie jako zjawisko związane z przewlekłym stresem w pracy, a nie jednostkę chorobową. Podczas rozmowy warto ustalić, czy trudność dotyczy przede wszystkim pracy. Jeśli wyczerpanie, obniżony nastrój lub utrata zainteresowań wykraczają poza nią, może być potrzebna również konsultacja lekarska.'],
      ['Co można omówić, zanim zapadnie decyzja o zmianie', 'Można porozmawiać o obciążeniu, dostępnych możliwościach zmiany i tym, co utrudnia stawianie granic. W psychoterapii można sprawdzić, jaką rolę odgrywa potrzeba uznania lub obawa przed odmową. Taka praca nie zastępuje poprawy szkodliwych warunków zatrudnienia.'],
    ],
    related: [[topicPath('stres'), 'Przewlekły stres poza pracą'], [topicPath('depresja'), 'Depresja i obniżony nastrój']], sources: [['https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon', 'WHO: wypalenie jako zjawisko zawodowe w ICD-11']],
  },
  {
    slug: 'poczucie-pustki', group: helpGroups[0], label: 'Poczucie pustki i braku sensu życia', title: 'Poczucie pustki i braku sensu życia - konsultacja',
    description: 'Na konsultacji można porozmawiać o poczuciu pustki, braku satysfakcji i trudnościach z rozpoznaniem tego, co jest ważne, także gdy trudno je nazwać.',
    intro: 'Z zewnątrz życie może wyglądać tak jak wcześniej: praca, spotkania, obowiązki. A jednak trudno poczuć, że coś naprawdę cieszy, porusza albo ma znaczenie. O takim doświadczeniu można porozmawiać bez gotowego wyjaśnienia.',
    sections: [
      ['Pustka i pytanie o sens to różne doświadczenia', 'Pustka może polegać na odrętwieniu lub braku poczucia więzi. Brak sensu częściej dotyczy pytania, czy to, jak się żyje, odpowiada własnym wartościom. Obydwa doświadczenia mogą występować osobno lub razem. Utrata zainteresowań, energii i zdolności czerpania przyjemności wymaga osobnego namysłu nad stanem zdrowia i możliwą depresją.'],
      ['Co kryje się za słowem „pustka”?', 'Jedna osoba mówi tak o zobojętnieniu, a inna o poczuciu, że robi wiele rzeczy, lecz żadna nie jest jej wyborem. Niekiedy pojawia się ono po stracie lub długim przeciążeniu, czasem szczególnie wyraźnie w określonych relacjach. Warto zastanowić się, kiedy pustka jest najbardziej odczuwalna i czy zdarzają się chwile, w których ustępuje. Samo jej występowanie nie przesądza o depresji ani o zaburzeniu osobowości.'],
      ['Od czego można zacząć rozmowę', 'Na konsultacji można opisać zwykły moment, w którym pojawia się poczucie pustki, nawet jeśli trudno powiedzieć, co się wtedy czuje. W psychoterapii psychodynamicznej można przyjrzeć się temu, czy łatwiej rozpoznawać oczekiwania innych niż własne pragnienia albo czy w niektórych sytuacjach trudno dopuścić do siebie złość, smutek lub potrzebę bliskości. To pytania do wspólnego sprawdzenia, nie założenie o przyczynie pustki.'],
    ],
    urgent: true, related: [[topicPath('depresja'), 'Depresja i obniżony nastrój'], [topicPath('samotnosc'), 'Samotność i potrzeba bliskości']],
  },
  {
    slug: 'trudnosci-emocjonalne', group: helpGroups[0], label: 'Trudności w regulacji emocji', title: 'Trudności w regulacji emocji - konsultacja',
    description: 'Konsultacja może być miejscem rozmowy o silnych emocjach, odcinaniu się od nich i sytuacjach, w których trudno zrozumieć własną reakcję lub ją wyrazić.',
    intro: 'Po rozmowie może zostać poczucie, że złość była silniejsza, niż można się było spodziewać. Bywa też odwrotnie: dopiero po kilku godzinach przychodzi myśl, że w ważnej chwili trudno było w ogóle coś poczuć albo odpowiedzieć.',
    sections: [
      ['Co dokładnie sprawia trudność?', 'Silna emocja nie jest sama w sobie problemem. Trudność może polegać na rozpoznaniu tego, co się czuje, na znalezieniu sposobu wyrażenia tego wobec drugiej osoby albo na powrocie do równowagi po konflikcie. Znaczenie mają okoliczności: przemęczenie, poczucie zagrożenia, sposób reagowania bliskich i to, co wcześniej działo się w podobnych sytuacjach.'],
      ['Jak pracuję z konkretnym przykładem', 'Na konsultacji można wrócić do jednej sytuacji i odróżnić to, co się wydarzyło, od tego, jak zostało odebrane i co nastąpiło później. W psychoterapii można badać, czy pewne uczucia pojawiają się razem, na przykład złość i obawa, że jej wyrażenie zagrozi relacji. Celem nie musi być wygaszenie emocji, lecz lepsze rozumienie ich i znalezienie większej swobody w reagowaniu.'],
    ],
    related: [[topicPath('asertywnosc-i-granice'), 'Stawianie granic i wyrażanie potrzeb'], [topicPath('stres'), 'Przewlekły stres i przeciążenie']],
  },
  {
    slug: 'natlok-mysli', group: helpGroups[1], label: 'Natłok myśli', title: 'Natłok myśli - konsultacja psychologiczna',
    description: 'Natłok myśli to trudność z uporządkowaniem wielu równoczesnych wątków. Konsultacja pomaga rozróżnić przeciążenie od ciągłego analizowania jednej sprawy.',
    intro: 'Przy natłoku myśli trudno wybrać, na czym skupić uwagę: kolejne wątki pojawiają się szybko, jeden przerywa drugi, a powrót do zadania wymaga wysiłku. To inne doświadczenie niż uporczywe rozważanie jednej sprawy.',
    sections: [
      ['Kiedy trudno utrzymać kolejność i kierunek myśli', 'Przy spiętrzeniu obowiązków, braku snu lub napięciu uwaga może przeskakiwać między sprawami. Ustalenie, czy zjawisko pojawia się po nieprzespanej nocy, w stresujących rozmowach czy niezależnie od sytuacji, pomaga dobrać dalsze kroki. Wyraźna, nagła zmiana połączona z małą potrzebą snu i nietypowo dużą aktywnością wymaga szybkiej oceny lekarskiej.'],
      ['Rozróżnianie przeciążenia, pobudzenia i konfliktu', 'W pracy psychodynamicznej można zastanawiać się, czy poczucie naporu nasila się przy zderzeniu sprzecznych żądań lub w chwili trudnej emocjonalnie. Nie jest to założenie o przyczynie. Celem konsultacji jest ustalenie, jaki wpływ natłok ma na odpoczynek, koncentrację i decyzje i czy ważniejsza jest pomoc psychologiczna, zmiana obciążenia czy ocena zdrowia.'],
    ],
    related: [[topicPath('nadmierne-analizowanie'), 'Nadmierne analizowanie'], [topicPath('trudnosci-ze-snem'), 'Problemy ze snem']],
  },
  {
    slug: 'asertywnosc-i-granice', group: helpGroups[2], label: 'Trudności z asertywnością i stawianiem granic', title: 'Trudności z asertywnością i stawianiem granic - konsultacja',
    description: 'Można porozmawiać o tym, co utrudnia odmowę, wyrażenie sprzeciwu lub proszenie o zmianę, oraz o tym, jakie reakcje innych osób trzeba wziąć pod uwagę.',
    intro: 'Czasem łatwiej zgodzić się od razu, niż znieść czyjeś rozczarowanie. Dopiero później pojawia się złość albo poczucie, że kolejny raz nie było miejsca na własną decyzję. W innej sytuacji odmowa jest możliwa, ale długo towarzyszy jej poczucie winy.',
    sections: [
      ['Granica to nie tylko umiejętność powiedzenia „nie”', 'Bywa, że najtrudniej zauważyć własny sprzeciw, określić, o co chce się poprosić, lub wytrzymać napięcie po rozmowie. Znaczenie ma również to, czy w danej relacji można bezpiecznie odmówić. Obawy przed konsekwencjami nie zawsze wynikają z braku asertywności: mogą odpowiadać realnemu ryzyku, zależności lub przewadze drugiej osoby.'],
      ['Co można sprawdzić na konsultacji', 'Można przeanalizować konkretną prośbę lub sytuację: na co była zgoda, na co nie i co utrudniło powiedzenie o tym. W psychoterapii można przyglądać się temu, dlaczego u konkretnej osoby odmowa może znaczyć coś więcej niż różnicę zdań, na przykład wywoływać obawę przed utratą relacji. Nie chodzi o zalecenie konfrontacji ani o gotowy zestaw odpowiedzi dla każdej sytuacji.'],
    ],
    related: [[topicPath('problemy-w-relacjach'), 'Powtarzające się trudności w relacjach'], [topicPath('doswiadczenie-przemocy'), 'Konsultacja po doświadczeniu przemocy']],
  },
  {
    slug: 'trudne-doswiadczenia-z-dziecinstwa', group: helpGroups[5], label: 'Trudne doświadczenia z dzieciństwa', title: 'Trudne doświadczenia z dzieciństwa - konsultacja',
    description: 'Na konsultacji można porozmawiać o tym, czy dawne doświadczenia mają znaczenie dla obecnych relacji i samopoczucia, bez obowiązku opowiadania szczegółów.',
    intro: 'O dzieciństwie można zacząć myśleć na nowo przy okazji ważnej zmiany albo w chwili, gdy w dorosłej relacji powraca znajome napięcie. Nie trzeba wcześniej rozstrzygać, czy przeszłość ma z tym związek.',
    sections: [
      ['Zaczynamy od tego, co jest ważne teraz', 'Można zauważać, że trudno liczyć na innych, mówić o potrzebach albo tolerować niezgodę. Takie reakcje nie świadczą same w sobie o konkretnych doświadczeniach z dzieciństwa. Warto uwzględnić to, co dzieje się dzisiaj, w tym jakość obecnych relacji, warunki życia oraz dostępne wsparcie.'],
      ['Jak przeszłość może pojawić się w rozmowie', 'W podejściu psychodynamicznym można wspólnie zastanowić się, czy sposób reagowania, który kiedyś pomagał poradzić sobie w domu, jest nadal potrzebny w aktualnych relacjach. To możliwy kierunek rozumienia, a nie poszukiwanie jednej przyczyny. Na pierwszym spotkaniu nie trzeba odtwarzać przebiegu wydarzeń. Można powiedzieć, że jakieś doświadczenie jest ważne, i zacząć od jego obecnego znaczenia.'],
    ],
    related: [['/blog/czy-przeszlosc-ma-znaczenie/', 'Czy przeszłość ma znaczenie?'], [topicPath('dda'), 'Dorastanie w rodzinie z problemem alkoholowym'], [topicPath('doswiadczenie-przemocy'), 'Doświadczenie przemocy']],
  },
  {
    slug: 'dda', group: helpGroups[5], label: 'Dorastanie w rodzinie z problemem alkoholowym (DDA)', title: 'DDA - konsultacja po dorastaniu z problemem alkoholu',
    description: 'Konsultacja dla osób, które dorastały w rodzinie z problemem alkoholowym. Można omówić znaczenie doświadczeń z domu dla obecnego życia, bez diagnozowania.',
    intro: 'Jeśli w domu rodzinnym dużo zależało od tego, w jakim stanie wróci dorosły, uważne obserwowanie innych mogło być ważne dla codziennego bezpieczeństwa. Po latach niektóre osoby zauważają, że trudno im przestać brać odpowiedzialność za nastrój lub decyzje bliskich. Nie jest to doświadczenie każdej osoby wychowanej w takim domu.',
    sections: [
      ['Co oznacza skrót DDA?', 'Skrótu DDA używa się w odniesieniu do dorosłych dzieci alkoholików, czyli osób, które dorastały w rodzinie z problemem alkoholowym. Nie jest to formalna diagnoza psychiatryczna ani opis wspólnego zestawu cech. Na spotkaniu można używać tego określenia, jeśli pomaga nazwać własne doświadczenie, ale nie jest to konieczne.'],
      ['Konsultacja dotyczy własnej sytuacji', 'Można porozmawiać o tym, jak dziś przeżywa się kontakt z rodziną i gdzie trudno rozpoznać, co należy do własnych obowiązków, a co do innej osoby. W psychoterapii można badać, czy sposoby reagowania z domu powracają w obecnych relacjach oraz kiedy już nie służą danej osobie. Nie prowadzę leczenia uzależnień; ta konsultacja dotyczy doświadczenia osoby zgłaszającej się, a nie leczenia członka rodziny.'],
    ],
    related: [[topicPath('trudne-doswiadczenia-z-dziecinstwa'), 'Trudne doświadczenia z dzieciństwa'], [topicPath('asertywnosc-i-granice'), 'Asertywność i granice w relacjach']],
  },
  {
    slug: 'doswiadczenie-przemocy', group: helpGroups[5], label: 'Doświadczenie przemocy', title: 'Doświadczenie przemocy - konsultacja',
    description: 'Na konsultacji można porozmawiać o wpływie doświadczenia przemocy na emocje, zaufanie i relacje. W sytuacji zagrożenia pierwszeństwo ma bezpieczeństwo.',
    intro: 'Po doświadczeniu przemocy można mieć trudność z poczuciem bezpieczeństwa również w sytuacjach, które wcześniej nie budziły obaw. Można też nie wiedzieć, od czego zacząć rozmowę. Doświadczenie przemocy lub traumy może być powodem konsultacji. Nie trzeba opowiadać szczegółów wydarzenia na pierwszym spotkaniu.',
    sections: [
      ['Gdy zagrożenie nadal trwa', 'Najpierw liczy się bezpieczeństwo i dostęp do pomocy, nie analiza przyczyn własnych reakcji. Za przemoc odpowiada osoba, która ją stosuje. Jeśli nie ma bezpośredniego zagrożenia, ale potrzebne jest wsparcie w ustaleniu bezpiecznego dalszego działania, można skontaktować się ze specjalistyczną placówką pomocy osobom doświadczającym przemocy. Planowa wizyta w gabinecie nie zastępuje takiego wsparcia.'],
      ['O czym można rozmawiać, gdy jest już bezpiecznie', 'Powodem zgłoszenia może być trudność z zaufaniem, napięcie przy określonych rozmowach, powracające wspomnienia lub niepewność w ocenie własnych granic. Na konsultacji można ustalić, co jest najtrudniejsze teraz i jaka pomoc odpowiada aktualnym potrzebom. Jeśli potrzebna jest inna forma leczenia lub specjalistycznego wsparcia, można o tym porozmawiać bez zobowiązania do rozpoczęcia psychoterapii w gabinecie.'],
    ],
    sources: [['https://nidzica.policja.gov.pl/o12/aktualnosci/141999,Jestes-swiadkiem-lub-doswiadczasz-przemocy-domowej-Reaguj.html', 'Policja: gdzie szukać pomocy w przypadku przemocy domowej']],
    urgent: true, related: [[topicPath('powracajace-wspomnienia'), 'Powracające wspomnienia trudnych wydarzeń'], [topicPath('trudne-doswiadczenia-z-dziecinstwa'), 'Wpływ wcześniejszych doświadczeń']],
  },
  {
    slug: 'lek-spoleczny', group: helpGroups[1], label: 'Lęk społeczny (fobia społeczna)', title: 'Lęk społeczny (fobia społeczna) - konsultacja',
    description: 'Konsultacja, gdy obawa przed oceną utrudnia rozmowy, spotkania, naukę lub pracę. O różnicy między nieśmiałością a lękiem, który ogranicza codzienne życie.',
    intro: 'Można chcieć zabrać głos na spotkaniu, a jednak milczeć z obawy, że inni zauważą zdenerwowanie. Czasem napięcie pojawia się już przed spotkaniem, a po nim długo wraca się myślami do tego, jak wypadła rozmowa.',
    sections: [
      ['Nieśmiałość a lęk, który ogranicza wybór', 'Nieśmiałość sama w sobie nie jest zaburzeniem. Warto porozmawiać o lęku wtedy, gdy obawa przed oceną powtarza się i sprawia, że rezygnuje się z ważnych działań, na przykład z rozmów na zajęciach, spotkań ze znajomymi lub okazji zawodowych. Znaczenie ma także kontekst: w otoczeniu, w którym dochodzi do wyśmiewania lub wykluczania, ostrożność może być odpowiedzią na rzeczywiste doświadczenia.'],
      ['Co można omówić na konsultacji', 'Można zacząć od sytuacji, w której łatwiej było się wycofać niż narazić na ocenę. W pracy psychodynamicznej można przyjrzeć się temu, jak dana osoba przeżywa bycie zauważoną i czego spodziewa się po reakcji innych, również w rozmowie w gabinecie. To możliwy kierunek pracy, a nie założenie o przyczynie lęku. Przy podejrzeniu zaburzenia lęku społecznego warto rozważyć ocenę kliniczną i inne formy leczenia, w tym terapię poznawczo-behawioralną ukierunkowaną na lęk społeczny, którą NICE rekomenduje dorosłym.'],
    ],
    related: [[topicPath('zaburzenia-lekowe'), 'Zaburzenia lękowe i nawracający lęk'], [topicPath('nadmierne-analizowanie'), 'Nadmierne analizowanie rozmów']],
    sources: [['https://www.nice.org.uk/guidance/cg159', 'NICE: rozpoznawanie, ocena i leczenie zaburzenia lęku społecznego']],
  },
  {
    slug: 'zaloba', group: helpGroups[4], label: 'Strata i żałoba', h1: 'Strata bliskiej osoby i żałoba', title: 'Strata i żałoba - konsultacja psychologiczna',
    description: 'Na konsultacji można porozmawiać o życiu po śmierci bliskiej osoby, o zmieniających się emocjach i o wsparciu, którego potrzeba w codziennych sytuacjach.',
    intro: 'Po śmierci bliskiej osoby może brakować nie tylko rozmów i wspólnych planów, ale też zwykłych rytuałów. Niekiedy trudność staje się bardziej odczuwalna później, gdy inni wracają do swoich spraw, a codzienne życie nadal wygląda inaczej.',
    sections: [
      ['Nie ma jednego sposobu przeżywania straty', 'Tęsknota, złość, odrętwienie czy chwile ulgi mogą pojawiać się w różnej kolejności, a czasem obok siebie. Znaczenie mają między innymi charakter więzi, okoliczności śmierci, dostępne wsparcie i to, co zmieniło się w codzienności. Żałoba sama w sobie nie jest powodem do rozpoznania zaburzenia ani nie oznacza konieczności rozpoczęcia terapii.'],
      ['O czym można porozmawiać po stracie', 'Można zacząć od tego, co jest teraz najtrudniejsze: od samotnych wieczorów, zmiany obowiązków albo uczuć, o których trudno mówić przy bliskich. W pracy psychodynamicznej można przyjrzeć się różnym uczuciom wobec zmarłej osoby i temu, jakie miejsce ta więź zajmuje dzisiaj. Nie chodzi o narzucanie tempa ani oczekiwanie, że o zmarłej osobie przestanie się myśleć. Jeśli trudności są bardzo nasilone lub utrzymują się i uniemożliwiają codzienne funkcjonowanie, można omówić, czy potrzebna jest również konsultacja lekarska lub inna forma pomocy.'],
    ],
    urgent: true, related: [[topicPath('kryzys-zyciowy'), 'Kryzys życiowy i trudne zmiany'], [topicPath('samotnosc'), 'Samotność po zmianie lub stracie']],
  },
  {
    slug: 'lek-przed-odrzuceniem', group: helpGroups[2], label: 'Lęk przed odrzuceniem', title: 'Lęk przed odrzuceniem - konsultacja psychologiczna',
    description: 'Konsultacja, gdy obawa przed utratą ważnej relacji utrudnia mówienie o potrzebach. Można omówić konkretne sytuacje i to, jak wpływają na codzienne decyzje.',
    intro: 'Krótka odpowiedź albo odwołane spotkanie mogą uruchomić obawę, że relacja się kończy. Czasem trudno o tym zapytać wprost, bo sama rozmowa wydaje się ryzykiem.',
    sections: [
      ['Obawa przed utratą więzi', 'Lęk przed odrzuceniem dotyczy przede wszystkim możliwości utraty akceptacji lub kontaktu. To nie to samo co lęk przed bliskością, w którym trudność może nasilać się właśnie wtedy, gdy druga osoba odwzajemnia zainteresowanie. Obie obawy mogą współwystępować. Trzeba też uwzględnić, czy druga osoba rzeczywiście bywa nieprzewidywalna albo wycofuje się bez wyjaśnienia.'],
      ['Co można zbadać podczas spotkań', 'Można przyjrzeć się chwili między niejasnym sygnałem a decyzją: czy pojawia się potrzeba natychmiastowego potwierdzenia więzi, czy raczej chęć wycofania się jako pierwsza osoba? W terapii można sprawdzać, co utrudnia pozostanie w rozmowie mimo niepewności, bez przekonywania siebie, że każde zachowanie drugiej osoby jest bezpieczne.'],
    ],
    faq: ['Czy lęk przed odrzuceniem oznacza borderline?', 'Nie. Jedno doświadczenie nie wystarcza do rozpoznania zaburzenia osobowości. Na konsultacji można porozmawiać o wpływie lęku bez przypisywania mu diagnozy.'],
    related: [[topicPath('lek-przed-bliskoscia'), 'Lęk przed bliskością'], [topicPath('asertywnosc-i-granice'), 'Trudność z odmową i stawianiem granic']],
  },
  {
    slug: 'lek-przed-bliskoscia', group: helpGroups[2], label: 'Lęk przed bliskością', title: 'Lęk przed bliskością - konsultacja psychologiczna',
    description: 'Na konsultacji można porozmawiać o sytuacjach, w których wzajemne zaangażowanie budzi napięcie, i odróżnić potrzebę przestrzeni od obawy przed bliskością.',
    intro: 'Na początku znajomość może sprawiać przyjemność. Kiedy druga osoba zaczyna częściej szukać kontaktu albo pyta o wspólne plany, może pojawić się napięcie i potrzeba wycofania.',
    sections: [
      ['Kiedy zbliżenie staje się trudne', 'Nie każda potrzeba przestrzeni jest lękiem. Ważne może być to, czy chęć oddalenia odpowiada realnemu naciskowi lub naruszeniu granic, czy powraca również wtedy, gdy druga osoba szanuje odmowę. W odróżnieniu od obawy przed odrzuceniem pytanie może dotyczyć nie tyle tego, czy druga osoba odejdzie, ile tego, co się zmieni, jeśli pozostanie blisko.'],
      ['Rozmowa o bliskości bez nacisku', 'Na konsultacji można przyjrzeć się temu, co w praktyce oznacza zbliżenie: bycie widzianym, zależność, dzielenie się planami czy dzielenie odpowiedzialności. W perspektywie psychodynamicznej można sprawdzać, czy oczekiwania z wcześniejszych relacji powracają w nowych. Celem nie jest zmuszanie do większej bliskości, lecz rozróżnienie własnego wyboru od reakcji, która pozostawia poczucie utraty czegoś ważnego.'],
    ],
    related: [[topicPath('lek-przed-odrzuceniem'), 'Lęk przed odrzuceniem'], [topicPath('problemy-w-relacjach'), 'Problemy w relacjach']],
  },
  {
    slug: 'rozstanie-i-rozwod', group: helpGroups[7], label: 'Rozstanie i rozwód', title: 'Rozstanie i rozwód - konsultacja indywidualna',
    description: 'Indywidualna konsultacja po rozstaniu lub rozwodzie. Można porozmawiać o trudnych emocjach, dalszym kontakcie z byłym partnerem i zmianach w codzienności.',
    intro: 'Po rozstaniu decyzja o zakończeniu związku może być przemyślana, a jednocześnie może brakować wspólnej codzienności. Gdy kontakt trwa ze względu na dzieci lub sprawy organizacyjne, zakończenie związku nie oznacza końca wszystkich rozmów.',
    sections: [
      ['Co zmieniło się po zakończeniu związku', 'Można opłakiwać wspólne plany, czuć ulgę i równocześnie obawiać się przyszłości. Nie trzeba wybierać jednego uczucia ani uzgadniać, kto ponosi odpowiedzialność za wszystkie trudności. Na spotkaniu można odróżnić pilne decyzje dotyczące codzienności od pytań o to, co zakończenie relacji znaczy dla danej osoby.'],
      ['Konsultacja indywidualna, nie mediacja', 'Można omówić, co utrudnia rozmowy po rozstaniu, jakie granice są potrzebne i jak obecne doświadczenie wpływa na obraz siebie. Jeśli po konsultacji rozważana jest psychoterapia, jednym z kierunków może być przyjrzenie się temu, co trudno było wyrażać w związku. Nie prowadzę terapii par ani mediacji i nie udzielam porad prawnych.'],
    ],
    faq: ['Czy można przyjść przed podjęciem decyzji o rozstaniu?', 'Tak. Można porozmawiać o wątpliwościach i konsekwencjach różnych możliwości. Konsultacja nie służy podjęciu decyzji za osobę zgłaszającą się.'],
    related: [[topicPath('kryzys-zyciowy'), 'Kryzys życiowy i trudne zmiany'], [topicPath('samotnosc'), 'Samotność po zmianie']],
  },
  {
    slug: 'niestabilna-samoocena', group: helpGroups[3], label: 'Niestabilna samoocena', title: 'Niestabilna samoocena - konsultacja psychologiczna',
    description: 'Konsultacja przy dużych zmianach w ocenie siebie po sukcesie, krytyce lub porównaniu z innymi. O tym, jak zauważać te zmiany i ich wpływ na wybory.',
    intro: 'Po udanej rozmowie można czuć się kompetentnie, a po jednej uwadze tego samego dnia nabrać przekonania, że nic się nie umie. Trudność dotyczy wtedy nie tylko tego, jak surowa jest ocena, lecz także tego, jak gwałtownie się zmienia.',
    sections: [
      ['Zmienność nie jest tym samym co stale niska ocena siebie', 'Ocena konkretnych umiejętności może się zmieniać w odpowiedzi na doświadczenie. Warto przyjrzeć się sytuacji, gdy pojedynczy wynik albo reakcja ważnej osoby przesłania wcześniejsze doświadczenia i staje się podstawą oceny całej osoby. Można sprawdzić, czy dotyczy to głównie pracy, wyglądu lub relacji, czy wielu dziedzin naraz.'],
      ['Jak można pracować nad ciągłością obrazu siebie', 'W rozmowie można zestawić dwie sytuacje, po których pojawiły się przeciwne oceny siebie, i zauważyć, które fakty przestały być wtedy dostępne w myśleniu. W perspektywie psychodynamicznej istotne może być to, od kogo potrzebne jest uznanie i co dzieje się, gdy go brakuje. Nie chodzi o utrzymywanie zawsze pozytywnej samooceny, lecz o możliwość uwzględnienia także tych doświadczeń, które nie pasują do chwilowego odczucia.'],
    ],
    related: [[topicPath('niska-samoocena'), 'Niskie poczucie własnej wartości'], ['/blog/poczucie-wlasnej-wartosci/', 'Jak kształtuje się poczucie własnej wartości?']],
  },
  {
    slug: 'stres-szkolny', group: helpGroups[8], label: 'Stres szkolny', title: 'Stres szkolny - konsultacja dla młodzieży od 15 lat',
    description: 'Konsultacja dla młodzieży od 15. roku życia, gdy wymagania szkolne utrudniają odpoczynek. Jak rozmawiać o przeciążeniu i jak wygląda pierwsze spotkanie?',
    intro: 'Stres szkolny to reakcja na wymagania związane z nauką i życiem w grupie. Jeśli napięcie utrzymuje się po zakończeniu obowiązków, może odbierać czas i energię potrzebne na sen, odpoczynek i relacje.',
    sections: [
      ['Źródła przeciążenia: wymagania, relacje i lęk przed błędem', 'Warto odróżnić spiętrzenie zadań od obawy, że każda pomyłka będzie miała poważne konsekwencje. Znaczenie mogą mieć również konflikty w klasie, oczekiwania dorosłych, dojazdy lub zbyt mało czasu na sen. Jeśli problem wynika z warunków w szkole, nie da się go sprowadzić do sposobu myślenia młodej osoby.'],
      ['Cele pracy psychoterapeutycznej i rola rodziców', 'Rozmowa dotyczy przebiegu napięcia i jego wpływu na naukę, relacje oraz odpoczynek. Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców. Na kolejnych indywidualnych spotkaniach możemy przyglądać się między innymi temu, jak nastolatek przeżywa oczekiwania i prosi o pomoc. Konsultacja nie zastępuje zmian organizacyjnych w szkole ani oceny lekarskiej przy utrzymujących się dolegliwościach.'],
    ],
    related: [['/psychoterapia-mlodziezy-od-15-roku-zycia/', 'Pierwsze spotkanie i udział rodziców'], [topicPath('lek-spoleczny'), 'Obawa przed oceną w grupie']],
  },
];

const topicLabels = new Map([...existingTopics, ...additions, ...newTopics, ...consultationTopics].map(t => [t.slug, t.label]));
const resourceLabels: Record<string, string> = {
  '/blog/relacja-terapeutyczna-zrodlo-zmiany/': 'Artykuł: relacja terapeutyczna a zmiana',
  '/blog/narcyzm-wrazliwy/': 'Artykuł o narcyzmie wrażliwym',
  '/blog/dlaczego-sama-swiadomosc-nie-wystarcza/': 'Artykuł: dlaczego sama świadomość nie wystarcza?',
  '/blog/samotnosc/': 'Artykuł o doświadczeniu samotności',
  '/blog/dlaczego-wybieram-podobnych-partnerow/': 'Artykuł: dlaczego wybieram podobnych partnerów?',
  '/blog/czy-przeszlosc-ma-znaczenie/': 'Artykuł: czy przeszłość ma znaczenie?',
  '/terapia-skoncentrowana-na-przeniesieniu-tfp/': 'Jak wygląda praca w TFP',
};

function relatedTopics(links: string[]): Topic['related'] {
  return links.map(link => {
    const externalToCatalogue = link.startsWith('/');
    const label = externalToCatalogue ? resourceLabels[link] : topicLabels.get(link);
    if (!label) throw new Error(`Missing label for topic link: ${link}`);
    return [externalToCatalogue ? link : topicPath(link), label];
  });
}

export const helpTopics: Topic[] = [
  ...existingTopics,
  ...[...additions, ...newTopics].map(({ group, links, ...topic }): Topic => ({
    ...topic,
    group: helpGroups[group],
    title: topic.label.length <= 45 ? `${topic.label} - konsultacja` : topic.label,
    related: relatedTopics(links),
  })),
  ...consultationTopics.map(({ links, ...topic }): Topic => ({
    ...topic,
    group: consultationGroup,
    related: relatedTopics(links),
  })),
];
