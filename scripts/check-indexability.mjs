import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {auditLinks,checkRobots,noindex,origin,parseSitemap,readExport} from './sitemap-lib.mjs';
import {mapConcurrent,traceUrl} from './http-seo.mjs';

const args=process.argv.slice(2);
const base=args.find(x=>/^https?:\/\//.test(x));
const output=args.find(x=>x.startsWith('--json='))?.slice(7);
const {pages,redirects}=readExport();
const local=parseSitemap(readFileSync('out/sitemap.xml','utf8'));
assert.deepEqual(new Set(local.keys()),new Set(pages.keys()),'Sitemap/export mismatch');
for(const [path,date] of local)assert.equal(pages.get(path).lastmod,date,path);
const search=JSON.parse(readFileSync('out/indeks-tresci.json','utf8'));
assert.deepEqual(new Set(search.map(x=>x.href)),new Set(local.keys()));
const links=auditLinks(pages,redirects);
for(const name of ['broken','legacy','orphaned','unreachable'])assert.deepEqual(links[name],[],name);
console.log(`Export: ${pages.size} indexable canonical SSR pages, depth ${links.maxDepth}.`);
if(base){
 const get=path=>fetch(new URL(path,base),{redirect:'manual',signal:AbortSignal.timeout(15000)});
 const xml=await get('/sitemap.xml'),robots=await get('/robots.txt');
 assert.equal(xml.status,200,'sitemap.xml');assert.match(xml.headers.get('content-type')??'',/^(application|text)\/xml\b/i);
 assert.equal(robots.status,200,'robots.txt');assert.match(robots.headers.get('content-type')??'',/^text\/plain\b/i);
 checkRobots(await robots.text());
 const remote=parseSitemap(await xml.text());
 const paths=[...new Set([...local.keys(),...remote.keys()])];
 const missing=['/404/','/audyt-seo-nieistniejacy/','/blog/audyt-seo-nieistniejacy.html','/slownik-psychologiczny/audyt-seo-nieistniejacy/'];
 const traces=await mapConcurrent([...paths,...missing],async path=>({path,...await traceUrl(new URL(path,base))}));
 if(output)writeFileSync(output,JSON.stringify(traces,null,2)+'\n');
 assert.deepEqual(new Set(remote.keys()),new Set(local.keys()),'HTTP sitemap URL set differs from export');
 for(const [path,date] of remote)assert.equal(date,local.get(path),`${path}: HTTP lastmod differs from local`);
 for(const {path,error,chain} of traces){
  assert.equal(error,undefined,path);assert.equal(chain.length,1,path);
  const [entry]=chain;
  if(missing.includes(path)){assert.equal(entry.status,404,path);assert.deepEqual(entry.h1,['Tej strony nie ma'],path);continue;}
  assert.equal(entry.status,200,path);assert.match(entry.type??'',/^text\/html\b/i);
  assert.deepEqual(entry.canonical,[origin+path],path);
  assert.deepEqual(entry.h1,pages.get(path).headings,path);
  assert.ok(!entry.refresh.length&&!noindex(entry.xRobots)&&!entry.metaRobots.some(x=>noindex(x.content)),path);
  assert.equal(entry.mainCharacters,pages.get(path).content.length,`${path}: unexpected SSR text size`);
 }
 console.log(`HTTP: ${paths.length} direct 200s, canonical, robots and SSR; ${missing.length} real 404s.`);
}
