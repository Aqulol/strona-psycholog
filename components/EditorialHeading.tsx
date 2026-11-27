import type {ReactNode} from 'react';

export default function EditorialHeading({index,label,title,id,children}:{index:string;label:string;title:string;id?:string;children?:ReactNode}){
 return <div className="editorial-heading"><p className="editorial-index" aria-hidden="true"><span>{index}</span><span>{label}</span></p><div><h2 id={id}>{title}</h2>{children}</div></div>;
}
