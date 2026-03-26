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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../../ui/input-group';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../../ui/native-select';
import { BOOKING_STATUSES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import SkeletonTable from '@/components/shared/table-skeleton';
import { useFilters } from '@/hooks/useFilters';
import TablePagination from '@/components/shared/table-pagination';
import { columns } from './booking-table-columns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { getBookings } from '@/lib/actions/admin/bookings/get-bookings';
import { Status } from '@/lib/generated/prisma';

const BookingsDataTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ page, search, date, sort, status }, setFilters] = useFilters();

  const { data, isFetching, isLoading, isError } = useQuery({
    queryKey: [
      'admin-bookings',
      {
        search,
        page,
        date,
        sort,
        status,
      },
    ],
    queryFn: () =>
      getBookings({ date, sort, status: status as Status, search, page }),
    staleTime: 60 * 1000, // 1 min
  });

  // memoize table instance to prevent unnecessary re-renders
  const bookings = useMemo(() => data?.bookings || [], [data]);

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className='px-2 pb-6'>
        <h2 className='text-3xl font-semibold tracking-tight'>Bookings</h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 sm:mt-6'>
          {/* Search filter */}
          <InputGroup>
            <InputGroupInput
              placeholder='Search by client name or property...'
              className='bg-transparent'
              value={search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
            <InputGroupAddon align='inline-start'>
              <SearchIcon className='text-muted-foreground' />
            </InputGroupAddon>
          </InputGroup>

          {/* Booking Status Filter */}
          <NativeSelect
            value={status}
            onChange={(e) => setFilters({ status: e.target.value })}
            className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
          >
            <NativeSelectOption value=''>All Status</NativeSelectOption>
            {BOOKING_STATUSES.map((status) => (
              <NativeSelectOption key={status.value} value={status.value}>
                {status.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          {/* Calendar Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                data-empty={!date}
                className='justify-between text-left font-normal data-[empty=true]:text-muted-foreground px-4 data-[state=open]:border-accent'
              >
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={date ? new Date(date) : undefined}
                onSelect={(date) =>
                  setFilters({ date: date ? format(date, 'yyyy-MM-dd') : '' })
                }
                defaultMonth={date ? new Date(date) : undefined}
              />
            </PopoverContent>
          </Popover>
          {/* Sort */}
          <NativeSelect
            value={sort}
            onChange={(e) => setFilters({ sort: e.target.value })}
            className='bg-transparent p-0 shadow-none focus:ring-0'
          >
            <NativeSelectOption value=''>Sort By:</NativeSelectOption>
            {['newest', 'oldest'].map((sortOption, index) => (
              <NativeSelectOption key={index} value={sortOption}>
                {sortOption.slice(0, 1).toUpperCase() + sortOption.slice(1)}
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
          {isFetching || isLoading ? (
            <SkeletonTable columns={9} />
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
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
      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <TablePagination
          totalPages={data.totalPages}
          results={data.bookings.length}
        />
      )}
    </div>
  );
};

export default BookingsDataTable;
