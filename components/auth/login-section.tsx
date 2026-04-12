'use client';

import LoginForm from '@/components/auth/login-form';
import { Separator } from '../ui/separator';
import { useEffect, useState } from 'react';
import SocialAuthButtons from '../shared/social-auth-buttons';

const Login = ({ callbackUrl }: { callbackUrl: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // ignore eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-0.5 text-center'>
          <h2 className='text-3xl font-semibold lg:text-4xl'>Welcome Back</h2>
          <p className='text-muted-foreground text-sm'>
            Continue to your account
          </p>
        </div>

        {/* Social Login */}
        <SocialAuthButtons isLogin callbackUrl={callbackUrl} />

        <div className='flex items-center gap-4'>
          <Separator className='flex-1' />
          <p className='text-muted-foreground text-sm'>
            or continue with email
          </p>
          <Separator className='flex-1' />
        </div>

        {/* Form */}
        <LoginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default Login;
