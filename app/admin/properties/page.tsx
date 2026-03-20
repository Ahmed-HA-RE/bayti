import AdminPropertiesTable from '@/components/admin/properties/admin-properties-table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties',
  description:
    'Admin dashboard page for managing property listings. This section allows administrators to create new properties, update listing details, manage images, set pricing and availability, and maintain accurate real estate data across the platform.',
};

const AdminPropertiesPage = () => {
  return <AdminPropertiesTable />;
};

export default AdminPropertiesPage;
