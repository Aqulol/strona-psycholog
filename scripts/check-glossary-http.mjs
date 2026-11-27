import assert from 'node:assert/strict';
import {readRegistry} from './glossary-registry.mjs';
import {glossaryPrefix,isPublishedTerm} from '../lib/glossary-policy.mjs';
import {inspectHtml,assertIndexable,parseSitemap} from './sitemap-lib.mjs';
const base=process.env.PREVIEW_URL??'http://127.0.0.1:3010';
const terms=readRegistry();
const response=await fetch(`${base}/sitemap.xml`);
assert.equal(response.status,200);
const sitemap=parseSitemap(await response.text());
for(const term of terms){
 const path=`${glossaryPrefix}${term.slug}/`;
 const response=await fetch(base+path,{redirect:'manual'});
 if(!isPublishedTerm(term)){assert.equal(response.status,404,path);continue;}
 assert.equal(response.status,200,path);
 assert.match(response.headers.get('content-type')??'',/^text\/html/);
 const html=await response.text();
 const page=inspectHtml(html);
 assertIndexable(page,path);
 for(const related of terms.filter(row=>isPublishedTerm(row)&&term.related.includes(row.slug)))assert.ok(page.links.includes(`${glossaryPrefix}${related.slug}/`),`${path}: missing related ${related.slug}`);
 assert.ok(page.content.includes(term.definition),`${path}: definition not in server HTML`);
 assert.ok(sitemap.has(path),path);
}
assert.equal((await fetch(`${base}${glossaryPrefix}nieistniejace-haslo/`)).status,404);
console.log(`HTTP: ${terms.filter(isPublishedTerm).length} haseł, sitemapa i rzeczywiste 404 — OK.`);
