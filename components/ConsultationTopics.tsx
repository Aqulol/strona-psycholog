const topics = [
  ['Nastrój i poczucie sensu', <>Utrzymujący się smutek, utrata zainteresowania tym, co dawniej cieszyło, poczucie pustki lub brak satysfakcji z życia. Można też porozmawiać o rozpoznanej depresji lub innym zaburzeniu nastroju oraz o pomocy, z której już się korzysta.</>],
  ['Lęk, stres i przeciążenie', <>Zamartwianie się, przewlekłe napięcie, trudność z odpoczynkiem lub wypalenie. Można zgłosić się zarówno z rozpoznanym zaburzeniem lękowym, jak i wtedy, gdy trudno nazwać obawy, które utrudniają codzienność.</>],
  ['Relacje, bliskość i samotność', <>Konflikty z partnerem, rodziną lub współpracownikami, trudność w zaufaniu i stawianiu granic albo lęk przed odrzuceniem. Więcej piszę o <a href="/blog/samotnosc/">samotności wśród bliskich</a> i <a href="/blog/dlaczego-wybieram-podobnych-partnerow/">powtarzających się wyborach w relacjach</a>.</>],
  ['Kryzysy i zmiany życiowe', <>Choroba, rozwód, żałoba, przeprowadzka czy utrata pracy mogą zmienić codzienne życie. Można też zgłosić się wtedy, gdy trudno podjąć ważną decyzję albo dotychczasowy sposób życia przestał odpowiadać własnym potrzebom.</>],
  ['Poczucie własnej wartości i zrozumienie siebie', <>Surowa ocena siebie, podważanie własnych kompetencji, wrażliwość na krytykę albo trudność w rozpoznaniu własnych potrzeb i reakcji. Nie trzeba przechodzić kryzysu, żeby chcieć lepiej zrozumieć siebie. Więcej o tym w artykule o <a href="/blog/poczucie-wlasnej-wartosci/">poczuciu własnej wartości</a>. Sama wrażliwość na krytykę nie oznacza <a href="/blog/narcyzm-wrazliwy/">narcyzmu wrażliwego</a>.</>],
  ['Silne emocje i długotrwałe trudności', <>Wahania nastroju, trudność w radzeniu sobie ze złością, impulsywne reakcje lub powtarzające się trudności w relacjach. Można też omówić rozpoznanie zaburzenia osobowości, w tym borderline. Same przykłady nie pozwalają postawić diagnozy, a rozpoznanie nie przesądza o wyborze metody terapii.</>],
  ['Doświadczenie przemocy i traumy', <>Doświadczenie przemocy lub traumy może być powodem zgłoszenia się na konsultację. Można porozmawiać o powracających wspomnieniach i uczuciach oraz o ich wpływie na samopoczucie i relacje. Nie trzeba od razu opowiadać szczegółów. Więcej o <a href="/blog/czy-przeszlosc-ma-znaczenie/">znaczeniu wcześniejszych doświadczeń</a> i <a href="/blog/relacja-terapeutyczna-zrodlo-zmiany/">relacji z terapeutą</a> piszę na blogu.</>],
  ['Zdrowie fizyczne i samopoczucie', <>Pracuję z osobami doświadczającymi trudności psychosomatycznych. Można porozmawiać o tym, jak dolegliwości fizyczne, przewlekły ból lub choroba wpływają na emocje i codzienne życie. Konsultacja psychologiczna nie zastępuje diagnostyki medycznej. Nie zakładam, że objawy fizyczne mają podłoże psychologiczne.</>],
  ['Trudności związane z ciążą i rodzicielstwem', <>Powodem zgłoszenia może być poczucie, że trudno poradzić sobie z lękiem, przeciążeniem lub innymi emocjami w ciąży, po porodzie, w związku z rodzicielstwem. Tematem spotkania jest to, co w tej sytuacji jest trudne, a nie sam fakt, że nastąpiła zmiana.</>],
  ['Tożsamość, dyskryminacja i stres mniejszościowy', <>Można porozmawiać o odkrywaniu lub akceptowaniu własnej tożsamości oraz o tym, jak dyskryminacja, wykluczenie lub obawa przed nimi wpływają na samopoczucie i relacje. Orientacja seksualna i tożsamość płciowa nie są zaburzeniami.</>],
  ['Seksualność i intymność', <>Można zgłosić się z trudnościami dotyczącymi seksualności, bliskości lub rozmowy o własnych potrzebach i granicach. W razie potrzeby podczas konsultacji można omówić, czy przydałaby się także pomoc seksuologiczna lub medyczna.</>],
  ['Odżywianie i obraz ciała', <>Można porozmawiać o trudnościach związanych z jedzeniem i obrazem ciała, także przy rozpoznanym zaburzeniu odżywiania, np. anoreksji lub bulimii, albo przy powtarzających się napadach objadania się. Konsultacja pomaga ustalić, czy potrzebna jest równoległa opieka specjalistyczna. Nie zastępuje pilnej oceny medycznej, gdy zdrowie jest zagrożone.</>],
  ['Problemowe używanie alkoholu lub innych substancji', <>Można zgłosić się, gdy używanie alkoholu lub innych substancji budzi niepokój albo zaczyna wpływać na samopoczucie, obowiązki czy relacje. Problemowe używanie nie oznacza automatycznie uzależnienia. Jeśli nie ma jasności, z czym ma się do czynienia, warto ustalić, czy potrzebna jest ocena w poradni leczenia uzależnień. Nie prowadzę terapii uzależnień.</>],
] as const;

export default function ConsultationTopics() {
  return <section aria-labelledby="obszary-rozmowy">
    <h2 id="obszary-rozmowy">O czym można porozmawiać?</h2>
    <details><summary>Pozostałe przykłady oraz dodatkowy kontekst</summary>
    <ul className="space-y-4">
      {topics.map(([heading, text]) => <li key={heading}><h3 className="mb-1 text-xl font-semibold text-green">{heading}</h3><p>{text}</p></li>)}
    </ul></details>
  </section>;
}
