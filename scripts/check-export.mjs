import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
const root = 'https://psychologplebaniak.pl';
const read = (p) => readFileSync(p, 'utf8');
const urls = [...read('out/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((url) => new URL(url).pathname);
assert.equal(paths.length, new Set(paths).size, 'No duplicated routes in sitemap');
assert.ok(paths.length >= 24, 'All editorial and service routes exported');
const file = (path) => join('out', path, 'index.html');
for (const path of paths) {
  const html = read(file(path));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: H1`);
  assert.ok(html.includes(`rel="canonical" href="${root}${path}"`), `${path}: canonical`);
  assert.ok(html.includes('name="twitter:card"'), `${path}: Twitter card`);
  assert.ok(!/name="ai-/.test(html), `${path}: no AI meta tags`);
  const plain = (text) => text.replace(/&(?:[a-z]+|#\d+);/gi, 'x');
  const title = plain(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = plain(html.match(/<meta name="description" content="([^"]+)"/)[1]);
  assert.ok(title.length <= 60 && description.length >= 140 && description.length <= 155, `${path}: SEO lengths`);
  for (const [, link] of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)[^\"]*"/g)) {
    assert.ok(existsSync(file(link)), `${path}: internal link ${link}`);
  }
  for (const [, source] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    assert.doesNotThrow(() => JSON.parse(source), `${path}: JSON-LD`);
    assert.ok(!/"@type":"(?:Review|AggregateRating)"/.test(source));
  }
}
const redirects = JSON.parse(read('firebase.json')).hosting.redirects;
for (const { destination, type } of redirects) {
  assert.equal(type, 301);
  assert.ok(paths.includes(destination), `Redirect to indexed route: ${destination}`);
}
assert.ok(read('out/robots.txt').includes(`${root}/sitemap.xml`));
console.log(`Checked ${paths.length} exported pages and ${redirects.length} redirects.`);

const homepage = read(file('/'));
for (const name of ['portret', 'gabinet', 'logo']) {
  const match = homepage.match(new RegExp(`srcSet="([^"]*/responsive/${name}-[^"]*)"`, 'i'));
  assert.ok(match, `Homepage: responsive ${name}`);
  for (const candidate of match[1].split(', ')) {
    assert.ok(existsSync(join('out', candidate.split(' ')[0])), `Responsive asset: ${candidate}`);
  }
}
assert.match(homepage, /<img\b(?=[^>]*portret\.webp)(?=[^>]*fetchpriority="high")[^>]*>/i);
assert.doesNotMatch(homepage, /<link[^>]+rel="stylesheet"/i, 'Homepage CSS must not require a blocking request');
