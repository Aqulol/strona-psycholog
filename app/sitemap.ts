export const dynamic='force-static';
import type{MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{
  return [
    '/',
    '/blog',
    '/blog/dlaczego-wybieram-podobnych-partnerow',
    '/blog/dlaczego-sama-swiadomosc-nie-wystarcza',
    '/blog/relacja-terapeutyczna-zrodlo-zmiany',
    '/blog/czy-przeszlosc-ma-znaczenie',
    '/polityka-prywatnosci',
  ].map(url=>({url:'https://psychologplebaniak.pl'+url,lastModified:new Date()}));
}
