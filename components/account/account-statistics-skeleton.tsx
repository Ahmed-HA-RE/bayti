import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const AccountStatisticsSkeleton = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card className='rounded-lg py-4' key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <Skeleton className='w-[50%] h-5' />
            <Skeleton className='w-[10%] h-10 rounded-md' />
          </CardHeader>
          <CardContent>
            <Skeleton className='w-[10%] h-10' />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountStatisticsSkeleton;
