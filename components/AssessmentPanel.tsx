import {services, type ServiceKey, type AssessmentDetails} from '../lib/services';

const labels = {
  scope:'Zakres', method:'Sposób pracy', audience:'Dla kogo', setting:'Forma',
  meetings:'Liczba spotkań', duration:'Czas', fee:'Koszt', tools:'Narzędzia',
  feedback:'Omówienie wyników', documentation:'Dokumentacja',
} satisfies Record<keyof AssessmentDetails,string>;

export default function AssessmentPanel({id}:{id:ServiceKey}) {
  const details = services[id].assessment;
  if (!details) return null;
  const consultation = id === 'diagnostic' ? services.consult : undefined;
  return <section className="assessment-panel diagnostic-note" aria-labelledby="informacje-praktyczne">
    <h2 id="informacje-praktyczne">{consultation ? 'Standardowa konsultacja: informacje praktyczne' : 'Informacje praktyczne'}</h2>
    <dl>{(Object.keys(labels) as (keyof AssessmentDetails)[]).flatMap(key => details[key] ? [<div key={key}><dt>{labels[key]}</dt><dd>{details[key]}</dd></div>] : [])}
      {consultation && <>
        <div><dt>Dla kogo</dt><dd>{consultation.audience}</dd></div>
        <div><dt>Forma</dt><dd>Gabinet we Wrocławiu lub <a href={services.onlineConsult.href}>konsultacja online</a></dd></div>
        {consultation.rate && <div><dt>Czas i koszt konsultacji</dt><dd>{consultation.rate.duration} · {consultation.rate.price} zł</dd></div>}
      </>}
    </dl>
  </section>;
}
