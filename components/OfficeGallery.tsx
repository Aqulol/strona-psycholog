'use client';

import {useRef, useState} from 'react';
import {responsiveSrcSet} from '../lib/responsive-images';

const photos = [
 ['gabinet.webp','Wnętrze gabinetu',1280,1707],
 ['gabinet-fotel.webp','Fotel w gabinecie',1280,1707],
 ['gabinet-detal-1.webp','Detal wnętrza gabinetu',720,960],
 ['gabinet-detal-2.webp','Drugi detal wnętrza gabinetu',1280,1707],
] as const;

export default function OfficeGallery(){
 const dialog = useRef<HTMLDialogElement>(null), trigger = useRef<HTMLAnchorElement>(null);
 const [selected,setSelected] = useState<number|null>(null);
 const photo = selected === null ? null : photos[selected];
 return <>
  <div className="gallery">{photos.map(([file,alt,width,height],i)=><a key={file} href={`/images/${file}`} aria-label={`Powiększ zdjęcie: ${alt}`} onClick={e=>{
   if(e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || !dialog.current?.showModal) return;
   e.preventDefault();trigger.current=e.currentTarget;setSelected(i);dialog.current.showModal();
  }}><img src={`/images/${file}`} srcSet={i===0?responsiveSrcSet('gabinet'):[320,480].map(w=>`/images/responsive/${file.replace('.webp','')}-${w}.webp ${w}w`).join(', ')} sizes="(max-width: 560px) 45vw, 225px" width={width} height={height} loading="lazy" decoding="async" alt={alt}/></a>)}</div>
  <dialog ref={dialog} className="office-lightbox" aria-label="Powiększone zdjęcie gabinetu" onClose={()=>{setSelected(null);trigger.current?.focus();}}>
   <button className="booking" type="button" onClick={()=>dialog.current?.close()}>Zamknij zdjęcie</button>
   {photo&&<img src={`/images/${photo[0]}`} width={photo[2]} height={photo[3]} alt={photo[1]}/>}
  </dialog>
 </>;
}
