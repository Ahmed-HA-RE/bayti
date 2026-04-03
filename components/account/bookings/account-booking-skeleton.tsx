import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const AccountBookingSkeleton = () => {
  return Array.from({ length: 5 }).map((_, index) => (
    <Card
      key={index}
      className='overflow-hidden rounded-2xl border-border/50  p-0 gap-0'
    >
      <CardContent className='p-0 grid grid-cols-1 lg:grid-cols-11 gap-0'>
        <Skeleton className='relative shrink-0 lg:col-span-3 w-full h-56 lg:h-auto overflow-hidden' />
        {/* Content */}
        <div className='lg:col-span-8 flex flex-col'>
          {/* Property info */}
          <div className='flex flex-col pt-6'>
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 px-4'>
              {/* Left: Name + Address */}
              <div className='flex flex-col gap-2 flex-1 min-w-0'>
                <Skeleton className='w-[50%] h-6' />

                <Skeleton className='w-[40%] h-4' />
              </div>
              {/* Right: Price */}
              <Skeleton className='h-6 w-24' />
            </div>
            <Separator className='my-4' />
            {/* Date + Time Details */}
            <div className='flex flex-wrap max-lg:justify-center gap-6 px-4'>
              <Skeleton className='h-10 w-32' />
              <Skeleton className='h-10 w-32' />
              <Skeleton className='h-10 w-32' />
            </div>
          </div>
          <Separator className='my-4' />

          {/* Agent Section */}
          <div className='bg-muted/30 px-4 pb-4'>
            <div className='flex items-start lg:items-center gap-4'>
              <Skeleton className='size-12 shrink-0 rounded-full' />
              <div className='flex flex-col lg:flex-row lg:items-center gap-2 flex-1 min-w-0'>
                <Skeleton className='w-[50%] h-4' />
                <Skeleton className='w-[40%] h-4' />
                <Skeleton className='w-[40%] h-4' />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default AccountBookingSkeleton;
