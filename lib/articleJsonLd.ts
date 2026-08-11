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
  datePublished: string;
  image: string;
  faq: ArticleFaq;
}): Record<string, unknown> {
  const url = `https://psychologplebaniak.pl/blog/${opts.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: opts.headline,
        description: opts.description,
        inLanguage: 'pl-PL',
        author: { '@type': 'Person', name: 'Grzegorz Plebaniak' },
        publisher: {
          '@type': 'LocalBusiness',
          name: 'Grzegorz Plebaniak – gabinet psychologiczny',
          url: 'https://psychologplebaniak.pl',
        },
        datePublished: opts.datePublished,
        dateModified: opts.datePublished,
        image: opts.image,
        mainEntityOfPage: url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://psychologplebaniak.pl' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://psychologplebaniak.pl/blog' },
          { '@type': 'ListItem', position: 3, name: opts.headline, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: opts.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  };
}
