const endpointPattern = /^https:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.workers\.dev\/kontakt$/;

export function contactEndpoint(value) {
  return typeof value === 'string' && value.trim() === value && endpointPattern.test(value) ? value : undefined;
}

const conversionPattern = /^https:\/\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.workers\.dev\/zdarzenie$/;
export function conversionEndpoint(value) {
  return typeof value === 'string' && value.trim() === value && conversionPattern.test(value) ? value : undefined;
}

export function validateContactHosting(value, hosting, conversionValue) {
  const endpoint = contactEndpoint(value);
  const analytics = conversionEndpoint(conversionValue);
  if (value && !endpoint) throw new Error('NEXT_PUBLIC_CONTACT_ENDPOINT musi mieć format https://<worker>.<subdomena>.workers.dev/kontakt.');
  if (conversionValue && !analytics) throw new Error('NEXT_PUBLIC_CONVERSION_ENDPOINT musi mieć format https://<worker>.<subdomena>.workers.dev/zdarzenie.');
  const expected = new Set(["'self'", ...[endpoint,analytics].filter(Boolean).map(url=>new URL(url).origin)]);
  // Check the all-page policy used by Firebase rather than any route-specific header.
  const policies = hosting.headers?.filter(rule => rule.source === '**')
    .flatMap(rule => rule.headers.filter(header => header.key.toLowerCase() === 'content-security-policy')) ?? [];
  const connect = policies[0]?.value.split(';').map(x => x.trim().split(/\s+/)).filter(([name]) => name === 'connect-src') ?? [];
  const entries = new Set(connect[0]?.slice(1));
  if (policies.length !== 1 || connect.length !== 1 || connect[0].length !== expected.size + 1 || [...expected].some(source=>!entries.has(source))) {
    throw new Error('Firebase Hosting: connect-src musi zawierać wyłącznie self i dokładne originy skonfigurowanych endpointów. Zobacz docs/formularz-kontaktowy/URUCHOMIENIE.md.');
  }
}
