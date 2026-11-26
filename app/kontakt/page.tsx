import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.contact;
export const metadata=meta(paths.contact,page.title,page.description);
export default function Page(){return <ServicePage kind="contact"/>;}
