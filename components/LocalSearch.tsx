'use client';

import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { findContent, type SearchRow } from '../lib/search-core.mjs';
const groups=['Usługi','W czym pomagam?','Artykuły','Słownik psychologiczny','Informacje praktyczne'];
export default function LocalSearch() {
 const dialog=useRef<HTMLDialogElement>(null), opener=useRef<HTMLButtonElement>(null), input=useRef<HTMLInputElement>(null);
 const [rows,setRows]=useState<SearchRow[]|null>(null), [query,setQuery]=useState(''), [error,setError]=useState(false);
 const open=()=>{
   if(!dialog.current || dialog.current.open) return;
   dialog.current.showModal();input.current?.focus();
   if(rows===null){setError(false);fetch('/indeks-tresci.json',{credentials:'omit',referrerPolicy:'no-referrer'}).then(response=>{if(!response.ok)throw Error();return response.json();}).then(setRows).catch(()=>setError(true));}
 };
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}};document.addEventListener('keydown',onKey);return()=>document.removeEventListener('keydown',onKey);});
 const results=findContent(rows??[],query);
 return <><button ref={opener} className="search-trigger" type="button" onClick={open} aria-label="Szukaj w witrynie" aria-haspopup="dialog"><Search size={22} aria-hidden="true"/></button>
 <dialog ref={dialog} className="site-search" onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();dialog.current?.close();}}} aria-labelledby="site-search-title" onClose={()=>{setQuery('');opener.current?.focus();}}>
   <div className="search-header"><h2 id="site-search-title">Szukaj w witrynie</h2><button type="button" onClick={()=>dialog.current?.close()}>Zamknij</button></div>
   <label htmlFor="search-query">Temat lub nazwa usługi</label><input ref={input} id="search-query" type="search" autoComplete="off" maxLength={100} value={query} onChange={e=>setQuery(e.target.value)}/>
   <p role="status">{error?'Nie udało się wczytać indeksu. Można skorzystać z bazy wiedzy.':rows===null?'Wczytywanie indeksu…':query.trim().length<2?'Wpisz co najmniej dwa znaki.':`Znaleziono ${results.length}. Wyświetlam do 8 wyników w każdej kategorii.`}</p>
   {groups.map(group=>{const matching=results.filter(r=>r.group===group).slice(0,8);return matching.length>0&&<section key={group}><h3>{group}</h3><ul>{matching.map(r=><li key={r.href}><a href={r.href}>{r.title}</a></li>)}</ul></section>;})}
   <p><a href="/baza-wiedzy/">Przejdź do bazy wiedzy</a>. Wpisywane słowa pozostają w przeglądarce.</p>
 </dialog></>;
}
