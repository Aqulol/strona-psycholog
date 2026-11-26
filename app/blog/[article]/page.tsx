import {notFound} from 'next/navigation';
import {editorial} from '../../../lib/editorial';
import {domain,meta,paths,status} from '../../../lib/site';
import {Crumbs,Json,SeeAlso} from '../../../components/Site';
type Props={params:Promise<{article:string}>};
const published=editorial.filter(a=>a.slug && a.sections);
export const dynamicParams=false;
export function generateStaticParams(){return published.map(a=>({article:a.slug!}));}
async function getPage(params:Props['params']){const {article}=await params;const a=published.find(p=>p.slug===article);if(!a)notFound();return {a,path:`/blog/${article}/`};}
export async function generateMetadata({params}:Props){const {a,path}=await getPage(params);return meta(path,a.title,a.description,true);}
export default async function Page({params}:Props){const {a,path}=await getPage(params);return <main id="tresc" className="reading"><Crumbs path={path} title={a.title}/><article><h1>{a.h1}</h1><p>{status}</p><Json data={{'@context':'https://schema.org','@type':'BlogPosting',headline:a.h1,description:a.description,mainEntityOfPage:domain+path,author:{'@type':'Person','@id':domain+'/#osoba',name:'Grzegorz Plebaniak'},image:domain+'/og-image.png'}}/>{a.sections?.map(([heading,text])=><section key={heading}><h2>{heading}</h2><p>{text}</p></section>)}</article><SeeAlso links={[[a.link,'Więcej o tym, jak pracuję'],[paths.faq,'Pytania przed konsultacją']]}/></main>;}
