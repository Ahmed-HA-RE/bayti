import prisma from '@/lib/prisma';
import UserBookingCard from './user-booking-card';
import { CalendarX } from 'lucide-react';

const UserBookingList = async ({ userId }: { userId: string }) => {
  const bookings = await prisma.booking.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          address: true,
          price: true,
          propertyList: true,
          bedrooms: true,
          bathrooms: true,
          propertyType: true,
          propertyImages: {
            select: {
              url: true,
            },
            take: 1,
          },
          agent: {
            select: {
              name: true,
              email: true,
              image: true,
              phoneNumber: true,
            },
          },
        },
      },
    },
  });

  if (bookings.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-20 text-center gap-3'>
        <div className='size-14 rounded-full bg-muted flex items-center justify-center'>
          <CalendarX className='size-6 text-muted-foreground' />
        </div>
        <div>
          <p className='font-medium'>No bookings found</p>
          <p className='text-sm text-muted-foreground'>
            This user hasn&apos;t made any bookings yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-4'>
      {bookings.map((booking) => (
        <UserBookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default UserBookingList;
