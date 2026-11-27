import { config } from '../lib/config';
import ContactForm from './ContactForm';
import BookingLink from './BookingLink';

export default function BookingAndContact() {
  return <div className="home-pair booking-contact-layout mt-6">
    <section className="editorial-card">
      <h3>Umów konsultację</h3>
      <BookingLink/>
    </section>
    <section className="editorial-card">
      <h3>Formularz kontaktowy</h3>
      <ContactForm/>
      <p><a href={`mailto:${config.email}`}>{config.email}</a> · <a href={`tel:${config.phone.replace(/\s+/g,'')}`}>{config.phone}</a></p>
    </section>
  </div>;
}
