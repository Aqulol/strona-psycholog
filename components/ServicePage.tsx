import YouthConsultationTopics from './YouthConsultationTopics';
import HelpTopicIndex from './HelpTopicIndex';
import ConsultationTopics from './ConsultationTopics';
import {webPage} from '../lib/entities';
import {serviceNotes} from '../lib/service-notes';
import {Booking, Crumbs, Json, Questions, SeeAlso} from './Site';
import ExternalFrame from './ExternalFrame';
import BookingAndContact from './BookingAndContact';
import {pages} from '../lib/pages';
import {details, faq, paths} from '../lib/site';
import {config} from '../lib/config';

const officePhotos = [
 ['gabinet.webp','Wnętrze gabinetu',1280,1707],['gabinet-fotel.webp','Fotel w gabinecie',1280,1707],['gabinet-detal-1.webp','Detal wnętrza gabinetu',720,960],['gabinet-detal-2.webp','Drugi detal wnętrza gabinetu',1280,1707],
] as const;
export default function ServicePage({kind}:{kind:keyof typeof paths}){
 const page=pages[kind];
 const service = ['method', 'adults', 'youth', 'online', 'consult'].includes(kind) ? page.h1 : undefined;
 return <main id="tresc" className="reading"><Json data={webPage(paths[kind], page.h1, page.description, service)}/><Crumbs path={paths[kind]} title={page.h1}/><p className="eyebrow">Gabinet psychologiczny · Wrocław i online</p><h1>{page.h1}</h1><p className="hero-copy">{page.intro}</p>
 {kind==='about'&&<img src="/images/portret.webp" width="1280" height="1280" loading="lazy" alt="Portret Grzegorza Plebaniaka"/>}
 {kind==='youth' && <YouthConsultationTopics/>}
 {kind==='signs' && <><HelpTopicIndex/><ConsultationTopics/></>}
 {[...page.sections,...(serviceNotes[kind]??[])].map(([heading,...paragraphs])=><section key={heading} id={heading==='Superwizja'?'superwizja':undefined}><h2>{heading}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
 {kind==='faq'&&<section><h2>Przed pierwszym spotkaniem</h2><Questions items={faq}/></section>}
 {kind==='office'&&<><section><h2>Adres i mapa</h2><p>{config.address} · <a href="https://centrumrownowagi.com">Centrum Równowagi</a></p><p><a href={config.mapsLink}>Adres w Mapach Google</a></p><p>Po otwarciu mapy jej dostawca otrzyma informacje o połączeniu.</p><ExternalFrame src={config.mapsUrl} title={`Mapa - gabinet przy ul. ${config.streetAddress}`} label="Pokaż mapę Google"/></section><section><h2>Zdjęcia gabinetu</h2><div className="gallery">{officePhotos.map(([file,alt,w,h])=><img key={file} src={`/images/${file}`} alt={alt} width={w} height={h} loading="lazy"/>)}</div></section></>}
 {kind==='contact'&&<><section><h2>Telefon, e-mail i adres</h2><p><a href="tel:+48693087574">{config.phone}</a><br/><a href={`mailto:${config.email}`}>{config.email}</a></p><p>{config.address}</p><p>Dodatkowo: <a href={config.bookingUrl}>profil ZnanyLekarz</a>.</p><p>{details}</p></section><section><h2>Rezerwacja i wiadomość</h2><BookingAndContact/></section></>}
 {kind==='adults' && <section><h2>Przed pierwszym spotkaniem</h2><p>Może Pan/Pani przeczytać, <a href={paths.consult}>jak wyglądają konsultacje psychologiczne</a>, albo <a href={config.booksyUrl}>sprawdzić terminy w Booksy</a>. Jeśli brakuje odpowiedniego terminu, zapraszam do <a href={paths.contact}>kontaktu</a>.</p><p>Więcej o sposobie pracy opisuję na stronie <a href={paths.method}>psychoterapii psychodynamicznej</a>. Do tematów relacji i emocji wracam także w artykułach o <a href="/blog/samotnosc/">samotności</a> i <a href="/blog/poczucie-wlasnej-wartosci/">poczuciu własnej wartości</a>.</p></section>}
 {kind==='adults' && <p className="mt-6">Nie trzeba przechodzić kryzysu, żeby rozważyć terapię. Przykłady tematów opisuję na stronie <a href={paths.signs}>„W czym pomagam?”</a>.</p>}
 {kind==='consult' && <p className="mt-6">Jeśli ma Pan/Pani wcześniejsze rozpoznanie lub korzysta z innej pomocy, można o tym powiedzieć. Można też zacząć od tego, co jest teraz trudne. Więcej przykładów znajduje się w sekcji <a href={paths.signs}>„W czym pomagam?”</a>.</p>}
 {kind==='method' && <p>Przykłady trudności, o których można porozmawiać przed podjęciem decyzji o terapii, opisuję w sekcji <a href={paths.signs}>„W czym pomagam?”</a>.</p>}
 {kind==='signs' && <>
   <section><h2>Pierwsza konsultacja</h2><p>Rozmawiamy o obecnej sytuacji, oczekiwaniach i możliwych dalszych krokach. Więcej o przebiegu spotkania na stronie <a href={paths.consult}>konsultacji psychologicznych we Wrocławiu i online</a>.</p></section>
   <section><h2>Umów konsultację</h2><p>Termin można wybrać w Booksy. Jeśli nie ma odpowiedniego terminu, można <a href={paths.contact}>skontaktować się telefonicznie lub mailowo</a>.</p><p className="mt-3"><Booking/></p></section>
 </>}
 <SeeAlso links={page.related}/></main>;
}
