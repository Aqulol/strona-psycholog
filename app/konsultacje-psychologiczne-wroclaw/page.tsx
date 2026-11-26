import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.consult;
export const metadata=meta(paths.consult,page.title,page.description);
export default function Page(){return <ServicePage kind="consult"/>;}
