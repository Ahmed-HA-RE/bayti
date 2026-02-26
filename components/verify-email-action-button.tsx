'use client';

import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { Spinner } from './ui/spinner';
import { useTransition } from 'react';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';

const VerifyEmailActionButton = ({
  email,
  error,
}: {
  email: string;
  error: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleResendEmailVerification = () => {
    startTransition(async () => {
      const res = await authClient.sendVerificationEmail({
        email: email,
        callbackURL: `/verify-email?email=${email}`,
      });
      if (res.error) {
        toast.error(res.error.message as string);
        return;
      } else {
        toast.success('Verification email sent successfully.');
        setTimeout(() => router.push('/'), 4000);
      }
    });
  };

  return error ? (
    <Button
      onClick={handleResendEmailVerification}
      className='mt-2 w-full max-w-md text-base'
      size='lg'
      disabled={isPending}
    >
      {isPending ? <Spinner className='size-6' /> : 'Resend verification email'}
    </Button>
  ) : (
    <Link
      href='/'
      className={cn(
        buttonVariants({ variant: 'default', size: 'lg' }),
        'mt-2 w-full max-w-md text-base',
      )}
    >
      Go Home
    </Link>
  );
};

export default VerifyEmailActionButton;
