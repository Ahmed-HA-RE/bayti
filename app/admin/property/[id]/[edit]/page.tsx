import AdminEditPropertyDetails from '@/components/admin/properties/admin-edit-property-details';
import prisma from '@/lib/prisma';

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
    title: `Edit Property - ${property?.name}`,
    description: `Update the details, images, and features of the "${property?.name}" property.`,
  };
};

const AdminEditPropertyPage = async ({ params }: Props) => {
  const { id } = await params;

  return <AdminEditPropertyDetails id={id} />;
};

export default AdminEditPropertyPage;
