const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
 const base=process.env.PREVIEW_URL??'http://127.0.0.1:3010';
 try{
 for(const width of [320,768,1440]){
  const page=await browser.newPage({viewport:{width,height:850},reducedMotion:'reduce'});
  const fit=async(label)=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}: ${label}`);
  await page.goto(base);
  const mobile=page.locator('.site-menu>summary');if(await mobile.isVisible())await mobile.click();
  const toggle=page.getByRole('button',{name:'Podmenu: Psycholog',exact:true});await toggle.click();
  const menu=page.locator(`#${await toggle.getAttribute('aria-controls')}`);
  const category=menu.locator('summary').first();await category.click();await fit('mega menu');
  for(const link of await menu.locator('a:visible').all()){
   const rect=await link.boundingBox();assert.ok(rect.x>=-1&&rect.x+rect.width<=width+1,`${width}: menu link overflow`);
  }
  await toggle.press('Escape');
  await page.getByRole('button',{name:'Szukaj w witrynie'}).click();
  await page.locator('#search-query').fill('przeciwprzeniesienie');
  await page.locator('dialog a[href="/slownik-psychologiczny/przeciwprzeniesienie/"]').waitFor();await fit('global search');
  await page.goto(`${base}/kiedy-zglosic-sie-na-terapie/`);
  await page.locator('.help-more summary').first().click();await fit('expanded category');
  await page.goto(`${base}/faq/`);
  const question=page.locator('.questions summary').first();await question.click();await fit('expanded FAQ');
  await page.close();console.log(`${width}: menu, search, help cards and FAQ OK`);
 }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
