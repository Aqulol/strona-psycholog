export const fold = value => value.toLocaleLowerCase('pl').normalize('NFD').replace(/\p{M}/gu,'').replace(/ł/g,'l');
export const tokens = value => fold(value).match(/[a-z0-9]+/g) ?? [];
function oneEdit(a,b) {
  if (Math.abs(a.length-b.length)>1) return false;
  if (a.length>b.length) [a,b]=[b,a];
  let i=0,j=0,edits=0;
  while(i<a.length && j<b.length) {
    if(a[i]===b[j]) { i++; j++; }
    else { if(++edits>1) return false; if(a.length===b.length) i++; j++; }
  }
  return edits+b.length-j<=1;
}
/** @param {{href:string,title:string,group:string,terms:string,aliases?:string[]}[]} rows @param {string} query */
export function findContent(rows,query) {
  const needles = [...new Set(tokens(query))].slice(0,8);
  if(!needles.length || needles.join('').length<2) return [];
  const exact=tokens(query).join(' ');
  return rows.flatMap(row=>{
    const title=tokens(row.title), body=row.terms.split(' ');
    if ([row.title,...(row.aliases??[])].some(name=>tokens(name).join(' ')===exact)) return [{...row,score:100+needles.length}];
    let score=0;
    for(const n of needles) {
      const base=n.length>=6?n.slice(0,-2):n;
      if(title.includes(n)) score+=12;
      else if(n.length>=3 && title.some(w=>w.startsWith(n))) score+=9;
      else if(body.includes(n)) score+=5;
      else if(n.length>=5 && body.some(w=>w.startsWith(base))) score+=3;
      else if(n.length>=5 && title.some(w=>oneEdit(n,w))) score+=2;
      else return [];
    }
    return [{...row,score}];
  }).sort((a,b)=>b.score-a.score || a.title.localeCompare(b.title,'pl'));
}
