import { config } from '../lib/config';
import { paths } from '../lib/site';
import BooksyCalendar from './BooksyCalendar';

const consultation = config.prices.find(item => item.key === 'konsultacja');

export default function BookingSidebar() {
  return <aside id="rezerwacja" className="topic-booking editorial-card" aria-labelledby="rezerwacja-tytul">
    <h2 id="rezerwacja-tytul">Umów konsultację</h2>
    <div className="topic-booking-person"><img src="/images/responsive/portret2-320.webp" width="64" height="64" alt="" loading="lazy"/><p>{config.name}<br/>{config.title}</p></div>
    {consultation && <p>{consultation.name}<br/><strong>{consultation.price} zł · {consultation.duration}</strong></p>}
    <p>{config.address}</p>
    <BooksyCalendar linkLabel="Umów wizytę w Booksy" primary/>
    <p><a href={paths.consult}>Jak wygląda pierwsza konsultacja?</a></p>
    <p>Można też <a href={`tel:${config.phone.replace(/\s/g, '')}`}>zadzwonić</a> lub <a href={`mailto:${config.email}`}>napisać</a>.</p>
  </aside>;
}
