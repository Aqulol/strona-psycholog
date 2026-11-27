// Candidate discovery only; never inserts links into clinical copy.
import {readFileSync} from 'node:fs';
import {parse} from 'parse5';
import {readExport} from './sitemap-lib.mjs';
const {pages}=readExport();
const variants={
 agresja:'agresja|agresję|agresji|agresją',zlosc:'złość|złości|złością|gniew|gniewu',
 przeniesienie:'przeniesienie|przeniesienia|przeniesieniu|przeniesieniem',
 przeciwprzeniesienie:'przeciwprzeniesienie|przeciwprzeniesienia|przeciwprzeniesieniu',
 'mechanizmy-obronne':'mechanizm(?:y|ów|ami)? obronn(?:e|y|ych|ymi)',
 'organizacja-osobowosci':'organizacj(?:a|ę|i|ą) osobowości',
 'funkcje-wykonawcze':'funkcj(?:e|i|ami) wykonawcz(?:e|ych|ymi)',
 'diagnoza-roznicowa':'diagnoz(?:a|ę|y|ie|ą) różnicow(?:a|ą|ej)',
 'relacje-z-obiektem':'relacj(?:e|i|ach) z obiektem',rozszczepienie:'rozszczepieni(?:e|a|u)',
 'identyfikacja-projekcyjna':'identyfikacj(?:a|ę|i|ą) projekcyjn(?:a|ą|ej)',
};
const candidates=[];
for(const [from] of pages){
 const paragraphs=[];
 function visit(node,main=false){
  const tag=node.tagName;
  if(['a','nav','script','style','aside','footer','header','button','svg'].includes(tag))return '';
  main ||= tag==='main';
  if(node.nodeName==='#text')return node.value;
  const text=(node.childNodes??[]).map(child=>visit(child,main)).join('');
  if(main&&tag==='p')paragraphs.push(text);
  return text;
 }
 visit(parse(readFileSync(`out${from}index.html`,'utf8')));
 for(const [slug,forms] of Object.entries(variants)){
  const to=`/slownik-psychologiczny/${slug}/`;
  if(from===to||from==='/slownik-psychologiczny/')continue;
  const pattern=new RegExp(`(?<![\\p{L}])(?:${forms})(?![\\p{L}])`,'iu');
  const match=paragraphs.map(p=>p.match(pattern)).find(Boolean);
  if(match)candidates.push({from,to,form:match[0],status:pages.has(to)?'manual-review':'blocked-unpublished'});
 }
}
console.log(JSON.stringify({pages:pages.size,candidates},null,2));
