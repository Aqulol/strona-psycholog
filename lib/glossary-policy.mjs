export const glossaryPrefix = '/slownik-psychologiczny/';
// Editorial availability and independent review are separate decisions.
export function isPublishedTerm(term) {
 return term.status === 'published';
}
