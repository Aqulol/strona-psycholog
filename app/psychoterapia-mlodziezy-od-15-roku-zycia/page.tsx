import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.youth;
export const metadata=meta(paths.youth,page.title,page.description);
export default function Page(){return <ServicePage kind="youth"/>;}
