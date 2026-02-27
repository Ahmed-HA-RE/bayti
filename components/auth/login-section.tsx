'use client';

import LoginForm from '@/components/auth/login-form';
import FadeSlideIn from '../shared/fade-slide-in';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '../ui/separator';
import { authClient } from '@/lib/authClient';
import { Spinner } from '../ui/spinner';
import { useTransition } from 'react';

const Login = ({ callbackUrl }: { callbackUrl: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <FadeSlideIn
      slideType='left'
      className='flex h-full flex-col items-center justify-center sm:px-5'
    >
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-3 text-center'>
          <h2 className='text-3xl font-semibold lg:text-4xl'>Welcome Back</h2>
          <p className='text-muted-foreground'>Continue to your account</p>
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
        <LoginForm />
      </div>
    </FadeSlideIn>
  );
};

export default Login;
