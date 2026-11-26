import { paths } from '../lib/site';
import { helpGroups, helpTopics, topicPath } from '../lib/help-topics';

const categoryOrder = [0, 1, 2, 3, 6, 7, 4, 5, 8] as const;

export default function HelpTopicIndex() {
  return <section aria-labelledby="tematy-konsultacji">
    <h2 id="tematy-konsultacji">Tematy konsultacji</h2>
    <nav className="help-topic-jumps" aria-label="Kategorie tematów konsultacji">
      {categoryOrder.map(i => <a key={i} href={`#kategoria-${i + 1}`}>{helpGroups[i]}</a>)}
    </nav>
    <div className="help-topic-grid">
      {categoryOrder.map(i => <div key={i} id={`kategoria-${i + 1}`} className="editorial-card help-topic-card">
        <h3>{helpGroups[i]}</h3>
        {i === 7 && <p>Konsultacje indywidualne, nie terapia par.</p>}
        <ul>{helpTopics.filter(t => t.group === helpGroups[i]).map(t => <li key={t.slug}><a href={topicPath(t.slug)}>{t.label}</a></li>)}</ul>
        {i === 8 && <p><a href={paths.youth}>Jak wygląda konsultacja dla młodzieży?</a></p>}
      </div>)}
    </div>
  </section>;
}
