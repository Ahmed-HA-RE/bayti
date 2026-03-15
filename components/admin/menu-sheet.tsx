'use client';

import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { ChevronRightIcon, MenuIcon } from 'lucide-react';
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
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowBigRightDash, LuArrowLeftFromLine } from 'react-icons/lu';
import { NavigationData } from './admin-header';
import LogoutButton from '../shared/logout-button';

const MenuSheet = ({
  navigationData,
}: {
  navigationData: NavigationData[];
}) => {
  const [open, setOpen] = useState(false);
  const isMobile = useMedia('(max-width: 767px)', false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='inline-flex lg:hidden'>
          <MenuIcon className='size-5' />
          <span className='sr-only'>Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-4 p-0'>
        <SheetHeader className='px-4 py-6'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='/' onClick={handleLinkClick} className='self-start'>
            <Image src={'/svg/logo.svg'} alt='Logo' width={100} height={100} />
          </Link>
        </SheetHeader>
        <div className='overflow-y-auto'>
          {navigationData.map((navItem) => {
            if (navItem.href) {
              return (
                <Link
                  key={navItem.title}
                  href={navItem.href}
                  className='hover:text-accent flex items-center gap-2 px-4 py-3 text-sm cursor-pointer'
                  onClick={handleLinkClick}
                >
                  {navItem.icon && navItem.icon}
                  {navItem.title}
                </Link>
              );
            }

            return (
              <Collapsible key={navItem.title} className='w-full'>
                <CollapsibleTrigger className='group flex w-full items-center justify-between px-4 py-3 text-sm cursor-pointer hover:text-accent transition'>
                  <div className='flex items-center gap-2'>
                    {navItem.icon}
                    {navItem.title}
                  </div>
                  <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-90 ' />
                </CollapsibleTrigger>
                <CollapsibleContent className='data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden transition-all duration-300 mt-1'>
                  {navItem.items?.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className='hover:text-accent flex items-center gap-2 px-4 py-3'
                      onClick={handleLinkClick}
                    >
                      <LuArrowBigRightDash className='ml-3 size-4' />
                      {item.title}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
        <div className='p-4 border-t'>
          <div className='flex flex-col items-start gap-4'>
            <Link
              href='/'
              className='flex items-center gap-2 text-sm hover:text-accent transition'
              onClick={handleLinkClick}
            >
              <LuArrowLeftFromLine className='text-foreground size-5 shrink-0' />
              Back to Site
            </Link>
            <LogoutButton setOpen={setOpen} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuSheet;
