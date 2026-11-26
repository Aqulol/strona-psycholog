import HelpTopicIndex from '../../components/HelpTopicIndex';
import { Booking, Crumbs, Json, SeeAlso } from '../../components/Site';
import { webPage } from '../../lib/entities';
import { pages } from '../../lib/pages';
import { meta, paths } from '../../lib/site';

const page = pages.signs;
export const metadata = meta(paths.signs, page.title, page.description);

export default function Page() {
  return <main id="tresc" className="help-catalogue-page">
    <Json data={webPage(paths.signs, page.h1, page.description)}/>
    <div className="reading help-catalogue-intro">
      <Crumbs path={paths.signs} title={page.h1}/>
      <p className="eyebrow">Gabinet psychologiczny · Wrocław i online</p>
      <h1>{page.h1}</h1>
      <p className="hero-copy">{page.intro}</p>
    </div>
    <HelpTopicIndex/>
    <div className="reading help-catalogue-details">
      {page.sections.map(([heading, ...paragraphs]) => <section key={heading}>
        <h2>{heading}</h2>
        {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </section>)}
      <section><h2>Pierwsza konsultacja</h2><p>Rozmawiamy o obecnej sytuacji, oczekiwaniach i możliwych dalszych krokach. Więcej o przebiegu spotkania na stronie <a href={paths.consult}>konsultacji psychologicznych we Wrocławiu i online</a>.</p></section>
      <section><h2>Umów konsultację</h2><p>Termin można wybrać w Booksy. Jeśli nie ma odpowiedniego terminu, można <a href={paths.contact}>skontaktować się telefonicznie lub mailowo</a>.</p><p className="mt-3"><Booking/></p></section>
      <SeeAlso links={page.related}/>
    </div>
  </main>;
}
