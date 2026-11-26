import ArticleSources from './ArticleSources';
import { blogReading } from '../lib/blog-reading';

export default function BlogReading({ slug }: { slug: string }) {
  const entries = blogReading[slug];
  if (!entries?.length) return null;
  return <ArticleSources>{entries.map(({ author, year, title, publisher, href }) => <li key={title}>
    {author} ({year}). {href ? <a href={href}>{title}</a> : <cite>{title}</cite>}. <cite>{publisher}</cite>.
  </li>)}</ArticleSources>;
}
