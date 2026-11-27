'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';

export default function CategoryCatalogue({categories,counts,children}:{categories:readonly string[];counts?:Readonly<Record<string,number>>;children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null);
 const [category,setCategory]=useState('');
 const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 useEffect(()=>{
  const root=ref.current;
  if(!root)return;
  for(const row of root.querySelectorAll<HTMLElement>('[data-filter-row]')){
   const group=row.closest<HTMLElement>('[data-filter-group]');
   const name=row.dataset.filterRow||group?.dataset.filterGroup;
   row.hidden=Boolean(category)&&!name?.split('|').includes(category);
  }
  const anchors=new Map([...root.querySelectorAll<HTMLAnchorElement>('[data-catalogue-letter]')].map(anchor=>[anchor.getAttribute('href'),anchor]));
  for(const group of root.querySelectorAll<HTMLElement>('[data-filter-group]')){
   group.hidden=!group.querySelector('[data-filter-row]:not([hidden])');
   const anchor=anchors.get(`#${group.id}`);
   if(anchor)anchor.hidden=group.hidden;
  }
  for(const section of root.querySelectorAll<HTMLElement>('[data-catalogue-section]'))section.hidden=!section.querySelector('[data-filter-group]:not([hidden])');
 },[category]);
 return <div ref={ref}>{ready&&<div className="category-toolbar"><label>Kategoria <select aria-label="Kategoria" value={category} onChange={event=>setCategory(event.target.value)}><option value="">Wszystkie kategorie</option>{categories.map(name=><option key={name} value={name}>{name}{counts?.[name]!==undefined?` (${counts[name]})`:null}</option>)}</select></label></div>}{children}</div>;
}
