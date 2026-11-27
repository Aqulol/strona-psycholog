import {meta,domain} from '../lib/site';
import {glossaryPath} from '../lib/knowledge';
import {publishedTerms,glossarySources} from '../lib/glossary';
import {readingMinutes} from '../lib/reading-time';
import {Json} from './Site';
import KnowledgePage from './KnowledgePage';
import ReadingTime from './ReadingTime';
import GlossaryCitation from './GlossaryCitation';
function published(slug:string){const term=publishedTerms.find(row=>row.slug===slug);if(!term)throw new Error(`Nie można wyeksportować nieopublikowanego hasła: ${slug}`);return term;}
export function glossaryMetadata(slug:string){const term=published(slug);return meta(`${glossaryPath}${slug}/`,`${term.term} | Słownik psychologiczny`,term.definition);}
export default function GlossaryEntryPage({slug}:{slug:string}){
 const term=published(slug),path=`${glossaryPath}${slug}/`,url=domain+path,index=publishedTerms.indexOf(term);
 const body=<><section><h2>Znaczenie pojęcia</h2><p>{term.explanation}</p></section>{term.sections?.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(p=><p key={p}>{p}</p>)}</section>)}{term.examples.length>0&&<section><h2>{term.examples.length===1?'Przykład fikcyjny':'Przykłady fikcyjne'}</h2>{term.examples.map(p=><p key={p}>{p}</p>)}</section>}<section><h2>Jak odróżnić od podobnych pojęć?</h2><p>{term.distinction}</p></section>{term.clinical&&<section><h2>Znaczenie kliniczne</h2><p>{term.clinical}</p></section>}</>;
 const minutes=readingMinutes(<><p>{term.definition}</p>{body}</>);
 const citation=`${term.author ? `${term.author}. ` : `${term.h1??term.term}. `}(${term.updated??term.published??'b.d.'}). ${term.author ? `${term.h1??term.term}. ` : ''}Słownik psychologiczny. ${url}`;
 return <KnowledgePage path={path} title={term.h1??term.term} description={term.definition}>
  <Json data={{'@context':'https://schema.org','@type':'DefinedTerm','@id':`${url}#pojecie`,name:term.term,description:term.definition,alternateName:[...term.synonyms,...(term.english?[term.english]:[])],inDefinedTermSet:{'@id':`${domain}${glossaryPath}#slownik`}}}/>
  <p className="hero-copy lexicon-definition">{term.definition}</p>
  <p className="offer-meta">{[term.category,...(term.categories??[])].join(' · ')}{term.english&&<> · {term.english}</>}{term.synonyms.length>0&&<> · Także: {term.synonyms.join(', ')}</>}<br/>{term.author ? `Autor: ${term.author}` : 'Materiał redakcyjny witryny'}{term.reviewer&&<> · Recenzja: {term.reviewer}{term.reviewedAt&&<> (<time dateTime={term.reviewedAt}>{term.reviewedAt}</time>)</>}</>}{term.published&&<> · Publikacja: <time dateTime={term.published}>{term.published}</time></>}{term.updated&&<> · Aktualizacja: <time dateTime={term.updated}>{term.updated}</time></>} {minutes>=2&&<ReadingTime minutes={minutes}/>}</p>{body}
  <section><h2>Powiązane materiały</h2><ul>{term.links.map(link=><li key={link.href}><a href={link.href}>{link.label}</a></li>)}{publishedTerms.filter(r=>term.related.includes(r.slug)).map(r=><li key={r.slug}><a href={`${glossaryPath}${r.slug}/`}>{r.term}</a></li>)}</ul></section>
  <section><h2>Bibliografia</h2><ul>{term.sources.map(id=>{const source=glossarySources[id];return <li key={id}>{source.href?<a href={source.href}>{source.label}</a>:source.label}</li>;})}</ul></section>
  <GlossaryCitation url={url} citation={citation}/>
  <nav aria-label="Sąsiednie hasła"><ul>{([[publishedTerms[index-1],'Poprzednie'],[publishedTerms[index+1],'Następne']] as const).map(([row,label])=>row&&<li key={row.slug}><a href={`${glossaryPath}${row.slug}/`}>{label}: {row.term}</a></li>)}</ul></nav>
 </KnowledgePage>;}
