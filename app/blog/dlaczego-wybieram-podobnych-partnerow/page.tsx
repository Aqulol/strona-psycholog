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
const updated = '2026-11-26';

const {description, published: publication} = standalonePublication['dlaczego-wybieram-podobnych-partnerow'];
const seo = meta('/blog/dlaczego-wybieram-podobnych-partnerow/', 'Wybieranie podobnych partnerów: dlaczego się powtarza?', description, true);
export const metadata: Metadata = {...seo, openGraph: {...seo.openGraph, type:'article', publishedTime:publication, modifiedTime:updated}};

const faq: [string, string][] = [
  [
    'Czy podobne wybory w relacjach zawsze są powodem do niepokoju?',
    'Nie. Powtarzalne wzorce występują u wielu osób. O problemie warto myśleć wtedy, gdy regularnie prowadzą do cierpienia, ograniczają wybór lub utrudniają tworzenie bezpiecznej bliskości.',
  ],
  [
    'Czy za każdy schemat odpowiada dzieciństwo?',
    'Nie. Znaczenie mają także późniejsze związki, temperament, aktualne warunki życia i doświadczenia społeczne. Terapia bada indywidualną historię zamiast zakładać jedną przyczynę.',
  ],
  [
    'Czy samo rozpoznanie wzorca wystarczy, aby go zmienić?',
    'Zwykle jest konieczne, ale nie zawsze wystarczające. Schemat obejmuje emocje i automatyczne sposoby reagowania, dlatego zmiana wymaga czasu oraz wielokrotnego przepracowania.',
  ],
];

const ld = articleJsonLd({
  headline: 'Dlaczego ciągle wybieram podobnych partnerów?',
  description,
  slug: 'dlaczego-wybieram-podobnych-partnerow',
  datePublished: publication,
  dateModified: updated,
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  const layout = withArticleContents(contextLinks('/blog/dlaczego-wybieram-podobnych-partnerow/', body));
  return (
    <>
      <main id="tresc" className="container section max-w-3xl article-editorial">
      <Crumbs path="/blog/dlaczego-wybieram-podobnych-partnerow/" title={'Dlaczego ciągle wybieram podobnych partnerów?'}/>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Dlaczego ciągle wybieram podobnych partnerów?
      </h1>
        <ArticleByline/>
      <p className="mt-4 text-sm text-ink/70">Opublikowano <time dateTime="2026-08-11">11 sierpnia 2026</time> · Zaktualizowano <time dateTime={updated}>26 listopada 2026</time> <ReadingTime minutes={readingMinutes(body)}/></p>
        {layout.contents}{layout.body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
