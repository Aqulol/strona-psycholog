import { paths } from '../lib/site';
import { helpGroups, helpTopics, topicPath } from '../lib/help-topics';
import HelpTopicFilter from './HelpTopicFilter';

const categoryOrder = [0, 1, 2, 3, 6, 7, 4, 5, 8] as const;
const searchTerms: Record<string, string> = {
  'zaburzenia-lekowe': 'nerwica niepokój zamartwianie',
  'lek-spoleczny': 'fobia społeczna nieśmiałość obawa przed oceną',
  'niska-samoocena': 'samoocena pewność siebie',
  'niestabilna-samoocena': 'poczucie własnej wartości samoocena',
  'samoocena-mlodziezy': 'samoocena pewność siebie nastolatka',
  'trudnosci-ze-snem': 'sen zasypianie bezsenność pobudki',
  'narcyzm': 'narcystyczny uznanie',
  'zaloba': 'śmierć strata bliskiej osoby',
  'dda': 'alkohol alkoholizm w domu',
  'radzenie-sobie-ze-zloscia': 'złość gniew irytacja',
  'powracajace-wspomnienia': 'trudne wspomnienia koszmary',
  'doswiadczenie-przemocy': 'przemoc trauma bezpieczeństwo',
  'rozstanie-i-rozwod': 'rozpad związku separacja',
  'stres-szkolny': 'przeciążenie nauka nastolatek',
};

export default function HelpTopicIndex() {
  const categories = categoryOrder.map(i => ({
    title: helpGroups[i],
    note: i === 7 ? 'Konsultacje indywidualne, nie terapia par.' : undefined,
    more: i === 8 ? { href: paths.youth, label: 'Jak wygląda konsultacja dla młodzieży?' } : undefined,
    links: helpTopics.filter(t => t.group === helpGroups[i]).map(t => ({ href: topicPath(t.slug), label: t.label, terms: searchTerms[t.slug] })),
  }));
  return <section aria-labelledby="tematy-konsultacji">
    <h2 id="tematy-konsultacji">Obszary pomocy psychologicznej i psychoterapii</h2>
    <HelpTopicFilter categories={categories}/>
  </section>;
}
