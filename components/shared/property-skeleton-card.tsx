import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

const PropertySkeletonCard = ({ length }: { length: number }) => {
  return Array.from({ length }).map((_, idx) => (
    <Card className='border-0 gap-5 py-0 rounded-none' key={idx}>
      <CardContent className='p-0'>
        <div className='relative h-[500px] w-full'>
          <Skeleton className='h-full w-full rounded-none' />
          <div className='absolute bottom-6 left-6 flex flex-col gap-2 z-10'>
            <Skeleton className='h-12 w-[260px] bg-gray-100 rounded-none' />
            <Skeleton className='h-22 w-[350px] bg-gray-100 rounded-none' />
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export default PropertySkeletonCard;
