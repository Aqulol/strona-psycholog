import { Brain, Compass, FileSearch, HeartHandshake, MessagesSquare, UserRound } from 'lucide-react';
import { paths } from '../lib/site';
import { servicePaths } from '../lib/service-paths';

export const psychologyCards = [
  { href: paths.consult, title: 'Konsultacja psychologiczna', icon: MessagesSquare, description: 'Pierwsza rozmowa o aktualnych trudnościach i oczekiwaniach. Pomaga ustalić, jaki dalszy krok może odpowiadać sytuacji.' },
  { href: servicePaths.diagnostic, title: 'Konsultacja diagnostyczna', icon: FileSearch, description: 'Na czym polega pogłębione rozpoznawanie trudności i kiedy potrzebna jest formalna diagnoza u odpowiedniego specjalisty.' },
  { href: servicePaths.counselling, title: 'Poradnictwo psychologiczne', icon: Compass, description: 'Czym różni się wsparcie przy konkretnej decyzji lub zmianie życiowej od regularnej psychoterapii.' },
];
export const therapyCards = [
  { href: paths.method, title: 'Psychoterapia psychodynamiczna', icon: Brain, description: 'Praca nad przeżywaniem emocji oraz wzorcami, które powracają w relacjach, również w kontakcie terapeutycznym.' },
  { href: paths.tfp, title: 'Terapia skoncentrowana na przeniesieniu (TFP)', icon: HeartHandshake, description: 'Podejście wywodzące się z psychoterapii psychodynamicznej. W jego ramach szczególną uwagę poświęca się relacji podczas sesji.' },
];
export function ServiceCards({ cards }: { cards: typeof psychologyCards }) {
  return <div className="service-directory-grid">{cards.map(({ href, title, icon: Icon, description }) => <article key={href} className="editorial-card service-directory-card">
    <span className="service-icon"><Icon size={24} aria-hidden="true"/></span>
    <h3>{title}</h3><p>{description}</p>
    <a className="text-link" href={href} aria-label={`Dowiedz się więcej: ${title}`}>Dowiedz się więcej <span aria-hidden="true">↗</span></a>
  </article>)}</div>;
}
export function HomeServiceCards() {
  return <div className="service-directory-grid">
    {[{title:'Psycholog', href:servicePaths.psychologist, icon:UserRound, cards:psychologyCards, description:'Konsultacje psychologiczne są punktem wyjścia do rozmowy o trudnościach i dalszej pomocy. Wyjaśniam także różnicę między poradnictwem a rozpoznawaniem trudności.'}, {title:'Psychoterapeuta', href:servicePaths.therapist, icon:HeartHandshake, cards:therapyCards, description:'Jako psychoterapeuta (w trakcie szkolenia) pracuję wyłącznie psychodynamicznie, także w podejściu TFP. Metody nie trzeba wybierać przed pierwszym spotkaniem.'}].map(({title,href,icon:Icon,cards,description}) => <section className="editorial-card service-directory-card" key={href}>
      <span className="service-icon"><Icon size={24} aria-hidden="true"/></span><h3><a href={href}>{title}</a></h3><p>{description}</p>
      <ul>{cards.map(card => <li key={card.href}><a href={card.href}>{card.title}</a></li>)}</ul>
    </section>)}
  </div>;
}
