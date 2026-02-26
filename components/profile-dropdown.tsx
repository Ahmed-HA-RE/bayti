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
import { Button } from './ui/button';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/authClient';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProfileDropdown = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
    toast.success('Logged out successfully');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full md:block hidden'
          >
            <Avatar>
              <Suspense fallback={<Skeleton className='w-10 rounded-full' />}>
                <Image
                  width={150}
                  height={150}
                  src={session?.user.image ?? ''}
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
        <DropdownMenuItem onClick={handleLogout} variant='destructive'>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
