import type { MetadataRoute } from 'next';
import { domain } from '../lib/site';

export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: ['OAI-SearchBot', 'Bingbot'], allow: '/' },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
