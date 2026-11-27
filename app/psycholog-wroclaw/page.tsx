import ServiceDirectoryPage, { serviceMetadata } from '../../components/ServiceDirectoryPage';

export const metadata = serviceMetadata('psychologist');
export default function Page() { return <ServiceDirectoryPage kind="psychologist"/>; }
