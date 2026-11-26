import { paths } from '../lib/site';
import { helpGroups, helpTopics, topicPath } from '../lib/help-topics';

// Catalogue-only taxonomy: the topic pages retain their original data and metadata.
const groups = [
  [helpGroups[0], 'depresja poczucie-pustki brak-satysfakcji-z-zycia trudnosci-emocjonalne rozpoznawanie-emocji radzenie-sobie-ze-zloscia intensywne-emocje impulsywnosc nadmierne-poczucie-winy wstyd'],
  [helpGroups[1], 'zaburzenia-lekowe lek-spoleczny lek-przed-porazka stres wypalenie-zawodowe trudnosci-ze-snem odpoczynek-i-przeciazenie natlok-mysli nadmierne-analizowanie'],
  [helpGroups[2], 'problemy-w-relacjach samotnosc lek-przed-odrzuceniem lek-przed-bliskoscia trudnosci-z-zaufaniem asertywnosc-i-granice trudnosci-komunikacyjne nawiazywanie-kontaktow-spolecznych powtarzajace-sie-trudnosci-w-relacjach zaleznosc-emocjonalna stres-mniejszosciowy'],
  [helpGroups[3], 'niska-samoocena niestabilna-samoocena nadmierny-samokrytycyzm perfekcjonizm nadwrazliwosc-na-krytyke potrzeba-akceptacji poczucie-niewystarczalnosci zrozumienie-siebie trudnosci-w-podejmowaniu-decyzji'],
  [helpGroups[6], 'zaburzenia-osobowosci borderline narcyzm stabilny-obraz-siebie trudnosci-w-okresleniu-tozsamosci'],
  ['Związki, bliskość i seksualność', 'kryzys-w-zwiazku doswiadczenie-zdrady rozstanie-i-rozwod samotnosc-w-zwiazku podobni-partnerzy budowanie-bliskich-relacji seksualnosc-i-intymnosc'],
  [helpGroups[4], 'kryzys-zyciowy zaloba utrata-pracy-i-zmiany-zawodowe wazne-zmiany-zyciowe'],
  [helpGroups[5], 'trudne-doswiadczenia-z-dziecinstwa dda doswiadczenie-przemocy powracajace-wspomnienia wczesniejsze-doswiadczenia-a-relacje'],
  [helpGroups[9], 'zaburzenia-psychosomatyczne trudnosci-zwiazane-z-choroba zdrowie-fizyczne-i-psychiczne'],
  ['Odżywianie i obraz ciała', 'trudnosci-z-odzywianiem obraz-ciala'],
  ['Ciąża i rodzicielstwo', 'trudnosci-okoloporodowe rodzicielstwo'],
  ['Używanie substancji psychoaktywnych', 'problemowe-uzywanie-substancji'],
  [helpGroups[8], 'stres-szkolny trudnosci-emocjonalne-mlodziezy relacje-z-rowiesnikami relacje-rodzinne-mlodziezy dorastanie-i-tozsamosc samoocena-mlodziezy'],
] as const;

const topicsBySlug = new Map(helpTopics.map(topic => [topic.slug, topic]));
const assigned = new Set<string>();
const categories = groups.map(([title, slugs]) => ({
  title,
  links: slugs.split(' ').map(slug => {
    const topic = topicsBySlug.get(slug);
    if (!topic || assigned.has(slug)) throw new Error(`Missing or duplicated catalogue topic: ${slug}`);
    assigned.add(slug);
    return { href: topicPath(slug), label: topic.label };
  }),
}));
if (assigned.size !== helpTopics.length) {
  throw new Error(`Unassigned catalogue topics: ${helpTopics.filter(topic => !assigned.has(topic.slug)).map(topic => topic.slug).join(', ')}`);
}

export default function HelpTopicIndex() {
  return <section aria-labelledby="tematy-konsultacji" className="help-catalogue-section">
    <h2 id="tematy-konsultacji">Obszary pomocy psychologicznej i psychoterapii</h2>
    <div className="help-topic-columns" id="lista-tematow">
      {categories.map(category => <div key={category.title} className="editorial-card help-topic-card">
        <h3>{category.title}</h3>
        <ul role="list">
          {category.links.map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          {category.title === helpGroups[8] && <li><a href={paths.youth}>Jak wygląda konsultacja dla młodzieży?</a></li>}
        </ul>
      </div>)}
    </div>
  </section>;
}
