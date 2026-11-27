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

const {description, published: publication} = standalonePublication['dlaczego-sama-swiadomosc-nie-wystarcza'];

const seo=meta('/blog/dlaczego-sama-swiadomosc-nie-wystarcza/','Dlaczego sama świadomość nie wystarcza?',description,true);
export const metadata: Metadata={...seo,openGraph:{...seo.openGraph,type:'article',publishedTime:publication}};

const faq: [string, string][] = [
  [
    'Czy wgląd jest w takim razie niepotrzebny?',
    'Jest potrzebny, ponieważ pomaga rozpoznać wzorzec i nadać mu znaczenie. Największą moc zyskuje jednak wtedy, gdy łączy się z emocjami i doświadczeniem relacyjnym.',
  ],
  [
    'Dlaczego po ważnej sesji problem czasem wraca?',
    'Jedna rozmowa może przynieść ulgę, ale utrwalone sposoby reagowania uruchamiają się automatycznie. Powrót schematu nie musi oznaczać porażki; przepracowanie wymaga powtórzeń.',
  ],
  [
    'Czy terapia psychodynamiczna daje konkretne narzędzia?',
    'Jej głównym „narzędziem” jest pogłębione rozumienie i praca w relacji. Efektem mogą być bardzo konkretne zdolności: wcześniejsze rozpoznawanie emocji, stawianie granic i bardziej świadome decyzje.',
  ],
];

const ld = articleJsonLd({
  headline: 'Dlaczego sama świadomość nie wystarcza?',
  description,
  slug: 'dlaczego-sama-swiadomosc-nie-wystarcza',
  datePublished: publication,
  image: 'https://psychologplebaniak.pl/og-image.png',
  faq,
});

export default function Page() {
  const layout = withArticleContents(contextLinks('/blog/dlaczego-sama-swiadomosc-nie-wystarcza/', body));
  return (
    <>
      <main id="tresc" className="container section max-w-3xl article-editorial">
      <Crumbs path="/blog/dlaczego-sama-swiadomosc-nie-wystarcza/" title={'Dlaczego sama świadomość nie wystarcza?'}/>
      <h1 className="mt-8 text-5xl leading-tight text-green md:text-6xl">
        Dlaczego sama świadomość nie wystarcza?
      </h1>
        <ArticleByline/>
      <p className="mt-4 text-sm text-ink/70">11 sierpnia 2026 <ReadingTime minutes={readingMinutes(body)}/></p>
        {layout.contents}{layout.body}
    </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
