import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright');
const base=new URL(process.argv[2]);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE || undefined,headless:true});
try {
  const origin=base.origin;
  for(const choice of [null,'denied','granted','revoked']) {
    const context=await browser.newContext();
    try {
      assert.equal((await context.cookies()).length,0);
      const page=await context.newPage(), external=new Set(), analytics=[];
      // Observe real traffic, without route mocks. Do not print query strings or payloads.
      context.on('request', request=>{
        const url=new URL(request.url());
        if(url.origin!==origin) external.add(url.hostname);
        if(/(?:google-analytics|googletagmanager|analytics\.google|doubleclick|googleadservices)/i.test(url.hostname) || /\/g\/collect\b|G-5YF0L6DJ1X/.test(url.href)) analytics.push(url.hostname);
      });
      async function visit(path){
        const response=await page.goto(new URL(path,base).href,{waitUntil:'networkidle',timeout:20000});
        assert.equal(response?.status(),200,path);
        assert.equal(new URL(page.url()).origin,origin);
      }
      await visit('/');
      const legacy=await page.getByRole('button',{name:/odrzuć|akceptuj wszystkie/i}).count();
      assert.equal(legacy,0,'Unexpected legacy consent UI: separate live workflow audit needed');
      if(choice) await page.evaluate(value=>localStorage.setItem('gabinet-conversion-consent-v1',value),choice==='revoked'?'granted':choice);
      await page.getByRole('link',{name:'Poznaj mnie',exact:true}).click();
      await page.waitForURL('**/o-mnie/');
      if(choice==='revoked') await page.evaluate(()=>localStorage.setItem('gabinet-conversion-consent-v1','denied'));
      for(const path of ['/kontakt/','/diagnoza-adhd-wroclaw/','/w-czym-pomagam/depresja/','/w-czym-pomagam/borderline/','/w-czym-pomagam/narcyzm/']) await visit(path);
      assert.deepEqual(analytics,[], 'Unexpected Google analytics requests');
      assert.equal((await context.cookies()).filter(({name})=>/^(_ga|_gid|_gat|_gcl)/.test(name)).length,0);
      assert.equal(await page.evaluate(()=>typeof window.gtag), 'undefined');
      assert.equal(await page.locator('.privacy-preferences-trigger').count(),0,'Unexpected active optional measurement');
      assert.deepEqual([...external],[], 'Unexpected cross-origin requests');
      console.log(`${origin}: ${choice??'fresh'} — no external requests, gtag or GA cookies`);
    } finally {await context.close();}
  }
} finally {await browser.close();}
