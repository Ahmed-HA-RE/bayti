'use client';

import {
  Pagination as PaginationList,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFilters } from '@/hooks/useFilters';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [{ page: currentPage }, setFilters] = useFilters();

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationList className='mt-6 max-sm:justify-center'>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => setFilters({ page: currentPage - 1 })}
            variant={'ghost'}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
            <span className='max-sm:hidden'>Previous</span>
          </Button>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <Button
              variant={'ghost'}
              size={'icon'}
              className={cn(
                'text-base',
                page === currentPage &&
                  'border-primary! rounded-none border-0 border-b-2 bg-transparent! !shadow-none',
              )}
              onClick={() => setFilters({ page })}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={() => setFilters({ page: currentPage + 1 })}
            variant={'ghost'}
            disabled={currentPage === totalPages}
          >
            <span className='max-sm:hidden'>Next</span>
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationList>
  );
};

export default Pagination;
