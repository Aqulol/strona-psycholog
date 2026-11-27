import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {isPublishedTerm} from '../lib/glossary-policy.mjs';
const read = name => JSON.parse(readFileSync(new URL(`../content/${name}.json`, import.meta.url),'utf8'));
export function readRegistry(){
 const terms=read('glossary'),sources=read('glossary-sources');
 for(const [id,source] of Object.entries(sources)){
  assert.ok(source.label?.trim(),id);
  if(source.href)assert.equal(new URL(source.href).protocol,'https:',id);
 }
 const slugs=new Set(terms.map(x=>x.slug)),names=new Set();
 assert.equal(slugs.size,terms.length,'Duplicate glossary slug');
 for(const row of terms){
  assert.match(row.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(['draft','published'].includes(row.status),row.slug);
  if(row.verification!==undefined)assert.ok(['pending','verified'].includes(row.verification),row.slug);
  for(const field of (isPublishedTerm(row)?['term','category','definition','explanation','distinction']:['term']))assert.ok(row[field]?.trim(),`${row.slug}: ${field}`);
  for(const name of [row.term,...(row.synonyms??[])]){
   const key=name.normalize('NFC').toLocaleLowerCase('pl').trim();assert.ok(key&&!names.has(key),`Duplicate glossary name or synonym: ${name}`);names.add(key);
  }
  if(!isPublishedTerm(row))continue;
  assert.ok(Array.isArray(row.examples)&&row.examples.every(x=>x.trim()),row.slug);
  assert.ok(row.sources.length&&row.sources.every(x=>Object.hasOwn(sources,x)),row.slug);
  assert.ok(row.related.every(x=>x!==row.slug&&slugs.has(x)),row.slug);
  assert.ok(row.links.length&&row.links.every(x=>x.href.startsWith('/')&&!x.href.startsWith('//')&&x.label.trim()),row.slug);
  const today=new Date().toISOString().slice(0,10);
  for(const field of ['published','reviewedAt','updated'])if(row[field]){
   const date=row[field];assert.match(date,/^\d{4}-\d{2}-\d{2}$/);assert.equal(new Date(date).toISOString().slice(0,10),date);assert.ok(date<=today,`${row.slug}: future ${field}`);
  }
  if(row.updated&&row.published)assert.ok(row.updated>=row.published,`${row.slug}: aktualizacja sprzed publikacji`);
 }
 return terms;
}

if(process.argv.includes('--check'))console.log(`Rejestr słownika: ${readRegistry().length} haseł.`);
