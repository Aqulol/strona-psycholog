const {test} = require('node:test');
const assert = require('node:assert/strict');
const {contactHandler, deliver} = require('../lib/contact');

const origin = 'https://psychologplebaniak.pl';
const body = {name:'Test', email:'test@example.test', phone:'', subject:'', message:'Wiadomość testowa', website:''};

async function request({headers = {referer: origin+'/', 'sec-fetch-site':'same-origin'}, payload = body, method = 'POST', take, send, json = true} = {}) {
  const req = {method, body:payload, get:key=>headers[key], is:()=>json, ip:'127.0.0.1'};
  const result = {headers:{}};
  const res = {
    set(key,value) {result.headers[key]=value;return this;},
    status(code) {result.status=code;return this;},
    json(data) {result.body=data;return this;},
  };
  await contactHandler({origin:()=>origin, take:take ?? (async()=>true), send:send ?? (async()=>{})})(req,res);
  return result;
}

test('no successful response until the mail transport resolves', async () => {
  let accepted = false;
  const result = await request({send:async()=>{accepted=true;}});
  assert.equal(accepted,true);
  assert.deepEqual(result.body,{ok:true});
  assert.equal(result.headers['Cache-Control'],'no-store');
});

test('malformed and cross-origin submissions never reach the transport or limit', async () => {
  const never = async()=>assert.fail('unexpected call');
  for (const [input,status] of [
    [{method:'GET'},405], [{json:false},415],
    [{headers:{origin:'https://example.test'}},403],
    [{headers:{origin, 'sec-fetch-site':'cross-site'}},403],
    [{headers:{}},403],
    [{payload:{...body,email:'incorrect'}},400],
    [{payload:{...body,website:'spam'}},400],
    [{payload:{...body,message:'x'.repeat(9000)}},413],
  ]) {
    const response = await request({...input,take:never,send:never});
    assert.equal(response.status,status);
    assert.equal(response.body.ok,false);
  }
});

test('throttling and missing SMTP configuration never report success', async () => {
  const limited = await request({take:async()=>false, send:async()=>assert.fail('must not send')});
  assert.equal(limited.status,429);
  assert.ok(limited.headers['Retry-After']);
  const unavailable = await request({send:data=>deliver({host:'',port:587,user:'',pass:'',to:''},data)});
  assert.equal(unavailable.status,503);
  assert.equal(unavailable.body.ok,false);
});
