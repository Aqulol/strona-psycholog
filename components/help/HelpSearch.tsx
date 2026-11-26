'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { paths } from '../../lib/site';
import HelpCategoryCard, { HelpBadge, HelpLinks, type HelpCategory } from './HelpCategoryCard';
import HelpTopicIcon from './HelpTopicIcon';
export type { HelpCategory } from './HelpCategoryCard';

function normalize(value: string) {
  return value.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu, '').replace(/ł/g, 'l').trim();
}

export default function HelpSearch({ categories, youth, scope, children }: {
  categories: HelpCategory[]; youth: HelpCategory; scope: HelpCategory; children: ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => setEnabled(true), []);
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  function filter(category: HelpCategory) {
    return { ...category, topics: category.topics.filter(topic => terms.every(term => normalize(topic.label).includes(term))) };
  }
  function clear() {
    setQuery('');
    input.current?.focus();
  }
  const groups = categories.map(filter).filter(category => category.topics.length > 0);
  const youthMatches = filter(youth);
  const scopeMatches = filter(scope);
  const count = [...groups, youthMatches, scopeMatches].reduce((sum, category) => sum + category.topics.length, 0);

  return <>
    <section className="help-directory help-width" aria-labelledby="tematy-konsultacji">
      <h2 id="tematy-konsultacji">Obszary pomocy psychologicznej i psychoterapii</h2>
      <div className="help-search" role="search" hidden={!enabled}>
        <label htmlFor="help-search">Wyszukaj temat konsultacji</label>
        <div className="help-search-field"><HelpTopicIcon name="Search" size={21}/>
          <input ref={input} id="help-search" type="search" placeholder="Znajdź problem, np. samotność, lęk, depresja…" value={query} autoComplete="off" onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === 'Escape') clear(); }}/>
          {query && <button type="button" onClick={clear}><HelpTopicIcon name="X" size={17}/> <span>Wyczyść</span></button>}
        </div>
      </div>
      <p className={searching && !count ? 'help-empty' : 'sr-only'} role="status">{searching ? count ? `Liczba pasujących tematów: ${count}.` : 'Nie znaleziono pasujących tematów. Warto spróbować krótszego hasła.' : ''}</p>
      <div className="help-card-grid" id="lista-tematow" data-searching={searching}>
        {groups.map(category => <HelpCategoryCard key={category.title} category={category} searching={searching}/>)}
      </div>
    </section>
    {youthMatches.topics.length > 0 && <section className="help-youth help-width" aria-labelledby="help-youth-heading">
      <div className="help-panel-heading"><HelpBadge {...youth}/><h2 id="help-youth-heading">{youth.title}</h2></div>
      <HelpLinks topics={youthMatches.topics}/>
      {!searching && <a className="help-youth-cta" href={paths.youth}>Jak wygląda konsultacja dla młodzieży? <HelpTopicIcon name="ArrowUpRight" size={17}/></a>}
    </section>}
    <section className="help-scope help-width" aria-labelledby="help-scope-heading">
      <div className="help-panel-heading"><HelpBadge {...scope}/><h2 id="help-scope-heading">{scope.title}</h2></div>
      {scopeMatches.topics.length > 0 && <HelpLinks topics={scopeMatches.topics}/>}
      {children}
    </section>
  </>;
}
