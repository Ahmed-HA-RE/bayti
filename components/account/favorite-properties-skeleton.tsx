import Link from 'next/link';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Skeleton } from '../ui/skeleton';

const FavoritePropertiesSkeleton = () => {
  return (
    <Card className='rounded-sm py-0 gap-0'>
      <CardHeader className='bg-gray-100 border-b rounded-none pt-4 px-6'>
        <h2 className='text-xl font-medium'>Your Favorites </h2>
      </CardHeader>
      <CardContent className='py-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {[1, 2].map((index) => (
            <Card
              key={index}
              className='pt-0 shadow-md border-0 gap-3 rounded-xs'
            >
              <CardHeader className='px-0'>
                <Skeleton className='w-full h-40 rounded-md' />
              </CardHeader>
              <CardContent>
                <Skeleton className='w-[60%] h-6 rounded-md' />
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
      <CardFooter className='bg-gray-100 border-t rounded-none py-4 flex justify-center'>
        <Button asChild className='group rounded-md py-2.5 px-5'>
          <Link href='/account/favorites'>
            View All Favorites
            <MdKeyboardArrowRight className='group-hover:translate-x-1 transition duration-300 size-5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FavoritePropertiesSkeleton;
