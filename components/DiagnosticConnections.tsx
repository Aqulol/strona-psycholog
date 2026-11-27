import { services } from '../lib/services';

// Intent-specific bridges, not links from isolated symptoms to a booking flow.
const serviceLink = (key:'general'|'personality'|'edu'|'diagnostic', label:string) => <a data-context-link href={services[key].href}>{label}</a>;
const guides = {
  depresja:<>Gdy pytanie dotyczy tego, jak odróżnia się objawy depresyjne od innych trudności, więcej o roli wywiadu wyjaśniam w opisie {serviceLink('general','diagnozy psychologicznej')}.</>,
  'zaburzenia-lekowe':<>O tym, jak klinicznie porównuje się różne wyjaśnienia objawów lękowych, piszę w sekcji o {serviceLink('general','diagnozie różnicowej')}.</>,
  'zaburzenia-osobowosci':<>Proces {serviceLink('personality','diagnozy osobowości')} różni się od opisu pojedynczych cech. Obejmuje m.in. pytania o trwałość wzorca, emocje i relacje.</>,
  borderline:<>Jeśli pytanie dotyczy nie tylko dalszej pomocy, ale też tego, na czym polega kliniczna ocena utrwalonych trudności, zobacz opis {serviceLink('personality','diagnozy osobowości')}.</>,
  narcyzm:<>Zamiast wyciągać wnioski z jednej cechy, w {serviceLink('personality','diagnozie osobowości')} przygląda się utrwalonemu sposobowi przeżywania siebie i innych. Nie można w ten sposób ocenić nieobecnej osoby.</>,
  impulsywnosc:<>O impulsywności wśród innych trudności i o roli historii rozwojowej więcej w artykule o <a data-context-link href="/blog/adhd-u-doroslych/">ADHD u dorosłych</a>. Sama impulsywność nie oznacza ADHD.</>,
  'niska-samoocena':<>Jeżeli celem jest lepsze zrozumienie, jak kształtuje się samoocena, osobno opisuję {serviceLink('edu','indywidualną psychoedukację')}.</>,
  'trudnosci-ze-snem':<>Wpływ snu na uwagę jest jednym z tematów artykułu o <a data-context-link href="/blog/adhd-u-doroslych/">koncentracji i ADHD w dorosłości</a>. Trudności ze snem same w sobie nie wskazują na ADHD.</>,
};
export function DiagnosticConnection({slug}:{slug:string}) {
  const text = guides[slug as keyof typeof guides];
  // A short editorial cross-reference, not part of the article's reading estimate.
  return text ? <p className="diagnostic-note" data-reading-ignore>{text}</p> : null;
}
