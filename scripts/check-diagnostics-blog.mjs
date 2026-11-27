import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {findContent} from '../lib/search-core.mjs';

const read = file => readFileSync(`out/${file}`, 'utf8');
const main = path => read(`${path.slice(1)}index.html`).match(/<main\b[\s\S]*?<\/main>/)[0].replaceAll('<!-- -->','');
const diagnostic = ['/diagnoza-adhd-wroclaw/','/diagnoza-osobowosci-wroclaw/','/diagnoza-psychologiczna-wroclaw/'];
const consultation = '/konsultacja-diagnostyczna-wroclaw/';
for (const path of [...diagnostic,consultation,'/psychoedukacja-adhd/']) {
  const page = main(path);
  const panel = page.match(/class="assessment-panel[\s\S]*?<\/section>/)?.[0];
  assert.ok(panel,path);
  assert.match(page,/Najczęściej zadawane pytania/);
  assert.doesNotMatch(panel,/Young DIVA-5|MOXO|SCID-5-PD|MMPI|STIPO-R|<dd><\/dd>/);
  if (path === consultation) assert.match(panel,/50 min · 200 zł/);
  if (path === diagnostic[0]) {
    for (const pattern of [/700 zł/,/3 spotkania po 50 minut/,/od 15\. roku/,/Wyłącznie stacjonarnie we Wrocławiu/,/pierwszą konsultacją w cenie/,/Dokumentacja pisemna dodatkowo płatna/,/DIVA-5 tylko w diagnostyce dorosłych/]) assert.match(panel,pattern);
    assert.doesNotMatch(panel,/200 zł/);
  }
  if (diagnostic.slice(1).includes(path)) assert.match(panel,/Pierwsza konsultacja: 200 zł \/ 50 min/);
}
assert.match(main('/cennik/'),/700 zł/);
for(const path of ['/psychoedukacja/','/psychoedukacja-adhd/']) {
  const page=main(path);
  assert.match(page,/nie osobną usługą ani rezerwacją/);
  assert.doesNotMatch(page,/"@type":"(?:Service|Offer)"|href="https:\/\/booksy\.com/);
}

const index = JSON.parse(read('indeks-tresci.json'));
const sitemap = read('sitemap.xml');
for (const [slug, query, incoming] of [
  ['jak-przygotowac-sie-do-diagnozy-adhd','jak przygotować się do diagnozy ADHD u dorosłych','/diagnoza-adhd-wroclaw/'],
  ['cechy-borderline-a-zaburzenie-osobowosci','czy można mieć cechy borderline bez zaburzenia osobowości','/diagnoza-osobowosci-wroclaw/'],
  ['adhd-a-borderline-u-doroslych','ADHD a borderline u dorosłych','/blog/adhd-u-doroslych/'],
  ['jak-rozpoznac-postepy-w-psychoterapii','jak rozpoznać postępy w psychoterapii','/psychoterapia-indywidualna-wroclaw/'],
  ['czy-mozna-zloscic-sie-na-psychoterapeute','czy można złościć się na psychoterapeutę','/blog/relacja-terapeutyczna-zrodlo-zmiany/'],
]) {
  const path = `/blog/${slug}/`, page = main(path);
  assert.ok([sitemap,main('/blog/'),main(incoming)].every(text => text.includes(path)),path);
  assert.ok(findContent(index,query).some(row => row.href === path),query);
  for (const pattern of [/Materiał redakcyjny witryny/,/\d+ min czytania/,/Literatura i źródła/,/Powiązane materiały/,/href="\/slownik-psychologiczny\//,/href="\/w-czym-pomagam\//]) assert.match(page,pattern);
  const ld = JSON.parse(page.match(/<script type="application\/ld\+json">([^<]*BlogPosting[^<]*)<\/script>/)[1]);
  assert.ok(ld['@graph'].every(row => !row.author && !row.datePublished),path);
}
console.log('Pięć paneli: spójność oferty i cennika. Pięć artykułów: metadane, wyszukiwarka, sitemap, bibliografia i linkowanie — OK.');
