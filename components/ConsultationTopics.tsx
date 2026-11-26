const topics = [
  ['Zdrowie fizyczne i samopoczucie', <>Przewlekły ból i <a href="/w-czym-pomagam/trudnosci-zwiazane-z-choroba/">choroba</a> mogą zmieniać aktywność, sen i relacje. Konsultacja dotycząca ich wpływu na życie nie zastępuje diagnostyki ani leczenia medycznego.</>],
  ['Trudności emocjonalne w okresie okołoporodowym', <>Na konsultacji można omówić trudności z przeżywaniem lęku, obniżonego nastroju lub przeciążenia w ciąży i po porodzie. Nie jest to oferta specjalistycznej opieki okołoporodowej.</>],
  ['Trudności związane z rodzicielstwem', <>Przedmiotem rozmowy mogą być przeciążenie opieką, poczucie winy i trudność w godzeniu własnych potrzeb z potrzebami dziecka. Spotkania mają charakter indywidualny.</>],
  ['Stres mniejszościowy i dyskryminacja', <>Na samopoczucie może wpływać doświadczanie wykluczenia i konieczność przewidywania nieprzychylnych reakcji. Orientacja seksualna i tożsamość płciowa nie są zaburzeniami.</>],
  ['Seksualność i intymność', <>Można zgłosić się z trudnościami dotyczącymi seksualności, bliskości lub rozmowy o własnych potrzebach i granicach. W razie potrzeby podczas konsultacji można omówić, czy przydałaby się także pomoc seksuologiczna lub medyczna.</>],
  ['Trudności związane z odżywianiem', <>Rozmowa może dotyczyć zachowań związanych z jedzeniem także przy rozpoznanym zaburzeniu odżywiania. Nie jest to oferta specjalistycznego leczenia anoreksji ani bulimii. W sytuacji zagrożenia zdrowia pierwszeństwo ma ocena medyczna.</>],
  ['Trudności związane z obrazem ciała', <>Niezadowolenie z wyglądu, wstyd lub unikanie sytuacji, w których ciało jest widoczne, mogą być tematem konsultacji niezależnie od sposobu odżywiania.</>],
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
