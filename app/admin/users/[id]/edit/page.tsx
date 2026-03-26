import EditUser from '@/components/shared/edit-user';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props) => {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { name: true },
  });

  return {
    title: `Edit ${user?.name}'s profile`,
    description: `Edit ${user?.name}'s profile information and settings.`,
  };
};

const EditUserPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/admin/users');
  }

  return <EditUser id={id} />;
};

export default EditUserPage;
