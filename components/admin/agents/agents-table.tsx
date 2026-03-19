'use client';

import { Suspense, useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn, formatCityName } from '@/lib/utils';
import { Card } from '../../ui/card';
import { Agent, AgentStatus } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import { format } from 'date-fns';
import { LuEllipsis } from 'react-icons/lu';
import Link from 'next/link';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../ui/input-group';
import { SearchIcon, ArrowUpDown } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../ui/native-select';
import { CITIES } from '@/lib/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { adminGetAgents } from '@/lib/actions/admin/agent/get-agents';
import SkeletonTable from '@/components/shared/table-skeleton';
import { useFilters } from '@/hooks/useFilters';
import TablePagination from '@/components/shared/table-pagination';
import { FaPlus } from 'react-icons/fa';
import { toggleAgentStatus } from '@/lib/actions/admin/agent/toggle-agent-status';
import toast from 'react-hot-toast';

const columns: ColumnDef<Agent & { _count: { properties: number } }>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='gap-1 text-muted-foreground'
        >
          No.
          <ArrowUpDown className='size-4' aria-hidden='true' />
        </Button>
      );
    },
    cell: ({ row }) => <span className='text-foreground'>{row.index + 1}</span>,
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
    header: 'Listings',
    accessorKey: 'properties',
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
        <RowActions agentId={row.original.id} status={row.original.status} />
      </div>
    ),
    enableHiding: false,
  },
];

const AgentsDataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ page, search, location }, setFilters] = useFilters();

  const { data, isFetching, isError } = useQuery({
    queryKey: ['admin-agents', search, location, page],
    queryFn: () => adminGetAgents({ search, location, page }),
    staleTime: 60 * 1000, // 1 min
  });

  // memoize table instance to prevent unnecessary re-renders
  const agents = useMemo(() => data?.agents || [], [data]);

  const table = useReactTable({
    data: agents,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <Card className='w-full border-0 py-0'>
      <div className=''>
        <div className='px-2  pb-6'>
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <h2 className='text-3xl md:text-3xl font-semibold tracking-tight'>
              Agents
            </h2>
            <Button size={'sm'} asChild className=' w-full sm:w-auto'>
              <Link href='/admin/agents/new'>
                <FaPlus className='size-2.5' />
                Add Agent
              </Link>
            </Button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-6'>
            {/* Search filter */}
            <InputGroup>
              <InputGroupInput
                placeholder='Search by name...'
                className='bg-transparent'
                value={search}
                onChange={(e) => setFilters({ search: e.target.value })}
              />
              <InputGroupAddon align='inline-start'>
                <SearchIcon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>

            {/* Location Filter */}
            <NativeSelect
              value={location}
              onChange={(e) => setFilters({ location: e.target.value })}
              className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
            >
              <NativeSelectOption value=''>All Locations</NativeSelectOption>
              {CITIES.map((city) => (
                <NativeSelectOption key={city.value} value={city.value}>
                  {city.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='h-14 border-t hover:bg-transparent'
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className='text-muted-foreground first:pl-6 last:pr-6 last:text-center px-6'
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching ? (
              <SkeletonTable />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-transparent'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='h-14 first:pl-8 last:w-29 last:px-4 px-4 last:text-center'
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              isError && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center text-destructive'
                  >
                    Error loading agents. Please try again.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <TablePagination
          totalPages={data.totalPages}
          results={data.agents.length}
        />
      )}
    </Card>
  );
};

export default AgentsDataTable;

const RowActions = ({
  agentId,
  status,
}: {
  agentId: string;
  status: AgentStatus;
}) => {
  const queryClient = useQueryClient();
  const agentStatus = status.toLowerCase() === 'active' ? 'active' : 'inactive';

  const toggleStatus = async () => {
    const res = await toggleAgentStatus(agentId, status);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='rounded-full p-2'
          aria-label='Edit item'
        >
          <LuEllipsis className='size-5' aria-hidden='true' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start' className='w-auto py-2'>
        <DropdownMenuGroup className='space-y-1'>
          <DropdownMenuItem asChild>
            <Link href={`/admin/agents/${agentId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/agents/${agentId}/properties`}>
              View Listings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant={agentStatus === 'active' ? 'destructive' : 'success'}
            onClick={toggleStatus}
          >
            {agentStatus === 'active' ? 'Deactivate' : 'Activate'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
