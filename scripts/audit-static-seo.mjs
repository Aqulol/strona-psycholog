import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {parse} from 'parse5';
import {auditLinks,hosting,readExport} from './sitemap-lib.mjs';
const folder=process.argv[2]??'out';
const {pages}=readExport(folder);
const linkReport=auditLinks(pages,new Map(hosting.redirects.map(rule=>[rule.source,rule.destination])));
const rows=[];
const issue=[];
function nodes(node,insideMain=false) {
  const main=insideMain || node.tagName==='main';
  return [{...node,main},...(node.childNodes??[]).flatMap(child=>nodes(child,main))];
}
const attr=(node,key)=>node.attrs?.find(a=>a.name===key)?.value;
const count=new Map();
function* typed(value) {
  if (!value || typeof value!=='object') return;
  if (value['@type']) yield* [value['@type']].flat();
  for (const child of Object.values(value)) yield* typed(child);
}
for(const [path,page] of pages) {
  const tree=nodes(parse(readFileSync(join(folder,path,'index.html'),'utf8')));
  const descriptions=tree.filter(node=>node.tagName==='meta' && attr(node,'name')==='description').map(node=>attr(node,'content'));
  const headings=tree.filter(node=>node.main && /^h[1-6]$/.test(node.tagName??'')).map(node=>Number(node.tagName[1]));
  if(descriptions.length!==1 || !descriptions[0]?.trim()) issue.push([path,'Missing/multiple description']);
  if(headings.some((number,index)=>index>0 && number>headings[index-1]+1)) issue.push([path,'Heading level skip in main',headings.join(',')]);
  const schemas=[];
  for(const node of tree.filter(node=>node.tagName==='script' && attr(node,'type')==='application/ld+json')) {
    const data=JSON.parse(node.childNodes?.[0]?.value ?? '');
    for (const type of typed(data)) {schemas.push(type);count.set(type,(count.get(type)??0)+1);}
  }
  const incoming=[...pages].filter(([source,entry])=>source!==path && entry.links.some(href=>{
    try { const url=new URL(href,entry.url);return url.origin==='https://psychologplebaniak.pl' && url.pathname===path; } catch {return false;}
  })).length;
  rows.push({path,title:page.titles[0],description:descriptions[0]??'',h1:page.headings[0],incoming,lastmod:page.lastmod??'',schemas:[...new Set(schemas)]});
}
for (const field of ['title','description','h1']) {
  const groups=Map.groupBy(rows,r=>r[field].trim().toLowerCase());
  for(const [value,matches] of groups) if(value && matches.length>1) issue.push([field,'Exact duplicate',matches.map(r=>r.path)]);
}
console.log(JSON.stringify({links:linkReport,types:Object.fromEntries(count),issues:issue,pages:rows},null,2));
