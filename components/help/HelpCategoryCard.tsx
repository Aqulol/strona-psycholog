import HelpTopicIcon, { type IconName } from './HelpTopicIcon';

export type HelpLink = { href: string; label: string; icon: IconName };
export type HelpCategory = { title: string; icon: IconName; tone: string; topics: HelpLink[] };

export function HelpLinks({ topics }: { topics: HelpLink[] }) {
  return <ul className="help-links" role="list">
    {topics.map(({ href, label, icon }) => <li key={href} data-filter-row="">
      <a href={href}><HelpTopicIcon name={icon}/><span>{label}</span><HelpTopicIcon name="ChevronRight" size={15}/></a>
    </li>)}
  </ul>;
}

export function HelpBadge({ icon, tone }: Pick<HelpCategory, 'icon' | 'tone'>) {
  return <span className="help-badge" data-tone={tone}><HelpTopicIcon name={icon} size={27}/></span>;
}

const descriptions: Record<string,string> = {
 'Nastrój i emocje':'Nastrój, poczucie sensu i przeżywanie silnych uczuć.',
 'Lęk i stres':'Obawy, napięcie oraz przeciążenie w życiu i pracy.',
 'Samoocena i rozumienie siebie':'Obraz siebie, potrzeby i decyzje życiowe.',
 'Relacje z innymi':'Granice, komunikacja, samotność i zaufanie.',
 'Związki i bliskość':'Więź, konflikty, rozstania i powtarzające się wzorce.',
 'Osobowość i tożsamość':'Utrwalone wzorce oraz spójność przeżywania siebie.',
 'Kryzysy i trudne doświadczenia':'Strata, ważne zmiany i skutki trudnych doświadczeń.',
 'Ciało i zdrowie':'Relacja z ciałem i psychologiczny kontekst zdrowia.',
 'Ciąża i rodzicielstwo':'Emocje i relacje związane z rodzicielstwem.',
};

export default function HelpCategoryCard({ category,id }: { category: HelpCategory; id:string }) {
  const { title, topics } = category;
  return <div id={id} className="help-category" data-filter-group={title}>
    <div className="help-category-heading"><HelpBadge {...category}/><h3>{title}</h3></div>
    <p className="help-category-description">{descriptions[title]} <span>· {topics.length} tematów</span></p>
    <HelpLinks topics={topics.slice(0, 4)}/>
    {topics.length > 4 && <details className="help-more">
      <summary><span className="sr-only">{title}: </span><span className="help-more-open">Zobacz wszystkie tematy ({topics.length})</span><span className="help-more-close">Zwiń tematy</span><HelpTopicIcon name="ChevronDown" size={17}/></summary>
      <HelpLinks topics={topics.slice(4)}/>
    </details>}
  </div>;
}
