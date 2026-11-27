import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
import {assertDate,readExport,lastmodFile} from './sitemap-lib.mjs';
const [date, evidence, ...paths] = process.argv.slice(2);
assert.ok(date && evidence?.trim() && paths.length, 'Użycie: npm run lastmod:record -- YYYY-MM-DD "dowód istotnej zmiany" /adres/ […]');
assertDate(date);
const rows=JSON.parse(readFileSync(lastmodFile,'utf8'));
const {pages}=readExport();
for(const path of new Set(paths)){
  const page=pages.get(path);
  assert.ok(page, `${path}: brak indeksowalnej strony w eksporcie`);
  const previous=rows[path];
  assert.notEqual(previous?.fingerprint,page.fingerprint,`${path}: treść nie zmieniła się od zapisanej wersji`);
  assert.ok(date>=(previous?.date??'')&&date>=(page.editorialDate??''),`${path}: data wcześniejsza niż udokumentowana`);
  rows[path]={date,fingerprint:page.fingerprint,evidence:evidence.trim()};
}
writeFileSync(lastmodFile,JSON.stringify(Object.fromEntries(Object.entries(rows).sort(([a],[b])=>a.localeCompare(b,'en'))),null,2)+'\n');
console.log(`Zapisano ${new Set(paths).size} dat. Uruchom ponownie build i zatwierdź rejestr razem z treścią.`);
