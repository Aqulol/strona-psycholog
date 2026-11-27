import assert from 'node:assert/strict';

// Intentionally limit Hosting rules to enumerable, local URLs. No catch-all.
export const redirectSource = /^\/(?:[a-z0-9][a-z0-9-]*\/)*(?:[a-z0-9][a-z0-9-]*(?:\.html)?\/?)?$/;
export function inspectRedirectRules(rules) {
 const graph=new Map();
 for(const {source,destination,type} of rules){
  assert.match(source,redirectSource,`Nonliteral redirect: ${source}`);
  assert.ok(!source.endsWith('.html/'),`Invalid HTML alias: ${source}`);
  assert.match(destination,/^\/(?:[a-z0-9][a-z0-9-]*\/)*$/,`Noncanonical destination: ${destination}`);
  assert.equal(type,301,source);
  assert.ok(!graph.has(source),`Duplicate redirect: ${source}`);
  graph.set(source,destination);
 }
 for(const source of graph.keys()){
  const chain=[source];let target=graph.get(source);
  while(graph.has(target)){
   assert.ok(!chain.includes(target),`Redirect loop: ${[...chain,target].join(' → ')}`);
   chain.push(target);target=graph.get(target);
  }
  assert.equal(chain.length,1,`Redirect chain: ${[...chain,target].join(' → ')} (expected one hop)`);
 }
 return graph;
}
