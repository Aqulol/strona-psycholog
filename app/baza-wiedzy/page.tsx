import {BookOpen, BookText, ClipboardList} from 'lucide-react';
import KnowledgePage from '../../components/KnowledgePage';
import {comparisonPath,knowledgePath, knowledgeLinks, guidePath, crisisPath} from '../../lib/knowledge';
import {meta} from '../../lib/site';
const title='Baza wiedzy psychologicznej';
const description='Artykuły o psychoterapii, słownik pojęć oraz informacje przed wizytą. Wybierz sposób czytania lub skorzystaj z przewodnika po formach pomocy w gabinecie.';
export const metadata=meta(knowledgePath,title,description);
const icons=[BookOpen,BookText,ClipboardList];
const intros=['Pogłębione teksty o relacjach, dochodzeniu do diagnozy i przebiegu psychoterapii.','Indeks pojęć, który prowadzi do wyjaśnień w artykułach i opisach pracy gabinetu.','Przygotowanie do wizyty, zgoda i udział rodziców oraz podstawowe informacje organizacyjne.'];
export default function Page(){return <KnowledgePage path={knowledgePath} title={title} description={description} collection>
 <p className="hero-copy">Można zacząć od pytania, z którym trudno ruszyć dalej: o znaczenie pojęcia, rodzaj spotkania albo to, czego spodziewać się na pierwszej wizycie. Materiały służą orientacji, nie samodzielnemu rozpoznawaniu zaburzeń.</p>
 <div className="knowledge-grid">{knowledgeLinks.map(({href,name},i)=>{const Icon=icons[i];return <section key={href} className="editorial-card"><span className="service-icon"><Icon aria-hidden="true"/></span><h2><a href={href}>{name}</a></h2><p>{intros[i]}</p></section>;})}</div>
 <section className="diagnostic-note"><h2>Od czego zacząć?</h2><p><a href={guidePath}>Przewodnik po formach pomocy</a> nie wymaga podawania danych. Można też <a data-context-link href={comparisonPath}>porównać cele i przebieg spotkań</a>. W sytuacji zagrożenia proszę skorzystać z informacji o <a href={crisisPath}>pilnej pomocy</a>, zamiast czekać na wizytę.</p></section>
 </KnowledgePage>;}
