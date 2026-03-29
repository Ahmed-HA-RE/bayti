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
import { LogOutIcon, User } from 'lucide-react';
import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from './ui/skeleton';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/authClient';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const ProfileDropdown = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const navigationList =
    session?.user.role === 'ADMIN'
      ? [
          {
            label: 'Dashboard',
            href: '/admin/dashboard',
            icon: <User />,
          },
        ]
      : [
          {
            label: 'Account',
            href: '/account',
            icon: <User />,
          },
        ];

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
    toast.success('Logged out successfully');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='cursor-pointer ' asChild>
        <Avatar>
          <Suspense fallback={<Skeleton className='w-10 rounded-full' />}>
            <Image
              width={150}
              height={150}
              src={session?.user.image as string}
              alt='profile picture'
              className='rounded-full'
            />
          </Suspense>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-42 bg-card text-card-foreground py-2'
      >
        <DropdownMenuGroup className='space-y-1'>
          {navigationList.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-2',
                  pathname === item.href && 'bg-orange-50 text-accent',
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant='destructive'>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
