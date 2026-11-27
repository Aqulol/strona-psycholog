// Install playwright and @axe-core/playwright outside this project; use NODE_PATH if needed.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {AxeBuilder}=require('@axe-core/playwright');
const base=process.env.PREVIEW_URL??'http://127.0.0.1:3010';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
 try{
 for(const [id,slug,count] of [['slownik','slownik-psychologiczny',69],['pomoc','kiedy-zglosic-sie-na-terapie',74]]){
  const route=`${base}/${slug}/`;
  const ssr=await browser.newContext({javaScriptEnabled:false});
  const staticPage=await ssr.newPage();await staticPage.goto(route);
  assert.ok(await staticPage.locator('main [data-filter-row] a').count()>=count);
  assert.equal(await staticPage.locator('main input[type="search"]').count(),0);
  await ssr.close();
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const width of [320,375,390,768,1024,1440,1920]){
   await page.setViewportSize({width,height:850});await page.goto(route);
   const select=page.locator('.category-toolbar select');await select.waitFor();
   assert.equal(await page.locator('main input[type="search"]').count(),0);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${id} ${width}: overflow`);
   assert.ok((await select.boundingBox()).height>=44);
   await select.focus();assert.ok(await select.evaluate(e=>document.activeElement===e));
   await select.press('ArrowDown');assert.notEqual(await select.inputValue(),'');
   assert.ok(await page.locator('main [data-filter-row][hidden]').count());
   assert.ok(await page.locator('main [data-catalogue-letter][hidden]').count());
   await select.selectOption('');assert.equal(await page.locator('main [data-filter-row][hidden]').count(),0);
   if(width===390||width===1440){
    const {violations}=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    assert.deepEqual(violations.map(x=>x.id),[]);
    if(process.env.SCREENSHOTS)await page.screenshot({path:`${process.env.SCREENSHOTS}/${id}-${width}.jpg`,type:'jpeg',quality:75});
   }
   console.log(id,width,'OK');
  }
  if(id==='slownik'){
   await page.getByRole('navigation',{name:'Indeks alfabetyczny'}).getByRole('link',{name:'Ł',exact:true}).click();
   assert.equal(decodeURIComponent(new URL(page.url()).hash),'#litera-Ł');
   await page.getByRole('button',{name:'Szukaj w witrynie'}).click();
   await page.locator('#search-query').fill('agresja');
   await page.locator('dialog a[href="/slownik-psychologiczny/agresja/"]').click();
   await page.getByRole('heading',{level:1,name:/Agresja/}).waitFor();
   for(const slug of ['agresja','projekcja','formacja-kompromisowa','organizacja-osobowosci','adhd']){
    await page.goto(`${base}/slownik-psychologiczny/${slug}/`);
    for(const width of [390,1440]){
     await page.setViewportSize({width,height:850});
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${slug} ${width}: overflow`);
     assert.equal(await page.locator('main h1').count(),1);
     if(process.env.SCREENSHOTS)await page.screenshot({path:`${process.env.SCREENSHOTS}/${slug}-${width}.jpg`,type:'jpeg',quality:75});
    }
   }
  }
  await context.close();
 }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
