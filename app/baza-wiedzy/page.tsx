import {BookOpen, BookText, FileText} from 'lucide-react';
import KnowledgePage from '../../components/KnowledgePage';
import {comparisonPath,knowledgePath, knowledgeLinks, guidePath, crisisPath} from '../../lib/knowledge';
import {meta,paths} from '../../lib/site';
const title='Baza wiedzy psychologicznej';
const description='Artykuły psychologiczne, słownik pojęć i informacje dla pacjentów. Znajdź wyjaśnienie pojęcia, opis form pomocy lub informacje przed pierwszą wizytą.';
export const metadata=meta(knowledgePath,title,description);
const icons=[BookOpen,BookText,FileText];
const intros=['Pogłębione teksty o relacjach, dochodzeniu do diagnozy i przebiegu psychoterapii.','Indeks pojęć, który prowadzi do wyjaśnień w artykułach i opisach pracy gabinetu.','Informacje o pierwszej wizycie, rezerwacji i organizacji spotkań.'];
export default function Page(){return <KnowledgePage path={knowledgePath} title={title} description={description} collection>
 <p className="hero-copy">Można zacząć od pytania, z którym trudno ruszyć dalej: o znaczenie pojęcia, rodzaj spotkania albo to, czego spodziewać się na pierwszej wizycie. Materiały służą orientacji, nie samodzielnemu rozpoznawaniu zaburzeń.</p>
 <div className="knowledge-grid">{knowledgeLinks.map(({href,name},i)=>{const Icon=icons[i];return <section key={href} className="editorial-card"><span className="service-icon"><Icon aria-hidden="true"/></span><h2><a href={href}>{name}</a></h2><p>{intros[i]}</p></section>;})}</div>
 <section className="diagnostic-note"><h2>Od czego zacząć?</h2><p><a href={guidePath}>Przewodnik po formach pomocy</a> nie wymaga podawania danych. Można też <a data-context-link href={comparisonPath}>porównać cele i przebieg spotkań</a>. W sytuacji zagrożenia proszę skorzystać z informacji o <a href={crisisPath}>pilnej pomocy</a>, zamiast czekać na wizytę.</p></section>
 <section><h2>Czytaj według tematu</h2><ul><li><a href="/blog/adhd-u-doroslych/">ADHD w dorosłości</a> i <a href="/blog/jak-przygotowac-sie-do-diagnozy-adhd/">przygotowanie do oceny ADHD</a></li><li><a href="/slownik-psychologiczny/organizacja-osobowosci/">Osobowość w ujęciu psychodynamicznym</a> i <a href={paths.tfp}>podejście TFP</a></li><li><a href={paths.signs}>Katalog trudności: emocje, relacje i dorastanie</a></li><li><a href={paths.faq}>Najczęstsze pytania o wizyty</a></li></ul></section>
 <section><h2>Nowy materiał</h2><p><a href="/blog/tworczosc-i-empatia-u-dzieci/">Twórczość i empatia u dzieci: co pokazało badanie?</a> Omówienie wyników oraz ich ograniczeń.</p></section>
 <section><h2>Jak czytać materiały edukacyjne?</h2><p>Omówienia redakcyjne nie są indywidualną poradą ani rozpoznaniem. Bibliografia pozwala odróżnić opis badania od interpretacji klinicznej. Materiał nie jest oznaczany jako zrecenzowany, jeśli recenzja nie została potwierdzona. Zauważony błąd można <a href={paths.contact}>zgłosić przez kontakt z gabinetem</a>.</p></section>
 </KnowledgePage>;}
