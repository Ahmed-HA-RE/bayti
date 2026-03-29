import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const BlogSkeletonCard = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <Card className='rounded-lg pb-0 gap-0' key={index}>
      <CardHeader className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <Skeleton className='w-30 h-4' />
          <Skeleton className='w-30 h-4' />
        </div>
        <CardTitle>
          <Skeleton className='w-3/4 h-6' />
        </CardTitle>
      </CardHeader>
      <CardContent className='px-0'>
        <div className='px-0'>
          <Skeleton className='w-24 h-6 my-8 ml-4' />
        </div>
        <div className='overflow-hidden'>
          <Skeleton className='w-full h-[260px]' />
        </div>
      </CardContent>
    </Card>
  ));
};

export default BlogSkeletonCard;
