import type { Addition } from './help-topic-additions';

export const newTopics: Addition[] = [
  {
    group: 3, slug: 'perfekcjonizm', label: 'Perfekcjonizm',
    description: 'Perfekcjonizm potrafi utrudniać kończenie zadań i odpoczynek. Konsultacja pozwala przyjrzeć się związkom wymagań i błędów z poczuciem własnej wartości.',
    intro: 'Wysokie standardy nie muszą być problemem. W perfekcjonizmie stają się trudnością, gdy nie można dopasować ich do sytuacji, a drobny błąd podważa poczucie własnej wartości.',
    sections: [
      ['Standardy, które utrudniają ukończenie pracy', 'Wielokrotne poprawianie i odkładanie pokazania efektu pomagają odsunąć ocenę. Kosztem jest czas, odpoczynek i mniejsza swoboda wyboru zadań. Samokrytycyzm dotyczy przede wszystkim reakcji na błąd; w perfekcjonizmie sztywna miara wyniku wpływa już na planowanie i wykonanie. Znaczenie mają także realne wymagania otoczenia: nie każde przywiązanie do dokładności wynika z lęku.'],
      ['Poczucie wartości niezależne od wyniku', 'W pracy psychodynamicznej można rozumieć perfekcyjny wynik jako sposób ochrony przed wstydem lub utratą uznania. To hipoteza, którą trzeba odnieść do sytuacji danej osoby. Praca może służyć bardziej elastycznemu stosowaniu wymagań, tolerowaniu błędów i odróżnianiu staranności od przymusu udowadniania wartości.'],
    ], firstVisit: 'Znaczenie ma to, które zadania pochłaniają niewspółmiernie dużo czasu i co, zdaniem zgłaszającej się osoby, by się stało po oddaniu pracy z drobnym błędem.', links: ['lek-przed-porazka', 'nadmierny-samokrytycyzm', 'odpoczynek-i-przeciazenie'],
  },
  {
    group: 1, slug: 'lek-przed-porazka', label: 'Lęk przed porażką',
    description: 'Kiedy strach przed niepowodzeniem prowadzi do rezygnacji z ważnych wyzwań, można omówić związek lęku ze wstydem, oceną i wymaganiami wobec siebie.',
    intro: 'Lęk przed porażką dotyczy przewidywanych skutków niepowodzenia. Wynik może oznaczać realną stratę, ale też być przeżywany jako dowód braku zdolności lub powód utraty szacunku.',
    sections: [
      ['Jak przewidywane niepowodzenie ogranicza wybory', 'Odkładanie zgłoszenia, wybieranie wyłącznie bezpiecznych zadań czy przygotowywanie się bez podjęcia próby dają krótką ulgę. Z czasem utrudniają sprawdzenie, z czym dana osoba potrafi sobie poradzić. Próba może być szczególnie trudna, jeśli przed porażką nie chroni nawet sukces: potwierdza on tylko, że następnym razem trzeba osiągnąć co najmniej tyle samo.'],
      ['Co w porażce jest najbardziej dotkliwe', 'Psychoterapia może pomóc rozdzielić ryzyko praktyczne od oczekiwania zawstydzenia, utraty więzi lub statusu. W pracy psychodynamicznej istotne jest znaczenie błędu w oczach własnych i ważnych osób, nie nakłanianie do podejmowania dowolnego ryzyka. Od perfekcjonizmu odróżnia ten temat nacisk na to, co przed próbą prowadzi do wycofania.'],
    ], firstVisit: 'Przykład niewykorzystanej możliwości pomaga ustalić, czego dotyczył lęk i jakie były koszty rezygnacji.', links: ['perfekcjonizm', 'wstyd', 'lek-spoleczny'],
  },
  {
    group: 0, slug: 'nadmierne-poczucie-winy', label: 'Nadmierne poczucie winy',
    description: 'Konsultacja dotycząca wyrzutów sumienia po naprawieniu szkody lub przy odmowie. O różnicy między przeżywaną winą a rzeczywistą odpowiedzialnością.',
    intro: 'Poczucie winy może skłaniać do uznania szkody i jej naprawienia. Staje się nadmierne, gdy nie odpowiada rzeczywistej odpowiedzialności albo nie ustępuje mimo podjęcia możliwych działań naprawczych.',
    sections: [
      ['Wyrzuty sumienia i rzeczywista odpowiedzialność', 'Można czuć się winnym rozczarowania innej osoby, choć nie złamało się ustalenia i nie miało wpływu na jej decyzje. Obowiązek stałego uprzedzania cudzych potrzeb utrudnia odmowę i odpoczynek. W odróżnieniu od wstydu, który zwykle dotyczy obrazu całej osoby, wina skupia się bardziej na czynie, zaniechaniu lub przypisywanej sobie odpowiedzialności. Oba uczucia mogą współwystępować.'],
      ['Konflikt między zobowiązaniami a własnymi potrzebami', 'W psychoterapii można badać surowe wewnętrzne reguły i to, czy czyjś smutek jest traktowany jak dowód wyrządzenia krzywdy. Celem nie jest pozbycie się sumienia, lecz uznawanie własnego udziału bez przypisywania sobie cudzej odpowiedzialności. Bardzo nasilona wina wraz z pogorszeniem nastroju i funkcjonowania uzasadnia szerszą ocenę.'],
    ], firstVisit: 'Punktem wyjścia może być sytuacja, po której wyrzuty sumienia nie ustępują, oraz to, na co rzeczywiście miało się wpływ.', links: ['wstyd', 'asertywnosc-i-granice', 'depresja'],
  },
  {
    group: 0, slug: 'wstyd', label: 'Wstyd',
    description: 'Konsultacja, gdy wstyd utrudnia mówienie o potrzebach, przyjmowanie wsparcia lub bycie widocznym. O różnicy między wstydem, winą i obawą przed oceną.',
    intro: 'Wstyd wiąże się z doświadczeniem bycia widzianym w sposób, który zagraża poczuciu własnej wartości albo przynależności. Pojawia się także bez publicznej oceny, kiedy odrzucenia się dopiero spodziewamy.',
    sections: [
      ['Wstyd może skłaniać do ukrywania się', 'Milczenie, unikanie spojrzeń, samokrytyka lub złość mogą doraźnie chronić przed poczuciem obnażenia. Ceną bywa rezygnacja z pomocy właśnie wtedy, gdy jest potrzebna. Poczucie winy częściej odnosi się do tego, co się zrobiło; wstyd do tego, jak przeżywa się siebie. Jeśli ktoś faktycznie poniża lub dyskryminuje, nie należy sprowadzać problemu do nadmiernej wrażliwości.'],
      ['Zachować kontakt mimo obawy przed oceną', 'W relacji terapeutycznej można dostrzegać, kiedy pytanie zaczyna brzmieć jak osąd i jaki kontekst nadaje mu ten sens. Praca służy rozróżnianiu potrzebnej prywatności od ukrywania tego, co wydaje się nie do przyjęcia. Nie wymaga ujawniania spraw, o których osoba nie jest gotowa rozmawiać.'],
    ], firstVisit: 'Wystarczy powiedzieć, że pewne sprawy trudno nazwać z obawy przed oceną. Opowiadanie szczegółów nie jest warunkiem rozmowy.', links: ['nadmierne-poczucie-winy', 'nadwrazliwosc-na-krytyke', 'lek-przed-odrzuceniem'],
  },
  {
    group: 3, slug: 'trudnosci-w-podejmowaniu-decyzji', label: 'Trudności w podejmowaniu decyzji',
    description: 'Konsultacja, gdy niezdecydowanie blokuje wybór mimo informacji. O sprzecznych potrzebach, koszcie rezygnacji z opcji i odpowiedzialności za decyzje.',
    intro: 'Ważny wybór oznacza nie tylko wybranie jednej możliwości, lecz także rezygnację z innych. Niezdecydowanie staje się obciążeniem, gdy odwlekanie zmniejsza liczbę opcji, a zebranie dalszych informacji nie przybliża do decyzji.',
    sections: [
      ['Niepewność czy konflikt potrzeb?', 'Ostrożność jest uzasadniona, jeśli brakuje wiadomości lub konsekwencje są trudne do odwrócenia. W innej sytuacji wiadomo już wystarczająco dużo, ale żadna decyzja nie godzi dwóch istotnych potrzeb, np. samodzielności i pozostania blisko rodziny. Nadmierna analiza może wtedy odkładać konfrontację z kosztem wyboru.'],
      ['Przyjąć, że wybór nie musi dać pewności', 'W podejściu psychodynamicznym znaczenie mają jednoczesne, sprzeczne pragnienia oraz wyobrażenie reakcji ważnych osób. Praca może pomóc rozpoznać, które ograniczenia są realne, a które wynikają z przewidywanego poczucia winy albo potrzeby uzyskania aprobaty. Psycholog nie podejmuje decyzji za osobę zgłaszającą się.'],
    ], firstVisit: 'Można wskazać decyzję, która pozostaje otwarta, i to, czego szkoda byłoby utracić po wyborze każdej z możliwości.', links: ['nadmierne-analizowanie', 'potrzeba-akceptacji', 'zrozumienie-siebie'],
  },
  {
    group: 2, slug: 'zaleznosc-emocjonalna', label: 'Zależność emocjonalna',
    description: 'Konsultacja, gdy obawa przed utratą więzi utrudnia samodzielne decyzje i wyrażanie sprzeciwu. O różnicy między wzajemnym oparciem a podporządkowaniem.',
    intro: 'Potrzebowanie drugiej osoby jest częścią bliskości. Problem pojawia się, gdy utrzymanie kontaktu regularnie wymaga rezygnowania z własnych potrzeb oraz prawa do podejmowania decyzji.',
    sections: [
      ['Oparcie w relacji a utrata wpływu na własne decyzje', 'Zależność emocjonalna nie jest rozpoznaniem psychiatrycznym. Określenie opisuje sytuację, w której własne samopoczucie i decyzje są silnie uzależnione od dostępności lub aprobaty ważnej osoby. Samo szukanie pomocy tego nie oznacza. Zachowanie autonomii utrudniają czasem materialna zależność, opieka nad bliskimi lub faktyczna kontrola; przy przemocy priorytetem jest bezpieczeństwo.'],
      ['Bliskość bez konieczności zgadzania się na wszystko', 'Psychodynamicznie można badać konflikt między potrzebą związku a obawą, że samodzielność zostanie odebrana jako odejście. W pracy indywidualnej chodzi o rozpoznanie własnych potrzeb i większą zdolność do podejmowania decyzji przy zachowaniu więzi, jeśli jest to możliwe. Nie jest to zalecenie zerwania kontaktu ani terapia par.'],
    ], firstVisit: 'Pomocny jest przykład własnej decyzji, której trudno było się trzymać po sprzeciwie drugiej osoby.', links: ['lek-przed-odrzuceniem', 'asertywnosc-i-granice', 'doswiadczenie-przemocy'],
  },
  {
    group: 9, slug: 'zaburzenia-psychosomatyczne', label: 'Zaburzenia psychosomatyczne',
    description: 'Konsultacja dotycząca związku samopoczucia z dolegliwościami fizycznymi. Objawy są realne, a pomoc psychologiczna nie zastępuje diagnostyki ani leczenia.',
    intro: 'Procesy psychiczne i fizjologiczne oddziałują na siebie. Ból lub niepewność dotycząca zdrowia mogą zwiększać napięcie; napięcie i gorszy sen mogą wpływać na to, jak doświadcza się dolegliwości. Nie przesądza to o ich przyczynie.',
    sections: [
      ['Dolegliwości fizyczne wymagają odpowiedniej oceny', 'Psychosomatyka odnosi się do związków między funkcjonowaniem psychicznym i somatycznym, nie jest rozpoznaniem wyprowadzanym z jednego objawu. Prawidłowy wynik pojedynczego badania nie dowodzi podłoża psychicznego. Nowe, utrzymujące się lub nasilające objawy należy omówić z lekarzem. W bezpośrednim zagrożeniu nie należy czekać na konsultację psychologiczną.'],
      ['Praca nad skutkami objawów, nie szukanie ukrytej przyczyny', 'Wsparcie psychologiczne może dotyczyć obaw o zdrowie, zmian aktywności, reakcji otoczenia i przeżywania ograniczeń. W ujęciu psychodynamicznym jednym z możliwych tematów jest rozpoznawanie napięcia i emocji w konkretnych sytuacjach, bez interpretowania każdego objawu jako wyrazu konfliktu. Konsultacja może uzupełniać opiekę medyczną, nie zastępuje zaleceń lekarskich.'],
    ], firstVisit: 'Ważne są wpływ dolegliwości na codzienność, przebieg kontaktu z lekarzem i to, jakiego wsparcia psychologicznego potrzeba.', links: ['trudnosci-zwiazane-z-choroba', 'trudnosci-ze-snem', 'stres'], urgent: true,
  },
  {
    group: 6, slug: 'trudnosci-w-okresleniu-tozsamosci', label: 'Trudności w określeniu własnej tożsamości',
    description: 'Konsultacja przy trudnościach w rozpoznaniu własnych wartości, celów i poczucia ciągłości. Poszukiwanie tożsamości nie jest samo w sobie zaburzeniem.',
    intro: 'Tożsamość obejmuje poczucie ciągłości własnej osoby, jej odrębności oraz rozpoznawanie, co jest dla niej ważne. Naturalnie rozwija się wraz z doświadczeniem i nie wymaga niezmiennej odpowiedzi na pytanie, kim się jest.',
    sections: [
      ['Niepewność rozwojowa i trudność utrzymująca się w wielu sytuacjach', 'Pytania o wartości i kierunek życia mogą nasilać się przy zmianie pracy, rozstaniu lub zmianie środowiska. Konsultacja nabiera znaczenia, gdy oczekiwania innych niemal całkowicie zastępują własne wybory albo trudno powiązać dzisiejsze decyzje z wcześniejszymi doświadczeniami. Orientacja seksualna i tożsamość płciowa nie są zaburzeniami. Cierpienie po dyskryminacji nie świadczy o zaburzeniu tożsamości.'],
      ['Ciągłość nie oznacza niezmiennego obrazu siebie', 'Niestabilny obraz siebie dotyczy tego, jak przeżywa się własną osobę w różnych stanach i relacjach. Tutaj najważniejsze jest poczucie autorstwa decyzji, wartości i celów w dłuższym czasie. W pracy psychodynamicznej można przyglądać się sprzecznym identyfikacjom i potrzebom bez narzucania spójnej etykiety.'],
    ], firstVisit: 'Rozmowę można rozpocząć od sytuacji, w której szczególnie trudno rozróżnić to, co ważne dla siebie, od oczekiwań innych.', links: ['stabilny-obraz-siebie', 'zrozumienie-siebie', 'dorastanie-i-tozsamosc'],
  },
  {
    group: 0, slug: 'impulsywnosc', label: 'Impulsywność',
    description: 'Konsultacja dotycząca działań podejmowanych zanim da się ocenić ich skutki. O związku impulsywności z emocjami, frustracją i codziennymi relacjami.',
    intro: 'Impulsywność dotyczy działania podjętego, zanim uda się rozważyć skutki i inne możliwości. Nie jest tym samym co spontaniczność ani silna emocja: intensywne przeżycie nie musi prowadzić do pochopnego działania.',
    sections: [
      ['Działanie przynosi ulgę wcześniej niż refleksja', 'Nagłe zerwanie rozmowy, wysłanie wiadomości w złości lub podjęcie kosztownej decyzji może doraźnie zmniejszyć napięcie. Trudność ma znaczenie kliniczne zwłaszcza wtedy, gdy takie reakcje się powtarzają, prowadzą do szkód lub zawężają możliwość podjęcia innej decyzji. Impulsywność sama nie rozstrzyga o ADHD ani borderline. Jeśli pojawiła się nagle, razem z bardzo małą potrzebą snu, wzrostem aktywności lub ryzykownymi działaniami, potrzebna może być pilna konsultacja lekarska.'],
      ['Od przeżycia do wyboru reakcji', 'Psychoterapia może służyć rozpoznawaniu chwili między doznaniem frustracji a działaniem. Psychodynamicznie można badać, czy działanie na krótko oddala wstyd, poczucie bezradności lub obawę przed utratą relacji. Jest to możliwa funkcja reakcji, nie wyjaśnienie każdej impulsywności.'],
    ], firstVisit: 'Warto opisać kolejność wydarzeń przed działaniem i jego skutki. Jeśli ktoś jest zagrożony, nie należy czekać na termin.', links: ['intensywne-emocje', 'radzenie-sobie-ze-zloscia', 'trudnosci-emocjonalne'], urgent: true,
  },
  {
    group: 0, slug: 'brak-satysfakcji-z-zycia', label: 'Brak satysfakcji z życia',
    description: 'Konsultacja, gdy życie nie daje satysfakcji mimo zachowanej zdolności do przeżywania przyjemności. O potrzebach, wartościach i ograniczeniach.',
    intro: 'Brak satysfakcji to niezadowolenie z kierunku lub jakości własnego życia. Można nadal czerpać przyjemność ze spotkań czy zainteresowań, choć praca, relacje albo rozkład codziennych obowiązków nie odpowiadają temu, co jest ważne.',
    sections: [
      ['Niespełnienie to nie to samo co anhedonia', 'Niespełnienie może być związane z konkretną dziedziną albo rozbieżnością między oczekiwaniami a realnymi możliwościami. Anhedonia dotyczy utraty zainteresowania lub przyjemności i wraz z innymi objawami może być częścią depresji. Jeżeli poza niezadowoleniem wyraźnie zmieniły się nastrój, energia lub możliwość czerpania przyjemności, przydatna jest szersza ocena.'],
      ['Własne wartości a miara sukcesu przejęta od innych', 'W ujęciu psychodynamicznym można badać, czy pozornie pożądany cel służy przede wszystkim utrzymaniu uznania ważnych osób. Nie każdy brak satysfakcji wynika z psychiki; istotne są warunki pracy, zdrowie i dostępne wsparcie. Kierunkiem pracy jest rozpoznanie rzeczywistych potrzeb oraz tego, na co ma się wpływ, nie wymóg stałego zadowolenia.'],
    ], firstVisit: 'Pomocne jest porównanie jednej rzeczy, która nadal daje przyjemność, z obszarem, w którym wysiłek nie przynosi poczucia satysfakcji.', links: ['depresja', 'poczucie-pustki', 'trudnosci-w-podejmowaniu-decyzji'],
  },
  {
    group: 1, slug: 'nadmierne-analizowanie', label: 'Nadmierne analizowanie',
    description: 'Konsultacja, gdy ciągłe analizowanie rozmów lub decyzji utrudnia odpoczynek i działanie. O ruminacjach, zamartwianiu się oraz tolerowaniu niepewności.',
    intro: 'Nadmierne analizowanie polega na wielokrotnym wracaniu do tego samego problemu bez wyraźnego postępu. Nie chodzi o liczbę myśli, lecz o trudność w zakończeniu rozważań, nawet gdy nie pojawiają się nowe informacje.',
    sections: [
      ['Namysł, ruminacja i zamartwianie się', 'Namysł prowadzi zwykle do nowego wniosku lub kolejnego kroku. Ruminacja to uporczywe roztrząsanie przeżyć, ich znaczenia lub konsekwencji, a zamartwianie się częściej dotyczy tego, co może się wydarzyć. Powtarzanie pytań przynosi czasem poczucie kontroli, ale może odbierać sen, utrudniać decyzję i utrzymywać uwagę przy pierwotnym rozczarowaniu.'],
      ['Czego nie daje się rozstrzygnąć samym myśleniem', 'W pracy psychodynamicznej można sprawdzić, czy kolejna analiza próbuje zapobiec odrzuceniu lub odsuwa uczucie, którego trudno doświadczyć, np. wstyd. To hipoteza zależna od sytuacji. Celem może być rozpoznanie granicy między przygotowaniem a poszukiwaniem niedostępnej pewności oraz powrót do decyzji mimo tej niepewności.'],
    ], firstVisit: 'Na konsultacji przydatny jest jeden powracający temat oraz informacja, czy rozważania przynoszą rozwiązanie, czy głównie odsuwają decyzję.', links: ['natlok-mysli', 'trudnosci-w-podejmowaniu-decyzji', 'zaburzenia-lekowe'],
    sources: [['https://pubmed.ncbi.nlm.nih.gov/18298268/', 'Watkins: konstruktywne i niekonstruktywne myślenie powtarzalne']],
  },
];
