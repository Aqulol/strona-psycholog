import {relatedContent} from '../lib/content-relations';
export default function RelatedContent({path}:{path:string}){
 const rows=relatedContent(path);
 if(!rows.length)return null;
 const groups=[...new Set(rows.map(x=>x.kind))];
 return <aside className="diagnostic-note" aria-label="Powiązane materiały"><h2>Powiązane materiały</h2>{groups.map(group=><div key={group}><h3>{group}</h3><ul>{rows.filter(row=>row.kind===group).map(row=><li key={row.href}><a href={row.href}>{row.label}</a></li>)}</ul></div>)}</aside>;
}
