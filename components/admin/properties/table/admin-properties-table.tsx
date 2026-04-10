'use client';

import { useMemo, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { capitalizeFirstLetter, cn } from '@/lib/utils';
import { Card } from '../../../ui/card';
import { PropertyStatus } from '@/lib/generated/prisma/client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../../ui/input-group';
import { SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../../ui/native-select';
import { CITIES, PROPERTY_TYPES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { useFilters } from '@/hooks/useFilters';
import { getProperties } from '@/lib/actions/get-properties';
import { FaPlus } from 'react-icons/fa6';
import TableSkeleton from '@/components/shared/table-skeleton';
import TablePagination from '@/components/shared/table-pagination';
import { columns } from './property-table-columns';

const AdminPropertiesTable = () => {
  const isAdminDashboard = usePathname() === '/admin/dashboard';
  const [{ search, type, location, status, page }, setFilters] = useFilters();
  const filters = {
    search,
    type,
    location,
    page,
    status: status as PropertyStatus,
  };
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['admin-properties', filters],
    queryFn: () => getProperties(filters, true),
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

  return (
    <Card
      className={cn('w-full p-4', !isAdminDashboard && 'border-0 shadow-none')}
    >
      <div className=''>
        <div className={cn('px-4 pb-4', !isAdminDashboard && 'px-2 pb-6')}>
          <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
            <h2
              className={cn(
                'font-semibold tracking-tight',
                isAdminDashboard ? 'text-xl' : 'text-2xl',
              )}
            >
              {!isAdminDashboard ? 'All Properties' : 'Recent Properties'}
            </h2>
            <Button size={'sm'} asChild className=' w-full sm:w-auto'>
              <Link href='/admin/properties/new'>
                <FaPlus className='size-3' />
                Add Property
              </Link>
            </Button>
          </div>

          {!isAdminDashboard && (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 sm:mt-6'>
              {/* Search filter */}
              <InputGroup>
                <InputGroupInput
                  placeholder='Search by name, address, or city...'
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
                value={type}
                onChange={(e) => setFilters({ type: e.target.value })}
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
                <NativeSelectOption value=''>All Locations</NativeSelectOption>
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
            {isFetching || isLoading ? (
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
    </Card>
  );
};

export default AdminPropertiesTable;
