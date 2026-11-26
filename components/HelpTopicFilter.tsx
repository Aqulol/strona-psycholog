'use client';

import { useState } from 'react';
import Link from 'next/link';
import { matchesTopic, searchWords } from '../lib/help-topic-search.mjs';

type Category = { title: string; links: { href: string; label: string; terms?: string }[]; note?: string; more?: { href: string; label: string } };


export default function HelpTopicFilter({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState('');
  const words = searchWords(query);
  const filtered = words.length ? categories.map(category => ({
    ...category,
    links: category.links.filter(link => matchesTopic(words, link.label, link.terms)),
  })).filter(category => category.links.length) : categories;
  const visible = filtered.reduce((total, category) => total + category.links.length, 0);

  return <>
    <div className="help-topic-search">
      <label htmlFor="szukaj-tematu">Znajdź temat</label>
      <input id="szukaj-tematu" type="search" value={query} autoComplete="off" spellCheck={false} onChange={event => setQuery(event.currentTarget.value)} placeholder="Np. sen, relacje, samoocena" aria-controls="lista-tematow"/>
      {query && <button type="button" onClick={() => { setQuery(''); document.getElementById('szukaj-tematu')?.focus(); }}>Wyczyść</button>}
      {words.length > 0 && <p>Wyniki pomagają znaleźć temat. Nie są rozpoznaniem.</p>}
      <p role="status">{words.length ? `Znalezione tematy: ${visible}.` : null}</p>
      {words.length > 0 && visible === 0 && <p>Nie znaleziono pasujących tematów. Można spróbować krótszego hasła lub wyczyścić pole.</p>}
    </div>
    <div className="help-topic-grid" id="lista-tematow">
      {filtered.map(category => <div key={category.title} className="editorial-card help-topic-card">
        <h3>{category.title}</h3>
        {category.note && <p>{category.note}</p>}
        <ul>{category.links.map(link => <li key={link.href}><Link href={link.href} prefetch={false}>{link.label}<span aria-hidden="true">↗</span></Link></li>)}</ul>
        {category.more && <p><a href={category.more.href}>{category.more.label}</a></p>}
      </div>)}
    </div>
  </>;
}
