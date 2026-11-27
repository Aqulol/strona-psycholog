import PrivacyPreferences from './PrivacyPreferences';
import LocalSearch from './LocalSearch';
import {knowledgePath,glossaryPath,patientPath,crisisPath} from '../lib/knowledge';
import { navigation } from '../lib/navigation';
import { services } from '../lib/services';
import MainNavigation from './MainNavigation';
import MobileNavigation from './MobileNavigation';
import { servicePaths } from '../lib/service-paths';
import { responsiveSrcSet } from '../lib/responsive-images';
import { config } from '../lib/config';
import { domain, paths } from '../lib/site';
export function Json({data}:{data:object}) {return <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data).replace(/</g,'\\u003c')}}/>;}
export function Booking(){return <a className="booking" href={config.booksyUrl} rel="noreferrer">Umów konsultację <span aria-hidden="true">↗</span></a>;}
export function SiteHeader(){return <header className="site-header"><div className="shell mast">
  <a href="/" className="header-brand"><picture><source media="(max-width: 30rem)" srcSet="/favicon-192.png" width="192" height="192"/><img src="/logo.webp" srcSet={responsiveSrcSet('logo')} sizes="(min-width: 1020px) 224px, (min-width: 610px) 22vw, 134px" width="1434" height="258" alt="Grzegorz Plebaniak – strona główna"/></picture></a>
  <div className="mast-actions"><LocalSearch/><Booking/><MobileNavigation><MainNavigation {...navigation}/></MobileNavigation></div>
  </div><nav className="shell desktop-menu" aria-label="Menu główne"><MainNavigation {...navigation} desktop/></nav></header>;}
export function SiteFooter(){return <footer className="site-footer"><div className="shell">
 <div className="footer-grid"><div><p className="footer-name">Grzegorz Plebaniak</p><p>Psycholog, psychoterapeuta (w trakcie szkolenia)</p><p>{config.address}</p><a href={`tel:${config.phone.replace(/\s/g,'')}`}>{config.phone}</a><br/><a href={`mailto:${config.email}`}>{config.email}</a></div>
 <nav className="footer-menu" aria-label="Informacje dodatkowe"><div><p>Gabinet</p>{' '}<a href={paths.about}>O mnie</a>{' '}<a href={paths.office}>Dojazd i zdjęcia</a>{' '}<a href={paths.contact}>Kontakt</a>{' '}<a href="/cennik/">Cennik</a></div>{' '}<div><p>Pomoc</p>{' '}<a href={paths.consult}>Konsultacje</a>{' '}<a href={services.general.href}>Diagnoza psychologiczna</a>{' '}<a href={services.individual.href}>Psychoterapia indywidualna</a>{' '}<a href={paths.online}>Psychoterapia online</a></div>{' '}<div><p>Czytelnia</p>{' '}<a href={knowledgePath}>Baza wiedzy</a>{' '}<a href={paths.signs}>W czym pomagam?</a>{' '}<a href={glossaryPath}>Słownik</a>{' '}<a href={paths.faq}>FAQ</a></div></nav></div>
 <div className="footer-bottom"><p>Treści mają charakter informacyjny i nie zastępują konsultacji. W nagłym zagrożeniu proszę dzwonić pod <a href="tel:112">112</a>. Całodobowe wsparcie: dla dorosłych <a href="tel:116123">116 123</a>, dla dzieci i młodzieży <a href="tel:116111">116 111</a>.</p><div className="footer-utility"><a href={crisisPath}>Pilna pomoc</a>{' '}<a href="/polityka-prywatnosci/">Polityka prywatności i cookies</a>{' '}<PrivacyPreferences/></div></div>
 </div></footer>;}
export type Related = [string,string];
const serviceParents = Object.fromEntries(Object.values(services).map(service => {
 const therapy = service.category === 'therapy' || service.href === paths.online;
 return [service.href, therapy ? [servicePaths.therapist, 'Psychoterapeuta'] : [servicePaths.psychologist, 'Psycholog']];
}));
export function Crumbs({path,title}:{path:string,title:string}){const items = [['/','Strona główna'],...((path.startsWith('/blog/') || path.startsWith(glossaryPath) || path === patientPath) ? [[knowledgePath,'Baza wiedzy']] : []),...(path.startsWith(glossaryPath) && path !== glossaryPath ? [[glossaryPath,'Słownik psychologiczny']] : []),...(path.startsWith('/blog/') && path !== '/blog/' ? [['/blog/','Blog']] : []),...(path.startsWith('/w-czym-pomagam/') ? [[paths.signs,'W czym pomagam?']] : []),...(serviceParents[path] ? [serviceParents[path]] : []),[path,title]];return <><nav className="crumbs" aria-label="Ścieżka nawigacji"><ol>{items.map(([href,label],i)=><li key={href}>{i===items.length-1?<span aria-current="page">{label}</span>:<a href={href}>{label}</a>}</li>)}</ol></nav><Json data={{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map(([href,name],i)=>({'@type':'ListItem',position:i+1,name,item:domain+href}))}}/></>;}
export function SeeAlso({links}:{links:Related[]}){return <aside className="see-also"><h2>Zobacz także</h2><ul>{links.map(([url,label])=><li key={url}><a href={url}>{label}</a></li>)}</ul><a href={paths.contact}>Dane kontaktowe</a></aside>;}
export function Questions({items}:{items:string[][]}){return <div className="questions">{items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}<Json data={{'@context':'https://schema.org','@type':'FAQPage',mainEntity:items.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))}}/></div>;}
