import { consultationGroup, consultationTopics } from '../lib/consultation-topics';
import { topicPath } from '../lib/help-topics';

export default function ConsultationTopics() {
  return <section aria-labelledby="obszary-rozmowy">
    <h2 id="obszary-rozmowy">{consultationGroup}</h2>
    <p>Konsultacje psychologiczne mogą dotyczyć również poniższych zagadnień. W zależności od charakteru trudności mogą stanowić formę wsparcia psychologicznego lub pomóc w określeniu odpowiedniego kierunku dalszej pomocy.</p>
    <div className="editorial-card help-topic-card">
      <ul>{consultationTopics.map(({ slug, label }) => <li key={slug}>
        <a href={topicPath(slug)}>{label}<span aria-hidden="true">↗</span></a>
      </li>)}</ul>
    </div>
    <p>To konsultacje indywidualne, nie oferta odrębnego leczenia specjalistycznego. W razie zagrożenia zdrowia lub życia pierwszeństwo ma pilna pomoc medyczna. Przy podejrzeniu uzależnienia właściwym kierunkiem jest specjalistyczna ocena; przy aktywnym uzależnieniu nie rozpoczynam TFP.</p>
  </section>;
}
