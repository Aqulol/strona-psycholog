'use client';

import {useRef, useState} from 'react';
import {responsiveSrcSet} from '../lib/responsive-images';

const photos = [
 ['gabinet','Wnętrze gabinetu',1280,1707],
 ['gabinet-fotel','Fotel w gabinecie',1280,1707],
 ['gabinet-detal-1','Detal wnętrza gabinetu',720,960],
 ['gabinet-detal-2','Drugi detal wnętrza gabinetu',1280,1707],
] as const;

export default function OfficeGallery(){
 const dialog = useRef<HTMLDialogElement>(null), trigger = useRef<HTMLAnchorElement>(null);
 const [selected,setSelected] = useState<number|null>(null);
 const photo = selected === null ? null : photos[selected];
 return <>
  <div className="gallery">{photos.map(([file,alt,width,height],i)=><a key={file} href={`/images/${file}.webp`} aria-label={`Powiększ zdjęcie: ${alt}`} onClick={e=>{
   if(e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || !dialog.current?.showModal) return;
   e.preventDefault();trigger.current=e.currentTarget;setSelected(i);dialog.current.showModal();
  }}><img src={`/images/${file}.webp`} srcSet={responsiveSrcSet(file)} sizes="auto, (min-width: 910px) 411px, calc(46vw - 5px)" width={width} height={height} loading="lazy" decoding="async" alt={alt}/></a>)}</div>
  <dialog ref={dialog} className="office-lightbox" aria-label="Powiększone zdjęcie gabinetu" onClose={()=>{setSelected(null);trigger.current?.focus();}}>
   <button className="booking" type="button" onClick={()=>dialog.current?.close()}>Zamknij zdjęcie</button>
   {photo&&<img src={`/images/${photo[0]}.webp`} width={photo[2]} height={photo[3]} alt={photo[1]}/>}
  </dialog>
 </>;
}
