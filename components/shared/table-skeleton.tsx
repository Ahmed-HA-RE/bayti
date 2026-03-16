import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export default function SkeletonTable() {
  return [...Array(10)].map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[200px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[150px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
      <TableCell>
        <Skeleton className='py-5 w-[100px]' />
      </TableCell>
    </TableRow>
  ));
}
