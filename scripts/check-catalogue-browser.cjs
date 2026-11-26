const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { chromium } = require('playwright-core');

const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:3010';
const baseline = process.env.HELP_BASELINE_URL;
const screenshots = process.env.HELP_SCREENSHOT_DIR;
const route = '/kiedy-zglosic-sie-na-terapie/';
const selectors = '#lista-tematow a, [aria-labelledby="obszary-rozmowy"] .help-topic-card a';
const widths = [2560, 1920, 1728, 1440, 1366, 1344, 1280, 1024, 976, 768, 640, 390, 360];

async function measure(page, origin, width, name) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(origin + route);
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(selectors => {
    const main = document.querySelector('[aria-labelledby="tematy-konsultacji"]');
    const additional = document.querySelector('[aria-labelledby="obszary-rozmowy"]');
    const grid = main.querySelector('#lista-tematow');
    const cards = [...grid.children];
    const bounds = element => element.getBoundingClientRect();
    const entries = [...document.querySelectorAll(selectors)];
    const lead = document.querySelector('.help-catalogue-intro') || document.querySelector('h1');
    const end = document.querySelector('.help-catalogue-details') || document.querySelector('main .see-also');
    const center = el => Math.round(bounds(el).left + bounds(el).width / 2);
    const round = Math.round;
    const style = getComputedStyle(grid);
    return {
      columns: Number(style.columnCount) || style.gridTemplateColumns.split(' ').length,
      width: round(bounds(grid).width),
      cardWidth: round(Math.min(...cards.map(card => bounds(card).width))),
      height: round(bounds(additional || main).bottom - bounds(main).top),
      pageHeight: round(bounds(document.querySelector('main')).height),
      intro: [round(bounds(lead).width), center(lead)],
      details: [round(bounds(end).width), center(end)],
      noOverflow: document.documentElement.scrollWidth <= innerWidth && entries.every(link => link.scrollWidth <= link.clientWidth + 1),
      minimumLinkHeight: round(Math.min(...entries.map(link => bounds(link).height))),
      titles: cards.map(card => card.querySelector('h3').textContent),
      links: entries.map(link => link.getAttribute('href')),
      visible: entries.every(link => link.checkVisibility() && bounds(link).height > 0),
      hasAdditional: Boolean(additional),
      cardOrder: cards.map(card => [round(bounds(card).left), round(bounds(card).top)]),
      unsplit: cards.every(card => card.getClientRects().length === 1),
    };
  }, selectors);
  if (screenshots && [1920, 1366, 390].includes(width)) {
    await page.locator('main').screenshot({ path: join(screenshots, `${width}-${name}.png`) });
  }
  return data;
}

(async () => {
  if (screenshots) mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, headless: true });
  try {
    const page = await browser.newPage();
    let allLinks;
    for (const width of widths) {
      const before = baseline && await measure(page, baseline, width, 'przed');
      const after = await measure(page, site, width, 'po');
      assert.equal(after.columns, width >= 1728 ? 5 : width >= 1344 ? 4 : width >= 976 ? 3 : width >= 640 ? 2 : 1);
      assert.deepEqual(after.intro, [Math.min(832, width - 40), Math.round(width / 2)]);
      assert.deepEqual(after.intro, after.details);
      assert.ok(after.width > after.intro[0]);
      assert.ok(after.noOverflow && after.visible && after.unsplit, `Visible links and intact cards without overflow at ${width}px`);
      assert.ok(!after.hasAdditional);
      assert.ok(after.minimumLinkHeight >= 32);
      assert.equal(after.titles.length, 13);
      assert.equal(after.links.filter(link => link.startsWith('/w-czym-pomagam/')).length, 74);
      assert.equal(after.links.length, new Set(after.links).size);
      assert.deepEqual(after.cardOrder, [...after.cardOrder].sort(([ax,ay], [bx,by]) => ax - bx || ay - by));
      if (before) {
        assert.deepEqual([...after.links].sort(), [...before.links].sort());
        assert.ok(after.height < before.height, `Shorter catalogue at ${width}px: ${before.height} → ${after.height}`);
      }
      if ([1366, 390].includes(width)) {
        await page.locator(selectors).first().focus();
        for (const [i, path] of after.links.entries()) {
          if (i) await page.keyboard.press('Tab');
          assert.equal(await page.locator(':focus-visible').getAttribute('href'), path, `Tab order at ${width}px`);
        }
        await page.keyboard.press('Enter');
        await page.waitForURL(`${site}${after.links.at(-1)}`);
      }
      allLinks = after.links;
      function summary(data) {
        if (!data) return undefined;
        const { links, titles, cardOrder, ...metrics } = data;
        return metrics;
      }
      console.log(JSON.stringify({ width, before: summary(before), after: summary(after) }));
    }
    for (const link of allLinks) assert.equal((await fetch(site + link, {redirect:'manual'})).status, 200, link);
    console.log(`${allLinks.length} direct HTTP 200 links; full Tab traversal and Enter activation passed on desktop and mobile.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
