import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AccountFavoriteLoading = () => {
  return (
    <Card className='pt-0 border-0 shadow-lg rounded-lg gap-0'>
      <CardContent className='px-0'>
        <Skeleton className='aspect-video rounded-none' />
      </CardContent>
      <CardHeader className='space-y-1 py-4'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-3 w-[60%]' />
      </CardHeader>
      <CardContent className='pb-2.5'>
        <div className='flex items-end justify-end w-full'>
          <Skeleton className='h-8 w-[9%] rounded-sm' />
        </div>
      </CardContent>
      <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-1/4' />
        <Skeleton className='h-4 w-1/4' />
      </CardFooter>
    </Card>
  );
};

export default AccountFavoriteLoading;
