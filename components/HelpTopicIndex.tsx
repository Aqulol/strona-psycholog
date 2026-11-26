import { paths } from '../lib/site';
import { helpGroups, helpTopics, topicPath } from '../lib/help-topics';

const categoryOrder = [0, 1, 2, 3, 6, 7, 4, 5, 9, 8] as const;


const orderedSlugs = [
  'depresja poczucie-pustki brak-satysfakcji-z-zycia trudnosci-emocjonalne rozpoznawanie-emocji radzenie-sobie-ze-zloscia intensywne-emocje impulsywnosc nadmierne-poczucie-winy wstyd',
  'zaburzenia-lekowe lek-spoleczny lek-przed-porazka stres wypalenie-zawodowe trudnosci-ze-snem odpoczynek-i-przeciazenie natlok-mysli nadmierne-analizowanie',
  'problemy-w-relacjach samotnosc lek-przed-odrzuceniem lek-przed-bliskoscia trudnosci-z-zaufaniem asertywnosc-i-granice trudnosci-komunikacyjne nawiazywanie-kontaktow-spolecznych powtarzajace-sie-trudnosci-w-relacjach zaleznosc-emocjonalna',
  'niska-samoocena niestabilna-samoocena nadmierny-samokrytycyzm perfekcjonizm nadwrazliwosc-na-krytyke potrzeba-akceptacji poczucie-niewystarczalnosci zrozumienie-siebie trudnosci-w-podejmowaniu-decyzji',
  'kryzys-zyciowy zaloba trudnosci-zwiazane-z-choroba utrata-pracy-i-zmiany-zawodowe wazne-zmiany-zyciowe',
  'trudne-doswiadczenia-z-dziecinstwa dda doswiadczenie-przemocy powracajace-wspomnienia wczesniejsze-doswiadczenia-a-relacje',
  'zaburzenia-osobowosci borderline narcyzm stabilny-obraz-siebie trudnosci-w-okresleniu-tozsamosci',
  'kryzys-w-zwiazku doswiadczenie-zdrady rozstanie-i-rozwod samotnosc-w-zwiazku podobni-partnerzy budowanie-bliskich-relacji',
  'stres-szkolny trudnosci-emocjonalne-mlodziezy relacje-z-rowiesnikami relacje-rodzinne-mlodziezy dorastanie-i-tozsamosc samoocena-mlodziezy',
  'zaburzenia-psychosomatyczne',
].map(group => group.split(' '));

export default function HelpTopicIndex() {
  const categories = categoryOrder.map(i => ({
    title: helpGroups[i],
    note: i === 7 ? 'Konsultacje indywidualne, nie terapia par.' : undefined,
    more: i === 8 ? { href: paths.youth, label: 'Jak wygląda konsultacja dla młodzieży?' } : undefined,
    links: orderedSlugs[i].map(slug => {
      const t = helpTopics.find(topic => topic.slug === slug && topic.group === helpGroups[i]);
      if (!t) throw new Error(`Topic not found in category: ${slug}`);
      return { href: topicPath(t.slug), label: t.label };
    }),
  }));
  return <section aria-labelledby="tematy-konsultacji">
    <h2 id="tematy-konsultacji">Obszary pomocy psychologicznej i psychoterapii</h2>
    <div className="help-topic-grid" id="lista-tematow">
      {categories.map(category => <div key={category.title} className="editorial-card help-topic-card">
        <h3>{category.title}</h3>
        {category.note && <p>{category.note}</p>}
        <ul>{category.links.map(link => <li key={link.href}><a href={link.href}>{link.label}<span aria-hidden="true">↗</span></a></li>)}</ul>
        {category.more && <p><a href={category.more.href}>{category.more.label}</a></p>}
      </div>)}
    </div>
  </section>;
}
