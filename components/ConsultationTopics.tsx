const topics = [
  ['Zdrowie fizyczne i samopoczucie', <>Pracuję z osobami doświadczającymi trudności psychosomatycznych. Można porozmawiać o tym, jak dolegliwości fizyczne, przewlekły ból lub <a href="/w-czym-pomagam/trudnosci-zwiazane-z-choroba/">choroba wpływają na codzienność</a>. Konsultacja psychologiczna nie zastępuje diagnostyki medycznej. Nie zakładam, że objawy fizyczne mają podłoże psychologiczne.</>],
  ['Trudności związane z ciążą i rodzicielstwem', <>Powodem zgłoszenia może być poczucie, że trudno poradzić sobie z lękiem, przeciążeniem lub innymi emocjami w ciąży, po porodzie, w związku z rodzicielstwem. Tematem spotkania jest to, co w tej sytuacji jest trudne, a nie sam fakt, że nastąpiła zmiana.</>],
  ['Tożsamość, dyskryminacja i stres mniejszościowy', <>Można porozmawiać o odkrywaniu lub akceptowaniu własnej tożsamości oraz o tym, jak dyskryminacja, wykluczenie lub obawa przed nimi wpływają na samopoczucie i relacje. Orientacja seksualna i tożsamość płciowa nie są zaburzeniami.</>],
  ['Seksualność i intymność', <>Można zgłosić się z trudnościami dotyczącymi seksualności, bliskości lub rozmowy o własnych potrzebach i granicach. W razie potrzeby podczas konsultacji można omówić, czy przydałaby się także pomoc seksuologiczna lub medyczna.</>],
  ['Odżywianie i obraz ciała', <>Można porozmawiać o trudnościach związanych z jedzeniem i obrazem ciała, także przy rozpoznanym zaburzeniu odżywiania, np. anoreksji lub bulimii, albo przy powtarzających się napadach objadania się. Na spotkaniu można omówić, jakie wsparcie psychologiczne w tej sytuacji byłoby odpowiednie.</>],
  ['Problemowe używanie alkoholu lub innych substancji', <>Można zgłosić się, gdy używanie alkoholu lub innych substancji budzi niepokój albo zaczyna wpływać na samopoczucie, obowiązki czy relacje.</>],
] as const;

export default function ConsultationTopics() {
  return <section aria-labelledby="obszary-rozmowy">
    <h2 id="obszary-rozmowy">Dodatkowe obszary konsultacji psychologicznych</h2>
    <p>O tych sprawach można porozmawiać podczas konsultacji. Nie oznacza to oferty odrębnego leczenia specjalistycznego.</p>
    <ul className="space-y-4">
      {topics.map(([heading, text]) => <li key={heading}><h3 className="mb-1 text-xl font-semibold text-green">{heading}</h3><p>{text}</p></li>)}
    </ul>
  </section>;
}
