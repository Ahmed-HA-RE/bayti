import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

const AgentSkeletonCard = () => {
  return (
    <Card className='border-0 shadow-none'>
      <CardHeader className='px-0'>
        <Skeleton className='w-full h-[480px] rounded-xl' />
      </CardHeader>
      <CardContent className='px-0'>
        <Skeleton className='w-2/3 h-6' />
        <Separator className='my-2.5' />
        <Skeleton className='w-1/2 h-6' />
      </CardContent>
    </Card>
  );
};

export default AgentSkeletonCard;
