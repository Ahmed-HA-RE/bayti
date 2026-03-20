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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  capitalizeFirstLetter,
  cn,
  formatCityName,
  formatPrice,
} from '@/lib/utils';
import { Card } from '../../ui/card';
import {
  Property,
  PropertyList,
  PropertyStatus,
} from '@/lib/generated/prisma/client';
import Image from 'next/image';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import { LuEllipsis } from 'react-icons/lu';
import { IoEyeOutline } from 'react-icons/io5';
import Link from 'next/link';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../ui/input-group';
import { ArrowUpDown, SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../ui/native-select';
import { CITIES, PROPERTY_TYPES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/hooks/useFilters';
import { getProperties } from '@/lib/actions/get-properties';
import { FaPlus } from 'react-icons/fa6';
import TableSkeleton from '@/components/shared/table-skeleton';
import TablePagination from '@/components/shared/table-pagination';

const columns: ColumnDef<
  Pick<
    Property,
    | 'id'
    | 'name'
    | 'city'
    | 'price'
    | 'createdAt'
    | 'status'
    | 'images'
    | 'propertyList'
  >
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
              src={row.original.images[0]}
              alt={row.original.name}
              width={48}
              height={48}
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

  // Add fake agent till i implement the agent system
  {
    header: 'Agent',
    cell: ({ row }) => (
      <div className='flex items-center gap-2 max-w-[150px]'>
        <Avatar>
          <Suspense
            fallback={<AvatarFallback className='text-xs'>AH</AvatarFallback>}
          >
            <Image
              src={row.original.images[0]}
              alt={row.original.name}
              width={34}
              height={34}
              className='object-cover rounded-full'
            />
          </Suspense>
        </Avatar>
        <span className='text-foreground text-ellipsis overflow-hidden'>
          Ahmed Haitham
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
          className='gap-1 text-muted-foreground'
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
          className='gap-1 text-muted-foreground'
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
                <Link href={`/admin/properties/${row.original.id}/view`}>
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
        <RowActions
          propertyId={row.original.id}
          status={row.original.status}
          type={row.original.propertyList}
        />
      </div>
    ),
    enableHiding: false,
  },
];

const AdminPropertiesTable = () => {
  const [{ search, listType, location, status }, setFilters] = useFilters();
  const filters = {
    search,
    listType: listType as PropertyList,
    location,
    status: status as PropertyStatus,
  };
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['admin-properties', filters],
    queryFn: () => getProperties(filters),
    staleTime: 1000 * 60, // 1 minute
  });

  // memoize table instance to prevent unnecessary re-renders
  const properties = useMemo(() => data?.properties || [], [data]);

  const table = useReactTable({
    data: properties,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  const isAdminDashboard = usePathname() === '/admin/dashboard';

  return (
    <Card
      className={cn('w-full py-0', !isAdminDashboard && 'border-0 shadow-none')}
    >
      <div>
        <div className='border-b'>
          <div className='px-2 pb-6'>
            <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
              <h2 className='text-3xl font-semibold tracking-tight'>
                {!isAdminDashboard ? 'All Properties' : 'Recent Properties'}
              </h2>
              <Button size={'sm'} asChild className=' w-full sm:w-auto'>
                <Link href='/admin/properties/new'>
                  <FaPlus className='size-2.5' />
                  Add Property
                </Link>
              </Button>
            </div>

            {!isAdminDashboard && (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 sm:mt-6'>
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

                {/* Type filter */}
                <NativeSelect
                  className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
                  value={listType}
                  onChange={(e) => setFilters({ listType: e.target.value })}
                >
                  <NativeSelectOption value=''>All Types</NativeSelectOption>
                  {PROPERTY_TYPES.map((t) => (
                    <NativeSelectOption key={t.value} value={t.value}>
                      {t.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>

                {/* Location Filter */}
                <NativeSelect
                  className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
                  value={location}
                  onChange={(e) => setFilters({ location: e.target.value })}
                >
                  <NativeSelectOption value=''>
                    All Locations
                  </NativeSelectOption>
                  {CITIES.map((city) => (
                    <NativeSelectOption key={city.value} value={city.value}>
                      {city.name}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>

                {/* Status Filter */}
                <NativeSelect
                  className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
                  value={status}
                  onChange={(e) => setFilters({ status: e.target.value })}
                >
                  <NativeSelectOption value=''>
                    Property Status
                  </NativeSelectOption>
                  {['AVAILABLE', 'RENTED', 'SOLD'].map((status) => (
                    <NativeSelectOption key={status} value={status}>
                      {capitalizeFirstLetter(status.toLowerCase())}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            )}
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
                        className='text-muted-foreground first:px-6 last:pr-6 last:text-center px-4'
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
                <TableSkeleton columns={9} />
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    {error.message}
                  </TableCell>
                </TableRow>
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
                        className='h-14 first:pl-8 last:w-29 last:px-4 px-4'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* Pagination */}
        {!isAdminDashboard && data && data.totalPages > 1 && (
          <TablePagination
            totalPages={data.totalPages}
            results={data.properties.length}
          />
        )}
      </div>
    </Card>
  );
};

export default AdminPropertiesTable;

const RowActions = ({
  propertyId,
  status,
  type,
}: {
  propertyId: string;
  status: string;
  type: string;
}) => {
  const propertyType = {
    SALE: 'sold',
    RENT: 'rented',
  };

  const propertyStatus =
    status.toLowerCase() === 'available'
      ? propertyType[type as keyof typeof propertyType]
      : 'available';

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
            <Link href={`/admin/property/${propertyId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Mark as {capitalizeFirstLetter(propertyStatus)}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
