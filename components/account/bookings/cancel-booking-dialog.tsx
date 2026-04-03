'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TbCalendarCancel } from 'react-icons/tb';
import { useState, useTransition } from 'react';
import { cancelMyBooking } from '@/lib/actions/account/cancel-my-booking';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

const CancelBookingDialog = ({ bookingId }: { bookingId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleCancelBooking = () => {
    startTransition(async () => {
      const res = await cancelMyBooking(bookingId);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      queryClient.invalidateQueries({ queryKey: ['myBookings'] });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            className='cursor-pointer bg-red-500 text-white hover:bg-red-700'
            size='sm'
          >
            Cancel Booking
          </Button>
        }
      />
      <DialogContent
        className='data-open:slide-in-from-left-8 data-closed:slide-out-to-right-8 data-open:zoom-in-100 data-closed:zoom-out-100 duration-300'
        showCloseButton={false}
      >
        <div className='flex flex-col items-center text-center gap-4'>
          <div className='flex items-center justify-center size-12 rounded-full bg-destructive/10 text-destructive'>
            <TbCalendarCancel className='size-6' />
          </div>
          <DialogHeader className='items-center mt-0'>
            <DialogTitle>Cancel Booking</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className='flex gap-2 w-full'>
            <DialogClose
              render={
                <Button variant='outline' className='flex-1 cursor-pointer' />
              }
            >
              Close
            </DialogClose>
            <Button
              disabled={isPending}
              variant='destructive'
              className='flex-1 cursor-pointer'
              onClick={handleCancelBooking}
            >
              {isPending ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelBookingDialog;
