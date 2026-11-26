import {webPage} from '../lib/entities';
import {serviceNotes} from '../lib/service-notes';
import {Crumbs, Json, Questions, SeeAlso} from './Site';
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
 {kind==='about'&&<img src="/images/portret2.webp" width="1280" height="855" loading="lazy" alt="Grzegorz Plebaniak w gabinecie"/>}
 {kind==='signs'&&<ul><li>Intensywne emocje, które trudno nazwać, albo wybuchy złości, po których pojawia się wstyd.</li><li>Lęk przed odrzuceniem, unikanie bliskości lub trudność w stawianiu granic.</li><li>Duże wahania samooceny albo surowa ocena siebie po drobnym błędzie.</li><li>Przeciążenie, poczucie pustki albo trudność z odnalezieniem kierunku w życiu.</li></ul>}
 {[...page.sections,...(serviceNotes[kind]??[])].map(([heading,...paragraphs])=><section key={heading} id={heading==='Superwizja'?'superwizja':undefined}><h2>{heading}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
 {kind==='tfp'&&<section><h2>Źródła i dalsza lektura</h2><ul><li>John F. Clarkin, Frank E. Yeomans, Otto F. Kernberg: <cite>Psychotherapy for Borderline Personality: Focusing on Object Relations</cite>.</li><li>Frank E. Yeomans, John F. Clarkin, Otto F. Kernberg: <cite>Transference-Focused Psychotherapy for Borderline Personality Disorder: A Clinical Guide</cite>.</li></ul></section>}
 {kind==='faq'&&<section><h2>Przed pierwszym spotkaniem</h2><Questions items={faq}/></section>}
 {kind==='office'&&<><section><h2>Adres i mapa</h2><p>{config.address} · <a href="https://centrumrownowagi.com">Centrum Równowagi</a></p><p><a href={config.mapsLink}>Adres w Mapach Google</a></p><p>Po otwarciu mapy jej dostawca otrzyma informacje o połączeniu.</p><ExternalFrame src={config.mapsUrl} title={`Mapa - gabinet przy ul. ${config.streetAddress}`} label="Pokaż mapę Google"/></section><section><h2>Zdjęcia gabinetu</h2><div className="gallery">{officePhotos.map(([file,alt,w,h])=><img key={file} src={`/images/${file}`} alt={alt} width={w} height={h} loading="lazy"/>)}</div></section></>}
 {kind==='contact'&&<><section><h2>Telefon, e-mail i adres</h2><p><a href="tel:+48693087574">{config.phone}</a><br/><a href={`mailto:${config.email}`}>{config.email}</a></p><p>{config.address}</p><p>Dodatkowo: <a href={config.bookingUrl}>profil ZnanyLekarz</a>.</p><p>{details}</p></section><section><h2>Rezerwacja i wiadomość</h2><BookingAndContact/></section></>}
 <SeeAlso links={page.related}/></main>;
}
