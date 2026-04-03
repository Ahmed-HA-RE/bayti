'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Booking, Property } from '@/lib/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import Image from 'next/image';
import { bookingStatusColors, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import BookingTableActions from './booking-actions';

export const columns: ColumnDef<
  Booking & {
    property: Pick<Property, 'name' | 'id'> & {
      propertyImages: { url: string }[];
    };
  }
>[] = [
  {
    header: 'No.',
    cell: ({ row }) => <span className='text-foreground'>{row.index + 1}</span>,
  },
  {
    header: 'Property',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 max-w-[200px]'>
        <Avatar className={'size-12'}>
          <Suspense
            fallback={
              <AvatarFallback className='text-xs'>
                {row.original.property.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            }
          >
            <Image
              src={row.original.property.propertyImages[0]?.url}
              alt={row.original.property.name}
              width={200}
              height={200}
              className='rounded-sm object-cover'
            />
          </Suspense>
        </Avatar>
        <span className='text-ellipsis overflow-hidden'>
          {row.original.property.name}
        </span>
      </div>
    ),
  },
  {
    header: 'User Name',
    cell: ({ row }) => (
      <span className='text-ellipsis overflow-hidden max-w-[200px]'>
        {row.original.userName}
      </span>
    ),
  },
  {
    header: 'User Contact',
    accessorKey: 'phoneNumber',
    cell: ({ row }) => (
      <a
        href={`tel:${row.original.userPhoneNumber}`}
        className='text-foreground hover:underline'
      >
        {row.original.userPhoneNumber}
      </a>
    ),
  },
  {
    header: 'User Email',
    accessorKey: 'email',
    cell: ({ row }) => (
      <a
        href={`mailto:${row.original.userEmail}`}
        className='text-foreground hover:underline'
      >
        {row.original.userEmail}
      </a>
    ),
  },

  {
    header: 'Booked At',
    accessorKey: 'date',
    cell: ({ row }) => <span>{format(row.original.date, 'M/dd/yyyy')}</span>,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      return (
        <Badge
          className={cn(
            'rounded-sm border-none capitalize focus-visible:outline-none',
            bookingStatusColors(row.original.status),
          )}
        >
          {row.original.status.toLowerCase()}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center justify-center gap-0.5'>
        <BookingTableActions
          bookingId={row.original.id}
          propertyId={row.original.property.id}
          status={row.original.status}
        />
      </div>
    ),
    enableHiding: false,
  },
];
