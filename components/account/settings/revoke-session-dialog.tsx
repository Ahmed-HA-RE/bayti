'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { useState, useTransition } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

type RevokeSessionDialogProps = {
  allSessions?: boolean;
  onRevoke?: () => Promise<void>;
};

const RevokeSessionDialog = ({
  allSessions = false,
  onRevoke,
}: RevokeSessionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleRevoke = () => {
    startTransition(async () => {
      if (!onRevoke) return;
      await onRevoke();
      setOpen(false);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant='destructive'
            size={allSessions ? 'sm' : 'icon'}
            className={cn(!allSessions && 'max-sm:self-end')}
          >
            {allSessions ? (
              'Revoke All Sessions'
            ) : (
              <FaTrashAlt className='size-3.5' />
            )}
          </Button>
        }
      />
      <AlertDialogContent className='max-w-md'>
        <AlertDialogHeader className='gap-0.5 items-start'>
          <AlertDialogTitle>
            {allSessions ? 'Revoke All Sessions?' : 'Revoke Session?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {allSessions
              ? 'Revoking all sessions will immediately:'
              : 'Revoking this session will immediately:'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='rounded-md bg-destructive/10 p-4 text-sm'>
          <ul className='list-inside list-disc space-y-1 text-destructive dark:text-red-400'>
            <li>The device is logged out</li>
            <li>The user must sign in again</li>
            <li>The action cannot be undone</li>
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-white hover:bg-destructive/90'
            onClick={handleRevoke}
            disabled={isPending}
          >
            {isPending ? (
              <Spinner />
            ) : allSessions ? (
              'Revoke All Sessions'
            ) : (
              'Revoke Session'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RevokeSessionDialog;
