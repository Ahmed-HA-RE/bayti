import UserBookingCardSkeleton from '@/components/admin/users/user-booking-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

const UserBookingsLoading = () => {
  return (
    <div className='space-y-6'>
      {/* Header skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-28' />
        <Skeleton className='h-6 w-64' />
      </div>

      {/* Booking list skeleton */}
      {Array.from({ length: 10 }).map((_, index) => (
        <UserBookingCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default UserBookingsLoading;
