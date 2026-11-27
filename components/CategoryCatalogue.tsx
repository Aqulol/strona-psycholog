'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';

export default function CategoryCatalogue({categories,children}:{categories:readonly string[];children:ReactNode}){
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
  for(const group of root.querySelectorAll<HTMLElement>('[data-filter-group]')){
   group.hidden=!group.querySelector('[data-filter-row]:not([hidden])');
   if(group.id)for(const anchor of root.querySelectorAll<HTMLAnchorElement>('[data-catalogue-letter]')){
    if(anchor.hash===`#${encodeURIComponent(group.id)}`||anchor.getAttribute('href')===`#${group.id}`)anchor.hidden=group.hidden;
   }
  }
  for(const section of root.querySelectorAll<HTMLElement>('[data-catalogue-section]'))section.hidden=!section.querySelector('[data-filter-group]:not([hidden])');
 },[category]);
 return <div ref={ref}>{ready&&<div className="category-toolbar"><label>Kategoria <select value={category} onChange={event=>setCategory(event.target.value)}><option value="">Wszystkie kategorie</option>{categories.map(name=><option key={name}>{name}</option>)}</select></label></div>}{children}</div>;
}
