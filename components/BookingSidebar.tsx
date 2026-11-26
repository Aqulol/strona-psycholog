import { config, booksyWidgetUrl } from '../lib/config';
import { paths } from '../lib/site';

const consultation = config.prices.find(item => item.key === 'konsultacja');

export default function BookingSidebar() {
  return <aside id="rezerwacja" className="topic-booking editorial-card" aria-labelledby="rezerwacja-tytul">
    <h2 id="rezerwacja-tytul">Umów konsultację</h2>
    <div className="topic-booking-person"><img src="/images/responsive/portret2-320.webp" width="64" height="64" alt="" loading="lazy"/><p>{config.name}<br/>{config.title}</p></div>
    {consultation && <p>{consultation.name}<br/><strong>{consultation.price} zł · {consultation.duration}</strong></p>}
    <p>{config.address}</p>
    <p><a className="booking" href={config.booksyUrl} rel="noreferrer">Umów wizytę w Booksy</a></p>
    {config.booksyId && <div className="topic-calendar">
      <p>Kalendarz ładuje się automatycznie. Booksy otrzymuje informacje o połączeniu i może użyć własnych plików cookies.</p>
      <iframe className="embed" src={booksyWidgetUrl} title="Kalendarz rezerwacji Booksy" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>
    </div>}
    <p><a href={paths.consult}>Jak wygląda pierwsza konsultacja?</a></p>
    <p>Można też <a href={`tel:${config.phone.replace(/\s/g, '')}`}>zadzwonić</a> lub <a href={`mailto:${config.email}`}>napisać</a>.</p>
  </aside>;
}
