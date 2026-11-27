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

const {description, published: publication} = standalonePublication['relacja-terapeutyczna-zrodlo-zmiany'];

const seo=meta('/blog/relacja-terapeutyczna-zrodlo-zmiany/','Relacja terapeutyczna jako źródło zmiany',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:publication}};

const faq: [string, string][] = [
  [
    'Czy przywiązanie do terapeuty jest czymś niewłaściwym?',
    'Nie. Uczucia wobec terapeuty są naturalną częścią znaczącej, regularnej relacji. Ważne jest, aby mogły zostać omówione przy zachowaniu profesjonalnych granic.',
  ],
  [
    'Czy można powiedzieć terapeucie o złości lub rozczarowaniu?',
    'Tak. Rozmowa o trudnych reakcjach może dostarczyć ważnych informacji i pomóc naprawić nieporozumienie. Terapeuta powinien przyjąć taki temat z ciekawością, a nie odwetem.',
  ],
  [
    'Po czym poznać bezpieczne ramy terapii?',
    'Zasady są jasne, poufność omówiona, a granice konsekwentne. Terapeuta nie wykorzystuje relacji do zaspokajania własnych potrzeb i jest otwarty na pytania dotyczące sposobu pracy.',
  ],
];

const ld = articleJsonLd({
  headline: 'Relacja terapeutyczna jako źródło zmiany',
  description,
  slug: 'relacja-terapeutyczna-zrodlo-zmiany',
  datePublished: publication,
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  const layout = withArticleContents(contextLinks('/blog/relacja-terapeutyczna-zrodlo-zmiany/', body));
  return (
    <>
      <main id="tresc" className="container section max-w-3xl article-editorial">
      <Crumbs path="/blog/relacja-terapeutyczna-zrodlo-zmiany/" title={'Relacja terapeutyczna jako źródło zmiany'}/>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Relacja terapeutyczna jako źródło zmiany
      </h1>
        <ArticleByline/>
      <p className="mt-4 text-sm text-ink/70">11 sierpnia 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {layout.contents}{layout.body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
