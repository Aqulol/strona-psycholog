import ReflectionNotes from '../../components/ReflectionNotes';
import KnowledgePage from '../../components/KnowledgePage';
import SessionCost from '../../components/SessionCost';
import { services } from '../../lib/services';
import { meta } from '../../lib/site';
const path='/narzedzia-psychologiczne/';
const title='Narzędzia psychoedukacyjne';
const description='Orientacyjny kalkulator kosztów psychoterapii i karty refleksji do własnego użytku. Bez zapisywania i przesyłania odpowiedzi.';
export const metadata=meta(path,title,description);
export default function Page(){const rate=services.individual.rate;return <KnowledgePage path={path} title={title} description={description}>
  <section><h2>Kalkulator kosztów psychoterapii</h2>{rate && <><p>Stawka za sesję: <strong>{rate.price} zł / {rate.duration}</strong>. Pomnóż cenę przez liczbę sesji tygodniowo i liczbę tygodni. Wynik jest przybliżony i nie uwzględnia przerw, zmiany terminów ani konsultacji wstępnych. Nie jest zaleceniem częstotliwości ani długości terapii.</p><SessionCost price={rate.price}/><noscript><p>Do automatycznego obliczenia potrzebny jest JavaScript; wzór podano powyżej.</p></noscript></>}<p>Ustawienia kalkulatora nie są zapisywane ani wysyłane. Sprawdź <a href="/cennik/">cennik wizyt</a>.</p></section>
  <section><h2>Notatki do własnego użytku</h2><ReflectionNotes kind="emotions" title="Dziennik emocji"/><ReflectionNotes kind="relations" title="Dziennik relacji"/><ReflectionNotes kind="visit" title="Przygotowanie do konsultacji"/><noscript><p>Do notowania w przeglądarce potrzebny jest JavaScript. Pytania można wykorzystać na kartce.</p></noscript><p><a href="/materialy-psychologiczne/">Karty refleksji i przygotowania do spotkania</a> można wydrukować. Na współdzielonym urządzeniu nie zostawiaj zapisów zawierających osobiste informacje.</p></section>
</KnowledgePage>}
