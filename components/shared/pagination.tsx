'use client';

import {
  Pagination as PaginationList,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQueryState, parseAsInteger } from 'nuqs';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationList className='mt-6 max-sm:justify-center'>
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
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
