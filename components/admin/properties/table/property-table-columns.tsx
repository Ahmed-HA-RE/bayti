'use client';

import { Agent, Property, PropertyImage } from '@/lib/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import PropertyTableActions from './property-table-actions';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IoEyeOutline } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn, formatCityName, formatPrice } from '@/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Suspense } from 'react';
import Image from 'next/image';

export const columns: ColumnDef<
  Property & {
    propertyImages: PropertyImage[];
    agent: Pick<Agent, 'id' | 'name' | 'image'>;
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
                {row.original.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            }
          >
            <Image
              src={row.original.propertyImages[0]?.url}
              alt={row.original.name}
              width={200}
              height={200}
              className='rounded-sm object-cover'
            />
          </Suspense>
        </Avatar>
        <span className='text-ellipsis overflow-hidden'>
          {row.original.name}
        </span>
      </div>
    ),
  },

  {
    header: 'City',
    accessorKey: 'city',
    cell: ({ row }) => <span>{formatCityName(row.original.city)}</span>,
  },

  {
    header: 'Agent',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 max-w-[150px]'>
        <Avatar>
          <Suspense
            fallback={
              <AvatarFallback className='text-xs'>
                {row.original.agent.name
                  .split(' ')
                  .map((word) => word[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            }
          >
            <Image
              src={row.original.agent.image}
              alt={row.original.agent.name}
              width={34}
              height={34}
              className='object-cover rounded-full'
            />
          </Suspense>
        </Avatar>
        <span className='text-foreground text-ellipsis overflow-hidden'>
          {row.original.agent.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='gap-1 text-muted-foreground py-0 px-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Listed At
          <ArrowUpDown className='size-4' aria-hidden='true' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span>{format(row.original.createdAt, 'M/dd/yyyy')}</span>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          className='gap-1 text-muted-foreground py-0 px-0'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Price
          <ArrowUpDown className='size-4' aria-hidden='true' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='flex items-center gap-1'>
        <span className='dirham-symbol text-base text-foreground'>&#xea;</span>
        <span className='text-base tracking-tight'>
          {formatPrice(row.original.price)}{' '}
          {row.original.propertyList === 'RENT' && (
            <span className='text-xs font-medium text-muted-foreground'>
              /month
            </span>
          )}
        </span>
      </div>
    ),
  },
  {
    header: 'Type',
    accessorKey: 'propertyList',
    cell: ({ row }) => {
      const type =
        row.original.propertyList === 'SALE' ? 'For Sale' : 'For Rent';

      const styles = {
        'For Sale':
          'bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5',
        'For Rent':
          'bg-purple-600/10 text-purple-600 focus-visible:ring-purple-600/20 dark:bg-purple-400/10 dark:text-purple-400 dark:focus-visible:ring-purple-400/40 [a&]:hover:bg-purple-600/5 dark:[a&]:hover:bg-purple-400/5',
      }[type];

      return (
        <Badge
          className={cn(
            'rounded-sm border-none capitalize focus-visible:outline-none',
            styles,
          )}
        >
          {type}
        </Badge>
      );
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase();

      const styles = {
        available:
          'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
        sold: 'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
        rented:
          'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
      }[status];

      return (
        <Badge
          className={cn(
            'rounded-sm border-none capitalize focus-visible:outline-none',
            styles,
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    header: () => 'Actions',
    cell: ({ row }) => (
      <div className='flex items-center gap-0.5'>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                size='icon'
                variant='ghost'
                className='rounded-full'
                asChild
              >
                <Link href={`/admin/property/${row.original.id}/view`}>
                  <IoEyeOutline className='size-5' />
                </Link>
              </Button>
            }
          >
            <IoEyeOutline className='size-5' />
          </TooltipTrigger>
          <TooltipContent>
            <p>View</p>
          </TooltipContent>
        </Tooltip>
        <PropertyTableActions
          propertyId={row.original.id}
          status={row.original.status}
          type={row.original.propertyList}
        />
      </div>
    ),
    enableHiding: false,
  },
];
