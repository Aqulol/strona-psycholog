import {Children, cloneElement, isValidElement, type ReactElement, type ReactNode} from 'react';

// Work with authored headings only. No DOM scan, client JS or changes to reading estimates.
export function withArticleContents(source:ReactNode){
 const headings:{id:string;label:string}[]=[];
 const text=(node:ReactNode):string=>Children.toArray(node).map(child=>typeof child==='string'||typeof child==='number'?String(child):isValidElement<{children?:ReactNode}>(child)?text(child.props.children):'').join('');
 const walk=(nodes:ReactNode):ReactNode=>Children.map(nodes,node=>{
  if(!isValidElement<{children?:ReactNode;id?:string}>(node))return node;
  if(node.type==='h2'){
   const label=text(node.props.children).trim();
   if(!label)return node;
   const id=node.props.id??`czytelnia-sekcja-${headings.length+1}`;
   headings.push({id,label});return cloneElement(node,{id});
  }
  if(node.props.children===undefined)return node;
  return cloneElement(node as ReactElement<{children?:ReactNode}>,undefined,walk(node.props.children));
 });
 const body=walk(source);
 return headings.length<4?{body:source,contents:null}:{body,contents:<nav className="article-contents" aria-label="Spis treści" data-lastmod-ignore><details><summary>Spis treści</summary><ol>{headings.map(({id,label})=><li key={id}><a href={`#${id}`}>{label}</a></li>)}</ol></details></nav>};
}
