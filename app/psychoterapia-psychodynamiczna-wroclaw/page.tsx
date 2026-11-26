import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.method;
export const metadata=meta(paths.method,page.title,page.description);
export default function Page(){return <ServicePage kind="method"/>;}
