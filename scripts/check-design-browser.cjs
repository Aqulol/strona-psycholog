const assert=require('node:assert/strict');const {mkdirSync,writeFileSync}=require('node:fs');const {chromium}=require('playwright-core');const {AxeBuilder}=require('@axe-core/playwright');
(async()=>{
const b=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
try {
const routes={home:'/',oferta:'/oferta/',psycholog:'/psycholog-wroclaw/',psychoterapeuta:'/psychoterapeuta-wroclaw/',dorosli:'/psychoterapia-dorosli/',mlodziez:'/psychoterapia-mlodziezy-od-15-roku-zycia/',adhd:'/diagnoza-adhd-wroclaw/',osobowosc:'/diagnoza-osobowosci-wroclaw/',katalog:'/kiedy-zglosic-sie-na-terapie/',temat:'/w-czym-pomagam/wypalenie-zawodowe/',blog:'/blog/',artykul:'/blog/adhd-u-doroslych/',slownik:'/slownik-psychologiczny/',faq:'/faq/',cennik:'/cennik/',gabinet:'/gabinet-wroclaw/',kontakt:'/kontakt/'};
const output=process.env.DESIGN_TEST_OUTPUT||'/tmp/design-shots';
mkdirSync(output,{recursive:true});
const failures=[],violations=[];
for(const [mode,base] of [['przed',process.env.DESIGN_BASELINE||'http://127.0.0.1:3001'],['po',process.env.DESIGN_URL||'http://127.0.0.1:3000']]) {const ctx=await b.newContext({reducedMotion:'reduce'});const page=await ctx.newPage();
 for(const width of mode==='po'?[320,375,390,430,768,1024,1280,1440,1920]:[375,1440]){
  await page.setViewportSize({width,height:900});
  for(const [key,path] of Object.entries(routes)){
   const response=await page.goto(base+path);assert.equal(response.status(),200,path);
   await page.evaluate(()=>document.fonts.ready);
   if(mode==='po' && !await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)) failures.push([width,path,await page.evaluate(()=>document.documentElement.scrollWidth)]);
   if([375,1440].includes(width)) await page.screenshot({path:`${output}/${mode}-${key}-${width}.png`});
   if(mode==='po'&&[375,1440].includes(width)){
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    if(results.violations.length)violations.push({width,path,violations:results.violations.map(v=>[v.id,v.nodes.map(n=>n.target)])});
   }
  }
  console.log(mode,width,'OK');
 }
 await ctx.close();
}
writeFileSync(`${output}/axe.json`,JSON.stringify({failures,violations},null,2));console.log(JSON.stringify({failures,violations},null,2));assert.deepEqual(failures,[]);assert.deepEqual(violations,[]);
}finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
