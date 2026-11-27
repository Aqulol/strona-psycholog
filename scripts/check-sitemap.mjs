import assert from 'node:assert/strict';
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { auditLinks, out, parseSitemap, readExport, serialize } from './sitemap-lib.mjs';

const { pages, excluded, redirects } = readExport();
const filename = `${out}/sitemap.xml`;
if (process.argv.includes('--write')) {
  // Next duplicates the error template at /404/, which Hosting would serve
  // with status 200. Keep only the custom fallback at out/404.html.
  if (excluded.get('404/index.html') === 'error') {
    rmSync(`${out}/404/index.html`);
    excluded.delete('404/index.html');
  }
  writeFileSync(filename, serialize(pages), 'utf8');
} else {
  assert.ok(!excluded.has('404/index.html'), 'Duplicate error template would expose /404/ as HTTP 200; run npm run build');
}
const entries = parseSitemap(readFileSync(filename, 'utf8'));
const missing = [...pages.keys()].filter(path => !entries.has(path));
const unexpected = [...entries.keys()].filter(path => !pages.has(path));
assert.ok(!missing.length && !unexpected.length, `Sitemap/export mismatch:\nMissing: ${missing.join(', ')}\nUnexpected: ${unexpected.join(', ')}`);
for (const [path, date] of entries) assert.equal(date, pages.get(path).lastmod, `${path}: lastmod differs from verified content dates`);
const links = auditLinks(pages, redirects);
console.log(`Sitemap: ${entries.size} indexable pages, ${excluded.size} excluded HTML files, ${[...entries.values()].filter(Boolean).length} sourced lastmod dates.`);
console.log(`Internal links: ${links.orphaned.length} orphaned, ${links.unreachable.length} unreachable, maximum depth ${links.maxDepth}.`);
for (const kind of ['broken', 'legacy', 'orphaned', 'unreachable']) if (links[kind].length) console.warn(`${kind}:\n${links[kind].join('\n')}`);
