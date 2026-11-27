const endpointPattern = /^https:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.workers\.dev\/kontakt$/;

export function contactEndpoint(value) {
  return typeof value === 'string' && value.trim() === value && endpointPattern.test(value) ? value : undefined;
}

export function validateContactHosting(value, hosting) {
  if (value === undefined || value === '') return;
  const endpoint = contactEndpoint(value);
  if (!endpoint) throw new Error('NEXT_PUBLIC_CONTACT_ENDPOINT musi mieć format https://<worker>.<subdomena>.workers.dev/kontakt.');
  // Check the all-page policy used by Firebase rather than any route-specific header.
  const policies = hosting.headers?.filter(rule => rule.source === '**')
    .flatMap(rule => rule.headers.filter(header => header.key.toLowerCase() === 'content-security-policy')) ?? [];
  const connect = policies[0]?.value.split(';').map(x => x.trim().split(/\s+/)).filter(([name]) => name === 'connect-src') ?? [];
  const entries = new Set(connect[0]?.slice(1));
  if (policies.length !== 1 || connect.length !== 1 || connect[0].length !== 3 || !entries.has("'self'") || !entries.has(new URL(endpoint).origin)) {
    throw new Error('Firebase Hosting: connect-src musi zawierać wyłącznie self i dokładny origin NEXT_PUBLIC_CONTACT_ENDPOINT. Zobacz docs/formularz-kontaktowy/URUCHOMIENIE.md.');
  }
}
