import ServicePage from '../../components/ServicePage';
import {pages} from '../../lib/pages';
import {meta,paths} from '../../lib/site';
const page=pages.about;
export const metadata=meta(paths.about,page.title,page.description);
export default function Page(){return <ServicePage kind="about"/>;}
