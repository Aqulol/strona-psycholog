import type { ReactNode } from 'react';

export default function ArticleSources({ children }: { children: ReactNode }) {
  return <section className="article-sources" aria-labelledby="literatura-i-zrodla">
    <h2 id="literatura-i-zrodla">Literatura i źródła</h2>
    <ul>{children}</ul>
  </section>;
}
