import { config } from '../lib/config';
import { paths } from '../lib/site';
import BookingLink from './BookingLink';


export default function BookingSidebar() {
  return <aside id="rezerwacja" className="topic-booking editorial-card" aria-labelledby="rezerwacja-tytul">
    <h2 id="rezerwacja-tytul">Umów konsultację</h2>
    <div className="topic-booking-person"><img src="/images/responsive/portret-hero-96.webp" srcSet="/images/responsive/portret-hero-96.webp 96w, /images/responsive/portret-hero-192.webp 192w" sizes="64px" width="64" height="64" alt="" loading="lazy"/><p>{config.name}<br/>{config.title}</p></div>
    <p>{config.address}</p>
    <BookingLink/>
    <p><a href={paths.consult}>Jak wygląda pierwsza konsultacja?</a></p>
    <p>Można też <a href={`tel:${config.phone.replace(/\s/g, '')}`}>zadzwonić</a> lub <a href={`mailto:${config.email}`}>napisać</a>.</p>
  </aside>;
}
