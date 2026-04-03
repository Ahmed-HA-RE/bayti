'use client';

import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getMyBookings } from '@/lib/actions/account/get-my-bookings';
import { auth } from '@/lib/auth';
import { bookingStatusColors, cn, formatPrice } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BsTelephone } from 'react-icons/bs';
import { FiMail, FiMapPin } from 'react-icons/fi';
import { LuCalendar, LuClock } from 'react-icons/lu';
import AccountBookingSkeleton from './account-booking-skeleton';

const AccountBookingList = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const page = useSearchParams().get('page') || 1;
  const userId = session.user.id;

  const { data, isLoading } = useQuery({
    queryKey: ['myBookings', userId, page],
    queryFn: async () => await getMyBookings(userId, Number(page)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <AccountBookingSkeleton />;
  }

  if (!data?.myBookings.length) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-4 text-center'>
        <div className='rounded-full bg-muted p-6'>
          <LuCalendar className='size-12 text-muted-foreground' />
        </div>
        <div className='space-y-1'>
          <h3 className='text-lg font-semibold'>No bookings yet</h3>
          <span className='text-muted-foreground text-sm max-w-md block'>
            It looks like you haven&apos;t made any bookings yet. Start
            exploring properties and schedule your visits today!{' '}
            <Link href='/properties' className='text-accent hover:underline'>
              Explore Properties
            </Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {data.myBookings.map((booking) => (
        <Card
          key={booking.id}
          className='group overflow-hidden rounded-2xl border lg:border-0 bg-gray-50 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 p-0 gap-0'
        >
          <CardContent className='p-0 grid grid-cols-1 lg:grid-cols-11 gap-0'>
            {/* Property Image */}
            <Link
              href={`/property/${booking.property.id}`}
              className='relative shrink-0 lg:col-span-3 w-full h-56 lg:h-auto overflow-hidden'
            >
              <Image
                src={booking.property.propertyImages[0].url}
                alt={booking.property.name}
                fill
                sizes='100vw'
                className='object-cover transition-transform duration-500 group-hover:scale-110'
              />
              {/* Gradient overlay for better badge visibility */}
              <div className='absolute inset-0 bg-gradient-to-bl from-black/40 via-transparent to-transparent' />
              <div className='absolute top-4 right-4'>
                <Badge
                  className={cn(
                    'text-secondary-foreground',
                    bookingStatusColors(booking.status),
                  )}
                >
                  {booking.status.charAt(0) +
                    booking.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            </Link>

            {/* Content */}
            <div className='lg:col-span-8 flex flex-col'>
              {/* Property info */}
              <div className='flex flex-col pt-6'>
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4 px-4'>
                  {/* Left: Name + Address */}
                  <div className='flex flex-col gap-2 flex-1 min-w-0'>
                    <Link
                      href={`/property/${booking.property.id}`}
                      className='text-xl font-bold leading-tight hover:text-accent transition-colors line-clamp-1'
                    >
                      {booking.property.name}
                    </Link>
                    <span className='flex items-center gap-2 text-muted-foreground'>
                      <FiMapPin className='text-accent size-4 shrink-0' />
                      <span className='text-sm max-w-xs line-clamp-1'>
                        {booking.property.address}
                      </span>
                    </span>
                  </div>
                  {/* Right: Price */}
                  <div className='flex flex-col items-start md:items-end gap-1 shrink-0'>
                    <span className='text-[10px] uppercase tracking-wider text-muted-foreground font-semibold'>
                      {booking.property.propertyList === 'RENT'
                        ? 'Monthly Rent'
                        : 'Sale Price'}
                    </span>
                    <div className='flex items-baseline gap-0.5'>
                      <span className='dirham-symbol text-lg font-bold text-accent leading-none'>
                        &#xea;
                      </span>
                      <span className='text-lg font-bold tracking-tight'>
                        {formatPrice(booking.property.price)}{' '}
                        {booking.property.propertyList === 'RENT' && (
                          <span className='text-xs text-muted-foreground font-normal'>
                            /mo
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <Separator className='my-4' />
                {/* Date + Time Details */}
                <div className='flex flex-wrap max-lg:justify-center gap-6 px-4'>
                  <div className='flex items-start gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10'>
                      <LuCalendar className='size-4.5 text-accent' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                        Visit Date
                      </span>
                      <span className='text-sm font-semibold'>
                        {format(new Date(booking.date), 'M/d/yyyy')}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10'>
                      <LuClock className='size-4.5 text-accent' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                        Start Time
                      </span>
                      <span className='text-sm font-semibold'>
                        {format(new Date(booking.startTime), 'h:mm a')}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10'>
                      <LuClock className='size-4.5 text-accent' />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <span className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
                        End Time
                      </span>
                      <span className='text-sm font-semibold'>
                        {format(new Date(booking.endTime), 'h:mm a')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className='my-4' />

              {/* Agent Section */}
              <div className='bg-muted/30 px-4'>
                <div className='flex flex-col gap-3'>
                  <span className='text-xs font-semibold text-muted-foreground uppercase tracking-wider'>
                    Your Agent
                  </span>
                  <div className='flex items-start lg:items-center gap-4'>
                    <Avatar className='size-12 shrink-0 ring-2 ring-accent/20'>
                      <Image
                        src={booking.property.agent.image}
                        alt={booking.property.agent.name}
                        width={48}
                        height={48}
                        className='object-cover rounded-full'
                      />
                    </Avatar>
                    <div className='flex flex-col lg:flex-row lg:items-center gap-2 flex-1 min-w-0'>
                      <span className='text-base font-bold truncate'>
                        {booking.property.agent.name}
                      </span>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                        <a
                          href={`mailto:${booking.property.agent.email}`}
                          className='group/link flex items-center gap-2 text-xs'
                        >
                          <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 group-hover/link:bg-accent/20 transition-colors'>
                            <FiMail className='size-3.5 text-accent' />
                          </div>
                          <span className='truncate max-w-[180px]'>
                            {booking.property.agent.email}
                          </span>
                        </a>
                        <a
                          href={`tel:${booking.property.agent.phoneNumber}`}
                          className='group/link flex items-center gap-2 text-xs'
                        >
                          <div className='flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent/10 group-hover/link:bg-accent/20 transition-colors'>
                            <BsTelephone className='size-3.5 text-accent' />
                          </div>
                          <span>{booking.property.agent.phoneNumber}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Separator className='my-4' />
              {/* {booking.status==='PENDING'&&(
              
              )} */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountBookingList;
