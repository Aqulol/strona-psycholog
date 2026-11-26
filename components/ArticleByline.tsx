import { config } from '../lib/config';
import { paths } from '../lib/site';

export default function ArticleByline() {
  return <p className="mt-3">Autor: <a className="text-link" href={paths.about}>{config.name}</a> - psycholog, psychoterapeuta (w trakcie szkolenia)</p>;
}
