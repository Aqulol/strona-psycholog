import HelpTopicIcon, { type IconName } from './HelpTopicIcon';

export type HelpLink = { href: string; label: string; icon: IconName };
export type HelpCategory = { title: string; icon: IconName; tone: string; topics: HelpLink[] };

export function HelpLinks({ topics }: { topics: HelpLink[] }) {
  return <ul className="help-links" role="list">
    {topics.map(({ href, label, icon }) => <li key={href}>
      <a href={href}><HelpTopicIcon name={icon}/><span>{label}</span><HelpTopicIcon name="ChevronRight" size={15}/></a>
    </li>)}
  </ul>;
}

export function HelpBadge({ icon, tone }: Pick<HelpCategory, 'icon' | 'tone'>) {
  return <span className="help-badge" data-tone={tone}><HelpTopicIcon name={icon} size={27}/></span>;
}

export default function HelpCategoryCard({ category, searching }: { category: HelpCategory; searching: boolean }) {
  const { title, topics } = category;
  return <div className="help-category">
    <div className="help-category-heading"><HelpBadge {...category}/><h3>{title}</h3></div>
    <HelpLinks topics={searching ? topics : topics.slice(0, 4)}/>
    {!searching && topics.length > 4 && <details className="help-more">
      <summary><span className="sr-only">{title}: </span><span className="help-more-open">Zobacz wszystkie tematy ({topics.length})</span><span className="help-more-close">Zwiń tematy</span><HelpTopicIcon name="ChevronDown" size={17}/></summary>
      <HelpLinks topics={topics.slice(4)}/>
    </details>}
  </div>;
}
