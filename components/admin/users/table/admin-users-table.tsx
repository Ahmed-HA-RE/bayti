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
import { SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../../ui/native-select';
import { useQuery } from '@tanstack/react-query';
import SkeletonTable from '@/components/shared/table-skeleton';
import { useFilters } from '@/hooks/useFilters';
import TablePagination from '@/components/shared/table-pagination';
import { columns } from './user-table-columns';
import { getUsers } from '@/lib/actions/admin/users/get-users';
import { MdDashboard } from 'react-icons/md';

const AdminUsersTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ page, search, status }, setFilters] = useFilters();

  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ['admin-users', search, status, page],
    queryFn: () => getUsers({ search, status, page }),
    staleTime: 60 * 1000, // 1 min
  });

  // memoize table instance to prevent unnecessary re-renders
  const users = useMemo(() => data?.users || [], [data]);

  const table = useReactTable({
    data: users,
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
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          <h2 className='text-3xl font-semibold tracking-tight'>Users</h2>
          <Button size={'sm'} asChild className=' w-full sm:w-auto'>
            <a
              href={process.env.NEXT_PUBLIC_BETTER_AUTH_DASHBOARD}
              target='_blank'
              rel='noopener noreferrer'
            >
              <MdDashboard className='size-3' />
              Open Auth Dashboard
            </a>
          </Button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 sm:mt-6'>
          {/* Search filter */}
          <InputGroup>
            <InputGroupInput
              placeholder='Search by name or email...'
              className='bg-transparent'
              value={search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
            <InputGroupAddon align='inline-start'>
              <SearchIcon className='text-muted-foreground' />
            </InputGroupAddon>
          </InputGroup>

          {/* Status Filter */}
          <NativeSelect
            value={status}
            onChange={(e) => setFilters({ status: e.target.value })}
            className='border-0 bg-transparent p-0 shadow-none focus:ring-0'
          >
            <NativeSelectOption value=''>All Statuses</NativeSelectOption>
            <NativeSelectOption value='active'>Active</NativeSelectOption>
            <NativeSelectOption value='banned'>Banned</NativeSelectOption>
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
                  Error loading users. Please try again.
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
          results={data.users.length}
        />
      )}
    </div>
  );
};

export default AdminUsersTable;
