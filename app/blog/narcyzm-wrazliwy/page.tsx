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
const description =
  'Narcyzm wrażliwy a relacje: wrażliwość na krytykę, poczucie własnej wartości i bliskość. Wyjaśniam, dlaczego ten opis nie jest odrębną diagnozą.';
const slug = 'narcyzm-wrazliwy';
const datePublished = '2026-10-14';

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
  return (
    <>
      <main id="tresc" className="container section max-w-3xl">
        <Crumbs path="/blog/narcyzm-wrazliwy/" title={headline}/>
        <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">{headline}</h1>
        <ArticleByline/>
        <p className="mt-4 text-sm text-ink/70">14 października 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {contextLinks('/blog/narcyzm-wrazliwy/', body)}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
