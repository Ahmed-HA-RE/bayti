import AdminFormLayout from '@/components/shared/admin-form-layout';
import PropertyForm from './form/property-form';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

const AdminEditPropertyDetails = async ({ id }: { id: string }) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include:{
      propertyImages: true,
    }
  });

  if (!property) {
    return redirect('/admin/properties');
  }

  return (
    <AdminFormLayout
      title={`Edit ${property.name}`}
      subtitle={`Update the details, images, and features of the ${property.name} property.`}
    >
      <PropertyForm type='edit' property={property} />
    </AdminFormLayout>
  );
};

export default AdminEditPropertyDetails;
