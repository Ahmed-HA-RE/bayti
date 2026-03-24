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
import Link from 'next/link';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../../../ui/input-group';
import { SearchIcon } from 'lucide-react';
import { NativeSelect, NativeSelectOption } from '../../../ui/native-select';
import { CITIES } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { adminGetAgents } from '@/lib/actions/admin/agent/get-agents';
import SkeletonTable from '@/components/shared/table-skeleton';
import { useFilters } from '@/hooks/useFilters';
import TablePagination from '@/components/shared/table-pagination';
import { FaPlus } from 'react-icons/fa';
import { columns } from './agent-table-columns';

const AdminAgentsDataTable = () => {
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
    <div>
      <div className='px-2 pb-6'>
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          <h2 className='text-3xl font-semibold tracking-tight'>Agents</h2>
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
          results={data.agents.length}
        />
      )}
    </div>
  );
};

export default AdminAgentsDataTable;
