import AdminEditUserForm from '@/components/admin/admin-edit-user-form';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
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

const AdminEditUserPage = async ({ params }: Props) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!id) {
    return redirect('/admin/users');
  }
  const isMe = session?.user.id === id;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      accounts: {
        select: {
          providerId: true,
        },
      },
    },
  });

  if (!user) {
    return redirect('/admin/users');
  }

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold'>
        Edit {isMe ? 'My Profile' : `${user.name}'s Profile`}
      </h1>
      <AdminEditUserForm user={user} />
    </div>
  );
};

export default AdminEditUserPage;
