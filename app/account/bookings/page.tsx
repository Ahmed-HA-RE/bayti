import AccountBookingList from '@/components/account/bookings/account-booking-list';
import { auth } from '@/lib/auth';
import { APP_NAME } from '@/lib/constants';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const generateMetadata = async (): Promise<Metadata> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      title: 'Unauthorized',
    };
  }

  return {
    title: `${session.user.name}'s Bookings`,
    description: `View and manage all your bookings in your ${APP_NAME}'s account.`,
  };
};

const AccountBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }
  return (
    <div className='space-y-6 container'>
      <h1 className='text-foreground/70 font-medium text-sm'>
        Track and manage your bookings applications
      </h1>
      <AccountBookingList session={session} />
    </div>
  );
};

export default AccountBookingsPage;
