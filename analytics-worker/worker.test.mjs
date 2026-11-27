import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker from './index.mjs';
import {conversionEvents} from '../lib/conversion-events.mjs';
const origin='https://example.invalid';
const base='https://collector.invalid/zdarzenie';
function fixture(allowed=true) {
  const written=[];
  const env={SITE_ORIGIN:origin,INGEST_LIMIT:{limit:async arg=>{assert.deepEqual(arg,{key:'aggregate'});return {success:allowed};}},COUNTS:{prepare:sql=>({bind:(...params)=>({run:async()=>written.push({sql,params})}),run:async()=>written.push({sql})})}};
  const post=(body,options={})=>worker.fetch(new Request(options.url??base,{method:options.method??'POST',headers:{Origin:options.origin??origin,'Content-Type':options.type??'text/plain'},body}),env);
  return {written,env,post};
}
test('only one aggregate increment per accepted POST; no metadata is bound',async()=>{
  const {written,post}=fixture();
  for (const event of conversionEvents) {
    const result=await post(event);
    assert.equal(result.status,204);
    assert.equal(result.headers.get('Access-Control-Allow-Origin'),origin);
    assert.equal(result.headers.get('Set-Cookie'),null);
  }
  assert.deepEqual(written.map(row=>row.params),conversionEvents.map(event=>[event]));
  assert.ok(written.every(row=>row.sql.includes('ON CONFLICT(day,event)')));
});
test('queries, cross-site origin, wrong media type and arbitrary fields are rejected',async()=>{
  const {written,post}=fixture();
  for (const [body,options,status] of [
    ['booking_click',{url:base+'?private=synthetic'},404], ['booking_click',{origin:'https://other.invalid'},403],
    ['booking_click',{type:'application/json'},415], ['booking_click\n',{},400], ['x'.repeat(33),{},400],
    ['{"event":"booking_click"}',{},400], [undefined,{method:'GET'},405],
  ]) assert.equal((await post(body,options)).status,status);
  assert.equal(written.length,0);
});
test('missing infrastructure and capacity fail closed; scheduled purge affects aggregates only',async()=>{
  const {written,env,post}=fixture(false);
  assert.equal((await post('booking_click')).status,429);
  delete env.INGEST_LIMIT;
  assert.equal((await post('booking_click')).status,503);
  assert.equal(written.length,0);
  await worker.scheduled({},env);
  assert.match(written[0].sql,/DELETE FROM counters WHERE day < date\('now','-89 days'\)/);
});
