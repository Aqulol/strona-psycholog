import {standalonePublication} from '../../../lib/blog-publication';
import {withArticleContents} from '../../../components/ArticleContents';
import { contextLinks } from '../../../lib/context-links';
import { body } from './content';
import ReadingTime from '../../../components/ReadingTime';
import { readingMinutes } from '../../../lib/reading-time';
import ArticleByline from '../../../components/ArticleByline';
import {Crumbs} from '../../../components/Site';
import {meta} from '../../../lib/site';
import type { Metadata } from 'next';
import { articleJsonLd } from '../../../lib/articleJsonLd';

const {description, published: publication} = standalonePublication['czy-przeszlosc-ma-znaczenie'];

const seo=meta('/blog/czy-przeszlosc-ma-znaczenie/','Czy przeszłość wpływa na relacje?',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:publication}};

const faq: [string, string][] = [
  [
    'Czy psychoterapia psychodynamiczna zawsze skupia się na dzieciństwie?',
    'Nie. Historia jest badana w związku z aktualnymi trudnościami. Dużo uwagi poświęca się bieżącym emocjom, relacjom i temu, co dzieje się podczas sesji.',
  ],
  [
    'Co, jeśli prawie nie ma wspomnień z wczesnych lat?',
    'Dokładne wspomnienia nie są warunkiem terapii. Materiałem do pracy pozostają obecne reakcje, wzorce relacyjne, uczucia, fantazje i sposób przeżywania kontaktu.',
  ],
  [
    'Czy zrozumienie przeszłości zmienia teraźniejszość?',
    'Może ją zmieniać, jeśli nie pozostaje wyłącznie wyjaśnieniem intelektualnym. Znaczenie ma emocjonalne przepracowanie oraz rozwijanie nowych sposobów bycia w relacji.',
  ],
];

const ld = articleJsonLd({
  headline: 'Czy przeszłość naprawdę ma aż takie znaczenie?',
  description,
  slug: 'czy-przeszlosc-ma-znaczenie',
  datePublished: publication,
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  const layout = withArticleContents(contextLinks('/blog/czy-przeszlosc-ma-znaczenie/', body));
  return (
    <>
      <main id="tresc" className="container section max-w-3xl article-editorial">
      <Crumbs path="/blog/czy-przeszlosc-ma-znaczenie/" title={'Czy przeszłość naprawdę ma aż takie znaczenie?'}/>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Czy przeszłość naprawdę ma aż takie znaczenie?
      </h1>
        <ArticleByline/>
      <p className="mt-4 text-sm text-ink/70">11 sierpnia 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {layout.contents}{layout.body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
