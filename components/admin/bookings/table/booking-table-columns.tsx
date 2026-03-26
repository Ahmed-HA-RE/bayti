'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Booking, Property } from '@/lib/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import { Suspense } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
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
      const status = row.original.status.toLowerCase();

      const styles = {
        completed:
          'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
        rejected:
          'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
        pending:
          'bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5',
        confirmed:
          'bg-fuchsia-600/10 text-fuchsia-600 focus-visible:ring-fuchsia-600/20 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:focus-visible:ring-fuchsia-400/40 [a&]:hover:bg-fuchsia-600/5 dark:[a&]:hover:bg-fuchsia-400/5',
        cancelled:
          'bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5',
      }[status];

      return (
        <Badge
          className={cn(
            'rounded-sm border-none capitalize focus-visible:outline-none',
            styles,
          )}
        >
          {status.toLowerCase()}
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
