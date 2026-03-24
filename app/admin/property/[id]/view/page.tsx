import AdminViewPropertyDetails from '@/components/admin/property/admin-view-property-details';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    select: {
      name: true,
    },
  });

  return {
    title: `View ${property?.name}`,
    description: `View the details, images, and features of the "${property?.name}" property.`,
  };
};

const AdminViewPropertyPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/admin/properties');
  }

  return <AdminViewPropertyDetails id={id} />;
};

export default AdminViewPropertyPage;
