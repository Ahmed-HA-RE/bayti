'use client';

import { SOCIAL_PROVIDERS } from '@/lib/constants';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { useEffect, useState, useTransition } from 'react';
import { authClient } from '@/lib/authClient';
import { Badge } from '../ui/badge';

const SocialAuthButtons = ({
  isLogin,
  callbackUrl,
}: {
  isLogin: boolean;
  callbackUrl: string;
}) => {
  const socialIconsColor = {
    dropbox: 'text-blue-500',
  };
  const [isPending, startTransition] = useTransition();
  const lastMethod = authClient.getLastUsedLoginMethod();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // ignore eslint-disable-next-line react-hooks/exhaustive-deps
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='flex flex-row gap-3'>
      {SOCIAL_PROVIDERS.map((social) => (
        <Button
          key={social.id}
          onClick={() => {
            startTransition(async () => {
              await authClient.signIn.social({
                provider: social.id,
                callbackURL: callbackUrl,
              });
            });
          }}
          variant='outline'
          className='flex-1 relative'
          disabled={isPending}
        >
          <span className='flex items-center gap-3'>
            {isPending ? (
              <Spinner className='size-4' />
            ) : (
              <social.icon
                className={`${socialIconsColor[social.id as keyof typeof socialIconsColor]} size-5 shrink-0`}
              />
            )}
            <span>{social.label}</span>
          </span>
          {isLogin && lastMethod === social.id && (
            <Badge className='bg-accent absolute text-[10px] -right-2 -top-2.5'>
              Last used
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default SocialAuthButtons;
