import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {auditLinks,hosting,parseSitemap,readExport} from './sitemap-lib.mjs';
import {inspectRedirectRules} from './redirect-policy.mjs';
import {mapConcurrent,traceUrl} from './http-seo.mjs';

const args=process.argv.slice(2);
const http=args.find(x=>/^https?:\/\//.test(x));
const baseline=args.find(x=>x.startsWith('--baseline-config='))?.slice(18);
const before=Boolean(baseline);
const targetFile=args.find(x=>x.startsWith('--json='))?.slice(7);
const config=before?JSON.parse(readFileSync(baseline,'utf8')).hosting:hosting;
const graph=inspectRedirectRules(config.redirects);
const sitemap=parseSitemap(readFileSync('out/sitemap.xml','utf8'));
const paths=[...sitemap.keys()];
if(!before){
 const {pages,redirects}=readExport();
 assert.deepEqual(new Set(pages.keys()),new Set(paths),'Sitemap/export mismatch');
 for(const [from,to] of graph){
  assert.ok(!sitemap.has(from),`Redirect in sitemap: ${from}`);
  assert.ok(sitemap.has(to),`Missing destination: ${from} → ${to}`);
 }
 for(const path of paths.filter(x=>x!=='/'))assert.equal(graph.get(`${path.slice(0,-1)}.html`),path,`Run npm run redirects:sync-html after changing routes: ${path}`);
 const links=auditLinks(pages,redirects);
 assert.deepEqual([...links.broken,...links.legacy],[],'Broken or redirected internal links');
 const config=JSON.parse(readFileSync('.next/required-server-files.json','utf8')).config;
 assert.equal(config.output,'export');assert.equal(config.trailingSlash,hosting.trailingSlash);
 const manifest=JSON.parse(readFileSync('.next/routes-manifest.json','utf8'));
 assert.deepEqual(manifest.redirects.filter(rule=>!rule.internal),[],'Custom Next redirects are not supported by this Hosting export');
 assert.deepEqual(Object.values(manifest.rewrites??{}).flat(),[],'Unexpected Next rewrites');
 console.log(`Local: ${graph.size} one-hop Hosting rules, no shadowed page, no invalid sitemap or internal links.`);
}
if(http){
 const cases=new Map(graph);
 cases.set('/index.html','/');
 for(const path of paths.filter(x=>x!=='/'))for(const alias of [path.slice(0,-1),`${path.slice(0,-1)}.html`,`${path}index.html`])cases.set(alias,path);
 // Baseline historically had no rule for the two explicit HTML variants of old articles.
 for(const [source,to] of graph)if(source.endsWith('/'))for(const alias of [`${source.slice(0,-1)}.html`,`${source}index.html`])cases.set(alias,to);
 const traces=await mapConcurrent([...cases],async ([source,to])=>({source,to,...await traceUrl(new URL(source,http))}));
 if(targetFile)writeFileSync(targetFile,JSON.stringify(traces,null,2)+'\n');
 const wrong=traces.filter(({chain,error,to})=>error||chain.length!==2||![301,308].includes(chain[0]?.status)||chain[1]?.status!==200||chain[1].url!==new URL(to,http).href);
 if(!before)assert.deepEqual(wrong.map(({source,chain,error})=>({source,chain,error})),[],'Noncanonical variants not redirecting directly');
 console.log(`HTTP: ${traces.length} variants, ${wrong.length} not a direct permanent hop to HTTP 200.`);
}
