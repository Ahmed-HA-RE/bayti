'use client';

import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOutIcon, Settings, User } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';
import useMedia from 'react-use/lib/useMedia';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';

const ProfileDropdown = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const isMobile = useMedia('(max-width:767px )', false);
  return session && !isMobile ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Avatar>
              <Suspense fallback={<Skeleton className='w-10 rounded-full' />}>
                <Image
                  width={150}
                  height={150}
                  src={session.user.image!}
                  alt='profile picture'
                  className='rounded-full'
                />
              </Suspense>
            </Avatar>
          </Button>
        }
      />
      <DropdownMenuContent align='end' className='w-40'>
        <DropdownMenuGroup className='space-y-1'>
          <DropdownMenuItem>
            <User />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant='destructive'>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : !isMobile ? (
    <Link
      href='/login'
      className={cn(buttonVariants({ variant: 'outline' }), 'text-sm')}
    >
      Login
    </Link>
  ) : null;
};

export default ProfileDropdown;
