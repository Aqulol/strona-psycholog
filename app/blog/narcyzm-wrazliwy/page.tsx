import {standalonePublication} from '../../../lib/blog-publication';
import {withArticleContents} from '../../../components/ArticleContents';
import RelatedContent from '../../../components/RelatedContent';
import { services } from '../../../lib/services';
import { contextLinks } from '../../../lib/context-links';
import { body } from './content';
import ReadingTime from '../../../components/ReadingTime';
import { readingMinutes } from '../../../lib/reading-time';
import ArticleByline from '../../../components/ArticleByline';
import {Crumbs} from '../../../components/Site';
import {meta} from '../../../lib/site';
import type { Metadata } from 'next';
import { articleJsonLd } from '../../../lib/articleJsonLd';

const headline = 'Narcyzm wrażliwy: czym jest i jak może wpływać na relacje?';
const {description, published: publication} = standalonePublication['narcyzm-wrazliwy'];
const slug = 'narcyzm-wrazliwy';
const datePublished = publication;

const seo=meta('/blog/narcyzm-wrazliwy/','Narcyzm wrażliwy a relacje',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:datePublished}};

const ld = articleJsonLd({
  headline,
  description,
  slug,
  datePublished,
  image: 'https://psychologplebaniak.pl/og-image.png',
});

export default function Page() {
  const layout = withArticleContents(contextLinks('/blog/narcyzm-wrazliwy/', body));
  return (
    <>
      <main id="tresc" className="container section max-w-3xl article-editorial">
        <Crumbs path="/blog/narcyzm-wrazliwy/" title={headline}/>
        <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">{headline}</h1>
        <ArticleByline/>
        <p className="mt-4 text-sm text-ink/70">14 października 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {layout.contents}{layout.body}
        <p>To, co teoria opisuje jako narcyzm wrażliwy, nie jest wynikiem testu ani odrębnym rozpoznaniem. Jeśli pytanie dotyczy oceny klinicznej, osobno opisuję, jak wygląda <a data-context-link href={services.personality.href}>diagnoza osobowości</a>.</p>
      <RelatedContent path="/blog/narcyzm-wrazliwy/"/>
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
