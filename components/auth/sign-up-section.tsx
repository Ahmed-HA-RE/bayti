'use client';

import FadeSlideIn from '../shared/fade-slide-in';
import SignUpForm from './sign-up-form';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '../ui/separator';
import { useTransition } from 'react';
import { Spinner } from '../ui/spinner';
import { authClient } from '@/lib/authClient';

const SignUp = ({ callbackUrl }: { callbackUrl: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <FadeSlideIn
      slideType='left'
      className='flex h-full flex-col items-center justify-center sm:px-5'
    >
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-3xl font-semibold lg:text-4xl'>
            Create an Account
          </h2>
          <p className='text-muted-foreground'>
            Join us to explore homes and book visits effortlessly.
          </p>
        </div>

        {/* Social Login */}
        <Button
          onClick={() => {
            startTransition(async () => {
              await authClient.signIn.social({
                provider: 'google',
                callbackURL: callbackUrl,
              });
            });
          }}
          size={'lg'}
          variant='outline'
          className='w-full border'
          disabled={isPending}
        >
          {isPending ? (
            <Spinner className='size-5' />
          ) : (
            <>
              <FcGoogle className='size-5' /> Sign in with Google
            </>
          )}
        </Button>

        <div className='flex items-center gap-4'>
          <Separator className='flex-1' />
          <p className='text-muted-foreground'>or continue with</p>
          <Separator className='flex-1' />
        </div>

        {/* Form */}
        <SignUpForm callbackUrl={callbackUrl} />
      </div>
    </FadeSlideIn>
  );
};

export default SignUp;
