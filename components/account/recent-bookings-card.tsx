import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { format } from 'date-fns';
import React from 'react';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';

const RecentBookingsCard = async ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const user = session.user;

  const recentBookings = await prisma.booking.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
    select: {
      id: true,
      date: true,
      status: true,
      property: {
        select: {
          name: true,
        },
      },
    },
  });

  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    CANCELLED: 'bg-fuchsia-100 text-fuchsia-800',
    COMPLETED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  return (
    <Card className='rounded-sm py-0 gap-0'>
      <CardHeader className='bg-gray-100 border-b rounded-none pt-4 px-6'>
        <h2 className='text-xl font-medium'>Recent Bookings</h2>
      </CardHeader>
      <CardContent className='py-4'>
        {recentBookings.length === 0 ? (
          <p className='text-base text-muted-foreground py-4 h-32 flex items-center justify-center'>
            You have no recent bookings.
          </p>
        ) : (
          recentBookings.map((booking, index) => (
            <React.Fragment key={booking.id}>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                  <span className='w-1.5 h-auto bg-accent rounded-lg' />
                  <div className='flex flex-col gap-0.5'>
                    <h3 className='text-lg font-medium leading-tight'>
                      {booking.property.name}
                    </h3>
                    <p className='text-sm text-muted-foreground'>
                      Booked on {format(booking.date, 'PPP')}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`capitalize rounded-sm ${statusColors[booking.status]}`}
                >
                  {booking.status.toLowerCase()}
                </Badge>
              </div>
              {index < recentBookings.length - 1 && (
                <Separator className='my-4' />
              )}
            </React.Fragment>
          ))
        )}
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

export default RecentBookingsCard;
