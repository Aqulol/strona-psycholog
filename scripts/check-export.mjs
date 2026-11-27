import {assertContactRewrite} from './sitemap-lib.mjs';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
const root = 'https://psychologplebaniak.pl';
const read = (p) => readFileSync(p, 'utf8');
const urls = [...read('out/sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const paths = urls.map((url) => new URL(url).pathname);
assert.equal(paths.length, new Set(paths).size, 'No duplicated routes in sitemap');
assert.ok(paths.length >= 24, 'All editorial and service routes exported');
const file = (path) => join('out', path, 'index.html');
const titles = new Set(), descriptions = new Set();
for (const path of paths) {
  const html = read(file(path));
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: H1`);
  assert.ok(html.includes(`rel="canonical" href="${root}${path}"`), `${path}: canonical`);
  assert.ok(html.includes('name="twitter:card"'), `${path}: Twitter card`);
  assert.ok(!/name="ai-/.test(html), `${path}: no AI meta tags`);
  const plain = (text) => text.replace(/&(?:[a-z]+|#\d+);/gi, 'x');
  const title = plain(html.match(/<title>([^<]+)<\/title>/)[1]);
  const description = plain(html.match(/<meta name="description" content="([^"]+)"/)[1]);
  assert.ok(title.trim() && description.trim(), `${path}: title and description required`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${path}: duplicated SEO metadata`);
  titles.add(title); descriptions.add(description);
  for (const [, link] of html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)[^\"]*"/g)) {
    assert.ok(existsSync(file(link)) || (/^\/images\/[a-z0-9/_-]+\.(?:webp|avif)$/i.test(link) && existsSync(join('out',link))), `${path}: internal link ${link}`);
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
for (const name of ['portret2', 'gabinet', 'logo']) {
  const match = homepage.match(new RegExp(`srcSet="([^"]*/responsive/${name}-[^"]*)"`, 'i'));
  assert.ok(match, `Homepage: responsive ${name}`);
  for (const candidate of match[1].split(', ')) {
    assert.ok(existsSync(join('out', candidate.split(' ')[0])), `Responsive asset: ${candidate}`);
  }
}
assert.match(homepage, /<img\b(?=[^>]*portret2\.webp)(?=[^>]*fetchpriority="high")[^>]*>/i);
// The shared, immutable stylesheet avoids duplicating CSS in every exported HTML.
const styles = [...homepage.split('</head>')[0].matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(match => match[1]);
assert.equal(styles.length,1,'Expected one shared stylesheet for the homepage');
assert.match(styles[0],/^\/_next\/static\/css\/[a-f0-9]+\.css$/);
assert.ok(gzipSync(homepage).length + gzipSync(read(join('out',styles[0]))).length < 38_000, 'Homepage HTML and CSS gzip budget');

const hosting = JSON.parse(read('firebase.json')).hosting;
assert.equal(hosting.public, 'out');
assert.equal(hosting.trailingSlash, true);
assertContactRewrite(hosting);
assert.match(read('out/404.html'), /name="robots" content="noindex/);
for (const bot of ['OAI-SearchBot', 'Bingbot']) {
  assert.ok(read('out/robots.txt').includes(`User-Agent: ${bot}`));
}
for (const path of paths) {
  const html = read(file(path));
  assert.match(html, /Zygmunta Krasińskiego 13A Oficyna, 50-449 Wrocław/);
  if (/^\/blog\/.+\/$/.test(path)) {
    assert.match(html, /Autor: <a[^>]+href="\/o-mnie\/"/);
    assert.ok(html.includes(`"author":{"@id":"${root}/#osoba"}`));
  }
}

// Featured articles must be in the static export and discoverable from the blog and homepage.
const sitemapXml = read('out/sitemap.xml');
const publicationDate = '2026-11-26';
for (const slug of ['samotnosc', 'poczucie-wlasnej-wartosci']) {
  const path = `/blog/${slug}/`;
  const html = read(file(path));
  assert.ok(paths.includes(path));
  assert.ok(homepage.includes(`href="${path}"`));
  assert.ok(read(file('/blog/')).includes(`href="${path}"`));
  assert.ok(read(file('/psychoterapia-dorosli/')).includes(`href="${path}"`));
  assert.ok(html.includes('Literatura i źródła'));
  assert.ok(html.includes(`"@id":"${root}${path}#artykul"`));
  assert.ok(html.toLowerCase().includes(`datetime="${publicationDate}"`));
  assert.ok(html.includes(`"datePublished":"${publicationDate}"`));
  assert.ok(html.includes(`property="article:published_time" content="${publicationDate}"`));
  const sitemapEntry = sitemapXml.split('<url>').find(entry => entry.includes(`<loc>${root}${path}</loc>`));
  assert.ok(sitemapEntry?.includes(`<lastmod>${publicationDate}</lastmod>`));
}

const helpPaths = paths.filter(path => path.startsWith('/w-czym-pomagam/'));
const helpIndexPath = '/kiedy-zglosic-sie-na-terapie/';
const helpIndex = read(file(helpIndexPath));
assert.equal(helpPaths.length, 74, 'Only the completed topics are exported');
const additionalSlugs = ['zdrowie-fizyczne-i-psychiczne', 'trudnosci-okoloporodowe', 'rodzicielstwo', 'stres-mniejszosciowy', 'seksualnosc-i-intymnosc', 'trudnosci-z-odzywianiem', 'obraz-ciala', 'problemowe-uzywanie-substancji'];
assert.doesNotMatch(helpIndex, /obszary-rozmowy|Dodatkowe obszary konsultacji psychologicznych/);
const catalogue = helpIndex.match(/<section[^>]*aria-labelledby="tematy-konsultacji"[^>]*>([\s\S]*?)<\/section>/)?.[1];
assert.ok(catalogue, 'One shared catalogue');
for (const slug of additionalSlugs) {
  const path = `/w-czym-pomagam/${slug}/`;
  assert.ok(helpPaths.includes(path), `${path}: in sitemap`);
  assert.ok(helpIndex.includes(`href="${path}"`), `${path}: in common catalogue`);
  const html = read(file(path));
  assert.match(html, /"@type":"WebPage"/);
  assert.ok((html.match(/<section><h2>/g) || []).length >= 4, `${path}: clinical sections and consultation`);
}
assert.ok(!existsSync(file('/w-czym-pomagam/')), 'No competing topic index');
for (const path of helpPaths) {
  const html = read(file(path));
  assert.ok(helpIndex.includes(`href="${path}"`), `${path}: linked from catalog`);
  assert.ok(html.includes(`href="${helpIndexPath}"`), `${path}: backlink to catalog`);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /name="referrer" content="no-referrer"/);
  assert.doesNotMatch(html, /<iframe\b/i, `${path}: Booksy must not load before activation`);
  assert.match(html, /Pokaż kalendarz Booksy/);
  assert.doesNotMatch(html, /name="robots" content="[^\"]*noindex/);
  assert.match(html, /href="https:\/\/booksy\.com\/pl-pl\/357056_[^"?]+" rel="noreferrer"/);
}

const youthPath = '/psychoterapia-mlodziezy-od-15-roku-zycia/';
const youthHtml = read(file(youthPath));
assert.ok(helpIndex.includes(`href="${youthPath}"`));
for (const id of ['emocje-mlodziezy', 'relacje-mlodziezy', 'dorastanie-i-tozsamosc']) {
  assert.ok(youthHtml.includes(`id="${id}"`));
}

assert.match(helpIndex, /<h1>W czym mogę pomóc\?<\/h1>/);
assert.equal((catalogue.match(/class="help-category"/g) || []).length, 9);
assert.equal((catalogue.match(/<details\b/g) || []).length, 8);
assert.match(helpIndex, /id="help-youth-heading"/);
assert.match(helpIndex, /id="help-scope-heading"/);
// Contextual inline markup does not change the prose being validated.
const plain = html => html.replace(/<!--[^]*?-->|<[^>]+>/g, '');
const topicIntros = helpPaths.map(path => {
  const html = read(file(path));
  assert.ok((html.match(/<h2[ >]/g) || []).length >= 4, `${path}: substantive sections`);
  assert.ok(html.includes(`property="og:url" content="${root}${path}"`), `${path}: Open Graph URL`);
  assert.ok(html.includes('href="#rezerwacja"') && html.includes('id="rezerwacja"'), `${path}: booking jump link`);
  const intro = plain(html.match(/<p class="hero-copy">([^]*?)<\/p>/)?.[1] ?? '');
  assert.ok(intro && intro.length >= 80, `${path}: unique introductory copy`);
  return intro;
});
assert.equal(new Set(topicIntros).size, helpPaths.length);
for (const re of [/<title>([^<]+)<\/title>/, /<meta name="description" content="([^"]+)"/, /<h1[^>]*>([^<]+)<\/h1>/]) {
  const values = helpPaths.map(path => read(file(path)).match(re)?.[1]);
  assert.ok(values.every(Boolean));
  assert.equal(new Set(values).size, helpPaths.length, `Unique topic metadata: ${re}`);
}

const clinicalSections = helpPaths.map(path => {
  const html = read(file(path));
  const section = html.match(/<section data-topic-depth="true"><h2>([^<]+)<\/h2><p>([^]*?)<\/p><\/section>/);
  if (section) return plain(section[2]);
  const paragraphs = [...html.matchAll(/<section><h2>[^<]+<\/h2><p>([^]*?)<\/p><\/section>/g)];
  assert.ok(paragraphs.filter(([, text]) => plain(text).length >= 220).length >= 2, `${path}: dedicated clinical explanation`);
  return paragraphs.map(([, text]) => plain(text)).join(" ");
});
assert.equal(new Set(clinicalSections).size, helpPaths.length, 'Distinct clinical explanation for every topic');

assert.doesNotMatch(helpIndex, /Wszystkie tematy:/);
const catalogueNames = [...helpIndex.matchAll(/href="(\/w-czym-pomagam\/[^"]+)"[^>]*><svg[^>]*>.*?<\/svg><span>([^<]+)<\/span>/gs)];
assert.equal(catalogueNames.length, 74);
assert.deepEqual(catalogueNames.map(([, path]) => path).sort(), [...helpPaths].sort());
for (const [, path, label] of catalogueNames) {
  const html = read(file(path));
  assert.ok(html.includes(`<span aria-current="page">${label}</span>`), `${path}: breadcrumb uses catalogue label`);
}

assert.ok(!paths.some(path => /psychologiczne-aspekty-przewleklego-bolu|trudnosci-zwiazane-z-obrazem-ciala/.test(path)));

assert.match(helpIndex, /<dialog[^>]+class="site-search"/);
assert.doesNotMatch(catalogue, /type="search"/, "Catalogue links do not depend on a search form");
for (const path of paths) {
  const html = read(file(path));
  if (/^\/blog\/.+\/$/.test(path)) {
    assert.equal((html.match(/id="literatura-i-zrodla"/g) || []).length, 1, `${path}: one bibliography`);
  } else if (/^\/slownik-psychologiczny\/[^/]+\/$/.test(path)) {
    assert.equal((html.match(/<h2>Bibliografia<\/h2>/g) || []).length, 1, `${path}: one glossary bibliography`);
  } else {
    assert.doesNotMatch(html, /<h[2-4][^>]*>(Literatura(?: i źródła)?|Źródła(?: i dalsza lektura| naukowe)?|Bibliografia)<\/h[2-4]>/i, `${path}: no public bibliography`);
  }
}
assert.match(read(file('/w-czym-pomagam/doswiadczenie-przemocy/')), /href="https:\/\/nidzica\.policja\.gov\.pl\//);

// Reading estimates are part of the static HTML and consistent across cards.
const readingLabels = html => [...html.matchAll(/<span class="reading-time"><svg\b[^>]*>.*?<\/svg>(?:<!-- -->)?([1-9]\d*)(?:<!-- -->)? min czytania<\/span>/gs)].map(([, minutes]) => Number(minutes));
const blogPaths = paths.filter(path => /^\/blog\/[^/]+\/$/.test(path));
for (const path of [...blogPaths, ...helpPaths]) {
  const html = read(file(path));
  assert.equal(readingLabels(html).length, 1, `${path}: one reading estimate`);
  const headingEnd = html.indexOf('</h1>');
  const estimateAt = html.indexOf('<span class="reading-time">');
  assert.ok(headingEnd >= 0 && estimateAt > headingEnd && estimateAt < html.indexOf('<h2', headingEnd), `${path}: estimate under H1`);
}
for (const indexPath of ['/', '/blog/']) {
  const cards = [...read(file(indexPath)).matchAll(/<article\b[^>]*>(.*?)<\/article>/gs)]
    .map(([, card]) => [card.match(/href="(\/blog\/[^/]+\/)"/)?.[1], card]).filter(([path]) => path);
  assert.equal(cards.length, indexPath === '/' ? 3 : blogPaths.length);
  for (const [path, card] of cards) {
    assert.deepEqual(readingLabels(card), readingLabels(read(file(path))), `${indexPath}: card matches ${path}`);
  }
}

const offerHtml = read(file('/oferta/'));
const offerMain = offerHtml.match(/<main\b[\s\S]*?<\/main>/)?.[0];
assert.ok(offerMain);
const diagnosisRoutes = ['/diagnoza-psychologiczna-wroclaw/', '/diagnoza-osobowosci-wroclaw/', '/diagnoza-adhd-wroclaw/'];
const guideRoutes = ['/poradnictwo-psychologiczne-wroclaw/', '/konsultacja-diagnostyczna-wroclaw/', '/wsparcie-psychologiczne-w-kryzysie/', '/konsultacja-psychologiczna-dla-rodzicow/', '/konsultacja-psychologiczna-problemy-w-relacjach/', '/konsultacja-dotyczaca-wyboru-psychoterapii/'];
for (const path of diagnosisRoutes) {
  const html = read(file(path));
  const main = html.match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.match(main, /"@type":"Service"/);
  assert.doesNotMatch(main, /"@type":"Offer"|href="https:\/\/booksy\.com\//, `${path}: no unconfirmed rate or specific booking`);
  assert.match(main, /href="\/kontakt\/"/);
  assert.ok(offerMain.includes(`href="${path}"`), `${path}: visible catalogue link`);
  for (const sibling of diagnosisRoutes.filter(candidate => candidate !== path)) assert.ok(main.includes(`href="${sibling}"`));
}
for (const path of guideRoutes) {
  const html = read(file(path));
  assert.doesNotMatch(html, /"@type":"Service"/, `${path}: guide, not an independent service`);
  assert.ok(!offerMain.includes(`href="${path}"`));
  assert.ok(read(file('/psycholog-wroclaw/')).includes(`href="${path}"`));
}
for (const [selector, hub] of [['Psycholog','/psycholog-wroclaw/'],['Psychoterapeuta','/psychoterapeuta-wroclaw/'],['Baza wiedzy','/baza-wiedzy/']]) {
  assert.ok(homepage.includes(`<a href="${hub}">${selector}</a><button type="button" aria-label="Podmenu: ${selector}" aria-expanded="false" aria-controls="`));
}
console.log('Offer catalogue: diagnosis links, guarded prices/bookings, informational routes and split menu controls checked.');

const therapyService = '/psychoterapia-indywidualna-wroclaw/';
const therapyReferences = ['/psychoterapia-psychodynamiczna-wroclaw/', '/terapia-skoncentrowana-na-przeniesieniu-tfp/', '/psychoterapia-online/'];
for (const path of therapyReferences) {
  const main = read(file(path)).match(/<main\b[\s\S]*?<\/main>/)?.[0];
  assert.ok(main);
  assert.doesNotMatch(main, /"@type":"(?:Service|Offer)"/, `${path}: educational page, not a separate therapy offer`);
}
assert.match(read(file(therapyService)), /"@type":"Service","@id":"https:\/\/psychologplebaniak\.pl\/psychoterapia-indywidualna-wroclaw\/#usluga"/);
for (const html of [homepage, offerHtml]) {
  const cards = [...html.matchAll(/<article[^>]*data-therapy-card="true"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(cards.length, 1);
  assert.equal((cards[0][1].match(/href="https:\/\/booksy\.com\//g) || []).length, 1);
  assert.match(cards[0][1], /Umów konsultację wstępną/);
  for (const path of [therapyService,...therapyReferences]) assert.ok(cards[0][1].includes(`href="${path}"`));
}
console.log('Therapy: one offer with method, approach and delivery links; one initial consultation CTA per card.');
