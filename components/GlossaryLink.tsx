import type {ReactNode} from 'react';
import {publishedTerms} from '../lib/glossary';
import {glossaryPath} from '../lib/knowledge';
export default function GlossaryLink({slug,children}:{slug:string;children:ReactNode}){
 return publishedTerms.some(term=>term.slug===slug)?<a data-context-link href={`${glossaryPath}${slug}/`}>{children}</a>:children;
}
