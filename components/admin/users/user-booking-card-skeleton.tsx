import { Skeleton } from '@/components/ui/skeleton';

const UserBookingCardSkeleton = () => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-[280px_1fr] rounded-xl border bg-card overflow-hidden'>
      {/* Image placeholder */}
      <Skeleton className='h-56 xl:h-full rounded-none' />

      {/* Details */}
      <div className='flex flex-col gap-5 p-5'>
        {/* Header: name + address | status + price */}
        <div className='flex items-start justify-between gap-4'>
          <div className='flex flex-col gap-1.5 min-w-0'>
            <Skeleton className='h-5 w-3/5' />
            <Skeleton className='h-4 w-2/5' />
          </div>
          <div className='flex flex-col items-end gap-1.5 shrink-0'>
            <Skeleton className='h-5 w-20 rounded-sm' />
            <Skeleton className='h-5 w-24' />
          </div>
        </div>

        {/* Meta */}
        <div className='flex flex-wrap gap-x-5 gap-y-1.5'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-4 w-20' />
        </div>

        {/* Divider */}
        <Skeleton className='h-px w-full' />

        {/* Schedule */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-8 rounded-lg shrink-0' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-16' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-8 rounded-lg shrink-0' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3 w-16' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </div>

        {/* Divider */}
        <Skeleton className='h-px w-full' />

        {/* Agent — stacked vertically */}
        <div className='flex flex-col gap-3'>
          <Skeleton className='h-3 w-10' />
          <div className='flex items-center gap-3'>
            <Skeleton className='size-10 rounded-full shrink-0' />
            <div className='flex flex-col gap-1.5'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-3 w-40' />
              <Skeleton className='h-3 w-28' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingCardSkeleton;
