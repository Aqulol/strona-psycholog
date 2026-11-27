const LIMIT = 8192;
const MAILBOX = /^[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i;
const FIELDS = {name:80, email:160, phone:24, subject:120, message:1000, website:0};

async function readPayload(request) {
  if (Number(request.headers.get('Content-Length')) > LIMIT) throw new RangeError();
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError();
  let bytes = 0;
  const decoder = new TextDecoder('utf-8', {fatal:true});
  let text = '';
  try {
    for (;;) {
      const {value,done} = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > LIMIT) throw new RangeError();
      text += decoder.decode(value,{stream:true});
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    // Stop reading a malformed or oversized stream without buffering the rest.
    void reader.cancel().catch(()=>{});
  }
}

function validate(value) {
  const rules = Object.entries(FIELDS);
  if (!value || typeof value !== 'object' || Object.keys(value).length !== rules.length) return null;
  if (value.website !== '') return null;
  const clean = {};
  for (const [key,max] of rules) {
    if (typeof value[key] !== 'string') return null;
    const raw = value[key];
    if (raw.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(raw) || (key!=='message' && /[\r\n\t]/u.test(raw))) return null;
    clean[key] = raw.trim();
  }
  if (clean.name.length < 2 || !MAILBOX.test(clean.email) || clean.message.length < 10) return null;
  if (clean.phone && (!/^\+?[0-9 ()-]+$/.test(clean.phone) || !/^\d{7,15}$/.test(clean.phone.replace(/\D/g,'')))) return null;
  return clean;
}

export default {
  async fetch(request, env) {
    const headers = new Headers({'Cache-Control':'no-store', Vary:'Origin'});
    const json = (status, body) => Response.json(body,{status,headers});
    const fail = (status, code) => json(status,{status:'error',code});
    if (new URL(request.url).pathname !== '/kontakt') return fail(404,'not_found');
    const origin = request.headers.get('Origin');
    if (!origin || origin !== env.SITE_ORIGIN) return fail(403,'origin');
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods','POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers','Content-Type');
    if (request.method === 'OPTIONS') {
      if (request.headers.get('Access-Control-Request-Method') !== 'POST') return fail(405,'method');
      return new Response(null,{status:204,headers});
    }
    if (request.method !== 'POST') return fail(405,'method');
    if (request.headers.get('Content-Type')?.split(';',1)[0].trim().toLowerCase() !== 'application/json') return fail(415,'content_type');
    try {
      const ip = request.headers.get('CF-Connecting-IP');
      if (!ip || !env.RESEND_API_KEY || !MAILBOX.test(env.MAIL_FROM ?? '') || !MAILBOX.test(env.MAIL_TO ?? '')) return fail(503,'unavailable');
      if (!(await env.PER_IP.limit({key:ip})).success) {
        headers.set('Retry-After','60');
        return fail(429,'rate');
      }
      let data;
      try {data = validate(await readPayload(request));}
      catch (error) {return error instanceof RangeError ? fail(413,'size') : fail(400,'invalid');}
      if (!data) return fail(400,'invalid');
      if (!(await env.SEND_BUDGET.limit({key:'contact'})).success) {
        headers.set('Retry-After','60');
        return fail(429,'rate');
      }
      const text = [
        `Imię: ${data.name}`, `E-mail: ${data.email}`,
        data.phone && `Telefon: ${data.phone}`, data.subject && `Temat: ${data.subject}`,
      ].filter(Boolean).join('\n') + `\n\n${data.message}`;
      const response = await fetch('https://api.resend.com/emails',{
        method:'POST', redirect:'error', signal:AbortSignal.timeout(12_000),
        headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},
        body:JSON.stringify({from:env.MAIL_FROM,to:[env.MAIL_TO],reply_to:data.email,subject:'Wiadomość z formularza gabinetu',text}),
      });
      if (response.status === 429) return fail(429,'provider_limit');
      if (!response.ok) return fail(503,'delivery_unconfirmed');
      const receipt = await response.json();
      if (typeof receipt?.id !== 'string' || !receipt.id.trim()) return fail(503,'delivery_unconfirmed');
      return json(200,{status:'accepted'});
    } catch {
      // Do not log the payload, address, secret, or provider response.
      return fail(503,'delivery_unconfirmed');
    }
  },
};
