import { topicPath } from '../../../lib/help-topics';
import { notFound } from 'next/navigation';
import { articleJsonLd } from '../../../lib/articleJsonLd';
import ArticleByline from '../../../components/ArticleByline';
import { LonelinessArticle, SelfWorthArticle } from '../../../components/FeatureArticleContent';
import { editorial } from '../../../lib/editorial';
import { featureArticles } from '../../../lib/feature-articles';
import { domain, meta, paths } from '../../../lib/site';
import { Crumbs, Json, SeeAlso } from '../../../components/Site';

type Props = { params: Promise<{ article: string }> };
const published = [
  ...featureArticles.map(a => ({ ...a, sections: undefined, link: paths.adults })),
  ...editorial.flatMap(a => a.slug && a.sections ? [{ ...a, slug: a.slug, published: undefined }] : []),
];
const consultationLinks: Record<string, [string,string]> = {
  samotnosc: [topicPath('samotnosc'), 'jak rozmawiam o samotności na konsultacji'],
  'poczucie-wlasnej-wartosci': [topicPath('niska-samoocena'), 'jak wygląda konsultacja dotycząca samooceny'],
  'dlaczego-wybieram-podobnych-partnerow': [topicPath('problemy-w-relacjach'), 'jak można pracować indywidualnie nad trudnościami w relacjach'],
  'czy-przeszlosc-ma-znaczenie': [topicPath('trudne-doswiadczenia-z-dziecinstwa'), 'jak można porozmawiać o doświadczeniach z dzieciństwa na konsultacji'],
  'narcyzm-wrazliwy': [topicPath('zaburzenia-osobowosci'), 'czemu służy konsultacja przy utrwalonych trudnościach w relacjach'],
};
export const dynamicParams = false;
export function generateStaticParams() { return published.map(a => ({ article: a.slug })); }
async function getPage(params: Props['params']) {
  const { article } = await params;
  const a = published.find(p => p.slug === article);
  if (!a) notFound();
  return { a, path: `/blog/${article}/` };
}
export async function generateMetadata({ params }: Props) {
  const { a, path } = await getPage(params);
  const metadata = meta(path, a.title, a.description, true);
  return a.published ? { ...metadata, openGraph: { ...metadata.openGraph, type: 'article' as const, publishedTime: a.published } } : metadata;
}
export default async function Page({ params }: Props) {
  const { a, path } = await getPage(params);
  const date = a.published && new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(a.published));
  const consultation = consultationLinks[a.slug];
  return <main id="tresc" className="reading">
    <Crumbs path={path} title={a.title}/>
    <article>
      <h1>{a.h1}</h1>
      <ArticleByline/>
      {date && <p>Opublikowano: <time dateTime={a.published}>{date}</time></p>}
      <Json data={articleJsonLd({ slug: a.slug, headline: a.h1, description: a.description, image: domain + '/og-image.png', datePublished: a.published })}/>
      {a.slug === 'samotnosc' ? <LonelinessArticle/> : a.slug === 'poczucie-wlasnej-wartosci' ? <SelfWorthArticle/> : a.sections?.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}
      {consultation && <p className="mt-6">Jeśli temat dotyczy Pana/Pani sytuacji, można przeczytać, <a href={consultation[0]}>{consultation[1]}</a>.</p>}
    </article>
    <SeeAlso links={[[a.link, a.sections ? 'Więcej o tym, jak pracuję' : 'Psychoterapia indywidualna dorosłych'], [paths.faq, 'Pytania przed konsultacją']]}/>
  </main>;
}
