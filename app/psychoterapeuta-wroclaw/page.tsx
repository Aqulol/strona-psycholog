import ServiceDirectoryPage, { serviceMetadata } from '../../components/ServiceDirectoryPage';

export const metadata = serviceMetadata('therapist');
export default function Page() { return <ServiceDirectoryPage kind="therapist"/>; }
