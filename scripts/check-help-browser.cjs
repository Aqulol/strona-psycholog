const assert = require('node:assert/strict');
const { chromium } = require('playwright-core');
const { readFileSync, mkdirSync } = require('node:fs');
const { join } = require('node:path');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
  const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:3010';
  const baseline = process.env.HELP_BASELINE_URL;
  const shots = process.env.HELP_SCREENSHOT_DIR;
  const widths = [1920, 1440, 1366, 1280, 1024, 768, 430, 390, 360];
  const hub = '/kiedy-zglosic-sie-na-terapie/';
  const topics = ['lek-spoleczny', 'depresja', 'borderline', 'stres-szkolny'];
  const cfg = JSON.parse(readFileSync('firebase.json')).hosting.headers.find(x => x.source === '**').headers;
  const headers = Object.fromEntries(cfg.map(({key, value}) => [key.toLowerCase(), value]));
  function observe(page) {
    const failures = [], errors = [], requests = [];
    page.on('pageerror', error => errors.push(String(error)));
    page.on('requestfailed', req => { if (new URL(req.url()).hostname === 'booksy.com') failures.push(req.failure()?.errorText); });
    page.on('request', req => { if (req.url().startsWith('https://booksy.com/widget/')) requests.push(req.allHeaders()); });
    return { failures, errors, requests };
  }
  async function measures(page) {
    return page.locator('.topic-layout').evaluate(layout => {
      const article = layout.querySelector('article').getBoundingClientRect();
      const aside = layout.querySelector('#rezerwacja');
      const panel = aside.getBoundingClientRect();
      const frame = aside.querySelector('iframe').getBoundingClientRect();
      const css = getComputedStyle(aside);
      return { article: Math.round(article.width), panel: Math.round(panel.width), frame: Math.round(frame.width), sideBySide: panel.left >= article.right, noOverflow: document.documentElement.scrollWidth <= innerWidth, hostWrap: [css.wordBreak, css.overflowWrap, css.hyphens] };
    });
  }
  try {
    if (shots) mkdirSync(shots, { recursive: true });
    const sitemap = await (await fetch(`${site}/sitemap.xml`)).text();
    const all = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname).filter(p => p.startsWith('/w-czym-pomagam/'));
    assert.equal(all.length, 66);
    for (const path of all) assert.equal((await fetch(site + path, {redirect:'manual'})).status, 200, path);
    const context = await browser.newContext({viewport:{width:1366,height:900}});
    for (const origin of [site, baseline].filter(Boolean)) {
      await context.route(`${origin}/**`, async route => {
        if (route.request().resourceType() !== 'document') return route.continue();
        const response = await route.fetch();
        await route.fulfill({response, headers: {...response.headers(), ...headers}});
      });
    }
    const page = await context.newPage();
    const { failures, errors, requests } = observe(page);
    await page.goto(site + hub);
    assert.equal(await page.locator('#lista-tematow a[href^="/w-czym-pomagam/"]').count(), 66);
    assert.equal(await page.getByRole('searchbox').count(), 0);
    assert.equal(await page.locator('.help-topic-card').count(), 10);
    await page.locator('#lista-tematow a[href$="/lek-spoleczny/"]').click();
    assert.match(page.url(), /\/lek-spoleczny\/$/);
    await page.goto(site + '/blog/samotnosc/');
    assert.equal(await page.getByRole('heading', { name: 'Literatura i źródła' }).count(), 1);
    for (const width of widths) {
      await page.setViewportSize({width, height:900});
      for (const route of [hub, '/blog/samotnosc/']) {
        await page.goto(site + route, {waitUntil:'domcontentloaded'});
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}: horizontal overflow`);
      }
      const path = '/w-czym-pomagam/lek-spoleczny/';
      let before;
      if (baseline) {
        await page.goto(baseline + path, {waitUntil:'domcontentloaded'});
        before = await measures(page);
        if (shots && width === 1366) await page.screenshot({path:join(shots,'booksy-1366-przed.png')});
      }
      for (const slug of topics) {
        await page.goto(`${site}/w-czym-pomagam/${slug}/`, {waitUntil:'domcontentloaded'});
        const after = await measures(page);
        assert.equal(after.sideBySide, width >= 1088, `${slug} at ${width}: columns`);
        assert.ok(after.noOverflow, `${slug} at ${width}: horizontal overflow`);
        assert.deepEqual(after.hostWrap, ['normal','normal','none']);
        if (after.sideBySide) assert.ok(after.frame >= 414 && after.article >= 500);
        assert.equal(await page.getByRole('heading', {name:'Literatura i źródła'}).count(), 0);
        assert.ok(await page.locator('#rezerwacja a[href^="https://booksy.com/"]').isVisible());
        if (slug === 'lek-spoleczny') {
          console.log(JSON.stringify({ width, before, after }));
          if (shots && width === 1366) await page.screenshot({path:join(shots,'booksy-1366-po.png')});
          if (!after.sideBySide) await page.getByRole('link', {name:'Przejdź do osadzonego kalendarza'}).click();
          await page.locator('#rezerwacja iframe').scrollIntoViewIfNeeded();
          if (shots && width === 390) await page.locator('#rezerwacja').screenshot({path:join(shots,'booksy-390-po.png')});
        }
      }
    }
    await page.waitForLoadState('networkidle');
    assert.ok(requests.length > 0, 'automatic widget request');
    for (const request of requests) assert.equal((await request).referer, undefined);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({widgetRequests: requests.length, failures: [...new Set(failures)]}));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
