import type { Metadata } from 'next';

export const socialImage = {
  url: '/og-image.png',
  alt: 'Grzegorz Plebaniak – psycholog i psychoterapeuta we Wrocławiu',
  width: 1200,
  height: 630,
  type: 'image/png',
};

const socialIdentity = {
  siteName: 'Grzegorz Plebaniak – psycholog i psychoterapeuta',
  locale: 'pl_PL' as const,
  images: [socialImage],
};

type OpenGraphMetadata = NonNullable<Metadata['openGraph']>;

type WebsiteOpenGraphInput = {
  url: string;
  title: string;
  description: string;
};

export function websiteOpenGraph({ url, title, description }: WebsiteOpenGraphInput): OpenGraphMetadata {
  return {
    ...socialIdentity,
    type: 'website',
    url,
    title,
    description,
  };
}

type ArticleOpenGraphInput = WebsiteOpenGraphInput & {
  publishedTime: string;
};

export function articleOpenGraph({
  url,
  title,
  description,
  publishedTime,
}: ArticleOpenGraphInput): OpenGraphMetadata {
  return {
    ...socialIdentity,
    type: 'article',
    url,
    title,
    description,
    publishedTime,
  };
}
