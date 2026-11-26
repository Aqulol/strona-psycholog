import {officeId, personId} from './entities';
/**
 * Structured data (schema.org) dla artykułów bloga.
 * Spójne z JSON-LD strony głównej (app/page.tsx): ten sam @context,
 * ten sam format @graph, LocalBusiness jako publisher.
 */

export type ArticleFaq = [string, string][];

export function articleJsonLd(opts: {
  headline: string;
  description: string;
  slug: string;
  datePublished?: string;
  dateModified?: string;
  image: string;
  faq?: ArticleFaq;
}): Record<string, unknown> {
  // Końcówka '/' zgodna z canonical i rzeczywistym adresem (trailingSlash: true).
  const url = `https://psychologplebaniak.pl/blog/${opts.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: opts.headline,
        description: opts.description,
        inLanguage: 'pl-PL',
        '@id': `${url}#artykul`,
        author: { '@id': personId },
        publisher: { '@id': officeId },
        ...(opts.datePublished ? {datePublished: opts.datePublished} : {}),
        ...(opts.dateModified ? {dateModified: opts.dateModified} : {}),
        image: opts.image,
        mainEntityOfPage: url,
      },
      ...(opts.faq?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: opts.faq.map(([q, a]) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            },
          ]
        : []),
    ],
  };
}
