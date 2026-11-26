'use client';
import {useId,useState} from 'react';
export default function ExternalFrame({src,title,label,sandbox}:{src:string;title:string;label:string;sandbox?:string}){
 const [visible,setVisible]=useState(false);
 const id=useId();
 return <><button type="button" className="booking" aria-controls={id} aria-expanded={visible} onClick={()=>setVisible(!visible)}>{visible ? `Ukryj: ${title}` : label}</button><div id={id}>{visible && <iframe className="embed mt-4" src={src} title={title} loading="lazy" sandbox={sandbox} referrerPolicy="no-referrer"/>}</div></>;
}
