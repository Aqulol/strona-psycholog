import {CalendarDays} from 'lucide-react';
import {config, consultationRate} from '../lib/config';

export default function BookingLink() {
  return <div className="practice-booking">
    <p><CalendarDays size={22} aria-hidden="true"/> Terminy standardowej konsultacji można sprawdzić w Booksy.</p>
    <p><strong>{consultationRate.price} zł / {consultationRate.duration}</strong></p>
    <a className="booking" href={config.booksyUrl} rel="noreferrer">Sprawdź dostępne terminy</a>
  </div>;
}
