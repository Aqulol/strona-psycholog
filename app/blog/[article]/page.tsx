import {withArticleContents} from '../../../components/ArticleContents';
import RelatedContent from '../../../components/RelatedContent';
import { services } from '../../../lib/services';
import { contextLinks } from '../../../lib/context-links';
import ReadingTime from '../../../components/ReadingTime';
import { blogReadingMinutes, generatedArticles } from '../../../lib/blog-content';
import BlogReading from '../../../components/BlogReading';
import { topicPath } from '../../../lib/help-topics';
import { notFound } from 'next/navigation';
import { articleJsonLd } from '../../../lib/articleJsonLd';
import ArticleByline from '../../../components/ArticleByline';
import { domain, meta, paths } from '../../../lib/site';
import { Crumbs, Json, SeeAlso } from '../../../components/Site';

type Props = { params: Promise<{ article: string }> };
const consultationLinks: Record<string, [string,string]> = {
  samotnosc: [topicPath('samotnosc'), 'jak rozmawiam o samotności na konsultacji'],
  'poczucie-wlasnej-wartosci': [topicPath('niska-samoocena'), 'jak wygląda konsultacja dotycząca samooceny'],
  'dlaczego-wybieram-podobnych-partnerow': [topicPath('podobni-partnerzy'), 'jak wygląda konsultacja dotycząca powtarzających się wyborów w związkach'],
  'relacja-terapeutyczna-zrodlo-zmiany': [topicPath('powtarzajace-sie-trudnosci-w-relacjach'), 'jak rozmawiam o powtarzających się trudnościach w relacjach'],
  'czy-przeszlosc-ma-znaczenie': [topicPath('wczesniejsze-doswiadczenia-a-relacje'), 'jak można omówić wpływ wcześniejszych doświadczeń na obecne relacje'],
  'narcyzm-wrazliwy': [topicPath('narcyzm'), 'co można omówić na konsultacji dotyczącej trudności związanych z narcyzmem'],
};
export const dynamicParams = false;
export function generateStaticParams() { return generatedArticles.map(a => ({ article: a.slug })); }
async function getPage(params: Props['params']) {
  const { article } = await params;
  const a = generatedArticles.find(p => p.slug === article);
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
  const {body,contents} = withArticleContents(contextLinks(path,a.body));
  const consultation = consultationLinks[a.slug];
  return <main id="tresc" className="reading article-editorial">
    <Crumbs path={path} title={a.title}/>
    <article>
      <h1>{a.h1}</h1>
      <ArticleByline minutes={date ? undefined : blogReadingMinutes(a.slug)}/>
      {date && <p>Opublikowano: <time dateTime={a.published}>{date}</time> <ReadingTime minutes={blogReadingMinutes(a.slug)}/></p>}
      <Json data={articleJsonLd({ slug: a.slug, headline: a.h1, description: a.description, image: domain + '/og-image.png', datePublished: a.published })}/>
      {contents}{body}
      {consultation && <p className="mt-6">Jeśli temat dotyczy Pana/Pani sytuacji, można przeczytać, <a href={consultation[0]}>{consultation[1]}</a>.</p>}
      {a.slug === 'tfp-dla-kogo' && <p>Na pytanie, jak ocenia się funkcjonowanie osobowości, odpowiadam osobno w opisie <a data-context-link href={services.personality.href}>diagnozy osobowości</a>. Sama ocena nie przesądza, czy proponowana psychoterapia będzie odpowiednia.</p>}
      <BlogReading slug={a.slug}/>
    </article>
    <RelatedContent path={path}/>
    <SeeAlso links={[[a.link, a.slug === 'adhd-u-doroslych' ? 'Diagnoza ADHD we Wrocławiu' : a.sections ? 'Więcej o tym, jak pracuję' : 'Psychoterapia indywidualna dorosłych'], [paths.faq, 'Pytania przed konsultacją']]}/>
  </main>;
}
