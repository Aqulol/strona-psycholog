import KnowledgePage from '../../components/KnowledgePage';
import {guidePath,crisisPath,knowledgePath} from '../../lib/knowledge';
import {services} from '../../lib/services';
import {meta, paths} from '../../lib/site';
const title='Nie wiem, jakiej pomocy potrzebuję';
const description='Przewodnik po stronach gabinetu pomaga odróżnić konsultację, ocenę psychologiczną, psychoedukację i psychoterapię. Nie pyta o dane ani o objawy.';
export const metadata=meta(guidePath,title,description);
const steps=[
 ['Potrzebuję pilnej pomocy',crisisPath,'Numery i miejsca pilnej pomocy','W nagłym zagrożeniu należy dzwonić pod 112, nie czekać na wizytę.'],
 ['Chcę porozmawiać o aktualnych trudnościach',paths.consult,'Konsultacja psychologiczna','Rozmowa o sytuacji i możliwych dalszych krokach, bez zobowiązania do terapii.'],
 ['Chcę lepiej zrozumieć swoje funkcjonowanie',services.general.href,'Ocena psychologiczna','Pogłębiona ocena wyjaśnia, jak objawy i ich kontekst mogą wpływać na funkcjonowanie.'],
 ['Mam pytania dotyczące ADHD',services.adhd.href,'Diagnoza ADHD','Opis oceny rozwojowej i znaczenia wywiadu. Przesiew nie zastępuje diagnozy.'],
 ['Chcę zrozumieć utrwalone wzorce w relacjach',services.personality.href,'Diagnoza osobowości','Informacje o ocenie obrazu siebie, emocji i relacji, nie lista cech do samodzielnej oceny.'],
 ['Zastanawiam się nad rozpoczęciem psychoterapii',services.individual.href,'Psychoterapia indywidualna','Jak od konsultacji można przejść do regularnej pracy w nurcie psychodynamicznym z wykorzystaniem TFP.'],
 ['Potrzebuję wsparcia po stracie lub zmianie',services.crisis.href,'Planowa rozmowa w trudnym okresie','Czym rozmowa o stracie lub przeciążeniu różni się od pomocy pilnej.'],
 ['Szukam pomocy dla nastolatka',paths.youth,'Pomoc od 15. roku życia','Informacje o pierwszym spotkaniu i udziale rodziców.'],
 ['Chcę najpierw dowiedzieć się więcej',knowledgePath,'Baza wiedzy','Artykuły, pojęcia i informacje praktyczne do samodzielnego czytania.'],
];
import {comparisonPath} from '../../lib/knowledge';
export default function Page(){return <KnowledgePage path={guidePath} title={title} description={description}>
 <p className="hero-copy">Proszę wybrać cel, aby zobaczyć możliwy punkt wyjścia. To nawigacja po witrynie, nie test, diagnoza ani kwalifikacja do leczenia. Wybory nie są zapisywane ani wysyłane.</p>
 <p><a data-context-link href={comparisonPath}>Porównaj cele i przebieg form pomocy</a>.</p>
 <div className="questions">{steps.map(([label,href,link,copy])=><details key={href}><summary>{label}</summary><p>{copy} <a href={href}>{link}</a></p></details>)}</div>
 </KnowledgePage>;}
