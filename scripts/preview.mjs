// Local static smoke preview with the routing and headers this repository uses.
import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {hosting} from './sitemap-lib.mjs';
const root=resolve('out');
await stat(resolve(root,'404.html'));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.pdf':'application/pdf','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.svg':'image/svg+xml','.ico':'image/x-icon'};
createServer(async (request,response)=>{
  try {
    if (!['GET','HEAD'].includes(request.method)) {response.writeHead(405).end();return;}
    const url=new URL(request.url,'http://preview.invalid');
    const path=decodeURIComponent(url.pathname);
    if (path.startsWith('//') || /[\u0000-\u001f\\]/.test(path)) {response.writeHead(400).end();return;}
    for (const rule of hosting.headers) {
      if (rule.source==='**' || rule.source===path || (rule.source.endsWith('/**') && path.startsWith(rule.source.slice(0,-2)))) {
        for (const {key,value} of rule.headers) response.setHeader(key,value);
      }
    }
    const redirect=hosting.redirects.find(rule=>rule.source===path);
    if (redirect) {response.writeHead(redirect.type,{Location:redirect.destination}).end();return;}
    const disk=resolve(root,`.${path}`);
    if (!(disk===root || disk.startsWith(root+sep))) {response.writeHead(400).end();return;}
    let file=disk, status=200, body;
    try {
      if ((await stat(file)).isDirectory()) {
        file=resolve(file,'index.html');
        await stat(file);
        if (!path.endsWith('/')) {response.writeHead(301,{Location:encodeURI(path)+'/'+url.search}).end();return;}
      }
      body=await readFile(file);
    } catch {status=404;file=resolve(root,'404.html');body=await readFile(file);}
    response.writeHead(status,{'Content-Type':mime[extname(file)]??'application/octet-stream'}).end(request.method==='HEAD'?undefined:body);
  } catch {if (!response.headersSent) response.writeHead(400);response.end();}
}).listen(Number(process.env.PORT ?? 3010),'0.0.0.0');
