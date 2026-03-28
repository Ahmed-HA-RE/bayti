import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Booking,
  Property,
  PropertyImage,
  Agent,
} from '@/lib/generated/prisma';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import {
  CalendarDays,
  Clock,
  MapPin,
  Phone,
  Mail,
  BedDouble,
  Bath,
  Home,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Suspense } from 'react';

type BookingWithProperty = Booking & {
  property: Pick<
    Property,
    | 'id'
    | 'name'
    | 'address'
    | 'price'
    | 'propertyList'
    | 'bedrooms'
    | 'bathrooms'
    | 'propertyType'
  > & {
    propertyImages: Pick<PropertyImage, 'url'>[];
    agent: Pick<Agent, 'name' | 'email' | 'image' | 'phoneNumber'>;
  };
};

const statusStyles: Record<string, string> = {
  completed:
    'bg-green-600/10 text-green-600 dark:bg-green-400/10 dark:text-green-400',
  rejected: 'bg-destructive/10 text-destructive',
  pending:
    'bg-yellow-600/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400',
  confirmed:
    'bg-fuchsia-600/10 text-fuchsia-600 dark:bg-fuchsia-400/10 dark:text-fuchsia-400',
  cancelled:
    'bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400',
};

const UserBookingCard = ({ booking }: { booking: BookingWithProperty }) => {
  const status = booking.status.toLowerCase();
  const image = booking.property.propertyImages[0]?.url;

  return (
    <div className='group grid grid-cols-1 xl:grid-cols-[280px_1fr] rounded-xl border bg-card overflow-hidden'>
      {/* Property Image */}
      <div className='relative h-56 xl:h-full overflow-hidden'>
        {image ? (
          <Image
            src={image}
            alt={booking.property.name}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-500'
          />
        ) : (
          <div className='flex items-center justify-center h-full bg-muted'>
            <Home className='size-10 text-muted-foreground' />
          </div>
        )}
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />
        <Badge className='absolute top-3 left-3 rounded-sm uppercase text-[11px] tracking-wide bg-primary text-primary-foreground border-none'>
          {booking.property.propertyList}
        </Badge>
      </div>

      {/* Details */}
      <div className='flex flex-col gap-5 p-5'>
        {/* Header: name + address | status + price */}
        <div className='flex items-start justify-between gap-4'>
          <div className='min-w-0'>
            <Link
              href={`/admin/property/${booking.property.id}/view`}
              className='font-semibold text-base leading-tight hover:underline line-clamp-1 block'
            >
              {booking.property.name}
            </Link>
            <p className='text-muted-foreground text-sm flex items-center gap-1 mt-1'>
              <MapPin className='size-3.5 shrink-0' />
              <span className='line-clamp-1'>{booking.property.address}</span>
            </p>
          </div>
          <div className='flex flex-col items-end gap-1.5 shrink-0'>
            <Badge
              className={cn(
                'rounded-sm border-none capitalize text-xs',
                statusStyles[status],
              )}
            >
              {status}
            </Badge>
            <p className='text-base font-bold tracking-tight leading-none'>
              ${booking.property.price.toLocaleString()}
              <span className='text-xs font-normal text-muted-foreground ml-1'>
                /{booking.property.propertyList === 'RENT' ? 'mo' : 'total'}
              </span>
            </p>
          </div>
        </div>

        {/* Property Meta */}
        <div className='flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground'>
          <span className='flex items-center gap-1.5'>
            <BedDouble className='size-4' />
            {booking.property.bedrooms} Beds
          </span>
          <span className='flex items-center gap-1.5'>
            <Bath className='size-4' />
            {booking.property.bathrooms} Baths
          </span>
          <span className='flex items-center gap-1.5'>
            <Home className='size-4' />
            {booking.property.propertyType}
          </span>
        </div>

        <Separator />

        {/* Visit Schedule */}
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-3 text-sm'>
            <div className='size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
              <CalendarDays className='size-4 text-primary' />
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Visit Date</p>
              <p className='font-medium'>
                {format(booking.date, 'MMM d, yyyy')}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 text-sm'>
            <div className='size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
              <Clock className='size-4 text-primary' />
            </div>
            <div>
              <p className='text-muted-foreground text-xs'>Time Slot</p>
              <p className='font-medium'>
                {format(booking.startTime, 'h:mm a')} –{' '}
                {format(booking.endTime, 'h:mm a')}
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Agent */}
        <div className='flex flex-col gap-3'>
          <p className='text-xs text-foreground capitalize tracking-wide font-semibold'>
            Agent
          </p>
          <div className='flex items-start gap-4'>
            <Avatar className='size-12'>
              <Suspense
                fallback={
                  <AvatarFallback>
                    {booking.property.agent.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                }
              >
                <Image
                  src={booking.property.agent.image}
                  alt={booking.property.agent.name}
                  width={60}
                  height={60}
                  className='rounded-full'
                />
              </Suspense>
            </Avatar>
            <div className='flex flex-col gap-2'>
              <p className='font-medium leading-none'>
                {booking.property.agent.name}
              </p>
              <a
                href={`mailto:${booking.property.agent.email}`}
                className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs'
              >
                <Mail className='size-4' />
                {booking.property.agent.email}
              </a>
              {booking.property.agent.phoneNumber && (
                <a
                  href={`tel:${booking.property.agent.phoneNumber}`}
                  className='flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-xs'
                >
                  <Phone className='size-4' />
                  {booking.property.agent.phoneNumber}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingCard;
