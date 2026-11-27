import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export const origin = 'https://psychologplebaniak.pl';
export const out = 'out';
export const hosting = JSON.parse(readFileSync('firebase.json', 'utf8')).hosting;
const ns = 'http://www.sitemaps.org/schemas/sitemap/0.9';
export const noindex = value => /\b(?:noindex|none)\b/i.test(value ?? '');
const technicalErrors = new Set(['404.html', '404/index.html', '_not-found/index.html', '500.html', '500/index.html']);
const decode = value => value.replace(/&(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, entity => {
  const code = entity.slice(1, -1);
  if (code.startsWith('#')) return String.fromCodePoint(code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1)));
  return ({amp:'&', quot:'"', apos:"'", lt:'<', gt:'>'})[code.toLowerCase()];
});
const escapeXml = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;'})[char]);
const attrs = tag => Object.fromEntries([...tag.matchAll(/\s([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, key, string, alternative]) => [key.toLowerCase(), decode(string ?? alternative)]));
const tags = (html, type) => [...html.matchAll(new RegExp(`<${type}\\b[^>]*>`, 'gi'))].map(([tag]) => attrs(tag));
const elements = (html, type) => [...html.matchAll(new RegExp(`<${type}\\b[^>]*>([\\s\\S]*?)<\\/${type}>`, 'gi'))].map(([, content]) => content);
const clean = html => html.replace(/<(script|style|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<!--[\s\S]*?-->/g, '');
const plain = html => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const pathOf = file => file === 'index.html' ? '/' : `/${file.replace(/\/index\.html$/, '')}/`;

export function canonicalPath(url) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, origin, `Invalid origin: ${url}`);
  assert.ok(!parsed.search && !parsed.hash && !parsed.username && !parsed.password, `Noncanonical URL: ${url}`);
  assert.match(parsed.pathname, /^\/(?:[a-z0-9][a-z0-9-]*\/)*$/, `Expected clean trailing-slash path: ${url}`);
  assert.equal(url, origin + parsed.pathname, `Noncanonical spelling: ${url}`);
  return parsed.pathname;
}

export function inspectHtml(html) {
  const visible = clean(html);
  const metas = tags(visible, 'meta');
  const mains = elements(visible, 'main');
  const content = plain(mains.join(' '));
  return {
    canonical: tags(visible, 'link').filter(link => link.rel?.toLowerCase().split(/\s+/).includes('canonical')).map(link => link.href),
    noindex: metas.some(meta => /^(robots|googlebot|bingbot)$/i.test(meta.name) && noindex(meta.content)),
    refresh: metas.filter(meta => meta['http-equiv']?.toLowerCase() === 'refresh').map(meta => meta.content ?? ''),
    titles: elements(visible, 'title').map(plain),
    headings: elements(mains.join(' '), 'h1').map(plain),
    mainCount: mains.length,
    content,
    links: tags(visible, 'a').map(anchor => anchor.href).filter(Boolean),
    ids: new Set([...visible.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => decode(id))),
  };
}

export function assertIndexable(page, path) {
  assert.deepEqual(page.canonical, [origin + path], `${path}: expected one self-canonical`);
  assert.ok(!page.noindex && !page.refresh.length, `${path}: indexable page is noindex or refresh`);
  assert.ok(page.titles.length === 1 && page.titles[0], `${path}: missing/duplicate title`);
  assert.ok(page.mainCount === 1 && page.headings.length === 1 && page.headings[0], `${path}: missing main or unique H1`);
  assert.doesNotMatch(page.headings[0], /^(404\b|500\b|Tej strony nie ma|Przeniesiono artykuł|This page could not be found)/i, `${path}: error or redirect template`);
  assert.ok(page.content.length - page.headings[0].length >= 80, `${path}: insufficient content beyond H1`);
}

export function assertDate(date) {
  assert.match(date, /^\d{4}-\d{2}-\d{2}$/, `Expected date YYYY-MM-DD: ${date}`);
  const timestamp = new Date(`${date}T00:00:00Z`);
  assert.ok(!Number.isNaN(+timestamp) && timestamp.toISOString().slice(0, 10) === date, `Invalid calendar date: ${date}`);
  assert.ok(date <= new Date().toISOString().slice(0, 10), `Future lastmod: ${date}`);
}

function articleDate(html, url) {
  const articles = [...html.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)].flatMap(([, tag, source]) => {
    if (attrs(tag).type !== 'application/ld+json') return [];
    const data = JSON.parse(source);
    return (data['@graph'] ?? [data]).filter(node => node['@type'] === 'BlogPosting' && node.mainEntityOfPage === url);
  });
  assert.ok(articles.length <= 1, `${url}: duplicate BlogPosting dates`);
  const { datePublished, dateModified } = articles[0] ?? {};
  if (datePublished) assertDate(datePublished);
  if (dateModified) assertDate(dateModified);
  if (datePublished && dateModified) assert.ok(datePublished <= dateModified, `${url}: modification before publication`);
  return dateModified ?? datePublished;
}

export function checkRobots(text) {
  const directives = text.split(/\r?\n/).map(line => line.split('#')[0].trim()).filter(Boolean);
  assert.deepEqual(directives.filter(line => /^sitemap\s*:/i.test(line)).map(line => line.replace(/^sitemap\s*:\s*/i, '')), [origin + '/sitemap.xml']);
  assert.ok(directives.some(line => /^user-agent:\s*\*$/i.test(line)), 'robots.txt: missing wildcard agent');
  // This site's policy is intentionally allow-all, including rendering assets.
  assert.ok(directives.every(line => /^(?:user-agent|sitemap)\s*:\s*\S.*$/i.test(line) || /^(?:allow\s*:\s*\/|disallow\s*:\s*)$/i.test(line)), 'robots.txt: unexpected crawling restriction or directive');
}

function walk(directory, prefix = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = prefix + entry.name;
    return entry.isDirectory() ? walk(join(directory, entry.name), `${name}/`) : entry.isFile() && name.endsWith('.html') ? [name] : [];
  });
}

export function readExport(directory = out) {
  assert.equal(hosting.public, out);
  assert.equal(hosting.cleanUrls, true);
  assert.equal(hosting.trailingSlash, true);
  assert.equal((hosting.rewrites ?? []).length, 0, 'Hosting rewrites must not mask errors or shadow canonicals');
  assert.ok(!(hosting.headers ?? []).some(group => group.headers.some(({key}) => /^x-robots-tag$/i.test(key))), 'Review X-Robots-Tag policy before changing Firebase headers');
  const redirects = new Map();
  for (const { source, destination, type } of hosting.redirects ?? []) {
    assert.match(source, /^\/(?:[a-z0-9][a-z0-9-]*\/)*[a-z0-9-]*$/, `Review nonliteral Hosting redirect ${source}`);
    assert.equal(type, 301, source);
    canonicalPath(origin + destination);
    assert.ok(!redirects.has(source), `Duplicated redirect: ${source}`);
    redirects.set(source, destination);
  }
  const pages = new Map();
  const excluded = new Map();
  const content = new Map();
  for (const file of walk(directory).sort()) {
    const html = readFileSync(join(directory, file), 'utf8');
    const page = inspectHtml(html);
    if (technicalErrors.has(file)) {
      assert.ok(page.noindex && !page.refresh.length, `${file}: expected noindex error document`);
      excluded.set(file, 'error');
      continue;
    }
    if (/^google[a-f0-9]+\.html$/.test(file)) {
      assert.equal(html.trim(), `google-site-verification: ${file}`);
      excluded.set(file, 'verification');
      continue;
    }
    assert.ok(file === 'index.html' || file.endsWith('/index.html'), `Unexpected HTML export: ${file}`);
    const path = pathOf(file);
    const destination = redirects.get(path) ?? redirects.get(path.slice(0, -1));
    if (destination) {
      assert.ok(page.noindex && page.refresh.length === 1, `${path}: Hosting shadows a non-redirect page`);
      const refresh = page.refresh[0].match(/^0;\s*url=(.*)$/i)?.[1];
      assert.equal(refresh?.replace(/\/$/, ''), destination.slice(0, -1), `${path}: meta refresh disagrees with Hosting redirect`);
      excluded.set(file, 'redirect');
    } else if (page.noindex) {
      assert.equal(page.refresh.length, 0, `${path}: register redirects with Hosting`);
      excluded.set(file, 'noindex');
    } else {
      assertIndexable(page, path);
      assert.ok(!content.has(page.content), `${path}: duplicates main content of ${content.get(page.content)}`);
      content.set(page.content, path);
      const url = origin + path;
      canonicalPath(url);
      pages.set(path, { ...page, url, lastmod: articleDate(html, url) });
    }
  }
  assert.equal(excluded.get('404.html'), 'error', 'Missing Hosting 404.html');
  for (const [source, destination] of redirects) assert.ok(pages.has(destination), `${source}: missing indexable destination ${destination}`);
  checkRobots(readFileSync(join(directory, 'robots.txt'), 'utf8'));
  assert.ok(pages.has('/'), 'Missing homepage');
  return { pages, excluded, redirects };
}

export function serialize(pages) {
  const urls = [...pages.values()].map(({url, lastmod}) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ''}  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="${ns}">\n${urls.join('\n')}\n</urlset>\n`;
}

export function parseSitemap(xml) {
  assert.ok(Buffer.byteLength(xml) <= 52_428_800, 'Sitemap exceeds 50 MiB');
  const root = xml.match(/^\s*<\?xml version="1\.0" encoding="UTF-8"\?>\s*<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">([\s\S]*)<\/urlset>\s*$/);
  assert.ok(root, 'Invalid sitemap XML root or namespace');
  const entries = new Map();
  const remaining = root[1].replace(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>\s*)?<\/url>/g, (_, loc, lastmod) => {
    assert.ok(!/&(?!(?:amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);)/i.test(loc), 'Unescaped ampersand in XML');
    const url = decode(loc);
    const path = canonicalPath(url);
    assert.ok(!entries.has(path), `Duplicated sitemap URL: ${url}`);
    if (lastmod) assertDate(lastmod);
    entries.set(path, lastmod);
    return '';
  });
  assert.equal(remaining.trim(), '', 'Unexpected XML element, attribute or malformed url entry');
  assert.ok(entries.size > 0 && entries.size <= 50_000, 'Expected 1–50,000 URLs in sitemap');
  return entries;
}

export function auditLinks(pages, redirects) {
  const links = new Map();
  const broken = new Set();
  const legacy = new Set();
  for (const [path, page] of pages) {
    const targets = new Set();
    for (const href of page.links) {
      const target = new URL(href, page.url);
      if (target.origin !== origin) continue;
      const { pathname, hash } = target;
      if (redirects.has(pathname)) legacy.add(`${path} → ${href}`);
      else if (!pages.has(pathname)) broken.add(`${path} → ${href}`);
      else {
        targets.add(pathname);
        if (hash && !pages.get(pathname).ids.has(decodeURIComponent(hash.slice(1)))) broken.add(`${path} → ${href} (fragment)`);
      }
    }
    links.set(path, targets);
  }
  const depth = new Map([['/', 0]]);
  for (const [path, distance] of depth) for (const target of links.get(path) ?? []) if (!depth.has(target)) depth.set(target, distance + 1);
  const orphaned = [...pages.keys()].filter(path => path !== '/' && ![...links].some(([from, to]) => from !== path && to.has(path)));
  return { broken: [...broken], legacy: [...legacy], orphaned, unreachable: [...pages.keys()].filter(path => !depth.has(path)), maxDepth: Math.max(...depth.values()) };
}
