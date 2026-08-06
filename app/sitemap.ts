export const dynamic='force-static';
import type {MetadataRoute} from 'next';export default function sitemap():MetadataRoute.Sitemap{return ['/','/blog/artykul-1','/blog/artykul-2','/blog/artykul-3','/blog/artykul-4','/polityka-prywatnosci'].map(url=>({url:'https://twojadomena.pl'+url,lastModified:new Date()}))}
