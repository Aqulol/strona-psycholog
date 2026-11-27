export const consultationGroup = 'Dodatkowe obszary konsultacji psychologicznych';

type ConsultationTopic = {
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: [string, string][];
  firstVisit: string;
  links: string[];
  urgent?: boolean;
};

export const consultationTopics: ConsultationTopic[] = [
  {
    slug: 'zdrowie-fizyczne-i-psychiczne',
    label: 'Zdrowie fizyczne i funkcjonowanie psychiczne',
    title: 'Zdrowie fizyczne i funkcjonowanie psychiczne',
    description: 'Jak ból, stres i ograniczenia fizyczne wpływają na samopoczucie oraz relacje? Co może wnieść konsultacja psychologiczna we Wrocławiu lub online?',
    intro: 'Stan zdrowia wpływa na to, jak wygląda dzień, ile mamy swobody i na czyją pomoc możemy liczyć. Z kolei przewlekłe napięcie i sposób reagowania na dolegliwości potrafią zmieniać sen, aktywność i odczuwanie bólu. Jedno nie wyklucza drugiego.',
    sections: [
      ['Stres, ciało i diagnostyka', 'Krótkotrwała mobilizacja organizmu pomaga reagować na wymagania. Gdy napięcie utrzymuje się długo, trudniej się regenerować, a zaburzenia snu i zmęczenie mogą dodatkowo obciążać codzienne funkcjonowanie. W trudnościach psychosomatycznych zwraca się uwagę na związki między stanem ciała a przeżyciami. Nie oznacza to, że objaw jest wymyślony ani że brak wyjaśnienia w dotychczasowych badaniach dowodzi przyczyny psychicznej. Nowe lub nasilające się dolegliwości wymagają oceny lekarskiej.'],
      ['Ból, ograniczenia i poczucie wpływu', 'Przewlekły ból zajmuje uwagę również wtedy, gdy akurat nie jest silny: trudno planować, jeśli nie wiadomo, czy uda się dotrzymać zobowiązań. Rezygnowanie ze spotkań może zmniejszyć obciążenie w danym dniu, ale przy dłuższej izolacji ogranicza też dostęp do wsparcia. Przyjęcie nowych granic sprawności nie oznacza rezygnacji z leczenia. Bywa raczej uznaniem, że potrzebny jest inny podział obowiązków lub inny sposób uczestniczenia w tym, co ważne.'],
      ['Co dolegliwości zmieniają w obrazie siebie?', 'Choroba może ograniczyć pracę, zmienić role w domu i wywołać żal, złość albo lęk o przyszłość. Pomoc bliskich bywa równocześnie potrzebna i trudna do przyjęcia, jeśli niezależność była ważną miarą własnej wartości. W ujęciu psychodynamicznym istotne jest indywidualne znaczenie tych zmian: bezradność jednej osoby może wiązać się z utratą wpływu, a u innej z obawą, że w relacji stanie się ciężarem. Trudność w nazwaniu lub wyrażeniu emocji jest wtedy tematem rozmowy, nie wyjaśnieniem, skąd wzięła się choroba.'],
    ],
    firstVisit: 'Pytam, jak dolegliwości zmieniły codzienne życie, co jest już objęte opieką medyczną i gdzie najbardziej brakuje wsparcia. Jeśli utrzymują się trudności emocjonalne lub relacyjne, po konsultacjach możemy rozważyć psychoterapię jako uzupełnienie, a nie zastępstwo leczenia medycznego.',
    links: ['zaburzenia-psychosomatyczne', 'trudnosci-zwiazane-z-choroba', 'stres'],
  },
  {
    slug: 'trudnosci-okoloporodowe',
    label: 'Trudności emocjonalne w okresie okołoporodowym',
    title: 'Trudności emocjonalne w okresie okołoporodowym',
    description: 'Lęk w ciąży, zmiany nastroju po porodzie i trudności z odnalezieniem się w nowej roli. Kiedy skorzystać z konsultacji, a kiedy potrzebna jest pilna pomoc?',
    intro: 'W ciąży i po narodzinach dziecka obok radości mogą pojawić się obawy przed porodem, smutek, poczucie utraty swobody albo trudność w odnalezieniu się we własnym ciele. Sprzeczne uczucia nie świadczą o braku troski o dziecko.',
    sections: [
      ['Adaptacja, baby blues i depresja to nie to samo', 'Zmęczenie, niepewność i chwile przeciążenia mogą towarzyszyć adaptacji do nowych obowiązków. Baby blues to przemijająca płaczliwość i chwiejność nastroju w pierwszych dniach po porodzie; zwykle ustępuje w ciągu dwóch tygodni. Depresja może pojawić się już w ciąży albo po porodzie. Utrzymujący się smutek, utrata zainteresowań, poczucie beznadziei lub wyraźna trudność w codziennym funkcjonowaniu uzasadniają ocenę kliniczną, bez czekania na upływ dwóch tygodni, jeśli objawy są nasilone. Takiej oceny mogą wymagać także uporczywy lęk i natrętne myśli.'],
      ['Nowa rola, relacja i więź z dzieckiem', 'Więź z dzieckiem może rozwijać się stopniowo. Oczekiwanie, że bliskość musi pojawić się natychmiast, sprzyja poczuciu winy i utrudnia mówienie o trudnościach. Brak snu, powrót do zdrowia po porodzie, nierówny podział opieki czy mało dostępnego wsparcia mają realny wpływ na samopoczucie i relację partnerską. W rozmowie warto odróżnić trudności wynikające z przeciążenia od tego, co dotyczy obrazu własnego ciała, tożsamości i presji, by sprostać wyobrażeniu idealnego macierzyństwa.'],
      ['Własne doświadczenia a wyobrażenie o rodzicielstwie', 'W ujęciu psychodynamicznym nowa rola może przywoływać wspomnienia tego, jak reagowano na potrzeby i złość w rodzinie. Dawna zasada, że o pomoc prosi się tylko w ostateczności, może zderzyć się z obecną potrzebą odpoczynku. To hipoteza o znaczeniu konkretnego doświadczenia, nie wyjaśnienie depresji okołoporodowej ani gotowy opis każdej rodziny.'],
      ['Kiedy nie czekać na konsultację?', 'Nagłe splątanie, urojenia, omamy lub wyraźne pobudzenie po porodzie wymagają natychmiastowej oceny medycznej, między innymi ze względu na możliwość psychozy poporodowej. Przy bezpośrednim zagrożeniu dla matki lub dziecka, zamiarze samobójczym albo zagrożeniu skrzywdzeniem dziecka należy dzwonić pod 112. Nasilone objawy depresyjne lub lękowe wymagają kontaktu z lekarzem lub psychiatrą; o nowych dolegliwościach fizycznych warto poinformować osobę prowadzącą opiekę medyczną.'],
    ],
    firstVisit: 'Konsultacja służy rozpoznaniu, jak zmieniło się funkcjonowanie i jakiego wsparcia potrzeba. Nie prowadzę specjalistycznej opieki ani leczenia zaburzeń okołoporodowych. Dalsza psychoterapia może być rozważana w przypadku utrzymujących się trudności emocjonalnych lub relacyjnych, o ile stan zdrowia i ewentualne leczenie specjalistyczne na to pozwalają.',
    links: ['rodzicielstwo', 'depresja', 'obraz-ciala'], urgent: true,
  },
  {
    slug: 'rodzicielstwo',
    label: 'Trudności związane z rodzicielstwem',
    title: 'Trudności związane z rodzicielstwem',
    description: 'Przeciążenie opieką, poczucie winy i stawianie granic. Na czym polega indywidualna konsultacja psychologiczna dla rodzica we Wrocławiu lub online?',
    intro: 'Można troszczyć się o dziecko i jednocześnie potrzebować czasu bez obowiązków opiekuńczych. Trudność rośnie, gdy brakuje odpoczynku, własne potrzeby stale ustępują innym, a złość lub poczucie winy zaczynają kierować reakcjami w domu.',
    sections: [
      ['Od zmęczenia do wypalenia rodzicielskiego', 'Zmęczenie po trudnym dniu nie jest tym samym co długotrwałe wyczerpanie związane z rolą rodzica. W badaniach wypalenia rodzicielskiego opisuje się też narastający dystans emocjonalny i poczucie, że nie jest się takim rodzicem jak kiedyś. Znaczenie ma nie tylko sposób reagowania na stres, lecz również podział opieki, sytuacja materialna, wymagania pracy i dostęp do wsparcia. Jeśli obniżony nastrój i brak energii obejmują także pozostałe obszary życia, warto rozważyć ocenę pod kątem depresji lub problemów zdrowotnych.'],
      ['Złość, poczucie winy i granice', 'Frustracja może sygnalizować, że potrzeby rodzica od dawna nie mieszczą się w planie dnia. Kiedy złość wydaje się nie do pogodzenia z obrazem dobrego rodzica, łatwo tłumić ją do chwili, w której reakcja staje się gwałtowna. Poczucie winy po konflikcie może pomagać go naprawić, ale jeśli prowadzi do rezygnowania z wszelkich granic, przeciążenie wraca. Ważne jest odróżnienie tego, co się czuje, od sposobu, w jaki się na to uczucie reaguje.'],
      ['Jak wracają wzorce wyniesione z domu?', 'Psychodynamiczne pojęcie uwewnętrznionych reprezentacji oznacza między innymi utrwalone oczekiwania, jak bliska osoba reaguje na sprzeciw lub zależność. Rodzic może odkryć, że samodzielność dziecka odruchowo przeżywa jako odrzucenie albo że własną odmowę odczuwa jako powtórzenie chłodu, którego doświadczał. Takie skojarzenia nie muszą być od razu świadome. Rozumienie ich pomaga odróżniać rzeczywiste potrzeby dziecka od oczekiwań uruchamianych w rodzicu.'],
    ],
    firstVisit: 'Podczas indywidualnej konsultacji rozpoznaję, co podtrzymuje przeciążenie, jak rodzic przeżywa granice i gdzie potrzebuje praktycznego wsparcia. Jeśli powtarzające się reakcje wiążą się z szerszymi trudnościami emocjonalnymi lub relacyjnymi, tematem dalszych konsultacji może być indywidualna psychoterapia. Nie prowadzę terapii rodzinnej, terapii dzieci ani treningu wychowawczego. Jeśli pomocy potrzebuje dziecko lub cała rodzina, warto zwrócić się do odpowiedniego specjalisty.',
    links: ['trudnosci-okoloporodowe', 'nadmierne-poczucie-winy', 'asertywnosc-i-granice'],
  },
  {
    slug: 'stres-mniejszosciowy',
    label: 'Stres mniejszościowy i dyskryminacja',
    title: 'Stres mniejszościowy i dyskryminacja',
    description: 'Jak dyskryminacja, przewidywanie odrzucenia i ukrywanie części tożsamości wpływają na samopoczucie, poczucie przynależności oraz relacje z innymi?',
    intro: 'Stres mniejszościowy to dodatkowe obciążenie związane ze stygmatyzacją i nierównym traktowaniem. Nie wynika z samej tożsamości. Tworzą go między innymi doświadczenia wykluczenia, sposób działania instytucji i konieczność oceniania, w których miejscach można czuć się bezpiecznie.',
    sections: [
      ['Rzeczywiste bariery i przewidywanie odrzucenia', 'Obciążeniem może być zarówno jawna dyskryminacja, jak i powtarzające się sygnały, że trzeba uważać na to, co się o sobie mówi. Doświadczenia te mogą dotyczyć między innymi pochodzenia, wyznania, niepełnosprawności, orientacji seksualnej lub tożsamości płciowej, w różnych warunkach społecznych i kulturowych. Potrzeba ostrożności nie jest błędem myślenia, jeśli ryzyko jest rzeczywiste. Jednocześnie stała gotowość na nieprzychylną reakcję może utrudniać odpoczynek i swobodne budowanie relacji.'],
      ['Ukrywanie, wstyd i przynależność', 'Nieujawnianie części tożsamości może chronić prywatność i bezpieczeństwo. Bywa też męczące, jeśli w każdej rozmowie trzeba sprawdzać, które informacje można podać. Uwewnętrzniona stygmatyzacja oznacza, że krzywdzące społeczne przekonania zaczynają wpływać na ocenę samego siebie. Wstyd lub samotność mogą utrzymywać się nawet w życzliwym otoczeniu; ważnym zasobem bywają relacje, w których nie trzeba się tłumaczyć ani ukrywać.'],
      ['Jak doświadczenia społeczne wpływają na obraz siebie?', 'W ujęciu psychodynamicznym interesuje mnie, jak powtarzające się reakcje innych wpływały na poczucie własnej wartości i na to, czego oczekuje się w bliskich relacjach. Rozróżnienie obecnego zagrożenia od oczekiwań wyniesionych z wcześniejszych doświadczeń nie może polegać na podważaniu relacji o dyskryminacji. Orientacja seksualna i tożsamość płciowa nie są zaburzeniami ani celem leczenia.'],
    ],
    firstVisit: 'Rozmowa może dotyczyć skutków konkretnego zdarzenia, warunków bezpieczeństwa albo poczucia, że doświadczenia odrzucenia utrudniają zaufanie. Dalsza indywidualna psychoterapia jest jedną z opcji, jeśli taki jest cel osoby zgłaszającej się. Nie zastąpi ochrony przed przemocą, wsparcia środowiskowego ani pomocy prawnej, jeśli to one są potrzebne.',
    links: ['doswiadczenie-przemocy', 'samotnosc', 'trudnosci-z-zaufaniem'],
  },
  {
    slug: 'seksualnosc-i-intymnosc',
    label: 'Seksualność i intymność',
    title: 'Seksualność i intymność - konsultacja psychologiczna',
    description: 'Bliskość, wstyd, granice i różnice w potrzebach seksualnych. Kiedy pomocna jest konsultacja psychologiczna, a kiedy warto zwrócić się do specjalisty?',
    intro: 'Trudność w sferze intymnej może dotyczyć nie tylko aktywności seksualnej, ale i poczucia bezpieczeństwa, swobody wyrażania potrzeb oraz możliwości powiedzenia „nie”. Bliskość emocjonalna i seksualna nie zawsze pojawiają się razem.',
    sections: [
      ['Potrzeby, zgoda i zadowolenie z bliskości', 'Różnice w poziomie potrzeb i indywidualne preferencje same w sobie nie oznaczają zaburzenia. Istotne są dobrowolna zgoda, szacunek dla granic i to, czy sytuacja powoduje cierpienie. Trudność w mówieniu o potrzebach może wynikać zarówno z niepewności, czego się chce, jak i z obawy przed naciskiem, wyśmianiem lub utratą relacji. Zastrzeżenia wobec własnego wyglądu mogą odciągać uwagę od doznań i kierować ją na to, jak jest się ocenianym.'],
      ['Ambiwalencja i ochrona przed wstydem', 'Można jednocześnie chcieć bliskości i obawiać się, że odsłonięcie potrzeb narazi na zawstydzenie lub poczucie winy. W języku psychodynamicznym mechanizm obronny to sposób ograniczania kontaktu z uczuciem trudnym do zniesienia, nie świadoma decyzja. Przykładem hipotezy klinicznej jest wycofanie w chwili, gdy kontakt staje się emocjonalnie ważny. Wycofanie może jednak również odzwierciedlać brak zgody albo brak bezpieczeństwa w aktualnej relacji; nie należy z góry przypisywać go dawnym doświadczeniom.'],
      ['Kiedy potrzebna jest ocena specjalistyczna?', 'Ból, nagła zmiana funkcjonowania seksualnego lub podejrzenie działań niepożądanych leków to powody do konsultacji medycznej. Gdy trudności dotyczą funkcjonowania seksualnego i utrzymują się lub powodują cierpienie, pomocna może być konsultacja seksuologiczna. Jeśli problem współwystępuje z nasilonym obniżeniem nastroju, lękiem lub trudnościami związanymi z farmakoterapią, wskazana może być rozmowa z psychiatrą.'],
    ],
    firstVisit: 'Na konsultacji indywidualnej ustalam, czy główną trudnością jest przeżywanie bliskości, wstyd, poczucie winy, czy problem wymagający oceny medycznej lub seksuologicznej. Dalsza psychoterapia może dotyczyć emocji, samooceny i relacji; nie prowadzę diagnostyki ani terapii seksuologicznej ani terapii par.',
    links: ['lek-przed-bliskoscia', 'asertywnosc-i-granice', 'obraz-ciala'],
  },
  {
    slug: 'trudnosci-z-odzywianiem',
    label: 'Trudności związane z odżywianiem',
    title: 'Trudności związane z odżywianiem',
    description: 'Gdy jedzenie wiąże się z napięciem, restrykcjami lub utratą kontroli: co omówić na konsultacji psychologicznej i kiedy potrzebna jest pomoc specjalisty?',
    intro: 'Jedzenie pod wpływem emocji nie musi oznaczać zaburzenia. Sygnałem do poszukania pomocy może być powtarzające się poczucie utraty kontroli, uporczywe ograniczanie jedzenia lub sytuacja, w której myśli o posiłkach i masie ciała pochłaniają znaczną część uwagi.',
    sections: [
      ['Emocje, potrzeby i zasady dotyczące jedzenia', 'Po jedzeniu, które przyniosło chwilową ulgę, może pojawić się wstyd i przekonanie, że trzeba odzyskać kontrolę. Sztywne zasady i samokrytyka utrudniają wtedy rozpoznawanie głodu, sytości oraz tego, czy potrzebny jest posiłek, odpoczynek lub wsparcie. Perfekcjonizm może wzmacniać ocenianie pojedynczego zdarzenia jako całkowitej porażki. To jeden z możliwych przebiegów, nie opis każdej osoby. Znaczenie mogą mieć również stan zdrowia, niedożywienie, warunki życia i presja dotycząca masy ciała.'],
      ['Trudność z jedzeniem a zaburzenie odżywiania', 'Anoreksja (jadłowstręt psychiczny), bulimia i zaburzenie z napadami objadania się to odrębne rozpoznania. W ocenie specjalista uwzględnia wzorce ograniczania jedzenia, napady z poczuciem utraty kontroli, obecność zachowań kompensacyjnych, stan fizyczny oraz wpływ trudności na życie. Pojedyncze zachowanie nie przesądza o rozpoznaniu. Także sama masa ciała ani wygląd nie pozwalają ocenić ryzyka czy wykluczyć zaburzenia.'],
      ['Psychodynamiczne rozumienie funkcji zachowania', 'W rozmowie można ustalać, czy jedzenie lub skupienie na nim daje chwilowe ukojenie, poczucie wpływu albo możliwość odcięcia się od przytłaczających uczuć. Dla innej osoby ważniejszy będzie konflikt wokół autonomii: czy ma prawo rozpoznawać własne potrzeby, kiedy inni komentują jej ciało. Takie hipotezy pomagają zrozumieć doświadczenie osoby, ale nie są uniwersalnymi przyczynami zaburzeń odżywiania ani zamiennikiem oceny stanu fizycznego.'],
      ['Pierwszeństwo oceny medycznej', 'Przy podejrzeniu zaburzenia odżywiania potrzebna jest specjalistyczna ocena. Zależnie od sytuacji leczenie wymaga współpracy zespołu medycznego, specjalisty zdrowia psychicznego i dietetyka z doświadczeniem klinicznym. Omdlenia, znaczne osłabienie lub trudność z przyjmowaniem płynów wymagają pilnej oceny medycznej; w bezpośrednim zagrożeniu zdrowia lub życia należy dzwonić pod 112. Stabilizacja stanu fizycznego ma pierwszeństwo.'],
    ],
    firstVisit: 'Rozmowa może pomóc nazwać trudności związane z jedzeniem oraz określić, gdzie potrzebna jest dalsza ocena. Nie prowadzę specjalistycznego leczenia zaburzeń odżywiania. Psychoterapię innych trudności emocjonalnych lub relacyjnych można rozważyć po ocenie i stabilizacji, jeśli nie koliduje z zalecanym leczeniem.',
    links: ['obraz-ciala', 'perfekcjonizm', 'rozpoznawanie-emocji'], urgent: true,
  },
  {
    slug: 'obraz-ciala',
    label: 'Trudności związane z obrazem ciała',
    title: 'Trudności związane z obrazem ciała',
    description: 'Wstyd związany z wyglądem, porównywanie się i unikanie bliskości. Czym są trudności z obrazem ciała i kiedy warto poszukać konsultacji psychologicznej?',
    intro: 'Obraz ciała obejmuje to, jak postrzega się własne ciało, jakie uczucia budzi jego wygląd i jak bardzo przewidywana ocena innych wpływa na codzienne decyzje. Nie sprowadza się do tego, czy ktoś lubi swój wygląd.',
    sections: [
      ['Kiedy wygląd zaczyna wyznaczać granice życia?', 'Sprawdzanie wyglądu lub porównywanie się z innymi może na krótko uspokajać, ale też skupiać uwagę na kolejnych różnicach. Jeśli poczucie wartości zależy głównie od atrakcyjności, gorszy dzień może prowadzić do rezygnacji ze spotkania, zdjęcia lub bliskości, nawet gdy wcześniej miało się na nie ochotę. Na ocenę ciała wpływają standardy wyglądu, komentarze innych oraz zmiany związane między innymi z wiekiem, ciążą, chorobą i sprawnością. Niezadowolenie z wyglądu samo w sobie nie oznacza zaburzenia.'],
      ['Wstyd i uwewnętrznione spojrzenie innych', 'W ujęciu psychodynamicznym ważne bywa to, czy dawne oceny przyjęło się jako własne. Komentarz dotyczący ciała może być pamiętany nie jako czyjaś opinia, lecz jako reguła określająca, kto zasługuje na uwagę lub bliskość. Warto rozróżnić aktualne doświadczenie bycia ocenianym od sytuacji, w których przewidywanie oceny przejmuje kontrolę nad zachowaniem. Nie oznacza to pomijania rzeczywistej stygmatyzacji ani wymagania, by osoba po prostu „polubiła swoje ciało”.'],
      ['Obraz ciała, odżywianie i dysmorfofobia', 'Trudności z obrazem ciała mogą występować niezależnie od zachowań związanych z jedzeniem. Silne ograniczanie jedzenia lub powtarzające się napady objadania wymagają odrębnej oceny pod kątem zaburzeń odżywiania. W dysmorfofobii (zaburzeniu dysmorficznym ciała) uwaga uporczywie skupia się na dostrzeganej wadzie, niewidocznej lub niewielkiej dla innych, a powtarzające się sprawdzanie, porównywanie lub maskowanie i związane z tym cierpienie ograniczają funkcjonowanie. Takie objawy warto omówić z klinicystą; nie rozpoznaje się zaburzenia na podstawie samego wstydu.'],
    ],
    firstVisit: 'Pytam, kiedy ocena ciała ogranicza aktywność lub relacje oraz czym różni się wstyd związany z wyglądem od trudności z jedzeniem. Jeśli potrzebna jest ocena pod kątem dysmorfofobii lub zaburzenia odżywiania, pierwszym krokiem jest pomoc odpowiedniego specjalisty. Gdy trudność dotyczy głównie obrazu siebie i jego znaczenia w relacjach, można rozważyć dalszą indywidualną psychoterapię.',
    links: ['trudnosci-z-odzywianiem', 'seksualnosc-i-intymnosc', 'nadmierny-samokrytycyzm'],
  },
  {
    slug: 'problemowe-uzywanie-substancji',
    label: 'Problemowe używanie alkoholu lub innych substancji',
    title: 'Problemowe używanie alkoholu lub innych substancji',
    description: 'Kiedy alkohol lub inne substancje zaczynają wpływać na pracę, zdrowie i relacje? Czym różni się konsultacja psychologiczna od oceny w poradni uzależnień?',
    intro: 'Nie każda osoba, która używa alkoholu lub innych substancji, jest uzależniona. Warto zwrócić uwagę na sytuacje, w których używanie budzi niepokój, zaczyna wypierać inne sposoby radzenia sobie albo ma coraz większe konsekwencje dla zdrowia, pracy i bliskich relacji.',
    sections: [
      ['Używanie, szkody i uzależnienie', 'Problemowe używanie to opis sytuacji, w której sposób używania niesie ryzyko szkód lub już wpływa na życie, a nie rozpoznanie kliniczne. W ocenie uzależnienia znaczenie ma między innymi trudność w kontrolowaniu używania, rosnące pierwszeństwo substancji przed innymi sprawami i kontynuowanie mimo szkód. U części osób pojawiają się objawy odstawienne. Rozpoznanie wymaga specjalistycznej oceny, a konsekwencje zdrowotne są możliwe także bez uzależnienia.'],
      ['Ulga, ambiwalencja i wstyd', 'Alkohol lub inna substancja może stać się sposobem tłumienia napięcia, odsuwania dolegliwych uczuć lub ułatwiania kontaktu w sytuacjach społecznych. Nawet gdy koszty są widoczne, trudno zrezygnować z tego, co chwilowo przynosi ulgę. Poczucie winy i wstyd mogą utrudniać ujawnienie konsekwencji bliskim i poszukanie pomocy. Perspektywa psychodynamiczna uwzględnia funkcję, jaką zachowanie pełni w przeżywaniu emocji; nie wyjaśnia uzależnienia przez jeden konflikt czy doświadczenie z dzieciństwa.'],
      ['Co jeszcze wymaga uwzględnienia?', 'Na rozwój i utrzymywanie się uzależnienia wpływają czynniki biologiczne, psychologiczne, społeczne i środowiskowe, w tym działanie substancji, jej dostępność i warunki życia. Używaniu mogą towarzyszyć lęk, obniżony nastrój lub trudności ze snem; sam fakt współwystępowania nie pozwala określić, co było pierwsze. Ocena medyczna lub psychiatryczna pomaga rozróżnić te trudności i ustalić kolejność pomocy.'],
      ['Kiedy zgłosić się do poradni leczenia uzależnień?', 'Przy podejrzeniu uzależnienia odpowiednim kierunkiem jest poradnia leczenia uzależnień. Jeśli występuje ryzyko objawów odstawiennych, zwłaszcza przy zależności od alkoholu lub leków uspokajających, nie należy odstawiać substancji samodzielnie bez oceny medycznej. Drgawki, ciężkie splątanie lub utrata przytomności wymagają natychmiastowej pomocy pod numerem 112.'],
    ],
    firstVisit: 'Konsultacja psychologiczna może pomóc ustalić kierunek dalszej pomocy, ale nie zastępuje specjalistycznej diagnostyki ani leczenia. Nie prowadzę specjalistycznego leczenia uzależnień. Przy aktywnym uzależnieniu pierwszeństwo mają specjalistyczna ocena, leczenie i stabilizacja; na tym etapie nie rozpoczynam psychoterapii w gabinecie. Po stabilizacji można odrębnie omówić ewentualną psychoterapię współwystępujących trudności.',
    links: ['stres', 'depresja', 'rozpoznawanie-emocji'], urgent: true,
  },
];
