import assert from 'node:assert/strict';
import { auditLinks, assertIndexable, checkRobots, hosting, inspectHtml, noindex, origin, parseSitemap, readExport } from './sitemap-lib.mjs';

const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/check-hosting.mjs https://preview-or-production-url');
const get = (path, agent) => fetch(new URL(path, base), {
  redirect: 'manual', signal: AbortSignal.timeout(15_000),
  headers: agent ? { 'User-Agent': agent } : undefined,
});
const local = readExport().pages;
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200, 'sitemap.xml');
assert.match(sitemap.headers.get('content-type') ?? '', /^(?:application|text)\/xml\b/i);
const entries = parseSitemap(await sitemap.text());
const robots = await get('/robots.txt');
assert.equal(robots.status, 200, 'robots.txt');
assert.match(robots.headers.get('content-type') ?? '', /^text\/plain\b/i);
checkRobots(await robots.text());
const remoteOnly = [...entries.keys()].filter(path => !local.has(path));
const localOnly = [...local.keys()].filter(path => !entries.has(path));
const changedDates = [...entries].filter(([path, date]) => local.has(path) && local.get(path).lastmod !== date);
console.log(`HTTP sitemap: ${entries.size} paths; remote only: ${remoteOnly.join(', ') || 'none'}; local only: ${localOnly.join(', ') || 'none'}; different dates: ${changedDates.length}.`);
const pages = new Map();
const issues = [];
const pending = [...new Set([...entries.keys(), ...local.keys()])];
await Promise.all(Array.from({ length: 6 }, async () => {
  for (let path = pending.shift(); path; path = pending.shift()) {
    try {
      const response = await get(path);
      assert.equal(response.status, 200, `${path}: expected direct HTTP 200`);
      assert.match(response.headers.get('content-type') ?? '', /^text\/html\b/i, path);
      assert.ok(!noindex(response.headers.get('x-robots-tag')), `${path}: X-Robots-Tag noindex`);
      const page = inspectHtml(await response.text());
      assertIndexable(page, path);
      // An old deployment can have different copy; report it without mistaking it for a redirect.
      if (local.has(path) && page.headings[0] !== local.get(path).headings[0]) console.warn(`${path}: H1 differs from local export`);
      pages.set(path, { ...page, url: origin + path });
    } catch (error) { issues.push(`${path}: ${error.message}`); }
  }
}));
const bodies = new Map();
for (const [path, { content }] of pages) {
  if (bodies.has(content)) issues.push(`${path}: same main content as ${bodies.get(content)}`);
  bodies.set(content, path);
}
for (const path of ['/seo-audyt-nieistniejacy-2026/', '/blog/seo-audyt-nieistniejacy-2026/', '/w-czym-pomagam/seo-audyt-nieistniejacy-2026/']) {
  const response = await get(path);
  assert.equal(response.status, 404, `${path}: expected HTTP 404, not homepage/fallback 200`);
  const page = inspectHtml(await response.text());
  assert.match(page.headings[0] ?? '', /^Tej strony nie ma$/);
  assert.ok(page.noindex, `${path}: error template must be noindex`);
}
for (const {source, destination, type} of hosting.redirects) {
  const response = await get(source);
  assert.equal(response.status, type, source);
  assert.equal(new URL(response.headers.get('location'), base).href, new URL(destination, base).href, source);
}
const explicitError = await get('/404/');
if (explicitError.status !== 404) {
  const page = inspectHtml(await explicitError.text());
  assert.ok(explicitError.status === 200 && page.noindex && !entries.has('/404/'), '/404/ must be a nonindexable error document');
  console.warn('/404/ serves a noindex error document with HTTP 200 (duplicate technical export).');
}
for (const bot of ['OAI-SearchBot', 'Bingbot']) assert.equal((await get('/', bot)).status, 200, bot);
const links = auditLinks(pages, new Map(hosting.redirects.map(rule => [rule.source, rule.destination])));
for (const kind of ['broken', 'legacy', 'orphaned', 'unreachable']) if (links[kind].length) console.warn(`HTTP ${kind}: ${links[kind].join(', ')}`);
assert.deepEqual(issues, [], 'HTTP indexability issues');
assert.deepEqual([...remoteOnly, ...localOnly], [], 'HTTP sitemap URL set differs from local export');
console.log(`Hosting: ${pages.size} canonical HTTP 200 pages, XML and robots MIME, ${hosting.redirects.length} redirects, 3 real HTTP 404s.`);
