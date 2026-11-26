import HelpTopicIndex from '../../components/HelpTopicIndex';
import HelpTopicIcon from '../../components/help/HelpTopicIcon';
import { Crumbs, Json, SeeAlso } from '../../components/Site';
import { config } from '../../lib/config';
import { webPage } from '../../lib/entities';
import { pages } from '../../lib/pages';
import { meta, paths } from '../../lib/site';

const page = pages.signs;
export const metadata = meta(paths.signs, page.title, page.description);

export default function Page() {
  return <main id="tresc" className="help-catalogue-page">
    <Json data={webPage(paths.signs, page.h1, page.description)}/>
    <div className="help-width help-crumbs"><Crumbs path={paths.signs} title={page.h1}/></div>
    <div className="help-hero">
      <p className="eyebrow">Konsultacje psychologiczne · Wrocław i online</p>
      <h1>W czym mogę Ci pomóc?</h1>
      <p>Prowadzę konsultacje psychologiczne i psychoterapię indywidualną w nurcie psychodynamicznym dla dorosłych oraz młodzieży od 15. roku życia. <strong>Nie musisz mieć diagnozy</strong>, żeby zgłosić się na konsultację.</p>
    </div>
    <HelpTopicIndex scope={<div className="help-scope-copy">{page.sections[1].slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>}/>
    <div className="help-width help-related"><SeeAlso links={page.related}/></div>
    <section className="help-cta help-width" aria-labelledby="help-cta-heading">
      <p className="eyebrow">Pierwsza konsultacja</p>
      <h2 id="help-cta-heading">Nie wiesz, z czym się zgłosić?</h2>
      <p>Nie musisz mieć gotowej odpowiedzi. Pierwsza konsultacja pozwoli nam wspólnie przyjrzeć się Twoim trudnościom i zastanowić się nad dalszymi krokami.</p>
      <p className="help-cta-note">Pierwsze spotkanie nie zobowiązuje do rozpoczęcia psychoterapii.</p>
      <a className="help-cta-button" href={config.booksyUrl}><HelpTopicIcon name="CalendarDays"/> Umów pierwszą konsultację</a>
      <div className="help-contact">
        <a href={`tel:${config.phone.replace(/\s/g, '')}`}><HelpTopicIcon name="Phone" size={17}/> {config.phone}</a>
        <a href={`mailto:${config.email}`}><HelpTopicIcon name="Mail" size={17}/> {config.email}</a>
      </div>
    </section>
  </main>;
}
