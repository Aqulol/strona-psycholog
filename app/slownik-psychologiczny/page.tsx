import CategoryCatalogue from '../../components/CategoryCatalogue';
import KnowledgePage from '../../components/KnowledgePage';
import {Json} from '../../components/Site';
import {publishedExplanations,publishedTerms} from '../../lib/glossary';
import {glossaryPath} from '../../lib/knowledge';
import {domain,meta} from '../../lib/site';
const title='Słownik psychologiczny';
const description='Alfabetyczny indeks pojęć psychologicznych z odnośnikami do wyjaśnień dotyczących psychoterapii, osobowości, emocji, diagnostyki i funkcji poznawczych.';
export const metadata=meta(glossaryPath,title,description);
const names=new Map<string,readonly [string,string,string,string]>(publishedExplanations.map(row=>[row[0],row]));
for(const term of publishedTerms)names.set(term.term,[term.term,[term.category,...(term.categories??[])].join('|'),`${glossaryPath}${term.slug}/`,term.definition]);
const collator=new Intl.Collator('pl');
const sorted=[...names.values()].sort((a,b)=>collator.compare(a[0],b[0]));
const initial=(term:string)=>[...term][0].toLocaleUpperCase('pl');
const groups=new Map<string,typeof sorted>();
const counts:Record<string,number>={};
for(const row of sorted){
 const letter=initial(row[0]);
 if(!groups.has(letter))groups.set(letter,[]);
 groups.get(letter)!.push(row);
 for(const category of row[1].split('|'))counts[category]=(counts[category]??0)+1;
}
const letters=[...groups.keys()];
const dated=(key:'published'|'updated')=>publishedTerms.filter(x=>x[key]).sort((a,b)=>b[key]!.localeCompare(a[key]!)).slice(0,4);
export default function Page(){return <KnowledgePage path={glossaryPath} title={title} description={description} collection>
 {publishedTerms.length>0&&<Json data={{'@context':'https://schema.org','@type':'DefinedTermSet','@id':`${domain}${glossaryPath}#slownik`,name:title,hasDefinedTerm:publishedTerms.map(x=>({'@id':`${domain}${glossaryPath}${x.slug}/#pojecie`}))}}/>}
 <div className="glossary-intro"><p className="hero-copy">Indeks pojęć z psychologii, psychoterapii i diagnostyki. Wybierz literę lub kategorię, żeby przejść do wyjaśnienia. Pojęcia nie służą do samodzielnego stawiania diagnozy.</p><p><strong>{sorted.length}</strong> pojęć w indeksie{publishedTerms.length>0&&<> · <strong>{publishedTerms.length}</strong> pełnych haseł</>}</p></div>
 {(['published','updated','featured'] as const).map(key=>{
  const items=key==='featured'?publishedTerms.filter(x=>x.featured).slice(0,4):dated(key);
  return items.length>0&&<section className="glossary-chronology" key={key}><h2>{key==='published'?'Ostatnio dodane':key==='updated'?'Ostatnio zaktualizowane':'Wyróżnione pojęcia'}</h2><ul>{items.map(x=><li key={x.slug}><a href={`${glossaryPath}${x.slug}/`}>{x.term}</a>{key!=='featured'&&<> · <time dateTime={x[key]}>{x[key]}</time></>}</li>)}</ul></section>;
 })}
 <ul className="glossary-category-counts" aria-label="Liczba pojęć według kategorii">{Object.entries(counts).sort(([a],[b])=>collator.compare(a,b)).map(([name,count])=><li key={name}>{name} <strong>{count}</strong></li>)}</ul>
 <CategoryCatalogue categories={Object.keys(counts).sort(collator.compare)} counts={counts}>
  <nav aria-label="Indeks alfabetyczny" className="glossary-letters">{letters.map(letter=><a data-catalogue-letter key={letter} href={`#litera-${letter}`}>{letter}</a>)}</nav>
  {letters.map(letter=><section id={`litera-${letter}`} key={letter} data-filter-group="" className="lexicon-group"><h2>{letter}</h2><dl className="lexicon-entries">{groups.get(letter)!.map(([term,category,href,copy])=><div key={term} data-filter-row={category}><dt><a href={href}>{term}</a></dt><dd>{copy}<small className="lexicon-category">{category.split('|').join(' · ')}</small></dd></div>)}</dl></section>)}
 </CategoryCatalogue>
 <section className="glossary-chronology"><h2>Od czego zacząć?</h2><p>Jeśli interesuje Cię język psychoterapii i diagnozy, zacznij od tych wyjaśnień:</p><ul>{['Przeniesienie','Organizacja osobowości','Diagnoza różnicowa'].map(name=>{const [, ,href,copy]=names.get(name)!;return <li key={name}><a href={href}>{name}</a> — {copy}</li>;})}</ul></section>
 </KnowledgePage>;}
