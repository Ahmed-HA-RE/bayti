'use client';

import { useEffect, useState } from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { RiMenu3Fill } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@/components/ui/button';
import { useMedia } from 'react-use';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';

type NavigationMenu = {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
  }[];
};

const MobileNavigation = ({
  session,
}: {
  screenSize?: number;
  session: typeof auth.$Infer.Session | null;
}) => {
  const adminNavigationData: NavigationMenu[] =
    session && session.user.role === 'ADMIN'
      ? [
          {
            title: 'Dashboard',
            href: '/admin/dashboard',
          },
        ]
      : [];

  const userNavigationData: NavigationMenu[] =
    session && session.user.role === 'USER'
      ? [
          {
            title: 'Account',
            href: '/account',
          },
        ]
      : [];

  const baseNavigationData: NavigationMenu[] = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: 'Properties',
      href: '/properties',
    },
    {
      title: 'Company',
      items: [
        {
          title: 'About Us',
          href: '/about-us',
        },
        {
          title: 'Team',
          href: '/team',
        },
        {
          title: 'Agents',
          href: '/agents',
        },
        {
          title: 'Talk to an Agent',
          href: '/contact-us',
        },
        {
          title: 'Terms & Conditions',
          href: '/terms-and-conditions',
        },
        {
          title: 'Privacy Policy',
          href: '/privacy-policy',
        },
      ],
    },
    {
      title: 'Blog',
      href: '/blog',
    },
    ...adminNavigationData,
    ...userNavigationData,
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut();
    router.refresh();
    toast.success('Logged out successfully');
  };

  const isMobile = useMedia('(max-width: 767px)', false);

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='inline-flex md:hidden border-0 aria-expanded:bg-transparent'
        >
          <RiMenu3Fill className='size-6' />
          <span className='sr-only'>Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-6 p-0 bg-muted'>
        <SheetHeader className='pt-6'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='/' onClick={handleLinkClick} className='self-start'>
            <div className='flex items-center'>
              <Image src='/svg/logo.svg' alt='logo' width={100} height={100} />
            </div>
          </Link>
        </SheetHeader>
        <div className='space-y-5 overflow-y-auto p-2'>
          {baseNavigationData.map((navItem, index) => (
            <React.Fragment key={index}>
              {navItem.href ? (
                <Link
                  key={navItem.title}
                  href={navItem.href}
                  className={cn(
                    'flex items-center gap-2 px-3 text-base transition duration-300 hover:text-accent',
                    pathname === navItem.href && 'text-accent font-bold',
                  )}
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </Link>
              ) : (
                <Collapsible key={index} className='w-full group'>
                  <CollapsibleTrigger className='flex w-full items-center justify-between rounded-sm px-3 text-base cursor-pointer'>
                    <div className='flex items-center gap-2'>
                      {navItem.title}
                    </div>
                    <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-200 group-data-open:rotate-90' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='overflow-hidden mt-2 space-y-4 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down transition-all duration-300'>
                    {navItem.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          'hover:text-accent ml-3 flex items-center gap-2 rounded-md px-3 text-base mt-2 transition duration-300',
                          pathname === item.href && 'text-accent font-bold',
                        )}
                        onClick={handleLinkClick}
                      >
                        <GoDotFill className='size-2.5' />
                        {item.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </React.Fragment>
          ))}
          {!session ? (
            <Link
              href={'/login'}
              className={cn(
                'hover:text-accent text-base px-3 transition duration-300 block',
                pathname === '/login' && 'text-accent font-bold',
              )}
              onClick={handleLinkClick}
            >
              Login
            </Link>
          ) : (
            <Button
              className='w-full rounded-md mt-2'
              variant={'destructive'}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
