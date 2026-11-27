// Playwright against the static production export (PREVIEW_URL).
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const routes=[
 ['/', 'main p a[data-context-link]', 600],
 ['/blog/adhd-u-doroslych/', 'main p a[data-context-link]', 600],
 ['/slownik-psychologiczny/agresja/', 'main section:has(+nav[aria-label="Sąsiednie hasła"]) li a', 500],
 ['/blog/adhd-u-doroslych/', '.article-sources li a', 500],
 ['/diagnoza-psychologiczna-wroclaw/', 'main p a[data-context-link]', 600],
 ['/kiedy-zglosic-sie-na-terapie/', '.help-links a', null, false],
 ['/baza-wiedzy/', '.knowledge-grid h2 a', null, false],
 ['/cennik/', 'main a.underline', 600],
 ['/faq/', 'footer nav a', 600],
 ['/polityka-prywatnosci/', 'main a[href^="https://www.znanylekarz.pl"]', 600],
 ['/w-czym-pomagam/radzenie-sobie-ze-zloscia/', 'main p a[data-context-link]', 600],
];
const base=process.env.PREVIEW_URL??'http://127.0.0.1:3010';
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});
 try{
 for(const width of [320,1440]){
  const page=await browser.newPage({viewport:{width,height:900},javaScriptEnabled:false});
  for(const [path,selector,weight,underline=true] of routes){
   await page.goto(base+path);const link=page.locator(selector).first();
   const style=()=>link.evaluate(e=>{const s=getComputedStyle(e);return [s.textDecorationLine,+s.fontWeight,s.color,s.outlineStyle];});
   assert.equal(await link.count(),1,`${path} ${selector}`);
   const [decoration,w]=await style();assert.equal(decoration,'none',path);if(weight)assert.equal(w,weight,path);
   const ratio=await link.evaluate(el=>{
    const light=color=>{const [r,g,b]=color.match(/[\d.]+/g).slice(0,3).map(n=>{const x=Number(n)/255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;});return .2126*r+.7152*g+.0722*b;};
    let bg=el;while(bg&&getComputedStyle(bg).backgroundColor==='rgba(0, 0, 0, 0)')bg=bg.parentElement;
    const a=light(getComputedStyle(el).color), b=light(bg?getComputedStyle(bg).backgroundColor:'rgb(255, 255, 255)');
    return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   });
   assert.ok(ratio>=4.5,`${path}: contrast ${ratio}`);
   await link.hover();assert.equal((await style())[0],underline?'underline':'none',path);
   await page.mouse.move(0,0);await page.keyboard.press('Tab');await link.focus();
   assert.equal((await style())[0],underline?'underline':'none',path);assert.notEqual((await style())[3],'none',path);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path);
  }
  await page.goto(base);const booking=page.locator('header a.booking').first();await booking.hover();assert.equal(await booking.evaluate(e=>getComputedStyle(e).textDecorationLine),'none');
  await page.close();console.log(`${width}px: ${routes.length} przypadków i rezerwacja OK`);
 }
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
