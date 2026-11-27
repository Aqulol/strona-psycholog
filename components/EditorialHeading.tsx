import type {ReactNode} from 'react';

export default function EditorialHeading({label,title,id,children}:{label:string;title:string;id?:string;children?:ReactNode}){
 return <div className="editorial-heading"><p className="editorial-label" aria-hidden="true">{label}</p><div><h2 id={id}>{title}</h2>{children}</div></div>;
}
