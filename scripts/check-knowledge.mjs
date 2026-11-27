import {readRegistry} from './glossary-registry.mjs';
import {isPublishedTerm} from '../lib/glossary-policy.mjs';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {readExport} from './sitemap-lib.mjs';
import {findContent,fold} from '../lib/search-core.mjs';
const index=JSON.parse(readFileSync('out/indeks-tresci.json','utf8'));
const {pages}=readExport();
assert.equal(index.length,pages.size);
assert.deepEqual(new Set(index.map(x=>x.href)),new Set(pages.keys()));
assert.ok(index.every(x=>x.title && x.terms && x.group));
assert.equal(fold('ŁÓDŹ, ŻAŁOBA'), 'lodz, zaloba');
for(const [query, expected] of [
 ['żAłOba','/w-czym-pomagam/zaloba/'],['zaloby','/w-czym-pomagam/zaloba/'],['borderlne','/w-czym-pomagam/borderline/'],['diagnoza adhd','/diagnoza-adhd-wroclaw/'],['ruminacje','/w-czym-pomagam/nadmierne-analizowanie/'],
 ['borderline','/diagnoza-osobowosci-wroclaw/'],['borderline','/terapia-skoncentrowana-na-przeniesieniu-tfp/'],['borderline','/blog/tfp-dla-kogo/'],
]) assert.ok(findContent(index,query).some(row=>row.href===expected),`${query}: ${expected}`);
assert.deepEqual(findContent(index,'xxxqqqzzz'),[]);
const terms=readRegistry();
for(const row of terms){
 const href=`/slownik-psychologiczny/${row.slug}/`;
 const present=pages.has(href);
 for(const link of row.links)assert.ok(pages.has(link.href.split('#')[0]),`${row.slug}: ${link.href}`);
 assert.equal(present,isPublishedTerm(row),href);
 assert.equal(existsSync(`out${href}index.html`),present,href);
 assert.equal(index.some(entry=>entry.href===href),present,href);
 if(present){
  const html=readFileSync(`out${href}index.html`,'utf8');
  for(const marker of ['DefinedTerm','BreadcrumbList','Zacytuj to hasło']) assert.ok(html.includes(marker),`${href}: ${marker}`);
 }
}
for(const route of ['slownik-psychologiczny','kiedy-zglosic-sie-na-terapie']){
 const main=readFileSync(`out/${route}/index.html`,'utf8').match(/<main\b[\s\S]+?<\/main>/)?.[0];
 assert.ok(main);
 assert.ok(!/type="search"|Szukaj pojęcia|Szukaj tematu|Wyczyść filtry/.test(main),route);
 assert.ok(main.includes('data-filter-group')&&main.includes('data-filter-row'),route);
}
const crisis=readFileSync('out/pomoc-w-kryzysie/index.html','utf8').match(/<main\b[\s\S]+?<\/main>/)?.[0];
assert.ok(crisis?.includes('href="tel:112"'));
assert.ok(!crisis.includes('booksy.com'));
assert.ok(existsSync('out/404.html')&&!existsSync('out/404/index.html'));
console.log(`${index.length} wpisów indeksu, ${terms.length} statusów haseł i ścieżka pomocy kryzysowej: OK.`);
