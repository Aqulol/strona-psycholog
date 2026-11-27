import KnowledgePage from '../../components/KnowledgePage';
import {comparisonPath, crisisPath, guidePath, patientPath} from '../../lib/knowledge';
import {services, type ServiceKey} from '../../lib/services';
import {meta, paths} from '../../lib/site';

const title = 'Jaką formę pomocy psychologicznej wybrać?';
const description = 'Porównaj cele i przebieg konsultacji, poradnictwa, trzech obszarów diagnozy, psychoedukacji i psychoterapii. Sprawdź, od czego można zacząć.';
export const metadata = meta(comparisonPath,title,description);
const options: [ServiceKey,string,string,string][] = [
 ['consult','Omówienie tego, co dzieje się teraz, i ustalenie dalszego kroku.','Trudno nazwać problem albo nie wiadomo, jakiej pomocy szukać.','Rozmowa wstępna, bez zobowiązania do psychoterapii. Standardową konsultację można zarezerwować w Booksy.'],
 ['diagnostic','Ustalenie pytania, na które miałaby odpowiedzieć pogłębiona ocena.','Nie wiadomo, jaki zakres diagnozy będzie odpowiedni.','Rozmowa o celu i możliwym zakresie; sama nie jest pełną diagnozą. O organizację najlepiej zapytać gabinet.'],
 ['counselling','Przyjrzenie się konkretnej sytuacji i możliwym decyzjom.','Rozstanie, zmiana pracy, trudny wybór lub napięcie w relacji.','Możliwy cel konsultacji psychologicznej, nie osobna pozycja do rezerwacji. Nie oznacza obietnicy rozwiązania problemu w określonym czasie ani interwencji pilnej.'],
 ['general','Ocena objawów i funkcjonowania oraz porównanie możliwych wyjaśnień.','Nakładają się trudności z nastrojem, lękiem lub radzeniem sobie na co dzień.','Pogłębiony proces, szerszy niż ocena jednego objawu. Zakres i organizację należy ustalić z gabinetem.'],
 ['personality','Zrozumienie utrwalonych wzorców przeżywania siebie, emocji i relacji.','Podobne trudności w bliskich relacjach wracają od lat i w różnych okolicznościach.','Pogłębiona ocena funkcjonowania osobowości, a nie typologia ani samodzielny test na borderline.'],
 ['adhd','Ocena, czy historia i przebieg trudności odpowiadają ADHD lub wymagają innego wyjaśnienia.','Problemy z uwagą, rozpoczęciem zadań i organizacją występują w różnych sytuacjach.','Ocena uwzględnia historię rozwojową i wpływ na codzienność. Nie jest przesiewem ani konsultacją w sprawie leków.'],
 ['edu','Zrozumienie mechanizmów psychologicznych i rozpoznanie ich w codziennym życiu.','Trudno nazwać emocje albo zrozumieć własne reakcje.','Indywidualna rozmowa edukacyjna, nie diagnoza, psychoterapia ani zajęcia grupowe.'],
 ['eduAdhd','Lepsze zrozumienie codziennego funkcjonowania z ADHD.','Planowanie, przechodzenie między zadaniami lub organizacja dnia wymagają dużego wysiłku.','Wspólne omawianie trudności i możliwych strategii. Nie potwierdza rozpoznania.'],
 ['individual','Regularna praca nad utrwalonymi trudnościami emocjonalnymi i relacyjnymi.','Ważne trudności powracają, mimo prób poradzenia sobie z nimi.','Jedna psychoterapia indywidualna: nurt psychodynamiczny z wykorzystaniem TFP. Online to forma spotkań, nie osobna metoda.'],
];
export default function Page(){return <KnowledgePage path={comparisonPath} title={title} description={description}>
 <p className="hero-copy">Formy pomocy różnią się pytaniem, na które mają odpowiedzieć. Nie trzeba samodzielnie nazywać problemu ani wybierać rodzaju diagnozy przed pierwszą rozmową.</p>
 <p>Jeśli woli Pan/Pani zacząć od swojego celu, można skorzystać z <a data-context-link href={guidePath}>krótkiego przewodnika wyboru</a>. W bezpośrednim zagrożeniu należy korzystać z <a data-context-link href={crisisPath}>pilnej pomocy</a>, a nie czekać na wizytę.</p>
 <nav className="page-toc" aria-label="Porównywane formy pomocy"><ul>{options.map(([key])=><li key={key}><a href={`#forma-${key}`}>{services[key].name}</a></li>)}</ul></nav>
 <div className="comparison-grid">{options.map(([key,goal,example,format])=><section className="editorial-card" key={key} id={`forma-${key}`}><h2>{services[key].name}</h2><dl><dt>Cel</dt><dd>{goal}</dd><dt>Przykładowy powód zgłoszenia</dt><dd>{example}</dd><dt>Jak wygląda i czym się różni?</dt><dd>{format}</dd></dl><p><a href={services[key].href}>Więcej: {services[key].name}</a></p></section>)}</div>
 <p><a href={patientPath}>Informacje przed pierwszą wizytą</a> · <a href={paths.contact}>Kontakt w sprawach organizacyjnych</a></p>
 </KnowledgePage>;}
