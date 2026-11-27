import {readFileSync,writeFileSync} from 'node:fs';
import {parseSitemap} from './sitemap-lib.mjs';

// Use only verified canonical URLs. Firebase cleanUrls does not cover /path.html
// when Next exports /path/index.html. Unknown .html paths must remain 404.
const path='firebase.json';
const config=JSON.parse(readFileSync(path,'utf8'));
const legacy=config.hosting.redirects.filter(({source,destination})=>source!==`${destination.slice(0,-1)}.html`);
const aliases=[...parseSitemap(readFileSync('out/sitemap.xml','utf8')).keys()]
 .filter(path=>path!=='/').map(destination=>({source:`${destination.slice(0,-1)}.html`,destination,type:301}));
config.hosting.redirects=[...legacy,...aliases];
writeFileSync(path,JSON.stringify(config,null,2)+'\n');
console.log(`Hosting: ${legacy.length} legacy rules + ${aliases.length} canonical HTML aliases.`);
