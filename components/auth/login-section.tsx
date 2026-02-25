'use client';

import { Separator } from '@/components/ui/separator';
import LoginForm from '@/components/auth/login-form';
import { useSearchParam } from 'react-use';
import Link from 'next/link';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const callBackUrl = useSearchParam('callbackUrl') || '/';

  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Welcome Back
          </h2>
          <p className='text-muted-foreground'>Continue to your account</p>
        </div>

        <div className='space-y-4'>
          {/* Form */}
          <LoginForm />

          <div className='flex items-center gap-4 my-4'>
            <Separator className='flex-1' />
            <p className='text-sm'>Instant Login</p>
            <Separator className='flex-1' />
          </div>

          {/* Social Login */}
          <Button variant='outline' className='w-full text-sm'>
            <FcGoogle className='size-5' />
            Sign in with Google
          </Button>

          <p className='text-muted-foreground text-center mt-2 text-sm'>
            Don&apos;t have any account?{' '}
            <Link
              href={`/signup?callbackUrl=${callBackUrl}`}
              className='text-foreground hover:underline'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
