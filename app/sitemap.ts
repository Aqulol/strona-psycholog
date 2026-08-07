export const dynamic='force-static';
import type{MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{
  return [
    '/',
    '/blog/jak-radzic-sobie-z-lekiem',
    '/blog/psychoterapia-psychodynamiczna',
    '/blog/pierwsza-wizyta-u-psychologa',
    '/blog/wypalenie-zawodowe',
    '/polityka-prywatnosci',
  ].map(url=>({url:'https://psychologplebaniak.pl'+url,lastModified:new Date()}));
}
