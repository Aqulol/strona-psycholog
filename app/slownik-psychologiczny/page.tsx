import CatalogueFilter from '../../components/CatalogueFilter';
import KnowledgePage from '../../components/KnowledgePage';
import { Json } from '../../components/Site';
import {publishedExplanations,reviewedTerms} from '../../lib/glossary';
import {glossaryPath} from '../../lib/knowledge';
import {domain,meta} from '../../lib/site';
const title='Słownik psychologiczny';
const description='Alfabetyczny indeks pojęć psychologicznych z odnośnikami do wyjaśnień dotyczących psychoterapii, osobowości, emocji, diagnostyki i funkcji poznawczych.';
export const metadata=meta(glossaryPath,title,description);
const names=new Map<string,readonly [string,string,string,string]>(publishedExplanations.map(row=>[row[0],row]));
for(const term of reviewedTerms) names.set(term.term,[term.term,term.category,`${glossaryPath}${term.slug}/`,term.definition]);
const aliases:Record<string,string> = {'Borderline':'BPD','Ruminacje':'roztrząsanie rozpamiętywanie','Przeniesienie':'transferencja','Kontrakt terapeutyczny':'umowa terapeutyczna','Funkcje wykonawcze':'funkcje egzekutywne','Łączenie obrazów siebie i innych':'integracja reprezentacji siebie i innych'};
const collator=new Intl.Collator('pl');
const sorted=[...names.values()].sort((a,b)=>collator.compare(a[0],b[0]));
const initial=(term:string)=>term[0].toLocaleUpperCase('pl');
const letters=[...new Set(sorted.map(x=>initial(x[0])))];
export default function Page(){return <KnowledgePage path={glossaryPath} title={title} description={description} collection>
 {reviewedTerms.length>0 && <Json data={{'@context':'https://schema.org','@type':'DefinedTermSet','@id':`${domain}${glossaryPath}#slownik`,name:title,hasDefinedTerm:reviewedTerms.map(x=>({'@id':`${domain}${glossaryPath}${x.slug}/#pojecie`}))}}/>}
 <p className="hero-copy">Indeks zawiera {sorted.length} pojęć z odnośnikami do wyjaśnień. Hasła pomagają zrozumieć język artykułów i konsultacji. Nie są kryteriami do samodzielnego stawiania diagnozy.</p>
 <nav aria-label="Indeks alfabetyczny" className="glossary-letters">{letters.map(letter=><a key={letter} href={`#litera-${letter}`}>{letter}</a>)}</nav>
 <CatalogueFilter label="Szukaj pojęcia" categories={[...new Set(sorted.map(x=>x[1]))].sort(collator.compare)}>
  {letters.map(letter=><section id={`litera-${letter}`} key={letter} data-filter-group=""><h2>{letter}</h2><dl>{sorted.filter(x=>initial(x[0])===letter).map(([term,category,href,copy])=><div key={term} data-filter-row={category} data-alias={aliases[term]}><dt><a href={href}>{term}</a></dt><dd>{copy} <small>· {category}</small></dd></div>)}</dl></section>)}
 </CatalogueFilter>
 </KnowledgePage>;}
