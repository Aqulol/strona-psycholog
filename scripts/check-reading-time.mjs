import assert from 'node:assert/strict';
import { createElement as h, Fragment } from 'react';
import { readingMinutes } from '../lib/reading-time.ts';

const text = size => 'słowo '.repeat(size);
for (const [size, expected] of [[0, 1], [1, 1], [199, 1], [200, 1], [201, 2], [400, 2], [401, 3]]) {
  assert.equal(readingMinutes(h('p', null, text(size))), expected, `${size} words`);
}
const excluded = ['aside', 'button', 'code', 'footer', 'nav', 'script', 'style', 'svg'].map(tag => h(tag, null, text(201)));
function Bibliography() { return h('p', null, text(201)); }
assert.equal(readingMinutes(h(Fragment, null,
  h('p', { title: text(201) }, text(199), h('a', { href: '/blog/' }, 'słowo')),
  ...excluded,
  h('section', { 'data-reading-ignore': true }, text(201)),
  h('p', { hidden: true }, text(201)),
  h(Bibliography),
)), 1);
assert.equal(readingMinutes(h(Fragment, null, h('h2', null, 'Nagłówek'), h('p', null, text(200)))), 2);
assert.equal(readingMinutes(h('p', null, text(199), 'sło', h('em', null, 'wo'))), 1);
console.log('Reading estimates: boundaries, Polish prose, inline text and exclusions passed.');
