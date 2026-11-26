import { config } from './config';
import { domain, paths } from './site';

export const personId = `${domain}/#osoba`;
export const officeId = `${domain}/#gabinet`;
export const websiteId = `${domain}/#witryna`;
export const entities = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': websiteId, url: `${domain}/`, name: config.name, inLanguage: 'pl', publisher: { '@id': personId } },
    { '@type': 'Person', '@id': personId, name: config.name, jobTitle: 'Psycholog, psychoterapeuta w trakcie szkolenia', url: domain + paths.about, image: `${domain}/images/portret.webp`, alumniOf: { '@type': 'CollegeOrUniversity', name: 'Uniwersytet Wrocławski' }, workLocation: { '@id': officeId }, sameAs: [config.booksyUrl, config.bookingUrl] },
    { '@type': 'LocalBusiness', '@id': officeId, name: `Gabinet psychologiczny ${config.name}`, url: domain + paths.office, telephone: config.phone, email: config.email, image: `${domain}/images/gabinet.webp`, hasMap: config.mapsLink, priceRange: '200 PLN', address: { '@type': 'PostalAddress', streetAddress: config.streetAddress, postalCode: config.postal, addressLocality: 'Wrocław', addressCountry: 'PL' } },
  ],
};

export function webPage(path: string, name: string, description: string, serviceName?: string) {
  const url = domain + path;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage', '@id': `${url}#strona`, url, name, description, inLanguage: 'pl', isPartOf: { '@id': websiteId },
    ...(serviceName ? { mainEntity: { '@type': 'Service', '@id': `${url}#usluga`, name: serviceName, url, provider: { '@id': officeId } } } : {}),
  };
}
