import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const {chromium} = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright');
import assert from 'node:assert/strict';
const base=process.argv[2], mode=process.argv[3];
assert.match(base??'', /^http:\/\/(?:localhost|127\.0\.0\.1):[0-9]+$/,'Use a local synthetic preview only');
assert.ok(['on','off'].includes(mode),'Pass on or off');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE || undefined,args:['--no-sandbox'],headless:true});
try {
const enabled=mode==='on';
const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
const hits=[], ext=[];let accept=false;
await context.route('**/*',async route=>{
 const req=route.request(), url=new URL(req.url());
 if (url.origin===base) return route.continue();
 const headers=await req.allHeaders(); ext.push({url:req.url(),headers});
 if(url.host==='stat.synthetic.workers.dev'){
   assert.equal(req.method(),'POST'); assert.equal(url.pathname,'/zdarzenie');assert.equal(url.search,'');
   for (const key of ['referer','cookie','authorization']) assert.equal(headers[key],undefined);
   assert.equal(headers.origin,base); assert.equal(headers['content-type'],'text/plain');
   hits.push(req.postData()); return route.fulfill({status:204,headers:{'access-control-allow-origin':base}});
 }
 if(url.host==='mail.synthetic.workers.dev') return route.fulfill({status:req.method()==='OPTIONS'?204:accept?200:503,headers:{'access-control-allow-origin':base,'access-control-allow-methods':'POST','access-control-allow-headers':'Content-Type'},...(req.method()==='POST'?{json:{status:accept?'accepted':'error'}}:{})});
 if(url.host==='booksy.com') {assert.equal(headers.referer,undefined);return route.fulfill({status:204});}
 return route.abort();
});
const p=await context.newPage();p.setDefaultTimeout(5000);
const booking=()=>p.locator('header a.booking').click();
const privacy=()=>p.getByRole('button',{name:'Ustawienia prywatności'}).click();
const check=()=>p.getByRole('checkbox',{name:'Zgadzam się na pomiar skuteczności'});
const close=()=>p.getByRole('button',{name:'Zamknij',exact:true}).click();
await p.goto(base+'/?private=synthetic-sensitive');
assert.equal(ext.length,0);
await p.locator('.site-menu > summary').click();await p.locator('.mobile-menu-panel').getByRole('button',{name:'Podmenu: Psycholog'}).click();
await p.keyboard.press('Escape');
await p.getByRole('button',{name:'Szukaj w witrynie'}).click();await p.locator('#search-query').fill('diagnoza adhd');await p.locator('dialog a[href="/diagnoza-adhd-wroclaw/"]').first().waitFor();await p.keyboard.press('Escape');
await booking(); assert.deepEqual(hits,[]);
await p.goto(base+'/kontakt/?private=synthetic-sensitive');
await privacy();assert.equal(await check().count(),enabled?1:0);
if(!enabled) {
 await p.getByRole('button',{name:'Odrzucam opcjonalne treści'}).click();await booking();
 assert.deepEqual(hits,[]);assert.equal(ext.filter(x=>x.url.includes('/widget/')).length,0);
 console.log('Default: no analytics opt-in control or requests, no widget on refusal; mobile search/menu/direct Booksy OK');
} else {
 await p.getByRole('button',{name:'Nie zezwalam na kalendarz Booksy'}).click();
 await privacy();await close();await booking();assert.deepEqual(hits,[]);
 await privacy();await check().check();await close();
 assert.equal(await p.locator('iframe').count(),0);
 await booking();
 await p.locator('main a[href^="tel:"]').first().click();await p.locator('main a[href^="mailto:"]').first().click();
 await p.locator('input[name="name"]').fill('Test Synthetic');await p.locator('input[name="email"]').fill('synthetic@example.invalid');await p.locator('textarea[name="message"]').fill('Synthetic message only.');
 await p.getByRole('button',{name:'Wyślij wiadomość'}).click();await p.getByText(/Nie udało się potwierdzić/).waitFor();
 assert.deepEqual(hits,['booking_click','phone_click','email_click']);accept=true;
 await p.getByRole('button',{name:'Wyślij wiadomość'}).click();await p.getByText(/Została przyjęta do wysyłki/).waitFor();
 await p.locator('footer a[href="/cennik/"]').click();await p.waitForURL('**/cennik/');
 await privacy();await check().uncheck();await close();
 await booking();await p.waitForTimeout(300);
 assert.deepEqual(hits,['booking_click','phone_click','email_click','contact_submit_success','pricing_click']);
 assert.equal(ext.filter(x=>x.url.includes('/widget/')).length,0);
 console.log('Configured: exactly one request per five actions, no collection before opt-in or after revoke, no failed-form event, no referrer/cookie/authorization/query, no widget on refusal');
}
// Separate Booksy consent: iframe appears on approach and is removed on revocation.
await p.goto(base+'/kontakt/');
await privacy();await p.getByRole('button',{name:enabled?'Zezwalam na kalendarz Booksy':'Akceptuję opcjonalne treści',exact:true}).click();
await p.locator('.booksy-slot').scrollIntoViewIfNeeded();
await p.locator('iframe[title="Kalendarz rezerwacji Booksy"]').waitFor({state:'attached'});
assert.equal(hits.length,enabled?5:0);
await privacy();await p.getByRole('button',{name:enabled?'Nie zezwalam na kalendarz Booksy':'Odrzucam opcjonalne treści',exact:true}).click();
await p.locator('iframe[title="Kalendarz rezerwacji Booksy"]').waitFor({state:'detached'});
console.log('Booksy iframe: separate opt-in, no Referer, removed on revocation');
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1360,height:800}});const s=await nojs.newPage();
const res=await s.goto(base+'/diagnoza-adhd-wroclaw/');assert.equal(res.status(),200);await s.locator('main h1').waitFor();assert.ok(await s.locator('a[rel="noreferrer"][href^="https://booksy.com/pl-pl/"]').count());
assert.equal((await s.goto(base+'/not-a-real-test-page/')).status(),404);
}finally{await browser.close();}
