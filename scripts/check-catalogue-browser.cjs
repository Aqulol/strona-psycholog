const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { chromium } = require('playwright-core');

const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:3010';
const route = '/kiedy-zglosic-sie-na-terapie/';
const shots = process.env.HELP_SCREENSHOT_DIR;
const topics = 'main a[href^="/w-czym-pomagam/"]';
const selector = `${topics}, .help-youth-cta`;
const links = page => page.locator(selector).evaluateAll(anchors => anchors.map(anchor => anchor.getAttribute('href')));

(async () => {
  if (shots) mkdirSync(shots, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
  try {
    const staticContext = await browser.newContext({ javaScriptEnabled: false });
    const staticPage = await staticContext.newPage();
    await staticPage.goto(site + route);
    const original = await links(staticPage);
    assert.equal(original.length, 75);
    assert.equal(new Set(original).size, 75);
    assert.equal(await staticPage.getByRole('searchbox').count(), 0);
    const native = staticPage.locator('.help-more').first();
    assert.equal(await native.getAttribute('open'), null);
    await native.locator('summary').focus();
    await staticPage.keyboard.press('Enter');
    assert.equal(await native.getAttribute('open'), '');
    assert.ok(await native.locator('a').first().isVisible());
    await staticContext.close();

    const page = await browser.newPage({ reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(String(error)));
    for (const width of [375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(site + route);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.getByRole('searchbox').count(), 0);
      assert.deepEqual(await links(page), original);
      assert.equal(await page.locator('.help-category').count(), 9);
      const layout = await page.locator('.help-card-grid').evaluate(grid => ({
        gridWidth: grid.clientWidth,
        columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
        overflow: document.documentElement.scrollWidth > innerWidth,
        heights: [...grid.children].map(card => Math.round(card.getBoundingClientRect().height)),
        visibleLinks: [...grid.children].map(card => [...card.querySelectorAll('a')].filter(a => a.checkVisibility()).length),
      }));
      assert.equal(layout.columns, width >= 992 ? 3 : width >= 640 ? 2 : 1);
      assert.ok(!layout.overflow && layout.gridWidth <= 1240);
      if (width >= 640) assert.equal(new Set(layout.heights).size, 1);
      assert.equal(await page.locator('.help-category a:visible').first().evaluate(a => getComputedStyle(a).textDecorationLine), 'none');
      assert.deepEqual(layout.visibleLinks, [4,4,4,4,4,4,4,4,2]);
      if (shots) await page.locator('main').screenshot({ path: join(shots, `katalog-${width}.png`) });
      const summary = page.locator('.help-more summary').first();
      await summary.focus();
      await page.keyboard.press('Space');
      assert.equal(await page.locator('.help-more[open]').count(), 1);
      await page.keyboard.press('Tab');
      assert.ok(await page.locator('.help-more[open] a:focus-visible').count());
      await summary.click();
      assert.equal(await page.locator('.help-more[open]').count(), 0);
      console.log(JSON.stringify({ width, ...layout }));
    }
    const loneliness = page.getByRole('link', {name:'Samotność', exact:true});
    await loneliness.click();
    assert.equal(new URL(page.url()).pathname, '/w-czym-pomagam/samotnosc/');
    assert.deepEqual(errors, []);
    for (const path of original) assert.equal((await fetch(site + path, { redirect:'manual' })).status, 200, path);
    console.log('75 direct HTTP 200 links. No-JS HTML, native details, and keyboard passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
