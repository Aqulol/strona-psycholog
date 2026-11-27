import { body } from './content';
import ReadingTime from '../../../components/ReadingTime';
import { readingMinutes } from '../../../lib/reading-time';
import ArticleByline from '../../../components/ArticleByline';
import {Crumbs} from '../../../components/Site';
import {meta} from '../../../lib/site';
import type { Metadata } from 'next';
import { articleJsonLd } from '../../../lib/articleJsonLd';

const description =
  'Co dzieje się w relacji z psychoterapeutą? O tym, jak podczas spotkań można dostrzec powracające wzorce, emocje i oczekiwania wobec innych osób.';

const seo=meta('/blog/relacja-terapeutyczna-zrodlo-zmiany/','Relacja terapeutyczna jako źródło zmiany',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:'2026-08-11'}};

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
  datePublished: '2026-08-11',
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  return (
    <>
      <main id="tresc" className="container section max-w-3xl">
      <Crumbs path="/blog/relacja-terapeutyczna-zrodlo-zmiany/" title={'Relacja terapeutyczna jako źródło zmiany'}/>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Relacja terapeutyczna jako źródło zmiany
      </h1>
        <ArticleByline/>
      <p className="mt-4 text-sm text-ink/70">11 sierpnia 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
