import assert from 'node:assert/strict';
const base = process.argv[2];
if (!base) throw new Error('Usage: node scripts/check-hosting.mjs https://preview-url');
const get = (path, agent) => fetch(new URL(path, base), {
  redirect: 'manual', headers: agent ? { 'User-Agent': agent } : undefined,
});
for (const path of ['/', '/kontakt/', '/blog/dlaczego-wybieram-podobnych-partnerow/', '/sitemap.xml', '/robots.txt']) {
  assert.equal((await get(path)).status, 200, path);
}
const missing = `/seo-test-nieistniejacy-${Date.now()}/`;
assert.equal((await get(missing)).status, 404, 'Hosting must return real HTTP 404');
const old = await get('/blog/artykul-1/');
assert.equal(old.status, 301);
assert.equal(new URL(old.headers.get('location'), base).pathname, '/blog/dlaczego-wybieram-podobnych-partnerow/');
for (const bot of ['OAI-SearchBot', 'Bingbot']) {
  assert.equal((await get('/', bot)).status, 200, bot);
}
console.log('Hosting: public pages, HTTP 404, redirect, bot user agents OK.');
