'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useFilters } from '@/hooks/useFilters';

const TablePagination = ({
  totalPages,
  results,
}: {
  totalPages: number;
  results: number;
}) => {
  const [{ page }, setFilters] = useFilters();

  return (
    <div className='flex w-full items-center justify-between gap-3 border-t px-6 py-4'>
      <p className='flex-1 whitespace-nowrap text-muted-foreground text-sm'>
        Page <span className='font-medium text-foreground'>{page}</span> of{' '}
        <span className='font-medium text-foreground'>{totalPages}</span>
        <span className='mx-2 text-border'>·</span>
        {results} {results === 1 ? 'result' : 'results'}
      </p>

      <Pagination className='justify-end'>
        <PaginationContent className='gap-0 divide-x overflow-hidden rounded-lg border'>
          <PaginationItem>
            <Button
              variant='ghost'
              size='icon-sm'
              className='rounded-none *:[span]:hidden'
              disabled={page === 1}
              onClick={() => setFilters({ page: page - 1 })}
            >
              <MdKeyboardArrowLeft className='size-4' />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant='ghost'
              size='icon-sm'
              className='rounded-none *:[span]:hidden'
              disabled={page === totalPages}
              onClick={() => setFilters({ page: page + 1 })}
            >
              <MdKeyboardArrowRight className='size-4' />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
