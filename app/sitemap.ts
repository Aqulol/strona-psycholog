export const dynamic='force-static';
import type{MetadataRoute} from 'next';
export default function sitemap():MetadataRoute.Sitemap{
  // Wszystkie adresy z końcówką '/' — serwer (trailingSlash:true) serwuje
  // wersje z ukośnikiem bez przekierowania (301), a Google odrzuca
  // przekierowane adresy w sitemap/inspection jako „Błąd przekierowania”.
  return [
    '/',
    '/blog/',
    '/blog/dlaczego-wybieram-podobnych-partnerow/',
    '/blog/dlaczego-sama-swiadomosc-nie-wystarcza/',
    '/blog/relacja-terapeutyczna-zrodlo-zmiany/',
    '/blog/czy-przeszlosc-ma-znaczenie/',
    '/polityka-prywatnosci/',
  ].map(url=>({url:'https://psychologplebaniak.pl'+url,lastModified:new Date()}));
}
