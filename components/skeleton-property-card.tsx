import { Card, CardHeader, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

const SkeletonPropertyCard = () => {
  return (
    <Card className='border-0 gap-5'>
      <CardHeader className='px-0'>
        <div className='relative'>
          <Skeleton className='aspect-[3/2] rounded-4xl' />
          <Skeleton className='absolute top-4 left-4 text-base w-26 h-9 rounded-full bg-gray-100' />
        </div>
      </CardHeader>
      <CardContent className='px-2 flex flex-col gap-4'>
        <Skeleton className='w-full h-6' />
        <Skeleton className='w-full max-w-sm h-6' />

        <div className='flex items-center gap-6'>
          <Skeleton className='w-16 h-6' />
          <Skeleton className='w-16 h-6' />
          <Skeleton className='w-16 h-6' />
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonPropertyCard;
