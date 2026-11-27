import {createHash} from 'node:crypto';
import {parse} from 'parse5';

const blocks = new Set('article aside blockquote br dd details div dl dt h1 h2 h3 h4 h5 h6 hr li main nav ol p section summary table td th tr ul'.split(' '));
const ignored = new Set('script style svg template noscript button input select option'.split(' '));
const normalize = value => value.replace(/\s+/gu, ' ').trim().normalize('NFC');
const attr = (node, name) => node.attrs?.find(a => a.name === name)?.value;
function canonicalJson(value) {
  if (Array.isArray(value)) return value.map(canonicalJson);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(k => [k, canonicalJson(value[k])]));
  return value;
}
export function contentFingerprint(html) {
  const main = [], anchors = [], structured = [], titles = [], descriptions = [];
  function visit(node, inMain = false) {
    const tag = node.tagName;
    if (tag === 'script' && attr(node, 'type') === 'application/ld+json') {
      structured.push(JSON.stringify(canonicalJson(JSON.parse(node.childNodes[0].value))));
    }
    if (ignored.has(tag) || node.nodeName === '#comment' || attr(node,'data-lastmod-ignore') !== undefined) return;
    if (tag === 'title') titles.push(normalize(node.childNodes.map(x=>x.value).join('')));
    if (tag === 'meta' && attr(node,'name') === 'description') descriptions.push(normalize(attr(node,'content') ?? ''));
    const inside = inMain || tag === 'main';
    const start = main.length;
    if (inside && tag === 'br') main.push(' ');
    if (inside && node.nodeName === '#text') main.push(node.value);
    for (const child of node.childNodes ?? []) visit(child, inside);
    if (inside && tag === 'a' && attr(node,'href')) anchors.push([normalize(main.slice(start).join('')),attr(node,'href')]);
    if (inside && tag === 'img' && attr(node,'alt')) main.push(` ${attr(node,'alt')} `);
    if (inside && blocks.has(tag)) main.push(' ');
  }
  visit(parse(html));
  return `v1:${createHash('sha256').update(JSON.stringify([normalize(main.join('')), anchors, structured.sort(), titles, descriptions])).digest('hex')}`;
}

export function resolveLastmod(page, record) {
  if (record?.fingerprint !== page.fingerprint) return page.editorialDate;
  return [record.date, page.editorialDate].filter(Boolean).sort().at(-1);
}
