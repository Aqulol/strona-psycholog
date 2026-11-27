import { config } from '../lib/config';
import BooksyCalendar from './BooksyCalendar';

export default function BookingAndContact() {
  return <div className="home-pair booking-contact-layout mt-6">
    <section className="editorial-card">
      <h3>Kalendarz Booksy</h3>
      <BooksyCalendar/>
    </section>
    <section className="editorial-card">
      <h3>Pytanie organizacyjne</h3>
      <p><a href={`mailto:${config.email}`}>{config.email}</a> · <a href={`tel:${config.phone.replace(/\s+/g,'')}`}>{config.phone}</a></p>
      <p>Można zapytać o formy pomocy, zakres i organizację diagnozy, ceny, wolne terminy, zasady współpracy lub udział opiekuna w konsultacji osoby niepełnoletniej. Nie trzeba przesyłać rozpoznania, opisu objawów ani dokumentacji. Kontakt organizacyjny nie jest poradą psychologiczną.</p>
    </section>
  </div>;
}
