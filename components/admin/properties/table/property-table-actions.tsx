'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { changePropertyStatus } from '@/lib/actions/admin/properties/change-property-status';
import { PropertyStatus } from '@/lib/generated/prisma';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { LuEllipsis } from 'react-icons/lu';

const PropertyTableActions = ({
  propertyId,
  status,
  type,
}: {
  propertyId: string;
  status: PropertyStatus;
  type: string;
}) => {
  const queryClient = useQueryClient();
  const currentStatus = {
    SALE: 'sold',
    RENT: 'rented',
  };

  const propertyStatus =
    status.toLowerCase() === 'available'
      ? currentStatus[type as keyof typeof currentStatus]
      : 'available';

  const handleChangeStatus = async () => {
    const res = await changePropertyStatus(
      propertyId,
      propertyStatus.toUpperCase() as PropertyStatus,
    );

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
  };

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
            <Link href={`/admin/property/${propertyId}/edit`}>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangeStatus}>
            Mark as {capitalizeFirstLetter(propertyStatus)}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertyTableActions;
