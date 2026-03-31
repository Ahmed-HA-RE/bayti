import GreetingCard from '@/components/account/greeting-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

const AccountPage = async () => {
  return (
    <div className='container'>
      <Suspense fallback={<Skeleton className='w-full h-30 rounded-sm' />}>
        <GreetingCard />
      </Suspense>
    </div>
  );
};

export default AccountPage;
