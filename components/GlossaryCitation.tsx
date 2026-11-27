'use client';
import {useEffect,useState} from 'react';
export default function GlossaryCitation({url,citation}:{url:string;citation:string}){
 const [ready,setReady]=useState(false),[message,setMessage]=useState('');
 useEffect(()=>setReady(Boolean(navigator.clipboard)),[]);
 async function copy(value:string){try{await navigator.clipboard.writeText(value);setMessage('Skopiowano.');}catch{setMessage('Nie udało się skopiować. Zaznacz tekst i skopiuj ręcznie.');}}
 return <section className="glossary-clipboard"><h2>Zacytuj to hasło</h2><p>{citation}</p>{ready&&<div className="hero-actions" data-lastmod-ignore><button type="button" className="button-secondary" onClick={()=>copy(url)}>Kopiuj adres</button><button type="button" className="button-secondary" onClick={()=>copy(citation)}>Kopiuj zapis APA 7</button><span role="status">{message}</span></div>}</section>;
}
