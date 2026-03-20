import AdminFormLayout from '@/components/shared/admin-form-layout';
import PropertyForm from './form/property-form';

const AdminAddPropertyDetails = () => {
  return (
    <AdminFormLayout
      title='Add New Property'
      subtitle='Fill in the details below to add a new property on the platform.'
    >
      <PropertyForm type='add' />
    </AdminFormLayout>
  );
};

export default AdminAddPropertyDetails;
