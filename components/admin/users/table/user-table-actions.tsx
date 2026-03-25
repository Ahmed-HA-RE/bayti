import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { LuEllipsis } from 'react-icons/lu';

const UserTableActions = ({ userId }: { userId: string }) => {
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
            <Link href={`/admin/users/${userId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/admin/users/${userId}/bookings`}>View Bookings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserTableActions;
