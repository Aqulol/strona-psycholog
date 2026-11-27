export const glossaryPrefix = '/slownik-psychologiczny/';
export function isPublishedTerm(term) {
 return term.status === 'published' && term.verification === 'verified' && Boolean(term.author?.trim() && term.reviewer?.trim() && term.reviewedAt && term.published);
}
