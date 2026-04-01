import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';

const RecentBookingCardSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <React.Fragment key={index}>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <Skeleton className='w-1.5 h-auto rounded-lg' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-6 w-[200px]' />
            <Skeleton className='h-6 w-[220px]' />
          </div>
        </div>
        <Skeleton className='h-8 w-20 rounded-sm' />
      </div>
      {index < 4 && <Separator className='my-4 bg-gray-200' />}
    </React.Fragment>
  ));
};

export default RecentBookingCardSkeleton;
