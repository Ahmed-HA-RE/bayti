'use client';

import { Suspense, useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import Image from 'next/image';
import { auth } from '@/lib/auth';
import { LuUser, LuLogOut } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';
import { useMedia } from 'react-use';
import { USER_NAVIGATION } from '@/lib/constants';

const ProfileDropdown = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const navigationList =
    session?.user.role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: LuUser,
          },
        ]
      : USER_NAVIGATION;

  const isMobile = useMedia('(min-width: 768px)', false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isMobile) {
      // ignore eslint-disable-next-line react-hooks/exhaustive-deps
      setOpen(false);
    }
  }, [isMobile]);

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='rounded-full focus-visible:ring-0'>
          <Avatar>
            <Suspense
              fallback={
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              }
            >
              <Image
                src={session?.user?.image}
                alt={session?.user?.name || 'User Profile'}
                width={32}
                height={32}
                className='object-cover rounded-full'
              />
            </Suspense>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-auto' align='end'>
        <DropdownMenuLabel className='flex items-center gap-2 p-2 font-normal'>
          <Avatar className='size-10.5'>
            <Suspense
              fallback={
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              }
            >
              <Image
                src={session?.user?.image}
                alt={session?.user?.name || 'User Profile'}
                width={42}
                height={42}
                className='object-cover rounded-full'
              />
            </Suspense>
          </Avatar>
          <div className='flex flex-1 flex-col items-start'>
            <span className='text-foreground text-sm font-semibold'>
              {session.user.name}
            </span>
            <span className='text-muted-foreground text-sm'>
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {navigationList.map((item, index) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem key={index} className='p-2 '>
                <Icon className='size-4.5' />
                {item.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          variant='destructive'
          className='p-2'
        >
          <LuLogOut className='size-4.5' />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
