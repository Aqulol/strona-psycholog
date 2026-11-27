const assert = require('node:assert/strict');
const {mkdirSync} = require('node:fs');
const {join} = require('node:path');
const {chromium} = require('playwright-core');
const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:5000';
const screenshots = process.env.HELP_SCREENSHOT_DIR;
const gallery = '/gabinet-wroclaw/';
const comparison = '/jaka-forme-pomocy-wybrac/';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH});
 try {
  if(screenshots)mkdirSync(screenshots,{recursive:true});
  for(const width of [375,768,1024,1440,1920]){
   const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<1024});
   const remote=[], errors=[];
   await context.route('**/*',r=>{const url=r.request().url();if(url.startsWith(site+'/'))return r.continue();remote.push(r.request());return r.fulfill({body:'External fixture'});});
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
   await page.goto(site+comparison);
   assert.equal(await page.locator('.comparison-grid section').count(),9);
   for(const path of [comparison,gallery,'/informacje-dla-pacjentow/','/kontakt/','/slownik-psychologiczny/']){
    await page.goto(site+path); assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),width,path);
    if(path===comparison && screenshots && [375,1440].includes(width)) await page.screenshot({path:join(screenshots,`porownanie-${width}.png`)});
    if(path===gallery){
     const link=page.getByRole('link',{name:'Powiększ zdjęcie: Wnętrze gabinetu'});await link.press('Enter');
     const dialog=page.getByRole('dialog',{name:'Powiększone zdjęcie gabinetu'});await dialog.waitFor();
     await dialog.locator('img').evaluate(e=>e.decode());
     assert.equal(await dialog.locator('img').evaluate(el=>el.naturalWidth),1280);
     if(screenshots && [375,1440].includes(width)) await page.screenshot({path:join(screenshots,`gabinet-${width}.png`)});
     await page.keyboard.press('Escape'); await dialog.waitFor({state:'hidden'});
     await page.waitForFunction(()=>document.activeElement?.getAttribute('aria-label')==='Powiększ zdjęcie: Wnętrze gabinetu');
    }
   }
   const glossaryInput=page.locator('main input[type=search]'); await glossaryInput.fill('transferencja');
   await page.getByText('Wyniki: 1',{exact:true}).waitFor();
   await page.goto(site+'/baza-wiedzy/');
   if(await page.locator('.site-menu > summary').isVisible()) await page.locator('.site-menu > summary').press('Enter');
   const submenu=page.getByRole('button',{name:'Podmenu: Baza wiedzy'}).filter({visible:true});
   await submenu.press('Enter'); assert.equal(await submenu.getAttribute('aria-expanded'),'true');
   const group=submenu.locator('xpath=../..');await group.getByRole('link',{name:'Słownik psychologiczny'}).focus();await page.keyboard.press('Escape');
   assert.equal(await submenu.getAttribute('aria-expanded'),'false');
   assert.equal(await submenu.evaluate(el=>el===document.activeElement),true);
   const search=page.getByRole('button',{name:'Szukaj w witrynie'});await search.press('Enter');
   const input=page.getByRole('dialog').getByRole('searchbox'); await input.fill('diagnoza adhd');
   await page.getByRole('dialog').locator('a[href="/diagnoza-adhd-wroclaw/"]').waitFor(); await page.keyboard.press('Escape');
   await page.goto(site+'/kontakt/'); assert.equal(await page.locator('main form, main iframe').count(),0);
   assert.deepEqual(remote,[]);
   await page.getByRole('button',{name:'Pokaż kalendarz Booksy'}).click(); await page.locator('main iframe').waitFor();
   await page.waitForLoadState('networkidle'); assert.equal(remote.length,1); assert.equal((await remote[0].allHeaders()).referer,undefined);
   assert.deepEqual(errors,[]); await context.close();console.log(`${width} px: OK`);
  }
  const context=await browser.newContext({viewport:{width:375,height:900},javaScriptEnabled:false});const page=await context.newPage();
  await page.goto(site+comparison);assert.equal(await page.locator('.comparison-grid section').count(),9);
  await page.goto(site+gallery);await page.getByRole('link',{name:'Powiększ zdjęcie: Wnętrze gabinetu'}).press('Enter');assert.ok(page.url().endsWith('/images/gabinet.webp'));
  await page.goto(site+'/jakiej-pomocy-potrzebuje/');await page.getByText('Potrzebuję pilnej pomocy',{exact:true}).click();await page.getByRole('link',{name:'Numery i miejsca pilnej pomocy'}).click();await page.locator('main a[href="tel:112"]').first().waitFor();
  console.log('Bez JS: porównanie, fotografia i ścieżka kryzysowa — OK.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
