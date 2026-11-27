import { empathyArticle } from './empathy-article';
import { adhdArticle } from './adhd-article';
import type { ReactNode } from 'react';
import { body as past } from '../app/blog/czy-przeszlosc-ma-znaczenie/content';
import { body as awareness } from '../app/blog/dlaczego-sama-swiadomosc-nie-wystarcza/content';
import { body as partners } from '../app/blog/dlaczego-wybieram-podobnych-partnerow/content';
import { body as choosing } from '../app/blog/jak-wybrac-psychoterapeute/content';
import { body as narcissism } from '../app/blog/narcyzm-wrazliwy/content';
import { body as alliance } from '../app/blog/relacja-terapeutyczna-zrodlo-zmiany/content';
import { LonelinessArticle, SelfWorthArticle } from '../components/FeatureArticleContent';
import { editorial } from './editorial';
import { featureArticles } from './feature-articles';
import { readingMinutes } from './reading-time';
import { articles, paths } from './site';

const features = {
  samotnosc: LonelinessArticle,
  'poczucie-wlasnej-wartosci': SelfWorthArticle,
};

export const generatedArticles = [
  empathyArticle,
  adhdArticle,
  ...featureArticles.map(article => ({ ...article, sections: undefined, link: paths.adults, body: features[article.slug]() })),
  ...editorial.flatMap(article => article.slug && article.sections ? [{
    ...article, slug: article.slug, published: undefined,
    body: article.sections.map(([heading, text]) => <section key={heading}><h2>{heading}</h2><p>{text}</p></section>),
  }] : []),
];

const standaloneBodies = {
  'narcyzm-wrazliwy': narcissism,
  'jak-wybrac-psychoterapeute': choosing,
  'dlaczego-wybieram-podobnych-partnerow': partners,
  'dlaczego-sama-swiadomosc-nie-wystarcza': awareness,
  'relacja-terapeutyczna-zrodlo-zmiany': alliance,
  'czy-przeszlosc-ma-znaczenie': past,
} satisfies Record<(typeof articles)[number][0], ReactNode>;

const bodies = new Map<string, ReactNode>([
  ...Object.entries(standaloneBodies),
  ...generatedArticles.map(({ slug, body }): [string, ReactNode] => [slug, body]),
]);

export function blogReadingMinutes(slug: string) {
  if (!bodies.has(slug)) throw new Error(`Missing blog content for: ${slug}`);
  return readingMinutes(bodies.get(slug));
}
