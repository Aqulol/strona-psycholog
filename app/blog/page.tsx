import CatalogueFilter from '../../components/CatalogueFilter';
import ReadingTime from '../../components/ReadingTime';
import { blogReadingMinutes, generatedArticles } from '../../lib/blog-content';
import {featureArticles} from '../../lib/feature-articles';
import {Crumbs,SeeAlso} from '../../components/Site';
import {articles,meta,paths} from '../../lib/site';
export const metadata=meta('/blog/','Blog o psychologii i psychoterapii | Grzegorz Plebaniak','Artykuły o psychoterapii psychodynamicznej, relacjach, przeniesieniu i pierwszej konsultacji. Informacje dla osób rozważających rozpoczęcie terapii.');
const tags = {
  therapy:'Psychoterapia', dynamics:'Psychologia psychodynamiczna', personality:'Osobowość', diagnosis:'Diagnostyka psychologiczna', adhd:'ADHD', relations:'Relacje interpersonalne', emotion:'Emocje i funkcjonowanie psychiczne', youth:'Zdrowie psychiczne młodzieży',
} as const;
const blogTags:Record<string,(keyof typeof tags)[]> = {
  'tworczosc-i-empatia-u-dzieci':['emotion'], samotnosc:['relations','emotion'], 'poczucie-wlasnej-wartosci':['personality','emotion'], 'narcyzm-wrazliwy':['personality','dynamics','relations'], 'jak-wybrac-psychoterapeute':['therapy'], 'dlaczego-wybieram-podobnych-partnerow':['relations','dynamics'], 'dlaczego-sama-swiadomosc-nie-wystarcza':['dynamics','therapy'], 'relacja-terapeutyczna-zrodlo-zmiany':['therapy','relations'], 'czy-przeszlosc-ma-znaczenie':['relations','dynamics'], 'psychoterapia-psychodynamiczna-pierwsze-spotkanie':['therapy','dynamics'], 'pierwsze-spotkanie-mlodziez-rodzic':['youth'], 'tfp-dla-kogo':['personality','therapy','dynamics'], 'adhd-u-doroslych':['adhd','diagnosis','emotion'],
};
export default function Blog(){return <main id="tresc" className="shell home-block blog-library"><Crumbs path="/blog/" title="Blog"/><p className="eyebrow">Czytelnia gabinetu</p><h1 className="text-5xl mb-8 text-green">Artykuły o psychologii i psychoterapii</h1><CatalogueFilter categories={Object.values(tags)} label="Szukaj artykułu"><div className="journal-library">{[...featureArticles.map(a=>[a.slug,a.h1]),...articles,...generatedArticles.filter(a=>a.sections || a.slug === 'adhd-u-doroslych' || a.slug === 'tworczosc-i-empatia-u-dzieci').map(a=>[a.slug,a.h1])].map(([slug,title])=><article className="editorial-card" key={slug} data-filter-row={(blogTags[slug]??[]).map(tag=>tags[tag]).join('|')}><p className="eyebrow">{(blogTags[slug]??[]).map(tag=>tags[tag]).join(' · ') || 'Artykuł'}</p><h2><a href={`/blog/${slug}/`}>{title}</a></h2><ReadingTime minutes={blogReadingMinutes(slug)}/></article>)}</div></CatalogueFilter><SeeAlso links={[[paths.method,'Psychoterapia psychodynamiczna'],[paths.tfp,'Podejście TFP']]}/></main>;}
