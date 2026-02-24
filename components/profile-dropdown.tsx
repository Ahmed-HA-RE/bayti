'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { Suspense, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import useMedia from 'react-use/lib/useMedia';

const ProfileDropdown = () => {
  const [user, setUser] = useState<null | { name: string }>();
  const isMobile = useMedia('(max-width:768px )', false);
  return user && !isMobile ? (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant='ghost' size='icon' className='rounded-full'>
            <Avatar>
              <Suspense fallback={<Skeleton className='w-10 rounded-full' />}>
                <Image
                  width={150}
                  height={150}
                  src={
                    'https://ppnu5kv8ri.ufs.sh/f/C8YtGYjaurIoQvGMyLE90uEvqgyNCxV6tlesSLPOjYikTo7m'
                  }
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
    <Button variant='outline' size='md'>
      Login
    </Button>
  ) : null;
};

export default ProfileDropdown;
