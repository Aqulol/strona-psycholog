import type {ReactNode} from 'react';
import {webPage} from '../lib/entities';
import {Crumbs,Json} from './Site';
export default function KnowledgePage({path,title,description,collection=false,children}:{path:string;title:string;description:string;collection?:boolean;children:ReactNode}){
 const schema=webPage(path,title,description);
 return <main className="reading knowledge-page" id="tresc"><Crumbs path={path} title={title}/><Json data={{...schema,'@type':collection?'CollectionPage':'WebPage'}}/><p className="eyebrow">Gabinet psychologiczny · Baza wiedzy</p><h1>{title}</h1>{children}</main>;
}
