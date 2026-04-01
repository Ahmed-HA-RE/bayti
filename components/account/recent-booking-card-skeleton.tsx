import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '../ui/separator';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';

const RecentBookingCardSkeleton = () => {
  return (
    <Card className='rounded-sm py-0 gap-0'>
      <CardHeader className='bg-gray-100 border-b rounded-none pt-4 px-6'>
        <h2 className='text-xl font-medium'>Recent Bookings</h2>
      </CardHeader>
      <CardContent className='py-4'>
        {Array.from({ length: 4 }).map((_, index) => (
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
        ))}
      </CardContent>
      <CardFooter className='bg-gray-100 border-t rounded-none py-4 flex justify-center'>
        <Button asChild className='group rounded-md py-2.5 px-5'>
          <Link href='/account/bookings'>
            View All Bookings
            <MdKeyboardArrowRight className='group-hover:translate-x-1 transition duration-300 size-5' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentBookingCardSkeleton;
