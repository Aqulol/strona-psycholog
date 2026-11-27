import { body, faq } from './content';
import ReadingTime from '../../../components/ReadingTime';
import { readingMinutes } from '../../../lib/reading-time';
import ArticleByline from '../../../components/ArticleByline';
import {Crumbs} from '../../../components/Site';
import {meta} from '../../../lib/site';
import type { Metadata } from 'next';
import { articleJsonLd } from '../../../lib/articleJsonLd';

const description =
  'Jak wybrać psychoterapeutę i o co zapytać podczas konsultacji? W tekście omawiam wykształcenie, szkolenie, superwizję i zasady regularnych spotkań.';

const seo=meta('/blog/jak-wybrac-psychoterapeute/','Jak wybrać psychoterapeutę?',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:'2026-08-20'}};

const ld = articleJsonLd({
  headline: 'Jak wybrać psychoterapeutę? Praktyczny przewodnik',
  description,
  slug: 'jak-wybrac-psychoterapeute',
  datePublished: '2026-08-20',
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  return (
    <>
      <main id="tresc" className="container section max-w-3xl">
        <Crumbs path="/blog/jak-wybrac-psychoterapeute/" title={'Jak wybrać psychoterapeutę? Praktyczny przewodnik'}/>
        <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
          Jak wybrać psychoterapeutę? Praktyczny przewodnik
        </h1>
        <ArticleByline/>
        <p className="mt-4 text-sm text-ink/70">20 sierpnia 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
