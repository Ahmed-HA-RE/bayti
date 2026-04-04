import AccountBookingList from '@/components/account/bookings/account-booking-list';
import AccountHeaderLayout from '@/components/shared/account-header-layout';
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
    <AccountHeaderLayout
      title='My Bookings'
      subtitle='View and manage all your bookings in one place.'
    >
      <AccountBookingList session={session} />
    </AccountHeaderLayout>
  );
};

export default AccountBookingsPage;
