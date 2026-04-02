import AccountStatistics from '@/components/account/account-statistics';
import AccountStatisticsSkeleton from '@/components/account/account-statistics-skeleton';
import FavoritePropertiesCard from '@/components/account/favorite-properties-card';
import FavoritePropertiesSkeleton from '@/components/account/favorite-properties-skeleton';
import GreetingCard from '@/components/account/greeting-card';
import RecentBookingCardSkeleton from '@/components/account/recent-booking-card-skeleton';
import RecentBookingsCard from '@/components/account/recent-bookings-card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

const AccountPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'USER') {
    return redirect('/login');
  }

  return (
    <div className='container space-y-6'>
      <GreetingCard session={session} />
      <Suspense fallback={<AccountStatisticsSkeleton />}>
        <AccountStatistics session={session} />
      </Suspense>
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 items-start'>
        {/* Recent Bookings */}
        <Suspense fallback={<RecentBookingCardSkeleton />}>
          <RecentBookingsCard session={session} />
        </Suspense>
        <Suspense fallback={<FavoritePropertiesSkeleton />}>
          <FavoritePropertiesCard session={session} />
        </Suspense>
      </div>
    </div>
  );
};

export default AccountPage;
