const assert = require('node:assert/strict');
const { mkdirSync } = require('node:fs');
const { join } = require('node:path');
const { chromium } = require('playwright-core');

const site = process.env.HELP_TEST_URL || 'http://127.0.0.1:3010';
const baseline = process.env.HELP_BASELINE_URL;
const screenshots = process.env.HELP_SCREENSHOT_DIR;
const route = '/kiedy-zglosic-sie-na-terapie/';
const sections = '[aria-labelledby="tematy-konsultacji"], [aria-labelledby="obszary-rozmowy"]';
const widths = [1920, 1440, 1366, 1344, 1280, 1024, 976, 768, 640, 639, 430, 390, 360];

async function measure(page, origin, width, name) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(origin + route);
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(sections => {
    const [main, additional] = [...document.querySelectorAll(sections)];
    const grid = main.querySelector('#lista-tematow');
    const cards = [...grid.children];
    const bounds = element => element.getBoundingClientRect();
    const entries = [...document.querySelectorAll(`${sections.split(', ').map(s => `${s} .help-topic-card a`).join(', ')}`)];
    const gaps = bounds(grid).width * bounds(grid).height;
    const area = cards.reduce((sum, card) => sum + bounds(card).width * bounds(card).height, 0);
    const round = Math.round;
    return {
      columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
      width: round(bounds(grid).width),
      cardWidth: round(Math.min(...cards.map(card => bounds(card).width))),
      height: round(bounds(additional).bottom - bounds(main).top),
      pageHeight: round(document.querySelector('main').getBoundingClientRect().height),
      openGridArea: round(100 * (1 - area / gaps)),
      noOverflow: document.documentElement.scrollWidth <= innerWidth &&
        entries.every(link => link.scrollWidth <= link.clientWidth + 1),
      minimumLinkHeight: round(Math.min(...entries.map(link => bounds(link).height))),
      titles: cards.map(card => card.querySelector('h3').textContent),
      links: entries.map(link => link.getAttribute('href')),
      visible: entries.every(link => link.checkVisibility() && bounds(link).height > 0),
    };
  }, sections);
  if (screenshots && [1366, 390].includes(width)) {
    await page.locator('#lista-tematow').screenshot({ path: join(screenshots, `${width}-${name}.png`) });
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
      assert.equal(after.columns, width >= 1344 ? 4 : width >= 976 ? 3 : width >= 640 ? 2 : 1);
      assert.ok(after.noOverflow && after.visible, `Visible links without overflow at ${width}px`);
      assert.ok(after.minimumLinkHeight >= 32);
      assert.equal(after.titles.length, 10);
      assert.equal(after.links.filter(link => link.startsWith('/w-czym-pomagam/')).length, 74);
      assert.equal(after.links.length, new Set(after.links).size);
      if (before) {
        assert.deepEqual(after.titles, before.titles);
        assert.deepEqual(after.links, before.links);
        assert.ok(after.height < before.height);
      }
      if ([1366, 390].includes(width)) {
        const links = page.locator(sections.split(', ').map(s => `${s} .help-topic-card a`).join(', '));
        await links.first().focus();
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
        const { links, titles, ...metrics } = data;
        return metrics;
      }
      console.log(JSON.stringify({ width, before: summary(before), after: summary(after) }));
    }
    for (const link of allLinks) assert.equal((await fetch(site + link, {redirect:'manual'})).status, 200, link);
    console.log(`${allLinks.length} direct HTTP 200 links; full Tab traversal and Enter activation passed on desktop and mobile.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
