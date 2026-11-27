import assert from 'node:assert/strict';
import {cpSync,mkdtempSync,readFileSync,rmSync,symlinkSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

const fixture=mkdtempSync(join(tmpdir(),'sitemap-guard-'));
try {
 for(const name of ['firebase.json','scripts','content']) symlinkSync(resolve(name),join(fixture,name));
 cpSync('package.json',join(fixture,'package.json'));
 cpSync('out',join(fixture,'out'),{recursive:true,filter:path=>!/(?:^|\/)(?:_next|images|fonts)(?:\/|$)/.test(path)});
 symlinkSync(resolve('out/images'),join(fixture,'out/images'));
 const file=join(fixture,'out/sitemap.xml'), robots=join(fixture,'out/robots.txt');
 const valid=readFileSync(file,'utf8');
 const entry=valid.match(/<url>[\s\S]*?<\/url>/)?.[0];
 assert.ok(entry);
 const add=xml=>valid.replace('</urlset>',`${xml}\n</urlset>`);
 // Execute the very command wired into Hosting, without contacting Firebase.
 const [hook]=JSON.parse(readFileSync('firebase.json','utf8')).hosting.predeploy;
 const run=()=>spawnSync(hook,{shell:true,cwd:fixture,env:{...process.env,PROJECT_DIR:fixture},encoding:'utf8',timeout:20_000});
 const check=(label,expected)=>{
  const result=run();assert.ifError(result.error);
  if(expected){assert.equal(result.status,1,label);assert.match(result.stderr,expected,label);}
  else assert.equal(result.status,0,result.stderr);
  console.log(`${label}: OK`);
 };
 check('Poprawna paczka',null);
 rmSync(file);check('Brak sitemap',/Brak out\/sitemap\.xml/);
 for(const [label,xml,re] of [
  ['Pusty plik','',/Invalid sitemap XML/],
  ['Niepoprawny XML',`\n${valid}`,/Invalid sitemap XML/],
  ['Zero adresów',valid.replace(/<url>[\s\S]*?<\/url>/g,''),/Expected 1/],
  ['Brak adresu',valid.replace(entry,''),/Sitemap\/export mismatch/],
  ['Nieistniejący adres',add('<url><loc>https://psychologplebaniak.pl/nieistniejacy-test-sitemap/</loc></url>'),/Unexpected: \/nieistniejacy-test-sitemap\//],
  ['Zła domena',valid.replace('https://psychologplebaniak.pl/','https://example.org/'),/Invalid origin/],
  ['Duplikat',add(entry),/Duplicated sitemap URL/],
 ]) {writeFileSync(file,xml);check(label,re);}
 writeFileSync(file,valid);
 writeFileSync(robots,readFileSync(robots,'utf8').replace('/sitemap.xml','/inna-sitemap.xml'));
 check('Robots wskazuje zły adres',/inna-sitemap\.xml/);
} finally {rmSync(fixture,{recursive:true,force:true});}
