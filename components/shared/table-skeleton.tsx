import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

const TableSkeleton = ({
  rows = 10,
  columns,
}: {
  rows?: number;
  columns: number;
}) => {
  return [...Array(rows)].map((_, i) => (
    <TableRow key={i}>
      {[...Array(columns)].map((_, j) => (
        <TableCell key={j}>
          <Skeleton className='py-5 w-[150px]' />
        </TableCell>
      ))}
    </TableRow>
  ));
};
export default TableSkeleton;
