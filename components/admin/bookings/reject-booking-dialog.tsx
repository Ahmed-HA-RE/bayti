'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { MdBlock } from 'react-icons/md';
import { TbAlertTriangleFilled } from 'react-icons/tb';

const RejectBookingDialog = ({
  handleUpdateStatus,
  cancelledReason,
  setCancelledReason,
}: {
  handleUpdateStatus: () => void;
  cancelledReason: string;
  setCancelledReason: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger
        render={
          <Button variant='ghost' size='icon'>
            <MdBlock className='size-5 text-red-500' />
          </Button>
        }
      />

      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader>
          <AlertDialogMedia className='bg-destructive/10 text-destructive rounded-full'>
            <TbAlertTriangleFilled />
          </AlertDialogMedia>
          <AlertDialogTitle>Reject Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to reject this booking? the user will be
            notified about the rejection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          placeholder='Enter a reason for rejection'
          value={cancelledReason}
          onChange={(e) => setCancelledReason(e.target.value)}
        />
        <p className='text-muted-foreground/70 text-end text-xs italic tracking-wide'>
          Optional, but recommended to provide a reason for rejection.
        </p>
        <AlertDialogFooter>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              startTransition(() => {
                handleUpdateStatus();
                setOpenDialog(false);
              });
            }}
            variant='destructive'
          >
            {isPending ? 'Rejecting...' : "Yes, I'm sure"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RejectBookingDialog;
