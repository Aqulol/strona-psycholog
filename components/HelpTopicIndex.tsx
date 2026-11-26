import { paths } from '../lib/site';
import { youthConsultationTopics } from './YouthConsultationTopics';
import { helpGroups, helpTopics, topicPath } from '../lib/help-topics';

export default function HelpTopicIndex() {
  return <section aria-labelledby="tematy-konsultacji">
    <h2 id="tematy-konsultacji">Tematy konsultacji</h2>
    <div className="help-topic-grid">
      {helpGroups.map(group => <div key={group} className="editorial-card help-topic-card">
        <h3>{group}</h3>
        <ul>{helpTopics.filter(t => t.group === group).map(t => <li key={t.slug}><a href={topicPath(t.slug)}>{t.label}</a></li>)}</ul>
      </div>)}
      <div className="editorial-card help-topic-card">
        <h3>Młodzież od 15. roku życia</h3>
        <p>O tych tematach i przebiegu pierwszego spotkania piszę na stronie dla młodzieży.</p>
        <ul>{youthConsultationTopics.map(t => <li key={t.id}><a href={`${paths.youth}#${t.id}`}>{t.title}</a></li>)}</ul>
      </div>
    </div>
  </section>;
}
