import ReadingTime from '../../components/ReadingTime';
import { blogReadingMinutes, generatedArticles } from '../../lib/blog-content';
import {featureArticles} from '../../lib/feature-articles';
import {Crumbs,SeeAlso} from '../../components/Site';
import {articles,meta,paths} from '../../lib/site';
export const metadata=meta('/blog/','Blog o psychologii i psychoterapii | Grzegorz Plebaniak','Artykuły o psychoterapii psychodynamicznej, relacjach, przeniesieniu i pierwszej konsultacji. Informacje dla osób rozważających rozpoczęcie terapii.');
export default function Blog(){return <main id="tresc" className="shell home-block"><Crumbs path="/blog/" title="Blog"/><p className="eyebrow">Czytelnia gabinetu</p><h1 className="text-5xl mb-8 text-green">Artykuły o psychologii i psychoterapii</h1><div className="card-grid">{[...featureArticles.map(a=>[a.slug,a.h1]),...articles,...generatedArticles.filter(a=>a.sections || a.slug === 'adhd-u-doroslych').map(a=>[a.slug,a.h1])].map(([slug,title])=><article className="editorial-card" key={slug}><p className="eyebrow">Artykuł</p><h2><a href={`/blog/${slug}/`}>{title}</a></h2><ReadingTime minutes={blogReadingMinutes(slug)}/></article>)}</div><SeeAlso links={[[paths.method,'Psychoterapia psychodynamiczna'],[paths.tfp,'Podejście TFP']]}/></main>;}
