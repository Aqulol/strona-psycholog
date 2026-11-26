const topics = [
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
    <h2 id="obszary-rozmowy">Inne tematy konsultacji</h2>
    <details><summary>Zobacz dodatkowe przykłady</summary>
    <ul className="space-y-4">
      {topics.map(([heading, text]) => <li key={heading}><h3 className="mb-1 text-xl font-semibold text-green">{heading}</h3><p>{text}</p></li>)}
    </ul></details>
  </section>;
}
