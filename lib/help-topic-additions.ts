// Editorial content for the 31 topics added in the final catalogue expansion.
// References without a leading slash are slugs in the same catalogue.
export type Addition = {
  group: number; slug: string; label: string; description: string; intro: string;
  sections: [string, string][]; firstVisit: string; links: string[];
  sources?: [string, string][]; urgent?: boolean;
};

export const additions: Addition[] = [
  {
    group: 0, slug: 'rozpoznawanie-emocji', label: 'Trudności w rozpoznawaniu i rozumieniu emocji',
    description: 'Konsultacja, gdy trudno nazwać własne emocje lub odróżnić je od siebie. Punktem wyjścia mogą być sygnały z ciała, sytuacja i to, na co ma się wtedy ochotę.',
    intro: 'Po spotkaniu pozostaje napięcie, ale nie wiadomo, czy chodzi o złość, zawstydzenie, czy zmęczenie. Czasem łatwiej powiedzieć, co się wydarzyło, niż opisać własną reakcję.',
    sections: [
      ['Zauważyć uczucie, zanim nada się mu nazwę', 'Można znać wiele nazw emocji i nadal nie wiedzieć, która pasuje do bieżącej sytuacji. Zdarza się też rozpoznać uczucie dopiero później, gdy jest ciszej i nie trzeba reagować. To inna trudność niż sytuacja, w której złość jest jasna, ale trudno zdecydować, jak ją wyrazić. Nie każdy sygnał z ciała ma źródło emocjonalne; utrzymujące się dolegliwości warto omówić z lekarzem.'],
      ['Co można zauważać w rozmowie', 'Punktem wyjścia może być konkretna chwila: na co zwróciło się uwagę, czy miało się ochotę odsunąć, odpowiedzieć albo poprosić o pomoc. W ujęciu psychodynamicznym można rozważyć, czy przy pewnych osobach niektóre uczucia łatwiej zauważyć niż przy innych. Nazwa emocji ma pomóc w rozumieniu doświadczenia, nie zastąpić go klasyfikacją.'],
    ], firstVisit: 'Nie trzeba opowiadać o uczuciach w uporządkowany sposób. Można zacząć od wydarzenia, po którym zostało poczucie, że coś było nie w porządku.', links: ['trudnosci-emocjonalne', 'zrozumienie-siebie'],
  },
  {
    group: 0, slug: 'radzenie-sobie-ze-zloscia', label: 'Trudności w radzeniu sobie ze złością',
    description: 'Na konsultacji można omówić złość, którą trudno wyrazić, albo reakcje, których skutki budzą niepokój. O różnicy między uczuciem a podjętym działaniem.',
    intro: 'Złość może być dobrze widoczna dla innych, choć rozpoznaje się ją dopiero po kłótni. Może też zostać niewypowiedziana i ujawnić się wiele godzin później jako żal lub niechęć do rozmowy.',
    sections: [
      ['Złość i działanie to nie to samo', 'Złość może towarzyszyć niesprawiedliwemu traktowaniu, frustracji lub poczuciu bezsilności. Samo uczucie nie jest przemocą i nie usprawiedliwia gróźb, poniżania ani krzywdzenia. Przyglądanie się złości może dotyczyć zarówno tego, jak reaguje się podczas konfliktu, jak i tego, dlaczego nie zabiera się głosu, zanim napięcie urośnie.'],
      ['Praca nad momentem, w którym zmienia się rozmowa', 'W gabinecie można odtworzyć kolejność zdarzeń: co zostało usłyszane, jak zmieniło się rozumienie intencji rozmówcy i jakie działanie wydawało się wtedy możliwe. Z psychodynamicznego punktu widzenia można też badać, czy sprzeciw wiąże się z lękiem przed utratą więzi. Gdy bezpieczeństwo jest zagrożone, pierwszym krokiem jest przerwanie niebezpiecznej sytuacji i uzyskanie pilnej pomocy.'],
    ], firstVisit: 'Można przynieść przykład reakcji, której się żałuje, lub rozmowy, w której sprzeciw pozostał niewypowiedziany. Ustalimy, czy potrzebna jest też inna forma wsparcia.', links: ['intensywne-emocje', 'asertywnosc-i-granice'], urgent: true,
  },
  {
    group: 1, slug: 'trudnosci-ze-snem', label: 'Trudności ze snem i samopoczucie psychiczne',
    description: 'Rozmowa o trudnościach z zasypianiem, nocnych pobudkach i ich wpływie na samopoczucie. Konsultacja nie zastępuje oceny możliwych przyczyn medycznych.',
    intro: 'Noc po trudnym dniu nie zawsze przynosi odpoczynek. Niekiedy niepokój pojawia się dopiero w łóżku, a myśl o kolejnym dniu zwiększa presję, żeby jak najszybciej zasnąć.',
    sections: [
      ['Sen i samopoczucie mogą wpływać na siebie nawzajem', 'Ważne jest, czy trudność dotyczy zasypiania, budzenia się, czy przewlekłego poczucia niewyspania mimo odpowiedniej liczby godzin w łóżku. Znaczenie mogą mieć choroby, ból, leki, rytm zmian w pracy i używane substancje. Nie należy zakładać podłoża psychicznego. Utrzymujące się trudności, szczególnie gdy występują przerwy w oddychaniu lub duża senność w dzień, warto omówić z lekarzem.'],
      ['Co należy do zakresu rozmowy psychologicznej', 'Można porozmawiać o tym, kiedy noc staje się pierwszym momentem na zauważenie napięcia, albo o tym, co następuje po źle przespanej nocy. Jeśli potrzebne jest leczenie przewlekłej bezsenności, warto zapytać o terapię poznawczo-behawioralną bezsenności (CBT-I). Konsultacja w tym gabinecie nie jest specjalistycznym leczeniem zaburzeń snu.'],
    ], firstVisit: 'Pomocne może być opisanie ostatniego tygodnia: od kiedy sen się zmienił, jak przebiega dzień i czy problem był już konsultowany medycznie.', links: ['stres', 'natlok-mysli'], sources: [['https://www.nhlbi.nih.gov/health/insomnia/treatment', 'NHLBI: leczenie bezsenności']],
  },
  {
    group: 1, slug: 'odpoczynek-i-przeciazenie', label: 'Trudności z odpoczynkiem i przeciążenie psychiczne',
    description: 'Konsultacja, gdy mimo chwili wolnego trudno odłożyć obowiązki i odpocząć. Można porozmawiać o obciążeniach i o tym, co dzieje się po zwolnieniu tempa.',
    intro: 'Dzień się kończy, lecz kolejna wolna chwila od razu staje się okazją, żeby coś nadrobić. Gdy nic nie ma do zrobienia, zamiast ulgi pojawia się niepokój albo poczucie winy.',
    sections: [
      ['Brak czasu a trudność z wykorzystaniem wolnego czasu', 'Opieka, praca i nieregularny grafik mogą zostawiać zbyt mało przestrzeni na regenerację. W innej sytuacji czas jest dostępny, ale odpoczynek trudno rozpocząć lub utrzymać. Tych sytuacji nie rozwiązuje się tak samo. Przede wszystkim warto zobaczyć, czy można realnie zdjąć część obciążenia.'],
      ['Co wywołuje zwolnienie tempa', 'W rozmowie można sprawdzić, z czym wiąże się odkładanie obowiązku: z przewidywaniem kłopotów, obawą przed oceną czy poczuciem, że bez działania trudno określić własną wartość. W podejściu psychodynamicznym można pytać, co odpoczynek oznacza dla danej osoby, zamiast przedstawiać relaks jako kolejne zadanie do wykonania.'],
    ], firstVisit: 'Można opisać ostatnią chwilę, którą planowało się przeznaczyć na odpoczynek, i to, co ostatecznie się z nią stało.', links: ['stres', 'wypalenie-zawodowe', 'trudnosci-ze-snem'],
  },
  {
    group: 2, slug: 'trudnosci-z-zaufaniem', label: 'Trudności z zaufaniem',
    description: 'Konsultacja, gdy trudno polegać na innych lub powierzać im ważne sprawy. Można rozróżnić uzasadnioną ostrożność od obaw powracających w różnych relacjach.',
    intro: 'Ktoś proponuje pomoc, ale rozsądniej wydaje się i tak zrobić wszystko samodzielnie. Nie wiadomo, co będzie dalej, jeśli druga osoba nie dotrzyma słowa albo wykorzysta przekazaną informację.',
    sections: [
      ['Zaufanie nie jest decyzją podejmowaną raz na zawsze', 'Można ufać komuś w jednej dziedzinie, a nie chcieć powierzać mu prywatnych spraw. Uzasadniona ostrożność po nadużyciu nie jest wadą. Na konsultacji warto odróżnić to, co druga osoba robi teraz, od tego, czego spodziewamy się na podstawie innych doświadczeń.'],
      ['Sprawdzać bez wymuszania zaufania', 'W pracy psychodynamicznej można zauważać, jak reaguje się na dotrzymane i niedotrzymane ustalenia. Rozmowa o tym, jak powstaje zaufanie w gabinecie, też może być ważna: nie trzeba od razu mówić o wszystkim, żeby móc ocenić, czy rozmowa daje wystarczające poczucie bezpieczeństwa.'],
    ], firstVisit: 'Można zacząć od tego, komu lub w jakich sprawach najtrudniej zaufać. Pytania o granice współpracy są częścią konsultacji.', links: ['lek-przed-bliskoscia', 'doswiadczenie-zdrady'],
  },
  {
    group: 2, slug: 'trudnosci-komunikacyjne', label: 'Trudności komunikacyjne',
    description: 'Na indywidualnej konsultacji można omówić rozmowy, w których trudno usłyszeć drugą osobę, wyjaśnić nieporozumienie lub powiedzieć, czego się potrzebuje.',
    intro: 'Rozmowa zaczyna się od ustalenia drobnej sprawy, a kończy sporem o to, kto kogo nie słucha. Po fakcie okazuje się, że obie osoby inaczej rozumiały nawet pierwsze zdanie.',
    sections: [
      ['Oddzielić treść zdania od tego, jak zostało odebrane', 'Trudność może dotyczyć zbyt pośredniego wyrażania potrzeb, domyślania się intencji lub wycofania, gdy druga strona mówi podniesionym głosem. W relacjach opartych na nacisku nawet jasna komunikacja może nie wystarczyć. Warto pytać nie tylko, jak mówić, ale też czy w danej rozmowie jest miejsce na odpowiedź.'],
      ['Co można zrobić z konkretną rozmową', 'Na spotkaniu można oddzielić słowa, przypisaną im intencję i własną reakcję. Jeśli na przykład pytanie o godzinę powrotu zabrzmiało jak zarzut, można zastanowić się, co w tonie, okolicznościach lub historii relacji nadało mu taki sens. W pracy można również przyjrzeć się podobnemu nieporozumieniu, gdy pojawi się w gabinecie.'],
    ], firstVisit: 'Wystarczy krótki opis jednej rozmowy, która poszła inaczej, niż się oczekiwało. Spotkanie ma charakter indywidualny, nie jest treningiem dla pary.', links: ['asertywnosc-i-granice', 'problemy-w-relacjach'],
  },
  {
    group: 2, slug: 'nawiazywanie-kontaktow-spolecznych', label: 'Trudności w nawiązywaniu kontaktów społecznych',
    description: 'Konsultacja przy trudnościach z nawiązywaniem znajomości. O różnicy między brakiem okazji, niepewnością na początku i trudnością z jej podtrzymaniem.',
    intro: 'Po zmianie miasta lub pracy można znać wiele osób z widzenia, a mimo to nie mieć kogo zaprosić na spotkanie. Czasem pierwsza rozmowa jest możliwa, ale trudno przejść do kolejnego kontaktu.',
    sections: [
      ['Na którym etapie kontakt się urywa?', 'Innej pomocy potrzeba, kiedy brakuje okazji do regularnego kontaktu, a innej, gdy podczas spotkań trudno zainicjować rozmowę lub odezwać się ponownie. Nie każda trudność oznacza lęk społeczny. Warto brać pod uwagę zmianę środowiska, bariery językowe, dostępność miejsc spotkań i wcześniejsze doświadczenie wykluczenia.'],
      ['Małe różnice w tym, co robi się po spotkaniu', 'Na konsultacji można zobaczyć, czy na przykład brak szybkiej odpowiedzi wystarcza, by zrezygnować z dalszego kontaktu. Psychoterapia może służyć rozumieniu oczekiwań wobec nowych znajomości, ale nie zastępuje okazji do poznawania ludzi i nie wymaga upodobania do dużych grup.'],
    ], firstVisit: 'Przydatny jest przykład znajomości, którą chciało się rozwinąć, ale nie było jasne, jaki mógłby być następny krok.', links: ['lek-spoleczny', 'samotnosc'],
  },
  {
    group: 2, slug: 'powtarzajace-sie-trudnosci-w-relacjach', label: 'Powtarzające się trudności w relacjach',
    description: 'Konsultacja, gdy podobne konflikty lub rozczarowania wracają w różnych relacjach. Można zobaczyć, co je łączy, a czym różnią się poszczególne sytuacje.',
    intro: 'Zmieniają się ludzie, lecz znajome jest zakończenie: jedna osoba bierze na siebie coraz więcej, po czym wycofuje się bez rozmowy. Podobieństwo kilku historii można sprawdzić, zamiast z góry zakładać, że wszystkie były takie same.',
    sections: [
      ['Wzorzec to sekwencja, nie etykieta', 'Warto zestawić relacje z różnych obszarów, np. z pracy i przyjaźni. Co następowało tuż przed wycofaniem lub konfliktem? Jak reagowali inni? Powtarzalność nie oznacza, że osoba zgłaszająca się jest odpowiedzialna za zachowania wszystkich uczestników.'],
      ['Jak rozpoznać moment, w którym możliwa jest inna reakcja', 'Psychodynamicznie można rozważać, czy znajome oczekiwanie wyprzedza obserwację aktualnej sytuacji. Czasem określona rola w relacji wydaje się bezpieczniejsza, choć z czasem staje się kosztowna. Porównanie zdarzeń, także tych, w których udało się postąpić inaczej, pozwala uniknąć wyjaśniania całego życia jedną historią.'],
    ], firstVisit: 'Można opowiedzieć o dwóch konkretnych relacjach, które wydają się podobne, i o jednym wyjątku, jeśli przychodzi na myśl.', links: ['problemy-w-relacjach', 'podobni-partnerzy', '/blog/relacja-terapeutyczna-zrodlo-zmiany/'],
  },
  {
    group: 3, slug: 'nadmierny-samokrytycyzm', label: 'Nadmierny samokrytycyzm',
    description: 'Konsultacja dotycząca surowych standardów, podejścia do własnych błędów i wewnętrznych ocen, które utrudniają naukę, odpoczynek lub kończenie zadań.',
    intro: 'Po drobnej pomyłce można pomyśleć, co zrobić inaczej następnym razem. Można też przez resztę dnia wypominać sobie, że w ogóle do niej doszło, choć konkretne zadanie jest już zakończone.',
    sections: [
      ['Ocena działania a karzący osąd', 'Samokrytyka jest pomocna, gdy pozwala poprawić coś konkretnego. Problem może pojawić się, gdy standard stale się przesuwa albo po każdym błędzie pojawia się ogólny osąd osoby. Nie jest to to samo co trudność w przyjmowaniu uwag od innych: surowy komentarz może pojawić się także wtedy, gdy nikt niczego nie ocenił.'],
      ['Jakiemu celowi służy surowość?', 'Na konsultacji można sprawdzić, czy krytykowanie siebie ma zapobiec kolejnemu błędowi, oddalić wstyd lub pozwolić poczuć kontrolę. W pracy psychodynamicznej można badać, czy sposób zwracania się do siebie przypomina ważne dawne relacje. Celem nie jest rezygnacja z odpowiedzialności, tylko oddzielenie poprawiania błędów od karania siebie.'],
    ], firstVisit: 'Można przytoczyć dwa zdania z własnego komentarza po pomyłce i opowiedzieć, co wydarzyło się później.', links: ['nadwrazliwosc-na-krytyke', 'poczucie-niewystarczalnosci'],
  },
  {
    group: 3, slug: 'nadwrazliwosc-na-krytyke', label: 'Nadwrażliwość na krytykę',
    description: 'Konsultacja, gdy informacja zwrotna wywołuje silny wstyd, złość lub potrzebę wycofania. Można omówić, co w ocenie innych okazuje się szczególnie trudne.',
    intro: 'Po uwadze dotyczącej jednego zadania trudno skupić się na reszcie rozmowy. Można natychmiast zacząć się bronić albo dopiero po spotkaniu zauważyć, jak mocno ta uwaga zabolała.',
    sections: [
      ['Jakiego rodzaju uwaga zabolała?', 'Warto odróżnić upokorzenie od rzeczowej informacji zwrotnej. Znaczenie ma też, kto mówił, czy komentarz padł na forum grupy i czy można było odpowiedzieć. Reakcja na krytykę nie mówi sama przez się o narcyzmie ani o zaburzeniu osobowości.'],
      ['Co dzieje się między uwagą a odpowiedzią', 'Można przyjrzeć się temu, czy uwaga została odebrana jako możliwość poprawki, czy jako sygnał utraty szacunku. W psychoterapii można badać tę różnicę także wtedy, gdy neutralne pytanie w gabinecie wydaje się oceną. Nie chodzi o uczenie się obojętności na krytykę, lecz o odzyskanie możliwości rozumienia tego, co się wydarzyło, i wyboru reakcji.'],
    ], firstVisit: 'Przydatny będzie przykład jednej uwagi, której trudno było wysłuchać, i opis tego, jak zmieniła dalszą rozmowę.', links: ['nadmierny-samokrytycyzm', 'narcyzm', '/blog/narcyzm-wrazliwy/'],
  },
  {
    group: 3, slug: 'zrozumienie-siebie', label: 'Trudności w zrozumieniu siebie',
    description: 'Konsultacja, gdy powtarzające się wybory lub sprzeczne potrzeby trudno zrozumieć. Pierwsza rozmowa nie wymaga diagnozy ani gotowego wyjaśnienia decyzji.',
    intro: 'Można trafnie nazwać własne uczucia, a nadal nie rozumieć, dlaczego kolejny raz podjęło się decyzję sprzeczną z tym, czego się chciało. Można też zmieniać zdanie w zależności od tego, z kim rozmawia się o ważnej sprawie.',
    sections: [
      ['Potrzeby mogą być sprzeczne, nawet gdy są zrozumiałe', 'Na przykład pragnienie samodzielności i chęć utrzymania bliskości nie muszą się wykluczać, ale w konkretnej decyzji mogą kierować w różne strony. Warto odróżnić ten rodzaj konfliktu od trudności w nazwaniu samej emocji. Rozumienie siebie nie wymaga odkrycia jednej prawdziwej motywacji do każdego działania.'],
      ['Przyglądanie się decyzjom, nie egzamin z wglądu', 'W konsultacji można zestawić to, co było dla danej osoby ważne przed decyzją, z tym, co stało się możliwe po jej podjęciu. Psychodynamiczna rozmowa pozwala brać pod uwagę także motywy, których nie zauważa się od razu. Hipoteza jest użyteczna tylko wtedy, gdy pomaga rozumieć konkretne przeżycia, a nie zastępuje ich interpretacją z góry.'],
    ], firstVisit: 'Można zacząć od wyboru, który zaskoczył osobę podejmującą decyzję, lub od pytania, które powraca w różnych sytuacjach.', links: ['rozpoznawanie-emocji', 'stabilny-obraz-siebie', '/blog/dlaczego-sama-swiadomosc-nie-wystarcza/'],
  },
  {
    group: 3, slug: 'potrzeba-akceptacji', label: 'Nadmierna potrzeba akceptacji',
    description: 'Konsultacja, gdy opinie innych mają większy wpływ na wybory niż własne potrzeby. O różnicy między potrzebą przynależności a stałym zabieganiem o zgodę.',
    intro: 'Przed podjęciem decyzji łatwo wyobrazić sobie, co powiedzą inni, ale trudno ustalić, co samemu uważa się za dobre rozwiązanie. Po odmowie pojawia się chęć szybkiego wyjaśnienia albo cofnięcia decyzji.',
    sections: [
      ['Zależeć na innych i zachować prawo do decyzji', 'Potrzeba akceptacji jest zrozumiała. Trudność pojawia się, gdy prawie każda różnica zdań wydaje się grozić utratą miejsca w grupie, albo gdy zgoda otoczenia staje się warunkiem działania. Jeśli przynależność faktycznie zależy od podporządkowania się, warto uwzględnić warunki tej relacji, nie tylko wewnętrzne obawy.'],
      ['Rozmowa o kosztach dopasowania', 'Na spotkaniu można przyjrzeć się wyborowi, który zyskał aprobatę, ale pozostawił żal. Psychodynamicznie można badać, czy przy określonych osobach potrzeba uznania przesłania złość lub sprzeciw. Pomocne bywa określenie, czy oczekiwało się wsparcia w decyzji, czy pozwolenia na jej podjęcie.'],
    ], firstVisit: 'Można przynieść przykład sytuacji, w której reakcja innych przeważyła nad własnym zdaniem mimo wątpliwości.', links: ['lek-przed-odrzuceniem', 'asertywnosc-i-granice'],
  },
  {
    group: 3, slug: 'poczucie-niewystarczalnosci', label: 'Poczucie bycia niewystarczająco dobrym',
    description: 'Na konsultacji można porozmawiać o poczuciu, że nawet dobry wynik nie wystarcza, by uznać własny wysiłek lub pozwolić sobie na odpoczynek po zadaniu.',
    intro: 'Zadanie jest skończone i inni wydają się zadowoleni, a jednak zostaje poczucie, że należało zrobić więcej. Niekiedy ten brak domknięcia dotyczy również bycia partnerem, rodzicem lub pracownikiem.',
    sections: [
      ['Co miałoby oznaczać „wystarczająco”?', 'W tym doświadczeniu nie musi dominować głośny, krytyczny komentarz. Często trudniejsze jest poczucie, że nie ma takiego momentu, w którym można uznać sprawę za zakończoną. Realny brak wsparcia lub zadania ponad siły potrafią podtrzymywać to wrażenie. Ważne jest, jakie wymagania można w danej sytuacji rzeczywiście spełnić.'],
      ['Oczekiwanie wobec siebie a warunek uznania', 'W rozmowie można sprawdzić, czy odpoczynek, bliskość lub zadowolenie wydają się dostępne dopiero po spełnieniu kolejnego warunku. W podejściu psychodynamicznym pytanie może brzmieć, dla kogo trzeba ciągle udowadniać swoją wystarczalność. Nie chodzi o nakaz pozytywnego myślenia, ale o dostrzeżenie warunków, których wcześniej nie brało się pod uwagę.'],
    ], firstVisit: 'Można opowiedzieć o czymś, co zakończyło się dobrze, lecz nie przyniosło ulgi, i o tym, czego nadal się od siebie oczekiwało.', links: ['niska-samoocena', 'nadmierny-samokrytycyzm'],
  },
  {
    group: 6, slug: 'narcyzm', label: 'Trudności związane z narcyzmem',
    description: 'Na konsultacji można omówić zależność samooceny od uznania, wstyd i napięcie w relacjach. Potoczne użycie słowa „narcyzm” nie jest rozpoznaniem klinicznym.',
    intro: 'Jedna osoba zgłasza się, bo sukces szybko traci dla niej znaczenie bez uznania innych. Inna zastanawia się nad uwagą, że w bliskich relacjach trudno jej dostrzec perspektywę drugiej strony, szczególnie podczas konfliktu.',
    sections: [
      ['Potoczne określenie nie wystarcza do rozpoznania', 'Słowo „narcyzm” bywa używane zarówno w rozmowie o cechach, jak i jako etykieta w sporze. Trudność w przyjmowaniu krytyki czy chęć bycia docenionym same w sobie nie wskazują na zaburzenie osobowości. Na konsultacji nie rozpoznaję zaburzenia u nieobecnego partnera na podstawie relacji drugiej osoby.'],
      ['Co można badać we własnym funkcjonowaniu', 'W pracy psychodynamicznej można przyglądać się sytuacjom, w których potrzeba uznania konkuruje z ciekawością tego, co przeżywa ktoś bliski. Można też badać zmiany w postrzeganiu siebie i innych po sukcesie lub rozczarowaniu. Jeśli trudności są utrwalone, można omówić, czy warto rozważyć dalszą psychoterapię, w tym TFP, którą prowadzę w trakcie szkolenia i pod superwizją. To decyzja podejmowana po konsultacjach, nie na podstawie etykiety.'],
    ], firstVisit: 'Zamiast zaczynać od pytania „czy to narcyzm?”, można opowiedzieć o tym, co w ostatnim konflikcie było najbardziej dotkliwe i jakie były jego skutki.', links: ['zaburzenia-osobowosci', 'niestabilna-samoocena', '/blog/narcyzm-wrazliwy/', '/terapia-skoncentrowana-na-przeniesieniu-tfp/'],
  },
  {
    group: 6, slug: 'intensywne-emocje', label: 'Trudności w radzeniu sobie z intensywnymi emocjami',
    description: 'Konsultacja, gdy emocje narastają szybko i trudno odzyskać równowagę. Można omówić przebieg reakcji, jej skutki i sytuacje, wymagające pilnej pomocy.',
    intro: 'W jednej chwili da się rozmawiać, a po kilku zdaniach trudno wyobrazić sobie jakąkolwiek odpowiedź poza ucieczką lub natychmiastowym działaniem. Niekiedy równie obciążające jest to, jak długo napięcie utrzymuje się później.',
    sections: [
      ['Znaczenie ma tempo, natężenie i czas powrotu do równowagi', 'Można dobrze wiedzieć, że czuje się lęk albo złość, i nadal mieć trudność z powstrzymaniem reakcji. To nie to samo co problem z nazwaniem uczuć. Warto omówić, co dzieje się tuż przed wzrostem napięcia i czy nasilenie wiąże się na przykład z brakiem snu, przeciążeniem, niepewnością w relacji lub zmianami zdrowotnymi. Nie jest to test na borderline.'],
      ['Jak wrócić do sytuacji, gdy napięcie już opadnie', 'Podczas spotkań można analizować krótkie odcinki wydarzeń zamiast oceniać całą reakcję naraz. W ujęciu psychodynamicznym istotne może być to, jak pod wpływem emocji zmienia się obraz siebie i rozmówcy. Gdy reakcje są częste, prowadzą do urazów lub pojawia się ryzyko zrobienia krzywdy sobie albo komuś, potrzebna może być pilna lub równoległa pomoc, a nie oczekiwanie na termin w gabinecie.'],
    ], firstVisit: 'Warto powiedzieć, jak szybko reakcje narastają i czy zdarza się obawiać o bezpieczeństwo. Od tego zależy, jaka forma pomocy powinna być pierwsza.', links: ['trudnosci-emocjonalne', 'radzenie-sobie-ze-zloscia', 'borderline'], urgent: true,
  },
  {
    group: 6, slug: 'stabilny-obraz-siebie', label: 'Trudności w budowaniu stabilnego obrazu siebie',
    description: 'Na konsultacji można omówić poczucie, że w różnych relacjach trudno rozpoznać własne potrzeby, granice i wybory. Nie oznacza to samo w sobie rozpoznania.',
    intro: 'W jednej relacji łatwo mieć własne zdanie, w innej trudno je nawet nazwać. Po zakończeniu ważnej znajomości może pojawić się pytanie, które wybory były własne, a które wynikały głównie z dopasowania.',
    sections: [
      ['Ciągłość obrazu siebie nie oznacza niezmienności', 'Ludzie inaczej zachowują się w pracy, domu i wśród przyjaciół. Trudność może polegać na tym, że te doświadczenia wydają się nie do pogodzenia lub że przy zmianie otoczenia przestaje być jasne, co jest ważne. To temat szerszy niż niestabilna samoocena, która odnosi się przede wszystkim do zmian w ocenianiu własnej wartości.'],
      ['Mieć miejsce na różne, także sprzeczne doświadczenia', 'W podejściu psychodynamicznym praca może dotyczyć dostrzegania zarówno siły, jak i zależności, albo zarówno bliskości, jak i złości wobec tej samej osoby. Nie chodzi o wybór jednej „prawdziwej” wersji siebie. Jeśli trudności są obecne od dawna i mają duży wpływ na życie, konsultacja może pomóc w rozmowie o dalszym wsparciu, bez przesądzania o diagnozie lub metodzie leczenia.'],
    ], firstVisit: 'Można porównać dwa miejsca lub dwie relacje, w których zupełnie inaczej odpowiada się na pytanie o własne potrzeby.', links: ['niestabilna-samoocena', 'zaburzenia-osobowosci', 'zrozumienie-siebie'],
  },
  {
    group: 7, slug: 'kryzys-w-zwiazku', label: 'Kryzys w związku',
    description: 'Indywidualna konsultacja w kryzysie związku. Można omówić konflikt, niepewność co do przyszłości i własne potrzeby, bez terapii par lub mediacji.',
    intro: 'Rozmowy o związku zaczynają zajmować całe wieczory, a mimo to nie przybliżają do decyzji. Bywa też odwrotnie: ważna sprawa pozostaje nieruszona, bo każda próba rozmowy pogarsza sytuację.',
    sections: [
      ['Kryzys dotyczy obecnego związku i konkretnych decyzji', 'Nowe obowiązki, choroba, różnice w planach albo powracające spory mogą zmieniać sposób, w jaki partnerzy ze sobą rozmawiają. To nie musi być ten sam problem co utrwalone trudności w wielu relacjach. Warto zobaczyć, co zmieniło się teraz oraz jakie granice i warunki są potrzebne, żeby w ogóle móc rozmawiać.'],
      ['Czemu służy rozmowa indywidualna', 'Można przyjrzeć się własnym sprzecznym uczuciom bez obowiązku składania deklaracji o pozostaniu w związku lub rozstaniu. W pracy psychodynamicznej pytanie może dotyczyć tego, czego trudno od partnera potrzebować i jak przeżywa się różnicę zdań. Nie prowadzę terapii par ani mediacji. Jeśli występuje przemoc lub zagrożenie, pierwszeństwo ma bezpieczeństwo, a nie poprawa komunikacji.'],
    ], firstVisit: 'Na spotkanie przychodzi jedna osoba. Dobrym początkiem jest pytanie, co stało się pilne i jakiej decyzji nie trzeba jeszcze podejmować.', links: ['rozstanie-i-rozwod', 'doswiadczenie-przemocy', 'trudnosci-komunikacyjne'],
  },
  {
    group: 7, slug: 'doswiadczenie-zdrady', label: 'Doświadczenie zdrady',
    description: 'Indywidualna konsultacja po doświadczeniu zdrady. Można rozmawiać o zaufaniu, pytaniach i granicach bez nacisku na wybaczenie lub rozstanie.',
    intro: 'Po odkryciu zdrady niektóre wspomnienia zaczynają znaczyć coś innego niż wcześniej. Można chcieć uzyskać szczegóły i zarazem obawiać się, co przyniesie ich poznanie.',
    sections: [
      ['Utrata zaufania po konkretnym wydarzeniu', 'Wątpliwość może dotyczyć nie tylko dalszej relacji, ale też tego, czy można ufać własnej ocenie wcześniejszych wydarzeń. Złość, smutek i potrzeba dystansu nie narzucają jednej decyzji. Znaczenie ma również to, jak druga osoba zachowuje się teraz: czy uznaje konsekwencje swoich działań i czy można bezpiecznie wyznaczyć granice.'],
      ['Nie trzeba na konsultacji rozstrzygać przyszłości związku', 'Można rozróżnić pytania potrzebne do podjęcia decyzji od pytań, które powracają, lecz nie przynoszą większej jasności. W dalszej pracy można rozmawiać o wpływie wydarzenia na zaufanie do siebie i innych. Konsultacja jest indywidualna: nie służy ustalaniu wspólnej wersji wydarzeń ani wywieraniu nacisku na wybaczenie.'],
    ], firstVisit: 'Można powiedzieć tylko tyle o wydarzeniu, ile potrzeba, by omówić aktualne samopoczucie oraz najbliższe decyzje.', links: ['trudnosci-z-zaufaniem', 'kryzys-w-zwiazku'],
  },
  {
    group: 7, slug: 'samotnosc-w-zwiazku', label: 'Samotność w związku',
    description: 'Konsultacja indywidualna, gdy mimo bycia w związku brakuje rozmowy, wsparcia lub poczucia bycia zauważonym. Nie jest to oferta terapii par lub małżeńskiej.',
    intro: 'Można wspólnie prowadzić dom i regularnie spędzać czas razem, a wieczorem nie mieć poczucia, że jest z kim porozmawiać o czymś ważnym. Samotność dotyczy tu jakości więzi, nie po prostu braku kontaktów.',
    sections: [
      ['Jakiego rodzaju kontaktu brakuje w tej relacji?', 'Jednej osobie brakuje zainteresowania tym, jak się czuje, innej rozmowy o planach lub możliwości proszenia o pomoc. Czasem zmiana zaczęła się po chorobie, przeprowadzce albo okresie przeciążenia; czasem potrzeby długo pozostawały niewypowiedziane. Nie każdy dystans da się zmienić samym wysiłkiem jednej osoby.'],
      ['Rozpoznanie potrzeb przed wyborem działania', 'W rozmowie indywidualnej można przyjrzeć się temu, jak przeżywa się prośbę o kontakt i jak reaguje partner. Perspektywa psychodynamiczna może pomóc rozróżnić potrzebę, której trudno udzielić głosu, od powtarzającego się doświadczenia, że głos jest ignorowany. Nie jest to zastępcza terapia par.'],
    ], firstVisit: 'Można opisać konkretną chwilę, w której obecność drugiej osoby nie zmniejszyła samotności, i powiedzieć, jakiego kontaktu wtedy brakowało.', links: ['samotnosc', 'kryzys-w-zwiazku', '/blog/samotnosc/'],
  },
  {
    group: 7, slug: 'podobni-partnerzy', label: 'Powtarzające się wybory podobnych partnerów',
    description: 'Indywidualna konsultacja, gdy kolejne związki zaczynają się podobnie lub prowadzą do znajomych rozczarowań. O tym, co można zauważyć przed zaangażowaniem.',
    intro: 'Na początku kolejna osoba wydaje się zupełnie inna, lecz po pewnym czasie wraca znajome uczucie, że tylko jedna strona zabiega o kontakt. Można przyjrzeć się temu bez założenia, że każdy wybór był pomyłką.',
    sections: [
      ['Podobny partner, początek znajomości czy przebieg związku?', 'Warto porównać to, co przyciągało w pierwszych tygodniach, z momentem, gdy pojawiała się trudność. Podobne zakończenia nie dowodzą, że partnerzy mieli te same cechy. Znaczenie mają również dostępne okazje do poznawania ludzi i to, co faktycznie robiły obie osoby.'],
      ['Czego można się dowiedzieć na konsultacji', 'Można sprawdzić, co było dla danej osoby sygnałem zainteresowania i które różnice stawały się widoczne dopiero później. W podejściu psychodynamicznym można rozważyć, czy pewien sposób angażowania się był znajomy i ułatwiał przewidywanie reakcji. To hipoteza do sprawdzenia, nie wniosek z badań o podobieństwie partnerów. Rozmowa ma charakter indywidualny.'],
    ], firstVisit: 'Nie trzeba sporządzać historii wszystkich związków. Pomocne może być porównanie początków dwóch znajomości i jednego ważnego punktu zwrotnego.', links: ['powtarzajace-sie-trudnosci-w-relacjach', 'budowanie-bliskich-relacji', '/blog/dlaczego-wybieram-podobnych-partnerow/'],
  },
  {
    group: 7, slug: 'budowanie-bliskich-relacji', label: 'Trudności w budowaniu bliskich relacji',
    description: 'Konsultacja indywidualna, gdy można poznawać ludzi, ale trudno pogłębić więź, rozmawiać o wzajemnych potrzebach lub pozostać w kontakcie po konflikcie.',
    intro: 'Pierwsze spotkania mogą przebiegać swobodnie, a mimo to znajomość nie przechodzi w bardziej osobistą relację. Czasem trudno znaleźć sposób na to, żeby mówić również o wątpliwościach i korzystać ze wsparcia.',
    sections: [
      ['Od znajomości do wzajemności', 'Budowanie bliskości może wymagać czegoś więcej niż odwagi, by się odezwać: czasu, wzajemnej dostępności i możliwości powrotu do rozmowy po nieporozumieniu. Warto sprawdzić, czy trudność dotyczy lęku przed odsłonięciem siebie, czy raczej tego, że trudno uzgodnić, czego obie osoby oczekują. Wolniejsze tempo samo w sobie nie świadczy o problemie.'],
      ['Jak można pracować indywidualnie', 'Na konsultacji można spojrzeć na moment, w którym znajomość zaczęła znaczyć więcej, i na sposób, w jaki obie osoby to okazywały. W terapii można przyglądać się dawaniu i przyjmowaniu wsparcia oraz tolerowaniu różnic bez utraty więzi. Nie jest to instrukcja randkowania ani terapia par.'],
    ], firstVisit: 'Można zacząć od sytuacji, w której pojawiła się chęć większej bliskości, lecz nie było jasne, w jaki sposób ją okazać.', links: ['lek-przed-bliskoscia', 'nawiazywanie-kontaktow-spolecznych', 'samotnosc-w-zwiazku'],
  },
  {
    group: 4, slug: 'trudnosci-zwiazane-z-choroba', label: 'Trudności związane z chorobą',
    description: 'Konsultacja psychologiczna, gdy choroba lub leczenie wpływają na samodzielność, relacje i plany. Rozmowa nie zastępuje diagnostyki ani leczenia medycznego.',
    intro: 'Choroba może zmienić to, jak wygląda zwykły dzień: kiedy można wyjść, kto pomaga i ile spraw trzeba uzgadniać z innymi. Nie wszystkie takie zmiany da się przewidzieć na początku leczenia.',
    sections: [
      ['Co zmieniło się w codzienności poza samymi objawami?', 'Można odczuwać ulgę, gdy ktoś przejmuje obowiązki, i zarazem tęsknić za samodzielnością. Niepewność wyników, koszty leczenia i sposób reagowania bliskich mogą dodatkowo obciążać. Rozmowa o tych trudnościach nie oznacza, że chorobę lub dolegliwości uznaje się za psychiczne.'],
      ['Wsparcie obok leczenia medycznego', 'Na konsultacji można zastanowić się, jak prosić o pomoc, zachowując wpływ na decyzje, lub jak rozmawiać o zmianach w pracy. Ważne może być opłakanie tego, co stało się niedostępne, bez wymogu szybkiego zaakceptowania sytuacji. Objawy fizyczne i decyzje o leczeniu wymagają kontaktu z właściwymi specjalistami.'],
    ], firstVisit: 'Nie trzeba przynosić dokumentacji medycznej. Można powiedzieć, jakie ograniczenie lub zmiana jest teraz najtrudniejsza i jakiego wsparcia się potrzebuje.', links: ['kryzys-zyciowy', 'asertywnosc-i-granice'],
  },
  {
    group: 4, slug: 'utrata-pracy-i-zmiany-zawodowe', label: 'Utrata pracy i zmiany zawodowe',
    description: 'Konsultacja po utracie pracy lub zmianie zawodowej. Można porozmawiać o niepewności, utracie roli i decyzjach podejmowanych pod presją czasu.',
    intro: 'Po odejściu z pracy może brakować nie tylko dochodu, lecz także rytmu dnia, kontaktów i miejsca, w którym własny wkład był widoczny. Nawet dobrowolna zmiana może rodzić pytania o własne miejsce w nowym otoczeniu.',
    sections: [
      ['Co jest pilne, a co potrzebuje czasu?', 'Poszukiwanie pracy, formalności i zabezpieczenie środków często mają realne pierwszeństwo. Równocześnie pojawia się potrzeba rozmowy o złości, wstydzie lub utracie pozycji. To inny punkt wyjścia niż przy wypaleniu, gdzie zasadniczym tematem jest przeciążenie podczas trwania pracy.'],
      ['Praca i poczucie własnej wartości', 'Można zbadać, jakie znaczenie miało dla danej osoby bycie w konkretnej roli i co dzieje się z oceną siebie, kiedy tej roli już nie ma. Pomoc psychologiczna nie zastępuje poradnictwa prawnego ani zawodowego. Może pomóc odróżnić wybory wymuszone okolicznościami od tych, które pozostają otwarte.'],
    ], firstVisit: 'Można zacząć od rozróżnienia: jakie decyzje wymagają działania teraz, a jaka część zmiany jest trudna do przyjęcia niezależnie od formalności.', links: ['wypalenie-zawodowe', 'wazne-zmiany-zyciowe'],
  },
  {
    group: 4, slug: 'wazne-zmiany-zyciowe', label: 'Trudności związane z ważnymi zmianami życiowymi',
    description: 'Konsultacja w okresie przeprowadzki, usamodzielnienia lub ważnej zmiany. Można rozmawiać o niepewności także wtedy, gdy zmiana była chciana i planowana.',
    intro: 'Można długo czekać na przeprowadzkę lub samodzielność, a po zmianie tęsknić za dawnym porządkiem. Ambiwalencja nie musi oznaczać, że decyzja była zła.',
    sections: [
      ['Co pozostaje, a na co trzeba znaleźć nowy sposób?', 'W okresie przejścia często zmienia się kilka rzeczy naraz: dostęp do bliskich, sposób dbania o siebie i oczekiwania innych. W odróżnieniu od nagłego kryzysu tematem może być stopniowe odnajdywanie się w nowej roli, także bez wyraźnego momentu załamania.'],
      ['Zrobić miejsce na zysk i koszt tej samej decyzji', 'Na konsultacji można porozmawiać o tym, które elementy dawnego życia nadal mają znaczenie, a które warto zostawić. W ujęciu psychodynamicznym interesujące może być to, czy samodzielna decyzja budzi poczucie winy wobec bliskich. To możliwość, nie założenie; trudność może też wynikać przede wszystkim z braku wsparcia lub nowych obowiązków.'],
    ], firstVisit: 'Można przyjść przed zmianą lub już po niej. Warto powiedzieć, co jest ważne do zachowania mimo nowych okoliczności.', links: ['kryzys-zyciowy', 'zrozumienie-siebie'],
  },
  {
    group: 5, slug: 'powracajace-wspomnienia', label: 'Powracające wspomnienia trudnych wydarzeń',
    description: 'Konsultacja o tym, kiedy wracają trudne wspomnienia i jak wpływają na codzienność. Nie trzeba opowiadać szczegółów ani odtwarzać przebiegu zdarzenia.',
    intro: 'Wspomnienie może pojawić się przy znajomym zapachu, w podobnym miejscu albo bez jasnego związku z tym, co akurat się dzieje. Takie chwile mogą wytrącać z rozmowy lub utrudniać odpoczynek.',
    sections: [
      ['Jak wspomnienie pojawia się w teraźniejszości', 'Znaczenie ma to, czy jest to myśl, sen lub krótkotrwałe poczucie, jakby wydarzenie znowu trwało, i jak długo potem trudno wrócić do czynności. Samo powracanie wspomnienia nie przesądza o PTSD. Jeśli zagrożenie nadal trwa, najpierw trzeba zadbać o bezpieczeństwo i odpowiednią pomoc.'],
      ['Kiedy potrzebna jest inna ocena lub metoda', 'Można zacząć od wpływu wspomnień na sen, relacje i poczucie bezpieczeństwa, bez szczegółowego opisu zdarzenia. Jeśli występują utrwalone lub bardzo nasilone objawy, warto omówić ocenę kliniczną i formy leczenia rekomendowane przy PTSD. Rozmowa w gabinecie nie jest ofertą specjalistycznego leczenia PTSD ani pracy ukierunkowanej na odtwarzanie wydarzenia.'],
    ], firstVisit: 'Wystarczy powiedzieć, co dzieje się obecnie, gdy wraca wspomnienie, i czego potrzeba, by móc bezpiecznie rozmawiać.', links: ['doswiadczenie-przemocy', 'trudne-doswiadczenia-z-dziecinstwa'], sources: [['https://www.nice.org.uk/guidance/ng116', 'NICE: rozpoznawanie i leczenie PTSD']], urgent: true,
  },
  {
    group: 5, slug: 'wczesniejsze-doswiadczenia-a-relacje', label: 'Wpływ wcześniejszych doświadczeń na obecne relacje',
    description: 'Indywidualna konsultacja, gdy dawne doświadczenia wydają się wpływać na to, jak przeżywa się dzisiejszą bliskość, niezgodę lub zależność od innych osób.',
    intro: 'Ktoś prosi o chwilę dla siebie, a odpowiedź brzmi znajomo, jakby była zapowiedzią dłuższego odsunięcia. Mogą się wtedy spotkać dwie różne historie: to, co dzieje się dziś, i to, czego wcześniej można było oczekiwać w podobnej sytuacji.',
    sections: [
      ['Dawne doświadczenie nie musi pochodzić z dzieciństwa', 'Na obecne oczekiwania mogą wpływać również wcześniejsze związki, odejście bliskiej osoby lub wykluczenie w późniejszym okresie. Podobne reakcje nie dowodzą wspólnej przyczyny. Warto uwzględnić to, czy obecny rozmówca zachowuje się inaczej, a jeśli tak, czy jest to dostrzegalne w chwili napięcia.'],
      ['Hipoteza, którą można sprawdzić również w gabinecie', 'Psychodynamicznie można analizować, jak oczekiwanie krytyki, odmowy lub obojętności wpływa na to, co zostaje usłyszane. Jeśli podobne oczekiwanie pojawi się w rozmowie ze mną, można mówić o nim bez rozstrzygania, że pochodzi wyłącznie z przeszłości. Celem jest zauważanie różnic, nie przypisywanie wszystkim obecnym relacjom jednego znaczenia.'],
    ], firstVisit: 'Można wybrać aktualną sytuację, która przywołała znajome odczucie. Nie trzeba na pierwszym spotkaniu wyjaśniać całej przeszłości.', links: ['trudne-doswiadczenia-z-dziecinstwa', 'powtarzajace-sie-trudnosci-w-relacjach', '/blog/czy-przeszlosc-ma-znaczenie/', '/blog/relacja-terapeutyczna-zrodlo-zmiany/'],
  },
  {
    group: 8, slug: 'trudnosci-emocjonalne-mlodziezy', label: 'Trudności emocjonalne młodzieży',
    description: 'Konsultacja dla młodzieży od 15. roku życia, gdy przygnębienie, napięcie lub silne emocje zaczynają utrudniać naukę, odpoczynek lub kontakty z innymi.',
    intro: 'Dla dorosłych zmianą może być to, że młoda osoba rzadziej wychodzi z pokoju. Dla niej ważniejszy może być brak sił po szkole albo obawa przed kolejną trudną rozmową.',
    sections: [
      ['Nie tylko to, co widzą dorośli', 'Ważne jest, od kiedy coś się zmieniło i jak wygląda zwykły dzień z perspektywy nastolatka. Napięcie może dotyczyć spraw w klasie, relacji w domu, zmęczenia albo wykluczenia. Jeden wybuch złości czy gorszy dzień nie przesądzają o potrzebie terapii ani o diagnozie.'],
      ['Na czym może polegać dalsza rozmowa', 'Z młodą osobą można przyglądać się temu, jak rozpoznaje zmianę nastroju, czego potrzebuje i komu może o tym powiedzieć. W gabinecie nie trzeba powtarzać wersji rodzica. Przy nasilonych lub utrzymujących się objawach można omówić także konsultację lekarską lub psychiatryczną. W nagłym zagrożeniu nie należy czekać na spotkanie.'],
    ], firstVisit: 'Na pierwszym spotkaniu warto usłyszeć zarówno to, co niepokoi rodzica, jak i to, co chciałaby zmienić młoda osoba.', links: ['stres-szkolny', 'relacje-z-rowiesnikami'], urgent: true,
  },
  {
    group: 8, slug: 'relacje-z-rowiesnikami', label: 'Trudności w relacjach z rówieśnikami',
    description: 'Konsultacja od 15. roku życia, gdy trudność dotyczy przyjaźni, wykluczenia lub miejsca w grupie. O perspektywie młodej osoby i dostępnej pomocy dorosłych.',
    intro: 'Po zmianie klasy trudno znaleźć dla siebie miejsce, a poza szkołą konflikty mogą ciągnąć się w komunikatorach. Czasem jedna znajomość jest ważna właśnie dlatego, że reszta grupy wydaje się niedostępna.',
    sections: [
      ['Relacje w grupie to więcej niż umiejętność rozmowy', 'Chodzić może o poczucie bycia pomijanym, utratę dotychczasowej przyjaźni albo obawę, że sprzeciw narazi na wyśmianie. Jeśli rówieśnicy krzywdzą lub grożą, potrzebne jest również wsparcie odpowiedzialnych dorosłych, w tym szkoły. Nie należy traktować przemocy jak zadania z poprawy umiejętności społecznych.'],
      ['Jak można spojrzeć na sytuację z gabinetu', 'Można rozmawiać o tym, z kim kontakt jest swobodniejszy i co się zmienia, gdy włącza się większa grupa. Psychoterapia może być miejscem, gdzie młoda osoba sprawdza, czy da się powiedzieć o rozczarowaniu bez natychmiastowej utraty kontaktu. Nie zastępuje to zmiany warunków, jeśli źródłem trudności jest wykluczenie w szkole.'],
    ], firstVisit: 'Można zacząć od jednej znajomości, zmiany w klasie albo sytuacji, w której trudno było się odezwać. Nie trzeba przedstawiać wiadomości czy rozmów z grupy.', links: ['lek-spoleczny', 'samoocena-mlodziezy'],
  },
  {
    group: 8, slug: 'relacje-rodzinne-mlodziezy', label: 'Trudności w relacjach rodzinnych młodzieży',
    description: 'Indywidualna pomoc dla młodzieży od 15. roku życia przy napięciu w domu, konfliktach lub zmianach rodzinnych. To nie oferta terapii rodzinnej ani mediacji.',
    intro: 'Spór w domu może dotyczyć godziny powrotu, ocen lub prywatności, a pod spodem mogą być bardzo różne oczekiwania dotyczące samodzielności i bezpieczeństwa.',
    sections: [
      ['Nie tylko kwestia ustalenia, kto ma rację', 'Trudności mogą nasilać się, gdy w rodzinie zachodzą zmiany, np. po rozstaniu rodziców, przeprowadzce albo pojawieniu się nowych obowiązków. To, co rodzic rozumie jako troskę, młoda osoba może odbierać jako brak możliwości decydowania. Przy przemocy priorytetem jest bezpieczeństwo, a nie nakłanianie do pojednania.'],
      ['Miejsce dla własnej perspektywy', 'Na indywidualnych spotkaniach z nastolatkiem można rozmawiać o tym, co dzieje się w domu i jak wpływa to na inne relacje. W pracy psychodynamicznej można przyjrzeć się temu, jak młoda osoba rozpoznaje swoją potrzebę prywatności, wsparcia lub sprzeciwu. Nie jest to terapia rodzinna ani rozstrzyganie sporów pomiędzy bliskimi.'],
    ], firstVisit: 'Można nazwać temat sporu bez przedstawiania jednej wspólnej wersji wydarzeń. Sposób dalszego udziału rodziców omawiamy indywidualnie.', links: ['dorastanie-i-tozsamosc', 'asertywnosc-i-granice', 'doswiadczenie-przemocy'],
  },
  {
    group: 8, slug: 'dorastanie-i-tozsamosc', label: 'Dorastanie i kształtowanie tożsamości',
    description: 'Konsultacja od 15. roku życia o dorastaniu, przynależności i własnych wyborach. Tożsamość płciowa i orientacja seksualna nie są zaburzeniami.',
    intro: 'Dorastanie może przynieść pytania o to, ile z wcześniejszych planów nadal pasuje i przy kim można mówić o zmianie zdania. Nie na każde z tych pytań trzeba szybko znaleźć odpowiedź.',
    sections: [
      ['Poszukiwanie odpowiedzi nie jest objawem zaburzenia', 'Na wybory młodej osoby wpływają doświadczenia w grupie, więzi rodzinne oraz to, jakie możliwości widzi wokół siebie. Rozmowa może dotyczyć zainteresowań, wartości, przynależności, orientacji seksualnej lub tożsamości płciowej. Jeśli źródłem cierpienia jest dyskryminacja lub obawa przed odrzuceniem, to doświadczenie zasługuje na uwagę, nie na próbę zmiany tożsamości.'],
      ['Rozmowa bez wymagania jednoznacznej deklaracji', 'Psychoterapia może służyć rozumieniu, jak przeżywa się sprzeczne oczekiwania i jak odróżnia własne wybory od presji otoczenia. W gabinecie można zacząć od tego, z kim bezpiecznie o tym rozmawiać. Nie ma obowiązku używania określonej nazwy ani deklarowania swoich planów.'],
    ], firstVisit: 'Jeśli ważniejsze od samego tematu są obawy o sposób prowadzenia rozmowy, można najpierw zapytać o ramy spotkań i granice poufności.', links: ['relacje-rodzinne-mlodziezy', 'relacje-z-rowiesnikami'],
  },
  {
    group: 8, slug: 'samoocena-mlodziezy', label: 'Trudności z poczuciem własnej wartości u młodzieży',
    description: 'Konsultacja od 15. roku życia, gdy oceny, porównania i reakcje rówieśników przesłaniają własne zdanie o sobie. O wpływie szkoły, relacji i oczekiwań.',
    intro: 'Ocena z jednego sprawdzianu, komentarz o wyglądzie lub reakcja grupy mogą zmienić to, jak młoda osoba myśli o sobie przez resztę dnia. Otoczenie może widzieć drobiazg tam, gdzie stawką jest poczucie przynależności.',
    sections: [
      ['Gdzie i wobec kogo trudno czuć się wystarczająco dobrze?', 'W szkole, w internecie i w domu młoda osoba może otrzymywać sprzeczne komunikaty o tym, co daje uznanie. Ważne jest, czy ocena siebie zmienia się w różnych środowiskach i czy jest miejsce na działania, które mają znaczenie niezależnie od wyniku. Nie należy sprowadzać realnego wyśmiewania do braku pewności siebie.'],
      ['Wsparcie, które nie polega na przekonywaniu', 'Na spotkaniach można oddzielać opinię grupy od własnej oceny tego, co się zrobiło, oraz zauważać sposoby odpowiadania na porównania. W pracy psychodynamicznej można pytać, co znaczą szczególnie ważne oceny i jak wpływają na możliwość próbowania nowych rzeczy. Nie trzeba uznawać wszystkich uwag za niesprawiedliwe, by nie oceniać przez nie całej osoby.'],
    ], firstVisit: 'Warto wskazać jedną sytuację, po której trudno było wrócić do zwykłych zajęć. Młoda osoba i rodzic mogą zauważać inne części tej sytuacji.', links: ['niestabilna-samoocena', 'relacje-z-rowiesnikami', 'stres-szkolny'],
  },
];
