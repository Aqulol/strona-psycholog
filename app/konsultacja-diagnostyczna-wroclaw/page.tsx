import ServiceDirectoryPage, { serviceMetadata } from '../../components/ServiceDirectoryPage';

export const metadata = serviceMetadata('diagnostic');
export default function Page() { return <ServiceDirectoryPage kind="diagnostic"/>; }
