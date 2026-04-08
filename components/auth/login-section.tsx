'use client';

import LoginForm from '@/components/auth/login-form';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '../ui/separator';
import { authClient } from '@/lib/authClient';
import { Spinner } from '../ui/spinner';
import { useEffect, useState, useTransition } from 'react';
import { FaDropbox } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const Login = ({ callbackUrl }: { callbackUrl: string }) => {
  const [isPending, startTransition] = useTransition();
  const lastMethod = authClient.getLastUsedLoginMethod();
  const [isMounted, setIsMounted] = useState(false);

  const socialProviders = [
    {
      id: 'google',
      label: 'Continue with Google',
      icon: <FcGoogle className='size-5 shrink-0' />,
    },
    {
      id: 'dropbox',
      label: 'Continue with Dropbox',
      icon: <FaDropbox className='size-5 shrink-0 text-blue-500' />,
    },
  ];

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
        <div className='flex flex-col gap-3'>
          {socialProviders.map(({ id, label, icon }) => {
            const isLast = lastMethod === id;
            return (
              <Button
                key={id}
                onClick={() => {
                  startTransition(async () => {
                    await authClient.signIn.social({
                      provider: id,
                      callbackURL: callbackUrl,
                    });
                  });
                }}
                variant='outline'
                disabled={isPending}
                className={cn('h-12 w-full justify-between px-4')}
              >
                <span className='flex items-center gap-3'>
                  {isPending ? <Spinner className='size-4' /> : icon}
                  <span>{label}</span>
                </span>

                {isLast && <Badge className='bg-green-600'>Last used</Badge>}
              </Button>
            );
          })}
        </div>

        <div className='flex items-center gap-4'>
          <Separator className='flex-1' />
          <p className='text-muted-foreground text-sm'>
            or continue with email
          </p>
          <Separator className='flex-1' />
        </div>

        {/* Form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
