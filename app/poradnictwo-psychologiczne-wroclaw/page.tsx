import ServiceDirectoryPage, { serviceMetadata } from '../../components/ServiceDirectoryPage';

export const metadata = serviceMetadata('counselling');
export default function Page() { return <ServiceDirectoryPage kind="counselling"/>; }
