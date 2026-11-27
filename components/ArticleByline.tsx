import ReadingTime from './ReadingTime';
import { config } from '../lib/config';
import { paths } from '../lib/site';

export default function ArticleByline({ minutes }: { minutes?: number }) {
  return <p className="mt-3">Autor: <a className="text-link" href={paths.about}>{config.name}</a> - psycholog, psychoterapeuta (w trakcie szkolenia){minutes !== undefined && <> <ReadingTime minutes={minutes}/></>}</p>;
}
