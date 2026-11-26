import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.faq;
export const metadata=meta(paths.faq,page.title,page.description);
export default function Page(){return <ServicePage kind="faq"/>;}
