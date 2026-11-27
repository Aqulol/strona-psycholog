import { config } from '../lib/config';
import ExternalFrame from './ExternalFrame';

export default function BookingAndContact() {
  return <div className="home-pair mt-6">
    <section className="editorial-card">
      <h3>Kalendarz Booksy</h3>
      <p><a className="text-link" href={config.booksyUrl} rel="noreferrer">Otwórz kalendarz w Booksy</a></p>
      <p>Można też wyświetlić kalendarz tutaj. Dostawca otrzyma informacje o połączeniu dopiero po jego otwarciu.</p>
      <ExternalFrame src={`https://booksy.com/widget/index.html?id=${config.booksyId}&lang=pl&country=pl`} title="Kalendarz konsultacji w Booksy" label="Pokaż kalendarz Booksy" sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"/>
    </section>
    <section className="editorial-card">
      <h3>Pytanie organizacyjne</h3>
      <p><a href={`mailto:${config.email}`}>{config.email}</a> · <a href={`tel:${config.phone.replace(/\s+/g,'')}`}>{config.phone}</a></p>
      <p>Można zapytać o formy pomocy, zakres i organizację diagnozy, ceny, wolne terminy, zasady współpracy lub udział opiekuna w konsultacji osoby niepełnoletniej. Nie trzeba przesyłać rozpoznania, opisu objawów ani dokumentacji. Kontakt organizacyjny nie jest poradą psychologiczną.</p>
    </section>
  </div>;
}
