import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import {validateContactHosting} from '../lib/contact-endpoint.mjs';

const endpoint = 'https://gabinet-kontakt.synthetic.workers.dev/kontakt';
const origin = new URL(endpoint).origin;
const {hosting} = JSON.parse(readFileSync(new URL('../firebase.json',import.meta.url),'utf8'));
const withConnect = source => ({headers:[{source:'**', headers:[{key:'Content-Security-Policy', value:`default-src 'self'; connect-src ${source}; form-action 'self'`}]}]});

test('pending configuration does not allow an unknown external origin',()=>{
  assert.doesNotThrow(()=>validateContactHosting(undefined,hosting));
  assert.throws(()=>validateContactHosting(endpoint,hosting),/connect-src/);
});
test('configured production build requires exact endpoint and CSP origin',()=>{
  const exact=withConnect(`'self' ${origin}`);
  assert.doesNotThrow(()=>validateContactHosting(endpoint,exact));
  for(const value of [endpoint+'/',endpoint+'?q=1',endpoint+'\n',endpoint.replace('https','http')]) assert.throws(()=>validateContactHosting(value,exact),/NEXT_PUBLIC_CONTACT_ENDPOINT/);
  for(const policy of [`'self' ${origin}/kontakt`, `'self' https://*.workers.dev`, `'self' ${origin} *`, `${origin}`]) assert.throws(()=>validateContactHosting(endpoint,withConnect(policy)),/connect-src/);
});
