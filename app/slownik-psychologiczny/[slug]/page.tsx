import {notFound} from 'next/navigation';
import GlossaryEntryPage,{glossaryMetadata} from '../../../components/GlossaryEntryPage';
import {publishedTerms} from '../../../lib/glossary';

export const dynamicParams=false;
export function generateStaticParams(){return publishedTerms.map(({slug})=>({slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){
 const {slug}=await params;
 if(!publishedTerms.some(term=>term.slug===slug))notFound();
 return glossaryMetadata(slug);
}
export default async function Page({params}:Props){
 const {slug}=await params;
 if(!publishedTerms.some(term=>term.slug===slug))notFound();
 return <GlossaryEntryPage slug={slug}/>;
}
