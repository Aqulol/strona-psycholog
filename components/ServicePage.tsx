import GlossaryLink from './GlossaryLink';
import { services } from '../lib/services';
import { contextLinks } from '../lib/context-links';
import { servicePaths } from '../lib/service-paths';
import YouthConsultationTopics from './YouthConsultationTopics';
import {webPage} from '../lib/entities';
import {serviceNotes} from '../lib/service-notes';
import {Booking, Crumbs, Json, Questions, SeeAlso} from './Site';
import ExternalFrame from './ExternalFrame';
import BookingAndContact from './BookingAndContact';
import {pages} from '../lib/pages';
import {details, faq, paths} from '../lib/site';
import {config} from '../lib/config';

import OfficeGallery from './OfficeGallery';

export default function ServicePage({kind}:{kind:Exclude<keyof typeof paths, 'signs'>}){
 const page=pages[kind];
 const service = Object.values(services).find(item => item.href === paths[kind] && item.status === 'provided');
 const prose = <>
   <p className="hero-copy">{page.intro}</p>
   {[...page.sections,...(serviceNotes[kind]??[])].map(([heading,...paragraphs])=><section key={heading} id={heading==='Superwizja'?'superwizja':undefined}><h2>{heading}</h2>{paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}
 </>;
 const [intro, sections] = contextLinks(paths[kind], prose.props.children) as [React.ReactNode, React.ReactNode];
 return <main id="tresc" className="reading practice-editorial" data-practice-page={kind}><Json data={webPage(paths[kind], page.h1, page.description, service?.name, service?.rate ?? undefined)}/><Crumbs path={paths[kind]} title={page.h1}/><p className="eyebrow">Gabinet psychologiczny · Wrocław i online</p><h1>{page.h1}</h1>{intro}
 {kind==='about'&&<img src="/images/portret.webp" width="1280" height="1280" loading="lazy" alt="Portret Grzegorza Plebaniaka"/>}
 {kind==='youth' && <><YouthConsultationTopics/><p>Informacje o wymaganej zgodzie na spotkania, udziale rodziców lub opiekunów oraz granicach poufności wyjaśniam przed rozpoczęciem regularnej współpracy. Pierwszą <a href={paths.consult}>konsultację psychologiczną</a> można potraktować jako miejsce na pytania o dalsze kroki.</p></>}
 {kind==='method' && <p>W <a data-context-link href={services.individual.href}>psychoterapii indywidualnej</a> wykorzystuję <a data-context-link href={paths.tfp}>model skoncentrowany na przeniesieniu (TFP)</a> w ramach <GlossaryLink slug="psychoterapia-psychodynamiczna">nurtu psychodynamicznego</GlossaryLink>. To opis mojego sposobu pracy, nie osobna usługa do wyboru.</p>}
 {kind==='tfp' && <p>TFP wywodzi się z <GlossaryLink slug="relacje-z-obiektem">teorii relacji z obiektem</GlossaryLink> i należy do <a data-context-link href={paths.method}>nurtu psychodynamicznego</a>. Opis modelu nie jest deklaracją stosowania pełnego protokołu u każdej osoby.</p>}
 {kind==='online' && <p>Online odbywa się ta sama <a data-context-link href={services.individual.href}>psychoterapia indywidualna</a> w nurcie psychodynamicznym z wykorzystaniem TFP. O tym, czy forma zdalna jest odpowiednia, rozmawiamy podczas konsultacji.</p>}
 {sections}
 {kind==='faq'&&<section><h2>Przed pierwszym spotkaniem</h2><Questions items={faq}/></section>}
 {kind==='office'&&<><section><h2>Jak trafić do gabinetu?</h2><p>{config.address} · <a href="https://centrumrownowagi.com" rel="noreferrer">Centrum Równowagi</a>. W adresie proszę zwrócić uwagę na oznaczenie „Oficyna”.</p><p><a href={config.mapsLink} rel="noreferrer">Wyznacz trasę do gabinetu w Mapach Google</a>. Jeśli potrzebuje Pan/Pani informacji o wejściu lub dostępności architektonicznej, proszę <a data-context-link href={paths.contact}>skontaktować się przed wizytą</a>.</p><p>Po otwarciu mapy jej dostawca otrzyma informacje o połączeniu.</p><ExternalFrame src={config.mapsUrl} title={`Mapa - gabinet przy ul. ${config.streetAddress}`} label="Pokaż mapę Google"/></section><section><h2>Zdjęcia gabinetu</h2><OfficeGallery/></section></>}
 {kind==='contact'&&<><section><h2>Telefon, e-mail i adres</h2><p><a href="tel:+48693087574">{config.phone}</a><br/><a href={`mailto:${config.email}`}>{config.email}</a></p><p>{config.address}</p><p>Dodatkowo: <a href={config.bookingUrl}>profil ZnanyLekarz</a>.</p><p>{details}</p></section><section><h2>Rezerwacja i wiadomość</h2><BookingAndContact/></section></>}
 {kind==='adults' && <section><h2>Przed pierwszym spotkaniem</h2><p>Może Pan/Pani przeczytać, <a href={paths.consult}>jak wyglądają konsultacje psychologiczne</a>, albo <a href={config.booksyUrl}>sprawdzić terminy w Booksy</a>. Jeśli brakuje odpowiedniego terminu, zapraszam do <a href={paths.contact}>kontaktu</a>.</p><p>Więcej o sposobie pracy opisuję na stronie <a href={paths.method}>psychoterapii psychodynamicznej</a>. Do tematów relacji i emocji wracam także w artykułach o <a href="/blog/samotnosc/">samotności</a> i <a href="/blog/poczucie-wlasnej-wartosci/">poczuciu własnej wartości</a>.</p></section>}
 {kind==='adults' && <p className="mt-6">Nie trzeba przechodzić kryzysu, żeby rozważyć terapię. Przykłady tematów opisuję na stronie <a href={paths.signs}>„W czym pomagam?”</a>.</p>}
 {kind==='adults' && <section><h2>Konsultacje i diagnostyka</h2><p>Poza psychoterapią prowadzę <a data-context-link href={services.consult.href}>konsultacje psychologiczne</a>. Rodzice mogą przeczytać, co warto omówić w <a data-context-link href={services.parents.href}>rozmowie o trudnościach nastolatka</a>. Informacje o <a data-context-link href={services.general.href}>diagnozie psychologicznej</a> oraz <a data-context-link href={services.edu.href}>psychoedukacji</a> opisuję osobno; dostępność konkretnego zakresu i trybu proszę ustalić przed wizytą.</p></section>}
 {kind==='youth' && <section><h2>Inne formy pomocy</h2><p>Punktem wyjścia może być rozmowa o tym, co dzieje się w szkole, domu lub w relacjach. Można też zapytać o <a data-context-link href={services.onlineConsult.href}>konsultację online</a>. Odpowiedni zakres psychoedukacji lub ewentualnej diagnozy należy ustalić osobno; przyjmowanie od 15. roku życia nie oznacza dostępności wszystkich usług diagnostycznych dla młodzieży.</p></section>}
 {kind==='consult' && <>
   <section><h2>Co może być dalszym krokiem?</h2><p>Konsultacja pomaga omówić aktualne trudności, np. <a href="/w-czym-pomagam/stres/">przewlekły stres</a> lub <a href="/w-czym-pomagam/problemy-w-relacjach/">problemy w relacjach</a>. Jeżeli potrzebna jest <a data-context-link href={services.general.href}>pogłębiona ocena diagnostyczna</a> albo bardziej doraźne <a href={servicePaths.counselling}>wsparcie przy konkretnej decyzji</a>, można ustalić, gdzie szukać pomocy. Więcej przykładów zawiera <a href={paths.signs}>katalog obszarów pomocy</a>.</p></section>
   <section><h2>Najczęściej zadawane pytania</h2><Questions items={[
     ['Czy można zgłosić się z wcześniejszym rozpoznaniem?', 'Tak. Warto powiedzieć o wcześniejszej ocenie i o pomocy, z której się obecnie korzysta. Nie trzeba jednak mieć diagnozy, aby umówić rozmowę.'],
     ['Czy pierwsze spotkanie zobowiązuje do kontynuacji?', 'Nie. Pierwsza rozmowa służy poznaniu sytuacji, a dalsze kroki uzgadniamy wspólnie.'],
   ]}/><p><Booking/></p></section>
 </>}
 {kind==='tfp' && <p>Jeśli pytanie dotyczy rozpoznawania utrwalonych wzorców, więcej wyjaśniam w opisie <a data-context-link href={services.personality.href}>diagnozy osobowości</a>. Ocena nie oznacza automatycznie wskazania do TFP.</p>}
 {kind==='online' && <p>Jeśli celem jest najpierw omówienie bieżącej sytuacji bez zobowiązywania się do regularnych spotkań, osobno opisuję <a data-context-link href={services.onlineConsult.href}>konsultacje psychologiczne online</a>.</p>}
 {kind==='method' && <p>Przykłady trudności, o których można porozmawiać przed podjęciem decyzji o terapii, opisuję w sekcji <a href={paths.signs}>„W czym pomagam?”</a>.</p>}
 <SeeAlso links={page.related}/></main>;
}
