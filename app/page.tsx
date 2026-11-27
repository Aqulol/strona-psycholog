import {ArrowUpRight, BookOpen, CalendarDays, Compass, FileDown, FlaskConical, GitFork, GraduationCap, HeartHandshake, LibraryBig, MapPin, MessagesSquare} from 'lucide-react';
import {knowledgeLinks} from '../lib/knowledge';
import {homeFaq, homeTopics} from '../lib/home-content';
import {professionalProfiles} from '../lib/professional-profiles';
import {empathyStudy} from '../lib/research';
import { services } from '../lib/services';
import { HomeServiceCards } from '../components/ServiceCards';
import ReadingTime from '../components/ReadingTime';
import { blogReadingMinutes, latestDatedArticles } from '../lib/blog-content';
import {webPage} from "../lib/entities";
import { heroPortraitSizes, heroPortraitSrcSet, responsiveSrcSet } from '../lib/responsive-images';
import BookingAndContact from '../components/BookingAndContact';
import {Booking, Json, Questions} from '../components/Site';
import {config} from '../lib/config';
import {meta,paths} from '../lib/site';
const homeDescription = 'Grzegorz Plebaniak, psycholog i psychoterapeuta (w trakcie szkolenia). Wrocław: konsultacje, diagnoza psychologiczna, psychoedukacja i psychoterapia.';
export const metadata = meta('/', 'Grzegorz Plebaniak | Gabinet psychologiczny Wrocław', homeDescription);
function More({href,children}:{href:string,children:React.ReactNode}){return <a className="text-link" href={href}>{children}<span aria-hidden="true">↗</span></a>;}
export default function Home(){return <main id="tresc" className="editorial-home">
<Json data={webPage('/', 'Gabinet psychologiczny we Wrocławiu', homeDescription)}/>
<section className="hero-home"><div className="shell hero-grid"><div className="hero-editorial-copy"><p className="eyebrow hero-edition">Grzegorz Plebaniak <span aria-hidden="true"/> Wrocław / online</p><h1>Gabinet psychologiczny <span>we Wrocławiu</span></h1><p className="hero-purpose">Pomoc w lepszym zrozumieniu siebie, własnych emocji i relacji.</p><p className="hero-identity">Psycholog, psychoterapeuta w trakcie szkolenia</p><p className="hero-copy">Prowadzę konsultacje psychologiczne, diagnostykę, psychoedukację oraz psychoterapię indywidualną w nurcie psychodynamicznym z wykorzystaniem TFP. Pracuję z dorosłymi i młodzieżą od 15. roku życia.</p><div className="hero-actions"><Booking/>{' '}<a className="button-secondary" href={paths.about}>Poznaj mnie <ArrowUpRight size={16} aria-hidden="true"/></a></div><p className="hero-practical"><a href="/cennik/">{services.consult.rate?.price} zł / {services.consult.rate?.duration}</a> za konsultację <span aria-hidden="true">·</span> <a href={paths.consult}>Jak wygląda spotkanie?</a></p></div><div className="hero-photo"><img src="/images/responsive/portret-hero-855.webp" srcSet={heroPortraitSrcSet} sizes={heroPortraitSizes} width="855" height="855" alt="Portret Grzegorza Plebaniaka" fetchPriority="high"/></div></div></section>
<div className="trust-band"><ul className="shell" role="list">{[
  {Icon:GraduationCap,label:'Magister psychologii'}, {Icon:BookOpen,label:'Czteroletnie szkolenie psychoterapeutyczne – w trakcie'},
  {Icon:MessagesSquare,label:'Regularna superwizja'}, {Icon:HeartHandshake,label:'Psychoterapia psychodynamiczna z wykorzystaniem TFP'}, {Icon:MapPin,label:'Spotkania we Wrocławiu i online'},
].map(({Icon,label})=><li key={label}><Icon size={17} aria-hidden="true"/>{label}</li>)}</ul></div>

<section className="shell home-block" aria-labelledby="home-uslugi">
  <h2 id="home-uslugi">Oferta gabinetu</h2>
  <p>Dostępne formy pomocy psychologicznej, diagnostyki i psychoterapii.</p>
  <HomeServiceCards/>
</section>

<section className="band" aria-labelledby="home-about">
  <div className="shell home-block home-about">
    <div className="home-about-intro">
      <div><h2 id="home-about">O mnie</h2>
        <p>Jestem psychologiem, absolwentem Uniwersytetu Wrocławskiego, oraz psychoterapeutą w trakcie szkolenia. W swojej pracy pomagam przyjrzeć się emocjom, relacjom, obrazowi siebie i temu, co w życiu się powtarza.</p>
        <p>Pracuję w nurcie psychodynamicznym, wykorzystując podejście skoncentrowane na przeniesieniu (TFP). Swoją pracę poddaję regularnej superwizji.</p>
      </div>
      <img src="/images/responsive/portret-288.webp" srcSet={responsiveSrcSet('portret')} sizes="auto, 144px" alt="Portret Grzegorza Plebaniaka" width="288" height="288" loading="lazy"/>
    </div>
    <ul className="home-facts" role="list">
      <li><GraduationCap aria-hidden="true"/><div><h3>Wykształcenie</h3><p>Magister psychologii, Uniwersytet Wrocławski. Specjalność studiów: psychologia kliniczna i zdrowia dorosłych.</p></div></li>
      <li><BookOpen aria-hidden="true"/><div><h3>Szkolenie psychoterapeutyczne</h3><p>II rok czteroletniego szkolenia w Międzynarodowej Szkole Psychoterapii Psychodynamicznej.</p></div></li>
      <li><MessagesSquare aria-hidden="true"/><div><h3>Superwizja</h3><p>Regularnie omawiam swoją pracę z doświadczonym specjalistą, z zachowaniem poufności.</p></div></li>
      <li><FlaskConical aria-hidden="true"/><div><h3>Działalność naukowa</h3><p>Jestem współautorem badania nad twórczością i empatią u dzieci, opublikowanego w <cite>Thinking Skills and Creativity</cite> ({empathyStudy.year}). <a href={`${paths.about}#publikacje`}>Dane publikacji i lista autorów</a>.</p></div></li>
    </ul>
    <More href={paths.about}>Więcej o moim doświadczeniu</More>
    <div className="home-professional"><h3>Moje profile zawodowe</h3><ul role="list">{professionalProfiles.map(({label,href})=><li key={href}><a href={href} rel="noreferrer">{label} <ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul></div>
  </div>
</section>

<section className="shell home-block" aria-labelledby="tematy-konsultacji">
  <h2 id="tematy-konsultacji">W czym mogę pomóc?</h2>
  <p>Nie musisz mieć diagnozy ani wiedzieć, jak nazwać to, czego doświadczasz.</p>
  <ul className="support-list" role="list">{homeTopics.map(({Icon,title,copy,links})=><li key={title}>
    <Icon size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>{title}</h3><p>{copy}</p>
    <ul className="home-topic-links" role="list">{links.map(({href,label})=><li key={href}><a href={href}>{label}</a></li>)}</ul></div>
  </li>)}</ul>
  <More href={paths.signs}>Zobacz wszystkie obszary pomocy</More>
</section>

<section className="band process-band" aria-labelledby="home-konsultacja">
  <div className="shell home-block">
    <h2 id="home-konsultacja">Jak wygląda współpraca?</h2>
    <ul className="process-grid" role="list">{[
        {Icon:CalendarDays,title:'Rezerwacja wizyty',copy:<>Wybierz dogodny termin konsultacji w <a href={config.booksyUrl} rel="noreferrer">Booksy</a> lub <a href={paths.contact}>skontaktuj się ze mną</a>.</>},
        {Icon:MessagesSquare,title:'Pierwsze spotkanie',copy:'Rozmawiamy o tym, co skłoniło Cię do szukania pomocy, oraz o Twojej aktualnej sytuacji.'},
        {Icon:Compass,title:'Zrozumienie trudności',copy:'Wspólnie przyglądamy się temu, co jest dla Ciebie trudne, czego potrzebujesz i jakiej pomocy oczekujesz.'},
        {Icon:GitFork,title:'Ustalenie dalszych kroków',copy:'Omawiamy możliwe formy pomocy i decydujemy, czy i w jakiej formie kontynuować spotkania.'},
      ].map(({Icon,title,copy})=><li key={title}><Icon size={24} strokeWidth={1.5} aria-hidden="true"/><h3>{title}</h3><p>{copy}</p></li>)}</ul>
    <p>Rozpoczęcie psychoterapii poprzedzają zazwyczaj cztery konsultacje. Pozwalają lepiej zrozumieć zgłaszane trudności i określić cele dalszej pracy. Jeśli wspólnie zdecydujemy się na psychoterapię, ustalamy zasady współpracy i częstotliwość spotkań – zwykle raz lub dwa razy w tygodniu.</p>
    <p>Konsultacja nie zobowiązuje do rozpoczęcia psychoterapii.</p>
    <More href={paths.consult}>Jak przebiegają konsultacje</More>
  </div>
</section>

<section className="shell home-block" aria-labelledby="home-audience">
  <h2 id="home-audience">Z kim pracuję?</h2>
  <div className="home-pair audience-editorial">
    <section><h3>Dorośli</h3><p>Pracuję indywidualnie z osobami dorosłymi. Możemy porozmawiać o bieżącej sytuacji lub o sprawach, które od dawna do Ciebie wracają.</p><More href={paths.adults}>Psychoterapia dorosłych</More></section>
    <section><h3>Młodzież od 15. roku życia</h3><p>Pracuję także z młodzieżą od 15. roku życia. Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców.</p><More href={paths.youth}>Psychoterapia młodzieży</More></section>
  </div>
</section>

<section className="band office-band"><div className="shell home-block home-pair"><div><h2>Gabinet we Wrocławiu</h2><p>{config.address}. Gabinet mieści się w oficynie Centrum Równowagi.</p><p>Możemy też spotkać się <a href={paths.online}>online</a>.</p><div className="home-links"><More href={paths.office}>Mapa i wskazówki dojazdu</More><a href={config.mapsLink} rel="noreferrer">Wyznacz trasę w Mapach Google</a></div></div><div className="office-duet"><img src="/images/responsive/gabinet-detal-1-320.webp" srcSet={responsiveSrcSet('gabinet-detal-1')} sizes="auto, (min-width: 720px) 14vw, 28vw" alt="" width="320" height="427" loading="lazy"/><img className="office-home-photo" src="/images/gabinet.webp" srcSet={responsiveSrcSet('gabinet')} sizes="auto, (min-width: 1352px) 420px, (min-width: 720px) 33vw, 65vw" alt="Wnętrze gabinetu psychoterapii we Wrocławiu" width="1280" height="1707" loading="lazy"/></div></div></section>

<section className="shell home-block" aria-labelledby="home-faq"><h2 id="home-faq">Najczęstsze pytania</h2><Questions items={homeFaq}/><More href={paths.faq}>Więcej pytań i odpowiedzi</More></section>

<section className="shell home-block contact-editorial" aria-labelledby="home-contact">
  <h2 id="home-contact">Kontakt i rezerwacja</h2><p>Wybierz termin w Booksy albo napisz do mnie, jeśli chcesz zapytać o spotkanie.</p>
  <BookingAndContact/><More href={paths.contact}>Skontaktuj się ze mną</More>
</section>

<section className="band journal-band" aria-labelledby="home-knowledge"><div className="shell home-block">
  <h2 id="home-knowledge">Baza wiedzy psychologicznej</h2>
  <ul className="home-facts home-knowledge-grid" role="list">{[
    {Icon:BookOpen,...knowledgeLinks[0],copy:'Teksty o emocjach, relacjach i psychoterapii.'},
    {Icon:LibraryBig,...knowledgeLinks[1],copy:'Wyjaśnienia pojęć z psychologii, diagnozy i psychoterapii.'},
    {Icon:FileDown,...knowledgeLinks[2],copy:'Karty, które możesz wydrukować i wykorzystać do samodzielnej refleksji.'},
  ].map(({Icon,href,name,copy})=><li key={href}><Icon aria-hidden="true"/><div><h3><a href={href}>{name}</a></h3><p>{copy}</p></div></li>)}</ul>
  <section aria-labelledby="home-latest" className="home-latest">
    <h3 id="home-latest">Najnowsze artykuły z datą publikacji</h3>
    <div className="journal-grid">{latestDatedArticles.slice(0,3).map(({slug,title,description})=><article key={slug}><h4><a href={`/blog/${slug}/`}>{title}</a></h4><ReadingTime minutes={blogReadingMinutes(slug)}/><p>{description}</p></article>)}</div>
    <More href="/blog/">Wszystkie artykuły psychologiczne</More>
  </section>
</div></section>
</main>;}
