import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import EditUserForm from './edit-user-form';

const EditUser = async ({ id }: { id: string }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
      <EditUserForm user={user} />
    </div>
  );
};

export default EditUser;
