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
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/authClient';
import { OctagonAlert } from 'lucide-react';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

const AccountDeletionDialog = () => {
  const [confirmation, setConfirmation] = useState('');
  const [isPending, startTransition] = useTransition();

  const isDeleteEnabled = confirmation === 'DELETE';

  const handleDeleteAccount = () => {
    startTransition(async () => {
      try {
        const res = await authClient.deleteUser({
          callbackURL: '/',
        });

        if (res.error) {
          throw new Error(res.error.message || 'Failed to delete account.');
        }

        toast.success('Please check your email to confirm the process.');
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred.';
        toast.error(errorMessage);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className='lg:w-fit lg:ml-auto'
        render={<Button variant='destructive'>Delete My Account</Button>}
      />

      <AlertDialogContent className='max-w-md sm:max-w-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='w-full'>
            <div>
              <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10'>
                <OctagonAlert className='h-7 w-7 text-destructive' />
              </div>
              <p className='text-center'>Are you absolutely sure?</p>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className='text-center text-[15px]'>
            This action cannot be undone. This will permanently delete your
            account and remove all your bookings, favorites, and personal data
            from our system. Please enter your email to confirm you want to
            proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          placeholder='Type DELETE to confirm...'
        />

        <AlertDialogFooter className='mt-2 sm:justify-center'>
          <AlertDialogCancel variant='outline'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant='destructive'
            disabled={!isDeleteEnabled || isPending}
            onClick={handleDeleteAccount}
          >
            {isPending ? <Spinner /> : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AccountDeletionDialog;
