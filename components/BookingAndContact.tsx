import { config } from '../lib/config';
import ContactForm from './ContactForm';

export default function BookingAndContact() {
  return (
    <div className="home-pair mt-6">
      <section className="editorial-card">
        <h3>Kalendarz Booksy</h3>
        <p className="mb-4"><a className="text-link" href={config.booksyUrl}>Otwórz kalendarz na Booksy</a></p>
        <iframe
          className="embed"
          loading="lazy"
          referrerPolicy="no-referrer"
          src={`https://booksy.com/widget/index.html?id=${config.booksyId}&lang=pl&country=pl`}
          title="Kalendarz konsultacji w Booksy"
          sandbox="allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </section>
      <section className="editorial-card">
        <h3>Formularz kontaktowy</h3>
        <div className="mt-5"><ContactForm /></div>
        <noscript><p>Do wysłania formularza potrzebny jest JavaScript. Można skontaktować się e-mailem lub telefonicznie.</p></noscript>
      </section>
    </div>
  );
}
