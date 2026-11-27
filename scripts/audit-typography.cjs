// NODE_PATH must resolve Playwright. Export must be served by a static server.
const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const widths=[320,360,375,390,430,768,1024,1280,1440,1920];
const samples=['/','/oferta/','/diagnoza-psychologiczna-wroclaw/','/psychoterapia-psychodynamiczna-wroclaw/','/kiedy-zglosic-sie-na-terapie/','/w-czym-pomagam/trudnosci-emocjonalne-mlodziezy/','/slownik-psychologiczny/','/slownik-psychologiczny/przeciwprzeniesienie/','/blog/adhd-u-doroslych/','/cennik/','/kontakt/','/baza-wiedzy/','/blog/jak-wybrac-psychoterapeute/','/polityka-prywatnosci/'];
(async()=>{
 const base=process.env.PREVIEW_URL??'http://127.0.0.1:3010';
 const response=await fetch(`${base}/sitemap.xml`);assert.equal(response.status,200);
 const routes=[...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>new URL(x[1]).pathname);
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
 const results=[];let next=0;
 try{
 await Promise.all(Array.from({length:4},async()=>{
  const ctx=await browser.newContext({javaScriptEnabled:false,reducedMotion:'reduce'});
  const page=await ctx.newPage();
  while(next<routes.length){
   const path=routes[next++];const result=await page.goto(base+path,{waitUntil:'load'});assert.equal(result.status(),200,path);
   await page.evaluate(()=>document.fonts.ready.then(()=>true));
   for(const width of widths){
    await page.setViewportSize({width,height:850});
    const findings=await page.evaluate(()=>{
     const root=document.documentElement, issues=[];
     const esc=x=>x.trim().replace(/\s+/g,' ').slice(0,110);
     if(root.scrollWidth>innerWidth+1)issues.push(['page-overflow',root.scrollWidth]);
     const scope='main :is(h1,h2,h3,a,button,p), header :is(a,button,summary), footer :is(a,h2,h3), main .lexicon-entries dt';
     for(const el of document.querySelectorAll(scope)){
      const box=el.getBoundingClientRect(), style=getComputedStyle(el);
      if(!box.width||!box.height||style.visibility==='hidden'||el.closest('[hidden],.sr-only')||el.classList.contains('skip-link'))continue;
      const isControl=el.matches('h1,h2,h3,button,summary,.booking,.button-secondary');
      if(box.right>innerWidth+2||box.left< -2||((isControl||el.matches('p'))&&el.clientWidth&&el.scrollWidth>el.clientWidth+2))issues.push(['text-overflow',esc(el.textContent)]);
      if(isControl&&/(hidden|clip)/.test(style.overflowY)&&el.scrollHeight>el.clientHeight+2)issues.push(['clipped',esc(el.textContent)]);
      if(el.matches('p')&&el.textContent.length>130&&style.textAlign==='center')issues.push(['centered-prose',esc(el.textContent)]);
      if(!el.matches('h1,h2,h3,a,button,summary,dt'))continue;
      const nodes=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node;
      while((node=nodes.nextNode()))for(const match of node.data.matchAll(/[\p{L}\u00ad]{6,}/gu)){
       const range=document.createRange();range.setStart(node,match.index);range.setEnd(node,match.index+match[0].length);
       const lines=new Set([...range.getClientRects()].filter(r=>r.width>0).map(r=>Math.round(r.top)));
       if(lines.size>1)issues.push(['split-word',match[0],esc(el.textContent)]);
      }
     }
     const adjacent='main :is(.help-card-grid,.offer-overview,.service-directory-grid,.knowledge-grid,.price-row), header .mast';
     for(const el of document.querySelectorAll(adjacent)){
      const rects=[...el.children].filter(c=>c.getClientRects().length).map(c=>c.getBoundingClientRect());
      if(rects.some((a,i)=>rects.slice(i+1).some(b=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>2&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>2)))issues.push(['overlap',el.className]);
     }
     return [...new Map(issues.map(i=>[JSON.stringify(i),i])).values()];
    });
    if(findings.length)results.push({path,width,findings});
    if(process.env.SCREENSHOTS&&samples.includes(path)&&[320,1440].includes(width)){
     let name=path==='/'?'home':path.slice(1,-1).replaceAll('/','--');
     await page.screenshot({path:`${process.env.SCREENSHOTS}/${name}-${width}.jpg`,type:'jpeg',quality:66,timeout:15000});
    }
   }
  }
  await ctx.close();
 }));
 }finally{await browser.close();}
 results.sort((a,b)=>a.path.localeCompare(b.path)||a.width-b.width);
 const output={routes:routes.length,widths,results};
 fs.writeFileSync(process.env.AUDIT_OUTPUT??'/tmp/typography.json',JSON.stringify(output,null,2)+'\n');
 console.log(`Audyt: ${routes.length} × ${widths.length}, widoki z kandydatami: ${results.length}`);
})().catch(e=>{console.error(e);process.exitCode=1;});
