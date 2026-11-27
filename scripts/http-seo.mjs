import {inspectHtml} from './sitemap-lib.mjs';
export async function traceUrl(input,{limit=8}={}) {
 const initial=new URL(input);let url=initial;const chain=[];const seen=new Set();
 for(let i=0;i<=limit;i++){
  if(seen.has(url.href))return {chain,error:`Redirect loop at ${url.href}`};
  seen.add(url.href);
  let response;
  try{response=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(10000)});}catch(error){return {chain,error:`${url}: ${error.cause?.message??error.message}`};}
  const location=response.headers.get('location');
  const entry={url:url.href,status:response.status,location};chain.push(entry);
  if([301,302,303,307,308].includes(response.status)){
   await response.body?.cancel();
   if(!location)return {chain,error:'Missing Location'};
   try{url=new URL(location,url);}catch{return {chain,error:`Invalid Location: ${location}`};}
   if(!['http:','https:'].includes(url.protocol))return {chain,error:`Invalid redirect protocol: ${url.protocol}`};
   continue;
  }
  entry.type=response.headers.get('content-type');
  entry.xRobots=response.headers.get('x-robots-tag');
  if(/^text\/html\b/i.test(entry.type??'')){
   const html=await response.text();const page=inspectHtml(html);
   Object.assign(entry,{canonical:page.canonical,metaRobots:page.metaRobots,h1:page.headings,mainCharacters:page.content.length,refresh:page.refresh});
  }else await response.body?.cancel();
  return {chain};
 }
 return {chain,error:`More than ${limit} redirect hops`};
}
export async function mapConcurrent(items,handler,count=8){
 const output=new Array(items.length);let cursor=0;
 await Promise.all(Array.from({length:Math.min(count,items.length)},async()=>{
  while(cursor<items.length){const i=cursor++;output[i]=await handler(items[i]);}
 }));
 return output;
}
