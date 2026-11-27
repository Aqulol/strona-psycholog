import AssessmentPanel from './AssessmentPanel';
import RelatedContent from './RelatedContent';
import { config } from '../lib/config';
import { personId, webPage } from '../lib/entities';
import { editorial, type EditorialKey } from '../lib/service-editorial';
import { assessmentKeys, assessmentTerms, categoryNames, services } from '../lib/services';
import { meta, paths } from '../lib/site';
import { Crumbs, Json, Questions } from './Site';
import { ServiceIcon } from './ServiceCards';

function fields(id:EditorialKey) {
  const text = editorial[id];
  return { ...text, h1:'h1' in text ? text.h1 : services[id].name };
}
export function editorialMetadata(id:EditorialKey) {
  const {title,description} = fields(id);
  return meta(services[id].href,title,description);
}
export default function EditorialServicePage({id}:{id:EditorialKey}) {
  const {href,name,status,category,icon,rate,bookingUrl,audience} = services[id];
  const initialBooking = id === 'individual' ? services.consult.bookingUrl : bookingUrl;
  const {h1,description,intro,sections} = fields(id);
  const entry = editorial[id];
  return <main id="tresc" className="reading service-editorial" data-service-category={category}>
    <Crumbs path={href} title={h1}/>
    <Json data={{...webPage(href,h1,description,status === 'provided' ? name : undefined,rate ?? undefined),...(category !== 'diagnosis' ? {author:{'@id':personId}} : {})}}/>
    <div className="service-masthead"><p className="eyebrow">{status === 'guide' ? 'Przewodnik po konsultacjach' : categoryNames[category]}</p>
    <ServiceIcon name={icon}/><h1>{h1}</h1><p className="hero-copy">{intro}</p>
    <p className="offer-meta">{category === 'diagnosis' ? 'Gabinet prowadzi: ' : 'Opracowanie: '}<a href={paths.about}>{config.name}</a>, psycholog</p></div>
    {status === 'guide' && <div className="diagnostic-note"><p>Materiał informacyjny. Nie jest to osobna pozycja do rezerwacji. Na <a data-context-link href={services.consult.href}>standardowej konsultacji psychologicznej</a> można omówić swoją sytuację i możliwy dalszy krok.</p></div>}
    <AssessmentPanel id={id}/>
    {category === 'diagnosis' && <nav className="page-toc diagnostic-toc" aria-label="Spis treści diagnozy"><ol>{sections.map(([title],index)=><li key={title}><a href={`#etap-${index+1}`}>{title}</a></li>)}</ol></nav>}
    {sections.map(([title,content],index) => <section key={title} id={category==='diagnosis'?`etap-${index+1}`:undefined}><h2>{title}</h2>{content}</section>)}
    {(id === 'general' || id === 'personality') && <section><h2>Jak się przygotować do diagnozy?</h2>
      <p>{id === 'general' ? 'Zapisz jedno pytanie, na które chcesz uzyskać odpowiedź, oraz przykłady trudności: kiedy się zaczęły, gdzie występują i co się wtedy zmieniło.' : 'Przypomnij sobie konkretne sytuacje, które powtarzają się w relacjach lub wpływają na obraz siebie. Pomaga przykład aktualny i taki z wcześniejszego okresu. Nie trzeba samodzielnie dobierać testów ani rozpoznania.'}</p>
    </section>}
    {'faq' in entry && <section><h2>Najczęściej zadawane pytania</h2><Questions items={entry.faq}/></section>}
    <RelatedContent path={href}/>
    {category === 'diagnosis' && <section className="diagnostic-note"><h2>Powiązane ścieżki diagnostyczne</h2><ul>
      {assessmentKeys.filter(key=>key!==id).map(key=><li key={key}><a href={services[key].href}>{services[key].name}</a></li>)}
      <li><a href={services.diagnostic.href}>Czym jest konsultacja diagnostyczna?</a></li>
    </ul></section>}
    <section><h2>{category === 'diagnosis' ? 'Kontakt i konsultacja' : id === 'eduAdhd' ? 'Jak umówić spotkanie?' : 'Informacje praktyczne'}</h2>
      {audience && <p>{audience}.</p>}
      {rate ? <p>Potwierdzona stawka za spotkanie: {rate.price} zł / {rate.duration}. Więcej informacji w <a href="/cennik/">cenniku</a>.</p> : category === 'diagnosis' ? <p>{assessmentTerms} Przed rozpoczęciem oceny można ustalić jej zakres, koszt i formę podsumowania. Jeśli nie wiesz, od czego zacząć, możesz umówić standardową konsultację psychologiczną — nie jest to rezerwacja diagnozy.</p> : null}
      <p>{initialBooking ? <a className="booking" href={initialBooking} rel="noreferrer">{id === 'individual' ? 'Umów konsultację wstępną' : 'Umów konsultację'}</a> : category === 'diagnosis' ? <><a className="booking" href={services.consult.bookingUrl ?? services.consult.href} rel="noreferrer">Umów standardową konsultację</a>{' · '}<a href={paths.contact}>Kontakt w sprawie diagnozy</a></> : <a className="booking" href={paths.contact}>{status === 'guide' ? 'Skontaktuj się z gabinetem' : 'Zapytaj o spotkanie'}</a>}</p>
    </section>
  </main>;
}
