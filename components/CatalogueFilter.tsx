'use client';

import {useEffect,useId,useState,type ReactNode} from 'react';
import {tokens} from '../lib/search-core.mjs';

// The server provides every result. Only visibility changes, without URL/state persistence.
export default function CatalogueFilter({children,categories,label,age=false}:{children:ReactNode;categories:readonly string[];label:string;age?:boolean}){
 const id=useId();
 const [ready,setReady]=useState(false),[query,setQuery]=useState(''),[selected,setSelected]=useState(''),[youth,setYouth]=useState(false),[count,setCount]=useState(0);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{
  const container=document.getElementById(id);
  if(!container || !ready) return;
  const words=tokens(query), active=Boolean(words.length||selected||youth);
  const rows=[...container.querySelectorAll<HTMLElement>('[data-filter-row]')];
  const groups=[...container.querySelectorAll<HTMLElement>('[data-filter-group]')];
  const details=words.length ? [...container.querySelectorAll<HTMLDetailsElement>('details.help-more')] : [];
  const original=details.map(e=>e.open);
  details.forEach(e=>{e.open=true;});
  for(const row of rows){
   const group=row.closest<HTMLElement>('[data-filter-group]');
   const cat=row.dataset.filterRow || group?.dataset.filterGroup || '';
   const hay=tokens(`${row.textContent} ${row.dataset.alias??''}`);
   row.hidden=active&&((Boolean(selected)&&!cat.split('|').includes(selected))||(youth&&group?.dataset.youth!=='true')||!words.every(word=>hay.some(w=>w.startsWith(word))));
  }
  for(const group of groups) group.hidden=active&&![...group.querySelectorAll<HTMLElement>('[data-filter-row]')].some(row=>!row.hidden);
  setCount(rows.filter(row=>!row.hidden).length);
  return ()=>{rows.forEach(row=>{row.hidden=false;});groups.forEach(group=>{group.hidden=false;});details.forEach((e,i)=>{e.open=original[i];});};
 },[id,ready,query,selected,youth]);
 return <>{ready&&<div className="catalogue-tools">
  <label> {label}<input type="search" autoComplete="off" maxLength={100} value={query} onChange={e=>setQuery(e.target.value)}/></label>
  <label>Kategoria<select value={selected} onChange={e=>setSelected(e.target.value)}><option value="">Wszystkie kategorie</option>{categories.map(c=><option key={c}>{c}</option>)}</select></label>
  {age&&<label className="catalogue-check"><input type="checkbox" checked={youth} onChange={e=>setYouth(e.target.checked)}/> Tematy opracowane dla młodzieży</label>}
  <button type="button" onClick={()=>{setQuery('');setSelected('');setYouth(false);}}>Wyczyść filtry</button>
  <p role="status">Wyniki: {count}</p>
 </div>}<div id={id}>{children}</div></>;
}
