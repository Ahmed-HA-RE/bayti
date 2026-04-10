'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Agent } from '@/lib/generated/prisma';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Suspense } from 'react';
import Image from 'next/image';
import { cn, formatAgentRole, formatCityName } from '@/lib/utils';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import AgentTableActions from './agent-table-actions';

export const columns: ColumnDef<Agent & { _count: { properties: number } }>[] =
  [
    {
      header: 'No.',
      cell: ({ row }) => (
        <span className='text-foreground'>{row.index + 1}</span>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='gap-1 text-muted-foreground'
          >
            Name
            <ArrowUpDown className='size-4' aria-hidden='true' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='flex items-center gap-2 max-w-[200px]'>
          <Avatar className={'size-10'}>
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
                src={row.original.image}
                alt={row.original.name}
                width={40}
                height={40}
                className='rounded-full object-cover'
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
      header: 'Email',
      accessorKey: 'email',
      cell: ({ row }) => (
        <a
          href={`mailto:${row.original.email}`}
          className='text-foreground hover:underline'
        >
          {row.original.email}
        </a>
      ),
    },
    {
      header: 'Phone',
      accessorKey: 'phoneNumber',
      cell: ({ row }) => (
        <a
          href={`tel:${row.original.phoneNumber}`}
          className='text-foreground hover:underline'
        >
          {row.original.phoneNumber}
        </a>
      ),
    },

    {
      header: 'City',
      accessorKey: 'city',
      cell: ({ row }) => <span>{formatCityName(row.original.city)}</span>,
    },
    {
      header: 'Role',
      accessorKey: 'role',
      cell: ({ row }) => {
        return <span>{formatAgentRole(row.original.role)}</span>;
      },
    },

    {
      accessorKey: '_count.properties',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            size='icon'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className='gap-1 text-muted-foreground'
          >
            Listings
            <ArrowUpDown className='size-4' aria-hidden='true' />
          </Button>
        );
      },
      cell: ({ row }) => <span>{row.original._count.properties}</span>,
    },

    {
      header: 'Joined',
      accessorKey: 'createdAt',
      cell: ({ row }) => (
        <span>{format(row.original.createdAt, 'M/dd/yyyy')}</span>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();

        const styles = {
          active:
            'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
          inactive:
            'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
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
        <div className='flex items-center justify-center gap-0.5'>
          <AgentTableActions
            agentId={row.original.id}
            status={row.original.status}
          />
        </div>
      ),
      enableHiding: false,
    },
  ];
