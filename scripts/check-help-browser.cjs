const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');
const { readFileSync } = require('node:fs');
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
  try {
    const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:3010';
    const hub = '/kiedy-zglosic-sie-na-terapie/';
    const configHeaders = JSON.parse(readFileSync('firebase.json')).hosting.headers.find(x => x.source === '**').headers;
    const headers = Object.fromEntries(configHeaders.map(({key,value}) => [key.toLowerCase(),value]));
    const links = html => [...html.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).filter(p => p.startsWith('/w-czym-pomagam/'));
    const all = links(await (await fetch(`${site}/sitemap.xml`)).text());
    assert.equal(all.length, 66);
    for (const p of all) assert.equal((await fetch(site + p, {redirect:'manual'})).status, 200, p);
    for (const viewport of [{width:1366,height:900},{width:390,height:844}]) {
      const context = await browser.newContext({viewport});
      await context.route(`${site}/**`, async route => {
        if (route.request().resourceType() !== 'document') return route.continue();
        const response = await route.fetch();
        await route.fulfill({response, headers: {...response.headers(), ...headers}});
      });
      const page = await context.newPage();
      const errors = [], consoleErrors = [], booksy = [], external = [], failures = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', event => { if (event.type() === 'error') consoleErrors.push(event.text()); });
      page.on('requestfailed', request => { if (new URL(request.url()).hostname === 'booksy.com') failures.push(request.failure()?.errorText); });
      page.on('request', request => { if (!request.url().startsWith(site)) external.push(request.url()); if (request.url().startsWith('https://booksy.com/widget/')) booksy.push(request.allHeaders()); });
      await page.goto(site + hub);
      assert.equal(await page.locator('#lista-tematow a[href^="/w-czym-pomagam/"]').count(), 66);
      const search = page.getByRole('searchbox', {name:'Znajdź temat'});
      await search.fill('nerwica');
      await page.waitForFunction(() => document.querySelectorAll('#lista-tematow a[href^="/w-czym-pomagam/"]').length === 1);
      assert.match(await page.locator('#lista-tematow').innerText(), /Lęk i zaburzenia lękowe/);
      await search.fill('zlosc');
      await page.waitForFunction(() => document.querySelector('#lista-tematow')?.textContent?.includes('Problemy ze złością'));
      await search.fill('nieprawdopodobny-brak-wynikow');
      await page.getByText('Nie znaleziono pasujących tematów.', {exact:false}).waitFor();
      await page.getByRole('button', {name:'Wyczyść'}).click();
      assert.equal(await page.locator('#lista-tematow a[href^="/w-czym-pomagam/"]').count(), 66);
      await search.fill('powracające wspomnienia');
      await page.evaluate(() => { window.catalogueTestMarker = 1; });
      await page.locator('#lista-tematow a[href$="/powracajace-wspomnienia/"]').click();
      await page.getByRole("heading", {name:"Powracające wspomnienia trudnych wydarzeń", level:1}).waitFor();
      assert.match(await page.locator('h1').innerText(), /Powracające wspomnienia/);
      assert.equal(await page.evaluate(() => window.catalogueTestMarker), 1, "client-side navigation");
      const article = await page.locator('.topic-layout article').boundingBox();
      const sidebar = await page.locator('#rezerwacja').boundingBox();
      if (viewport.width < 500) {
        assert.ok(sidebar.y >= article.y + article.height - 1);
        await page.getByRole('link', {name:'Przejdź do osadzonego kalendarza'}).click();
      } else assert.ok(sidebar.x >= article.x + article.width);
      await page.locator('#rezerwacja iframe').scrollIntoViewIfNeeded();
      await page.waitForLoadState('networkidle');
      assert.ok(booksy.length > 0, 'iframe makes an automatic request');
      for (const request of booksy) assert.equal((await request).referer, undefined, 'no topic referrer');
      assert.ok(external.every(url => /(^|\.)booksy\.com$/.test(new URL(url).hostname)), JSON.stringify(external));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      assert.deepEqual(errors, []);
      assert.ok(!consoleErrors.some(message => /content security policy|frame-ancestors|x-frame-options/i.test(message)), consoleErrors.join('\n'));
      console.log(JSON.stringify({viewport, widgetRequests: booksy.length, failures, consoleErrors, external}));
      await context.close();
    }
    console.log('66 topic addresses returned direct HTTP 200. Local layout, filter, navigation and initial referrer checks passed. This test does not verify booking availability or checkout.');
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
