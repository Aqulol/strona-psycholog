import { Fragment, isValidElement, type ReactNode } from 'react';

const segmenter = new Intl.Segmenter('pl', { granularity: 'word' });
const ignoredTags = new Set(['aside', 'button', 'code', 'footer', 'iframe', 'nav', 'pre', 'script', 'style', 'svg', 'template']);
const blockTags = new Set(['article', 'blockquote', 'br', 'dd', 'div', 'dl', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'li', 'ol', 'p', 'section', 'td', 'th', 'ul']);

// Read the authored body, not the full page. Layout components such as
// ArticleSources and ArticleBookingCta are opaque. Pass prose fragments directly;
// for non-content HTML within a body use data-reading-ignore.
function prose(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number' || typeof node === 'bigint') return String(node);
  if (Array.isArray(node)) return node.map(prose).join('');
  if (!isValidElement<{ children?: ReactNode; hidden?: boolean; 'data-reading-ignore'?: boolean }>(node)) return '';
  if (node.props.hidden || node.props['data-reading-ignore']) return ' ';
  if (node.type === Fragment) return prose(node.props.children);
  if (typeof node.type !== 'string' || ignoredTags.has(node.type)) return ' ';
  const text = prose(node.props.children);
  return blockTags.has(node.type) ? ` ${text} ` : text;
}

export function readingMinutes(body: ReactNode): number {
  let words = 0;
  for (const segment of segmenter.segment(prose(body))) if (segment.isWordLike) words++;
  return Math.max(1, Math.ceil(words / 200));
}
