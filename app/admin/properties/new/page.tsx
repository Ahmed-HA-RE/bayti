import AdminAddPropertyDetails from '@/components/admin/properties/admin-add-property-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Property',
  description:
    'Add a new property with details like name, images, and other key information.',
};

const AdminAddPropertyPage = () => {
  return <AdminAddPropertyDetails />;
};

export default AdminAddPropertyPage;
