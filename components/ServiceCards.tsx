import { BookOpen, Brain, BrainCircuit, Compass, FileChartColumn, FileSearch, Fingerprint, HeartHandshake, MessagesSquare, Monitor, Network, Route, ScanSearch, Sprout, UserRound, UsersRound, Video, Workflow } from 'lucide-react';
import { paths } from '../lib/site';
import { servicePaths } from '../lib/service-paths';
import { categoryNames, categoryServices, offerPath, services, therapyKeys, type Category, type ServiceKey } from '../lib/services';

const icons = {
  dialogue:MessagesSquare, compass:Compass, fileSearch:FileSearch, analysis:FileChartColumn, profile:Fingerprint,
  brainSearch:ScanSearch, book:BookOpen, brainBook:BrainCircuit, support:HeartHandshake,
  parents:UsersRound, relationships:Workflow, choice:Route, growth:Sprout, brain:Brain,
  network:Network, monitor:Monitor, video:Video,
};
const groupIcons = {support:UserRound, diagnosis:FileSearch, education:BookOpen, therapy:HeartHandshake, online:Monitor};
export const therapyCards = therapyKeys;
export function ServiceIcon({ name }: {name:string}) {
  const Icon = icons[name as keyof typeof icons];
  return <span className="service-icon"><Icon size={24} aria-hidden="true"/>{name === 'brainSearch' && <Brain size={11} aria-hidden="true" className="icon-overlay"/>}{name === 'brainBook' && <BookOpen size={11} aria-hidden="true" className="icon-overlay"/>}</span>;
}
export function ServiceCards({ cards }: { cards: readonly ServiceKey[] }) {
  return <div className="offer-cards">{cards.map(key => {
    const {href,name,icon,description,audience,rate,bookingUrl} = services[key];
    return <article key={href} className="editorial-card service-directory-card">
      <ServiceIcon name={icon}/><h3><a href={href}>{name}</a></h3><p>{description}</p>
      {audience && <p className="offer-meta">{audience}</p>}
      {rate && <p className="offer-meta">{rate.price} zł / {rate.duration}</p>}
      <div className="offer-actions"><a className="text-link" href={href} aria-label={`Szczegóły: ${name}`}>Szczegóły <span aria-hidden="true">↗</span></a>
      <a className="text-link" href={bookingUrl ?? paths.contact} rel={bookingUrl ? 'noreferrer' : undefined}>{bookingUrl ? 'Umów konsultację' : 'Zapytaj o spotkanie'}</a></div>
    </article>;
  })}</div>;
}
export function OfferGroups({categories, compact = false}: {categories:readonly Category[];compact?:boolean}) {
  return <>{categories.map(category => {
    const keys = categoryServices[category].filter(key => services[key].status === 'provided');
    const Icon = groupIcons[category];
    return <section className="offer-section" key={category} id={`oferta-${category}`}>
      <div className="offer-section-title"><span className="service-icon"><Icon size={22} aria-hidden="true"/></span><h2>{categoryNames[category]}</h2></div>
      {category === 'diagnosis' && <p>Trzy odrębne ścieżki oceny. Zakres i sprawy organizacyjne warto ustalić przed umówieniem spotkania.</p>}
      {category === 'education' && <p>Indywidualne spotkania pomagające odnieść wiedzę psychologiczną do codziennych doświadczeń.</p>}
      {category === 'support' && <p>Planowa pomoc w bieżących trudnościach i ustaleniu kolejnego kroku.</p>}
      {compact ? <ul>{keys.map(key => <li key={key}><a href={services[key].href}>{services[key].name}</a></li>)}</ul> : <ServiceCards cards={keys}/>}
    </section>;
  })}</>;
}
const homeGroups = [
  {category:'support', link:services.consult.href, keys:['consult','onlineConsult'], text:'Pierwsza rozmowa o tym, co jest teraz trudne. Można spotkać się w gabinecie lub online.'},
  {category:'diagnosis', link:`${offerPath}#oferta-diagnosis`, keys:['general','personality','adhd'], text:'Pogłębiona ocena objawów i funkcjonowania, nie tylko wykonanie testu.'},
  {category:'education', link:services.edu.href, keys:['edu','eduAdhd'], text:'Indywidualne spotkania poświęcone rozumieniu własnych reakcji i sposobów funkcjonowania.'},
  {category:'therapy', link:servicePaths.therapist, keys:therapyKeys, text:'Regularna indywidualna praca w nurcie psychodynamicznym, również w podejściu TFP.'},
] as const;
export function HomeServiceCards() {
  return <><div className="offer-overview">{homeGroups.map(({category,link,keys,text}) => {
    const Icon = groupIcons[category];
    return <section className="editorial-card service-directory-card" key={category}>
      <span className="service-icon"><Icon size={24} aria-hidden="true"/></span><h3><a href={link}>{categoryNames[category]}</a></h3><p>{text}</p>
      <ul>{keys.filter(key => services[key].href !== link).map(key => <li key={key}><a href={services[key].href}>{services[key].name}</a></li>)}</ul>
    </section>;
  })}</div><p className="offer-home-cta"><a className="booking" href={offerPath}>Zobacz całą ofertę <span aria-hidden="true">↗</span></a></p></>;
}
