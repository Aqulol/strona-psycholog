import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.online;
export const metadata=meta(paths.online,page.title,page.description);
export default function Page(){return <ServicePage kind="online"/>;}
