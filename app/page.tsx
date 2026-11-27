import {ArrowUpRight, AudioLines, CalendarDays, Compass, Fingerprint, GitFork, HeartHandshake, Layers, MessagesSquare, Sprout, Waves, Wind} from 'lucide-react';
import EditorialHeading from '../components/EditorialHeading';
import { services } from '../lib/services';
import { HomeServiceCards } from '../components/ServiceCards';
import ReadingTime from '../components/ReadingTime';
import { blogReadingMinutes } from '../lib/blog-content';
import {featureArticles} from '../lib/feature-articles';
import {webPage} from "../lib/entities";
import { heroPortraitSizes, heroPortraitSrcSet, responsiveSrcSet } from '../lib/responsive-images';
import BookingAndContact from '../components/BookingAndContact';
import {Booking, Json, Questions} from '../components/Site';
import {config, visitRatesText} from '../lib/config';
import {articles,faq,meta,paths} from '../lib/site';
const homeDescription = 'Grzegorz Plebaniak, psycholog i psychoterapeuta (w trakcie szkolenia). Wrocław: konsultacje, diagnoza psychologiczna, psychoedukacja i psychoterapia.';
export const metadata = meta('/', 'Grzegorz Plebaniak | Gabinet psychologiczny Wrocław', homeDescription);
function More({href,children}:{href:string,children:React.ReactNode}){return <a className="text-link" href={href}>{children}<span aria-hidden="true">↗</span></a>;}
export default function Home(){return <main id="tresc" className="editorial-home">
<Json data={webPage('/', 'Gabinet psychologiczny we Wrocławiu', homeDescription)}/>
<section className="hero-home"><div className="shell hero-grid"><div className="hero-editorial-copy"><p className="eyebrow hero-edition">Grzegorz Plebaniak <span aria-hidden="true"/> Wrocław / online</p><h1>Gabinet psychologiczny <span>we Wrocławiu</span></h1><p className="hero-identity">Psycholog, psychoterapeuta (w trakcie szkolenia)</p><p className="hero-copy">Prowadzę konsultacje, diagnostykę psychologiczną, psychoedukację i psychoterapię indywidualną w nurcie psychodynamicznym z wykorzystaniem TFP. Przyjmuję dorosłych i młodzież od 15. roku życia.</p><div className="hero-actions"><Booking/>{' '}<a className="button-secondary" href="/oferta/">Poznaj ofertę <ArrowUpRight size={16} aria-hidden="true"/></a></div><p className="hero-practical"><a href="/cennik/">{services.consult.rate?.price} zł / {services.consult.rate?.duration}</a> za konsultację <span aria-hidden="true">·</span> <a href={paths.consult}>Jak wygląda spotkanie?</a></p></div><div className="hero-photo"><img src="/images/responsive/portret-hero-855.webp" srcSet={heroPortraitSrcSet} sizes={heroPortraitSizes} width="855" height="855" alt="Portret Grzegorza Plebaniaka" fetchPriority="high"/></div></div></section>
<div className="trust-band"><ul className="shell"><li>Magister psychologii</li><li>Szkolenie psychoterapeutyczne</li><li>Praca pod superwizją</li><li>Nurt psychodynamiczny · TFP</li><li>W gabinecie i online</li></ul></div>
<section className="shell home-block" aria-labelledby="home-uslugi"><EditorialHeading label="Oferta" title="Oferta gabinetu" id="home-uslugi"><p>Od rozmowy o aktualnej sytuacji po pogłębioną ocenę lub regularną pracę.</p></EditorialHeading><HomeServiceCards/></section>
<section className="shell home-block" aria-labelledby="tematy-konsultacji">
  <EditorialHeading label="Obszary pomocy" title="W czym mogę pomóc?" id="tematy-konsultacji"/>
  <p className="mb-6">Na konsultacji można porozmawiać o rozpoznaniu, takim jak <a data-context-link href="/w-czym-pomagam/depresja/">depresja</a> czy <a data-context-link href="/w-czym-pomagam/zaburzenia-lekowe/">zaburzenie lękowe</a>, ale też o trudnościach, które nie mają jeszcze nazwy. Powodem do spotkania może być <a data-context-link href="/w-czym-pomagam/samotnosc/">samotność</a>, brak satysfakcji z życia albo chęć lepszego zrozumienia siebie. Nie trzeba mieć diagnozy, żeby się umówić.</p>
  <ul className="support-list" role="list">
    <li><Waves size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Nastrój i poczucie sensu</h3><p>Smutek, obniżony nastrój, utrata zainteresowania tym, co wcześniej cieszyło, poczucie pustki lub braku sensu.</p></div></li>
    <li><Wind size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Lęk, stres i przeciążenie</h3><p>Codzienne napięcie, zamartwianie się, stres w pracy, trudność z odpoczynkiem albo wypalenie.</p></div></li>
    <li><HeartHandshake size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Relacje i samotność</h3><p>Trudności w związku, rodzinie lub pracy, samotność także wśród bliskich, powtarzające się konflikty, lęk przed odrzuceniem albo trudność w zaufaniu i stawianiu granic.</p></div></li>
    <li><Compass size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Kryzysy i zmiany życiowe</h3><p>Rozstanie, rozwód, żałoba, choroba, utrata pracy lub przeprowadzka. Można też porozmawiać o powracających myślach i uczuciach związanych z trudnymi przeżyciami.</p></div></li>
    <li><Fingerprint size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Poczucie własnej wartości i zrozumienie siebie</h3><p>Surowa ocena siebie, wrażliwość na krytykę, poczucie, że nie jest się wystarczająco dobrym, albo trudność w rozpoznawaniu potrzeb i rozumieniu własnych reakcji.</p></div></li>
    <li><Layers size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Długotrwałe trudności w emocjach i relacjach</h3><p>Silne wahania emocji, impulsywne reakcje lub powracające trudności w bliskich relacjach. Można też omówić wcześniejsze rozpoznanie zaburzenia osobowości, na przykład <a data-context-link href="/w-czym-pomagam/borderline/">borderline</a>.</p></div></li>
    <li><AudioLines size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>ADHD i codzienne zadania</h3><p>Uwaga, organizacja i planowanie. <a href={services.eduAdhd.href}>Psychoedukacja ADHD</a>.</p></div></li>
    <li><Sprout size={24} strokeWidth={1.5} aria-hidden="true"/><div><h3>Okres dorastania</h3><p>Emocje, relacje i zmiany w szkole lub w domu. <a href={paths.youth}>Pomoc od 15. roku życia</a>.</p></div></li>
  </ul>
  <p>O uwadze i codziennych zadaniach piszę osobno w artykule o <a data-context-link href="/blog/adhd-u-doroslych/">ADHD w dorosłości</a>.</p>
  <More href={paths.signs}>W czym pomagam?</More>
</section>
<section className="band process-band" aria-labelledby="home-konsultacja">
  <div className="shell home-block">
    <EditorialHeading label="Pierwsza wizyta" title="Od konsultacji do dalszych kroków" id="home-konsultacja"/>
    <ul className="process-grid" role="list">
      {[
        {Icon: CalendarDays, title: 'Rezerwacja', copy: 'Wybierz termin standardowej konsultacji w Booksy lub skontaktuj się z gabinetem.'},
        {Icon: MessagesSquare, title: 'Pierwsza rozmowa', copy: 'Można zacząć od tego, co skłoniło Pana/Panią do szukania pomocy.'},
        {Icon: Compass, title: 'Określenie potrzeb', copy: 'Przyglądamy się temu, co jest ważne i jakiej pomocy warto szukać.'},
        {Icon: GitFork, title: 'Dalsza decyzja', copy: 'Wspólnie omawiamy kolejne kroki. Konsultacja nie zobowiązuje do psychoterapii.'},
      ].map(({Icon, title, copy}) => <li key={title}>
        <Icon size={24} strokeWidth={1.5} aria-hidden="true"/>
        <h3>{title}</h3>
        <p>{copy}</p>
      </li>)}
    </ul>
    <p>Po kontakcie zwykle spotykamy się cztery razy na konsultacjach. Jeśli wspólnie zdecydujemy się na terapię, ustalamy zasady współpracy i rytm jednej lub dwóch sesji w tygodniu.</p><More href={paths.consult}>Jak przebiegają konsultacje</More>
  </div>
</section>
<div className="shell home-block home-pair audience-editorial"><section><h2>Dorośli</h2><p>Pracuję indywidualnie z osobami dorosłymi. Zapraszam zarówno po zmianie życiowej, jak i wtedy, gdy trudności powracają od dawna.</p><More href={paths.adults}>Psychoterapia dorosłych</More></section><section><h2>Młodzież od 15. roku życia</h2><p>Pracuję w tym samym nurcie także z młodzieżą. Na pierwsze spotkanie z osobą niepełnoletnią zapraszam rodzica lub rodziców.</p><More href={paths.youth}>Psychoterapia młodzieży</More></section><section><h2>Superwizja</h2><p>Regularnie omawiam swoją pracę z doświadczonym specjalistą z zachowaniem poufności. Pomaga mi to dbać o jakość i bezpieczeństwo procesu.</p><More href={paths.about+'#superwizja'}>Czym jest superwizja</More></section><section className="home-profile"><img src="/images/responsive/portret-288.webp" alt="" width="288" height="288" loading="lazy"/><h2>O mnie</h2><p>Jestem psychologiem, absolwentem Uniwersytetu Wrocławskiego. Jestem na II roku czteroletniego szkolenia w Międzynarodowej Szkole Psychoterapii Psychodynamicznej.</p><More href={paths.about}>Wykształcenie i szkolenie</More></section></div>
<section className="band office-band"><div className="shell home-block home-pair"><div><p className="eyebrow">Wrocław / online</p><h2>Gabinet i informacje praktyczne</h2><p>Przyjmuję przy ul. {config.address} oraz online. {visitRatesText}</p><More href={paths.office}>Adres, mapa i zdjęcia</More><br/><More href={paths.online}>Spotkania online</More></div><div className="office-duet"><img src="/images/responsive/gabinet-detal-1-320.webp" srcSet={responsiveSrcSet('gabinet-detal-1')} sizes="auto, (min-width: 720px) 14vw, 28vw" alt="" width="320" height="427" loading="lazy"/><img className="office-home-photo" src="/images/gabinet.webp" srcSet={responsiveSrcSet('gabinet')} sizes="auto, (min-width: 1352px) 420px, (min-width: 720px) 33vw, 65vw" alt="Wnętrze gabinetu psychoterapii we Wrocławiu" width="1280" height="1707" loading="lazy"/></div></div></section>
<section className="shell home-block"><h2>Najczęstsze pytania</h2><Questions items={faq.slice(0,3)}/><More href={paths.faq}>Więcej pytań i odpowiedzi</More></section>
<section className="band journal-band"><div className="shell home-block"><EditorialHeading label="Baza wiedzy" title="Ostatnie artykuły"/><div className="journal-grid">{[...featureArticles.map(a=>[a.slug,a.h1]),...articles].slice(0,3).map(([slug,title],i)=><article key={slug}><p className="eyebrow">{i===0?'Wyróżniony artykuł':'Z archiwum'}</p><h3><a href={`/blog/${slug}/`}>{title}</a></h3><ReadingTime minutes={blogReadingMinutes(slug)}/></article>)}</div><div className="hero-actions"><More href="/blog/">Wszystkie artykuły</More>{' '}<More href="/slownik-psychologiczny/">Słownik psychologiczny</More></div></div></section>
<section className="shell home-block contact-editorial"><h2>Kontakt i rezerwacja</h2><p>Terminy konsultacji są dostępne w Booksy. Jeśli nie ma odpowiedniego terminu, zapraszam do kontaktu telefonicznego lub mailowego.</p><BookingAndContact/><More href={paths.contact}>Dane kontaktowe</More></section>
</main>;}
