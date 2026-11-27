import { OfferGroups } from '../../components/ServiceCards';
import { Crumbs, Json } from '../../components/Site';
import { webPage } from '../../lib/entities';
import { categoryNames, offerPath, services } from '../../lib/services';
import { meta, paths } from '../../lib/site';

const title = 'Oferta gabinetu psychologicznego i psychoterapeutycznego';
const description = 'Oferta gabinetu we Wrocławiu: konsultacje psychologiczne, trzy obszary diagnozy, psychoedukacja i psychoterapia. Sprawdź formy spotkań dostępne online.';
export const metadata = meta(offerPath,'Oferta gabinetu psychologicznego we Wrocławiu',description);
export default function OfferPage() {
  return <main id="tresc" className="shell reading offer-shell">
    <Crumbs path={offerPath} title="Oferta"/><Json data={webPage(offerPath,title,description)}/>
    <p className="eyebrow">Prywatny gabinet · Wrocław</p><h1>{title}</h1>
    <p className="hero-copy">Prowadzę konsultacje, diagnozę psychologiczną, psychoedukację i psychoterapię indywidualną. Poniżej można porównać ich cele i sprawdzić, jak zapytać o spotkanie.</p>
    <p>Gabinet prowadzi <a href={paths.about}>Grzegorz Plebaniak</a>, psycholog i psychoterapeuta (w trakcie szkolenia).</p>
    <p><a className="text-link" href="/jakiej-pomocy-potrzebuje/">Nie wiem, jakiej pomocy potrzebuję</a></p>
    <nav aria-label="Kategorie oferty" className="page-toc"><ul>{Object.entries(categoryNames).map(([key,name])=><li key={key}><a href={`#oferta-${key}`}>{name}</a></li>)}</ul></nav>
    <OfferGroups categories={['support','diagnosis','education','therapy','online']}/>
    <section className="diagnostic-note"><h2>Tematy rozmowy i oceny</h2>
      <p>Wsparcie w kryzysie życiowym, omówienie sytuacji nastolatka z rodzicem, trudności w relacjach lub pytania o wybór psychoterapii to możliwe tematy rozmowy, nie osobne wizyty z inną stawką. Więcej wyjaśniam w <a href="/psycholog-wroclaw/">przewodniku po konsultacjach</a>.</p>
      <p>W ocenie psychologicznej można omawiać m.in. trudności nastroju i lękowe. Pytania o borderline są omówione w kontekście <a data-context-link href={services.personality.href}>diagnozy osobowości</a>. Nie są to osobne pakiety diagnostyczne.</p>
    </section>
    <section className="diagnostic-note"><h2>Dla kogo?</h2><ul>
      <li><a href={paths.adults}>Dorośli</a></li><li><a href={paths.youth}>Młodzież od 15. roku życia</a></li>
    </ul><p>Zakres wiekowy konkretnej diagnozy lub psychoedukacji proszę ustalić przed umówieniem spotkania. Nie każda usługa jest dostępna online.</p></section>
  </main>;
}
