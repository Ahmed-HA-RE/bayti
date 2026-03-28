import UserBookingList from '@/components/admin/users/user-booking-list';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa6';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return {
      title: 'User not found',
    };
  }

  return {
    title: `${user.name}'s Bookings`,
    description: `View all bookings made by ${user.name}.`,
  };
};

const UserBookingsPage = async ({ params }: Props) => {
  const { id } = await params;

  if (!id) {
    return redirect('/admin/users');
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return redirect('/admin/users');
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Link
          href='/admin/users'
          className='text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm inline-flex items-center gap-1.5'
        >
          <FaArrowLeft className='size-3.5' />
          Back to Users
        </Link>
        <h1 className='text-xl font-medium'>All {user.name}&apos;s Bookings</h1>
      </div>
      <UserBookingList userId={user.id} />
    </div>
  );
};

export default UserBookingsPage;
