import {conversionEvents} from '../lib/conversion-events.mjs';
const maximum = 32;

async function eventName(request) {
  if (Number(request.headers.get('Content-Length')) > maximum || !request.body) return null;
  const reader = request.body.getReader();
  let result = '', count = 0;
  try {
    const decoder = new TextDecoder('utf-8',{fatal:true});
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      count += value.byteLength;
      if (count > maximum) return null;
      result += decoder.decode(value,{stream:true});
    }
    result += decoder.decode();
    return conversionEvents.includes(result) ? result : null;
  } catch {return null;}
  finally {void reader.cancel().catch(()=>{});}
}

export default {
  async fetch(request,env) {
    const {pathname,search} = new URL(request.url);
    const headers = new Headers({'Cache-Control':'no-store','Vary':'Origin','X-Content-Type-Options':'nosniff'});
    const reply = status => new Response(null,{status,headers});
    if (pathname !== '/zdarzenie' || search) return reply(404);
    const origin = request.headers.get('Origin');
    if (!origin || origin !== env.SITE_ORIGIN) return reply(403);
    headers.set('Access-Control-Allow-Origin',origin);
    if (request.method === 'OPTIONS' && request.headers.get('Access-Control-Request-Method') === 'POST') {
      headers.set('Access-Control-Allow-Methods','POST');
      headers.set('Access-Control-Allow-Headers','Content-Type');
      return reply(204);
    }
    if (request.method !== 'POST') return reply(405);
    if (!/^text\/plain(?:;\s*charset=utf-8)?$/i.test(request.headers.get('Content-Type') ?? '')) return reply(415);
    const event = await eventName(request);
    if (!event) return reply(400);
    try {
      // Shared approximate bucket, not keyed by IP or any other user identifier.
      if (!(await env.INGEST_LIMIT.limit({key:'aggregate'})).success) return reply(429);
      await env.COUNTS.prepare(`INSERT INTO counters (day,event,total) VALUES (date('now'), ?1, 1)
        ON CONFLICT(day,event) DO UPDATE SET total=counters.total+1`).bind(event).run();
      return reply(204);
    } catch {return reply(503);}
  },
  async scheduled(_event,env) {
    await env.COUNTS.prepare("DELETE FROM counters WHERE day < date('now','-89 days')").run();
  },
};
