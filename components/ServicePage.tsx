import {serviceNotes} from '../lib/service-notes';
import {Crumbs, Questions, SeeAlso} from './Site';
import ExternalFrame from './ExternalFrame';
import ContactForm from './ContactForm';
import {pages} from '../lib/pages';
import {details, faq, paths} from '../lib/site';
import {config} from '../lib/config';

const officePhotos = [
 ['gabinet.webp','Wnętrze gabinetu',1280,1707],['gabinet-fotel.webp','Fotel w gabinecie',1280,1707],['gabinet-detal-1.webp','Detal wnętrza gabinetu',720,960],['gabinet-detal-2.webp','Drugi detal wnętrza gabinetu',1280,1707],
] as const;
export default function ServicePage({kind}:{kind:keyof typeof paths}){
 const page=pages[kind];
 return <main id="tresc" className="reading"><Crumbs path={paths[kind]} title={page.h1}/><p className="eyebrow">Gabinet psychologiczny · Wrocław i online</p><h1>{page.h1}</h1><p className="hero-copy">{page.intro}</p>
 {kind==='about'&&<img src="/images/portret2.webp" width="1280" height="855" loading="lazy" alt="Grzegorz Plebaniak w gabinecie"/>}
 {kind==='signs'&&<ul><li>Napięcie w relacjach albo trudność z bliskością.</li><li>Utrzymujący się lęk, obniżony nastrój lub poczucie pustki.</li><li>Trudność z decyzjami, poczucie wypalenia lub utraty sensu.</li></ul>}
 {[...page.sections,...(serviceNotes[kind]??[])].map(([heading,...paragraphs])=><section key={heading} id={heading==='Superwizja'?'superwizja':undefined}><h2>{heading}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
 {kind==='tfp'&&<section><h2>Źródła i dalsza lektura</h2><ul><li>John F. Clarkin, Frank E. Yeomans, Otto F. Kernberg: <cite>Psychotherapy for Borderline Personality: Focusing on Object Relations</cite>.</li><li>Frank E. Yeomans, John F. Clarkin, Otto F. Kernberg: <cite>Transference-Focused Psychotherapy for Borderline Personality Disorder: A Clinical Guide</cite>.</li></ul></section>}
 {kind==='faq'&&<section><h2>Przed pierwszym spotkaniem</h2><Questions items={faq}/></section>}
 {kind==='office'&&<><section><h2>Adres i mapa</h2><p>{config.address} · <a href="https://centrumrownowagi.com">Centrum Równowagi</a></p><p><a href="https://www.google.com/maps/search/?api=1&query=Zygmunta+Krasi%C5%84skiego+13+Wroc%C5%82aw">Adres w Mapach Google</a></p><p>Po otwarciu mapy jej dostawca otrzyma informacje o połączeniu.</p><ExternalFrame src="https://www.google.com/maps?q=Zygmunta%20Krasi%C5%84skiego%2013%20Wroc%C5%82aw&output=embed" title="Mapa — gabinet przy ul. Zygmunta Krasińskiego 13" label="Pokaż mapę Google"/></section><section><h2>Zdjęcia gabinetu</h2><div className="gallery">{officePhotos.map(([file,alt,w,h])=><img key={file} src={`/images/${file}`} alt={alt} width={w} height={h} loading="lazy"/>)}</div></section></>}
 {kind==='contact'&&<><section><h2>Telefon, e-mail i adres</h2><p><a href="tel:+48693087574">{config.phone}</a><br/><a href={`mailto:${config.email}`}>{config.email}</a></p><p>{config.address}</p><p>Dodatkowo: <a href={config.bookingUrl}>profil ZnanyLekarz</a>.</p><p>{details}</p></section><section><h2>Kalendarz Booksy</h2><p>Po otwarciu kalendarza jego dostawca otrzyma informacje o połączeniu. Bezpośredni link do Booksy znajduje się również w menu.</p><ExternalFrame src={`https://booksy.com/widget/index.html?id=${config.booksyId}&lang=pl&country=pl`} title="Kalendarz konsultacji w Booksy" label="Pokaż kalendarz Booksy" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/></section><section><h2>Formularz kontaktowy</h2><p>Proszę podać tylko dane potrzebne do odpowiedzi i krótko opisać sprawę organizacyjną. Proszę nie podawać informacji o stanie zdrowia ani danych innych osób.</p><div className="mt-5"><ContactForm/></div><noscript><p>Do wysłania formularza potrzebny jest JavaScript. Można skontaktować się e-mailem lub telefonicznie.</p></noscript></section></>}
 <SeeAlso links={page.related}/></main>;
}
