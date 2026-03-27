'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateBookingStatus } from '@/lib/actions/admin/bookings/update-booking-status';
import { BOOKING_STATUSES } from '@/lib/constants';
import { Status } from '@/lib/generated/prisma';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LuEllipsis } from 'react-icons/lu';
import RejectBookingDialog from '../reject-booking-dialog';

const colorVariants = {
  yellow: 'hover:text-yellow-600 hover:bg-yellow-50',
  green: 'hover:bg-green-50 hover:text-green-600',
  red: 'hover:bg-red-50 hover:text-red-600',
  blue: 'hover:bg-blue-50 hover:text-blue-600',
  fuchsia: 'hover:bg-fuchsia-50 hover:text-fuchsia-600',
};
const BookingTableActions = ({
  bookingId,
  propertyId,
  status,
}: {
  bookingId: string;
  propertyId: string;
  status: Status;
}) => {
  const [open, setOpen] = useState(false);
  const [cancelledReason, setCancelledReason] = useState('');
  const filteredStatuses = BOOKING_STATUSES.filter(
    (s) =>
      status !== s.value &&
      s.value !== 'CANCELLED' &&
      s.value !== 'PENDING' &&
      s.value !== 'REJECTED',
  );

  const queryClient = useQueryClient();

  const handleUpdateStatus = async (newStatus: Status) => {
    const res = await updateBookingStatus(
      bookingId,
      newStatus,
      cancelledReason,
    );
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
  };

  return (
    <div className='flex items-center gap-0.5'>
      {status !== 'REJECTED' && status === 'PENDING' && (
        <RejectBookingDialog
          handleUpdateStatus={() => handleUpdateStatus('REJECTED')}
          cancelledReason={cancelledReason}
          setCancelledReason={setCancelledReason}
        />
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
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
              <Link href={`/admin/property/${propertyId}/view`}>
                View Property
              </Link>
            </DropdownMenuItem>
            {filteredStatuses.map((s) => (
              <Button
                key={s.value}
                variant='ghost'
                className={cn(
                  colorVariants[s.color as keyof typeof colorVariants],
                  'rounded-md px-1.5 py-1 text-sm block font-normal ',
                )}
                onClick={() => {
                  handleUpdateStatus(s.value as Status);
                  setOpen(false);
                }}
              >
                Mark as {s.name}
              </Button>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default BookingTableActions;
