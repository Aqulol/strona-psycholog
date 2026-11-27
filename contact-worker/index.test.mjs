import assert from 'node:assert/strict';
import {test} from 'node:test';
import worker from './index.mjs';

const URL = 'https://gabinet-kontakt.test.workers.dev/kontakt';
const origin = 'https://psychologplebaniak.pl';
const payload = {name:'Test techniczny',email:'test@example.test',phone:'',subject:'',message:'Test bez danych osobowych',website:''};
const allow = {limit:async()=>({success:true})};
const env = {SITE_ORIGIN:origin,RESEND_API_KEY:'intentionally-invalid-test-value', MAIL_FROM:'formularz@example.test',MAIL_TO:'skrzynka@example.test',PER_IP:allow,SEND_BUDGET:allow};
const request = (body=JSON.stringify(payload), headers={}) => new Request(URL,{method:'POST',headers:{Origin:origin,'CF-Connecting-IP':'192.0.2.1','Content-Type':'application/json',...headers},body});

async function rejected(req, config, status) {
  const res = await worker.fetch(req,config);
  assert.equal(res.status,status);
  assert.equal(res.headers.get('Cache-Control'),'no-store');
  assert.equal((await res.json()).status,'error');
  return res;
}

test('CORS allows only POST preflight from the configured site', async()=>{
  const preflight = (site, method) => new Request(URL,{method:'OPTIONS',headers:{Origin:site,'Access-Control-Request-Method':method,'Access-Control-Request-Headers':'content-type'}});
  const res = await worker.fetch(preflight(origin,'POST'),env);
  assert.equal(res.status,204);
  assert.equal(res.headers.get('Access-Control-Allow-Origin'),origin);
  assert.equal(res.headers.get('Vary'),'Origin');
  const forbidden = await rejected(preflight('https://other.example','POST'),env,403);
  assert.equal(forbidden.headers.get('Access-Control-Allow-Origin'),null);
  await rejected(preflight(origin,'PUT'),env,405);
  await rejected(request(undefined,{'Content-Type':'text/plain'}),env,415);
});

test('server validates fields, phone and reply address and bounds streamed input', async()=>{
  const mustNotSend = {...env,SEND_BUDGET:{limit:async()=>assert.fail('invalid submission reached send budget')}};
  for (const patch of [{email:'bad'}, {email:'a,b@example.test'}, {website:'robot'}, {phone:'abc12345678'}, {subject:'Subject\nOther'}, {message:'short'}, {unexpected:true}]) {
    await rejected(request(JSON.stringify({...payload,...patch})),mustNotSend,400);
  }
  await rejected(request('x'.repeat(8193)),mustNotSend,413);
  await rejected(request('{'),mustNotSend,400);
});

test('missing secrets and both rate limits fail closed', async()=>{
  const deny = {limit:async()=>({success:false})};
  await rejected(request(),{...env,RESEND_API_KEY:undefined},503);
  for (const name of ['PER_IP','SEND_BUDGET']) {
    const res = await rejected(request(),{...env,[name]:deny},429);
    assert.equal(res.headers.get('Retry-After'),'60');
  }
});

test('mail API refusal, quota exhaustion and malformed receipts never report success', async(t)=>{
  for (const [status,expected] of [[401,503],[429,429],[503,503],[200,503]]) {
    const mock = t.mock.method(globalThis,'fetch',async(url, options)=>{
      assert.equal(url,'https://api.resend.com/emails');
      const body = JSON.parse(options.body);
      assert.deepEqual(body.to,[env.MAIL_TO]);
      assert.equal(body.reply_to,payload.email);
      assert.ok(body.text.includes(payload.message));
      assert.ok(!options.body.includes('192.0.2.1'));
      return Response.json({unexpected:'no accepted message identifier'},{status});
    });
    await rejected(request(),env,expected);
    assert.equal(mock.mock.callCount(),1);
    mock.mock.restore();
  }
});
