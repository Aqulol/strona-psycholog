import {meta,domain} from '../lib/site';
import {glossaryPath} from '../lib/knowledge';
import {reviewedTerms,glossarySources} from '../lib/glossary';
import {readingMinutes} from '../lib/reading-time';
import {Json} from './Site';
import KnowledgePage from './KnowledgePage';
import ReadingTime from './ReadingTime';
function published(slug:string){const term=reviewedTerms.find(row=>row.slug===slug);if(!term)throw new Error(`Nie można wyeksportować niezatwierdzonego hasła: ${slug}`);return term;}
export function glossaryMetadata(slug:string){const term=published(slug);return meta(`${glossaryPath}${slug}/`,`${term.term} | Słownik psychologiczny`,term.definition);}
export default function GlossaryEntryPage({slug}:{slug:string}){
 const term=published(slug),path=`${glossaryPath}${slug}/`,source=glossarySources[term.source];
 const body=<><p className="hero-copy">{term.definition}</p><section><h2>Znaczenie w psychologii</h2><p>{term.explanation}</p></section><section><h2>Przykład fikcyjny</h2><p>{term.example}</p></section><section><h2>Jak odróżnić od podobnych pojęć?</h2><p>{term.distinction}</p></section></>;
 return <KnowledgePage path={path} title={term.term} description={term.definition}>
  <Json data={{'@context':'https://schema.org','@type':'DefinedTerm','@id':`${domain}${path}#pojecie`,name:term.term,description:term.definition,inDefinedTermSet:{'@id':`${domain}${glossaryPath}#slownik`}}}/>
  <p>Weryfikacja merytoryczna: {term.reviewer} · Aktualizacja: <time dateTime={term.updated}>{term.updated}</time> · <ReadingTime minutes={readingMinutes(body)}/></p>{body}
  <section><h2>Powiązane materiały</h2><ul><li><a href={term.href}>Wyjaśnienie w szerszym kontekście</a></li>{reviewedTerms.filter(r=>term.related.includes(r.slug)).map(r=><li key={r.slug}><a href={`${glossaryPath}${r.slug}/`}>{r.term}</a></li>)}</ul></section>
  <section><h2>Źródło pojęcia</h2><p>{source.href?<a href={source.href}>{source.label}</a>:source.label}</p></section>
 </KnowledgePage>;
}
