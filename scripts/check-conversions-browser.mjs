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
const width=Number(process.env.SMOKE_WIDTH??390), mobile=width<1000;
const context=await browser.newContext({viewport:{width,height:844},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:2});
const hits=[], ext=[];let mailStatus=503, mailPosts=0;
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
 if(url.host==='mail.synthetic.workers.dev') {
   if(req.method()==='POST') {mailPosts++;assert.equal(headers.referer,undefined);}
   if (mailStatus===0) return route.abort();
   return route.fulfill({status:req.method()==='OPTIONS'?204:mailStatus,headers:{'access-control-allow-origin':base,'access-control-allow-methods':'POST','access-control-allow-headers':'Content-Type'},...(req.method()==='POST'?{json:mailStatus===200?{status:'accepted'}:{status:'error',code:mailStatus===429?'provider_limit':'invalid'}}:{})});
 }
 if(url.host==='booksy.com') {assert.equal(headers.referer,undefined);return route.fulfill({status:204});}
 return route.abort();
});
const p=await context.newPage();p.setDefaultTimeout(5000);
const booking=()=>p.locator('header a.booking').click();
const privacy=()=>p.locator('.privacy-preferences-trigger > summary').click();
const check=()=>p.getByRole('checkbox',{name:'Zgadzam się na pomiar skuteczności'});
const close=privacy;
await p.goto(base+'/?private=synthetic-sensitive');
assert.equal(ext.length,0);
if(mobile){await p.locator('.site-menu > summary').click();await p.locator('.mobile-menu-panel').getByRole('button',{name:'Podmenu: Psycholog'}).click();await p.keyboard.press('Escape');}
await p.getByRole('button',{name:'Szukaj w witrynie'}).click();await p.locator('#search-query').fill('diagnoza adhd');await p.locator('dialog a[href="/diagnoza-adhd-wroclaw/"]').first().waitFor();await p.keyboard.press('Escape');
await booking(); assert.deepEqual(hits,[]);
await p.goto(base+'/kontakt/?private=synthetic-sensitive');
assert.equal(await p.locator('.privacy-preferences-trigger').count(),enabled?1:0);
if(!enabled) {
 await booking();
 assert.deepEqual(hits,[]);assert.equal(ext.filter(x=>x.url.includes('/widget/')).length,0);
 console.log('Default: no analytics opt-in control or requests, no widget; search and direct Booksy OK');
} else {
 await booking();assert.deepEqual(hits,[]);
 await privacy();await check().check();await close();
 assert.equal(await p.locator('iframe').count(),0);
 await booking();
 await p.locator('main a[href^="tel:"]').first().click();await p.locator('main a[href^="mailto:"]').first().click();
 const submit=p.getByRole('button',{name:'Wyślij wiadomość'});
 const message=p.locator('textarea[name="message"]');
 await p.locator('input[name="name"]').fill('Test Synthetic');await p.locator('input[name="email"]').fill('invalid');await message.fill('Synthetic message only.');
 await submit.click();assert.equal(mailPosts,0);
 await p.locator('input[name="email"]').fill('synthetic@example.invalid');
 for (const [status,feedback] of [[503,/Nie udało się potwierdzić/],[429,/osiągnęła limit/],[400,/Sprawdź wpisane dane/],[0,/Nie udało się potwierdzić/]]) {
   mailStatus=status;await submit.click();await p.getByText(feedback).waitFor();
   assert.equal(await message.inputValue(),'Synthetic message only.');
   assert.deepEqual(hits,['booking_click','phone_click','email_click']);
 }
 mailStatus=200;await submit.click();await p.getByText(/Została przyjęta do wysyłki/).waitFor();
 assert.equal(await message.inputValue(),'');assert.equal(mailPosts,5);
 await p.locator('footer a[href="/cennik/"]').click();await p.waitForURL('**/cennik/');
 await privacy();await check().uncheck();await close();
 await booking();await p.waitForTimeout(300);
 assert.deepEqual(hits,['booking_click','phone_click','email_click','contact_submit_success','pricing_click']);
 assert.equal(ext.filter(x=>x.url.includes('/widget/')).length,0);
 console.log('Configured: exactly one request per five actions, no collection before opt-in or after revoke, no failed-form event, no referrer/cookie/authorization/query, no widget');
}
await p.goto(base+'/kontakt/');
assert.equal(await p.locator('iframe').count(),0);
const direct=p.getByRole('link',{name:'Sprawdź dostępne terminy'});
assert.equal(await direct.getAttribute('rel'),'noreferrer');
assert.match(await direct.getAttribute('href'),/^https:\/\/booksy\.com\/pl-pl\//);
await direct.click();
assert.equal(ext.filter(x=>x.url.includes('/widget/')).length,0);
assert.equal(hits.length,enabled?5:0);
assert.ok(ext.some(x=>new URL(x.url).hostname==='booksy.com'));
assert.ok(ext.every(x=>!/(google-analytics|googletagmanager|doubleclick)/i.test(x.url)));
console.log('Direct Booksy navigation, no embedded requests and no Google Analytics requests.');
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:1360,height:800}});const s=await nojs.newPage();
const res=await s.goto(base+'/diagnoza-adhd-wroclaw/');assert.equal(res.status(),200);await s.locator('main h1').waitFor();assert.ok(await s.locator('a[rel="noreferrer"][href^="https://booksy.com/pl-pl/"]').count());
assert.equal((await s.goto(base+'/not-a-real-test-page/')).status(),404);
}finally{await browser.close();}
