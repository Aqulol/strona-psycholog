'use client';

import {useEffect,useId,useState,type ReactNode} from 'react';
import {tokens} from '../lib/search-core.mjs';

// The server provides every result. Only visibility changes, without URL/state persistence.
export default function CatalogueFilter({children,categories,label}:{children:ReactNode;categories:readonly string[];label:string}){
 const id=useId();
 const [ready,setReady]=useState(false),[query,setQuery]=useState(''),[selected,setSelected]=useState(''),[count,setCount]=useState(0);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{
  const container=document.getElementById(id);
  if(!container || !ready) return;
  const words=tokens(query), active=Boolean(words.length||selected);
  const rows=[...container.querySelectorAll<HTMLElement>('[data-filter-row]')];
  const groups=[...container.querySelectorAll<HTMLElement>('[data-filter-group]')];
  for(const row of rows){
   const group=row.closest<HTMLElement>('[data-filter-group]');
   const cat=row.dataset.filterRow || group?.dataset.filterGroup || '';
   const hay=tokens(`${row.textContent}`);
   row.hidden=active&&((Boolean(selected)&&!cat.split('|').includes(selected))||!words.every(word=>hay.some(w=>w.startsWith(word))));
  }
  for(const group of groups) group.hidden=active&&![...group.querySelectorAll<HTMLElement>('[data-filter-row]')].some(row=>!row.hidden);
  setCount(rows.filter(row=>!row.hidden).length);
  return ()=>{rows.forEach(row=>{row.hidden=false;});groups.forEach(group=>{group.hidden=false;});};
 },[id,ready,query,selected]);
 return <>{ready&&<div className="catalogue-tools">
  <label> {label}<input type="search" autoComplete="off" maxLength={100} value={query} onChange={e=>setQuery(e.target.value)}/></label>
  <label>Kategoria<select value={selected} onChange={e=>setSelected(e.target.value)}><option value="">Wszystkie kategorie</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
  <button type="button" onClick={()=>{setQuery('');setSelected('');}}>Wyczyść filtry</button>
  <p role="status">Wyniki: {count}</p>
 </div>}<div id={id}>{children}</div></>;
}
