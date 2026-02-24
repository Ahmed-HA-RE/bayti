'use client';

import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { ChevronRightIcon } from 'lucide-react';
import { RiMenu3Fill } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { Button } from '@/components/ui/button';
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
import { Navigation } from '@/types/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const MobileNavigation = ({
  screenSize = 1023,
  navigationData,
}: {
  screenSize?: number;
  navigationData: Navigation[];
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isMobile = useMedia(`(max-width: ${screenSize}px)`, false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isMobile) {
      // ignore eslint-disable-next-line react-hooks/exhaustive-deps
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='inline-flex md:hidden'
          />
        }
      >
        <RiMenu3Fill className='size-6' />
        <span className='sr-only'>Menu</span>
      </SheetTrigger>
      <SheetContent side='left' className='w-75 gap-0 p-0 bg-muted'>
        <SheetHeader className='pt-6'>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <Link href='/' onClick={handleLinkClick} className='self-start'>
            <div className='flex items-center'>
              <Image src='/svg/logo.svg' alt='logo' width={100} height={100} />
            </div>
          </Link>
        </SheetHeader>
        <div className='space-y-1.5 overflow-y-auto p-2'>
          {navigationData.map((navItem, index) => (
            <React.Fragment key={index}>
              {navItem.href ? (
                <Link
                  key={navItem.title}
                  href={navItem.href}
                  className={cn(
                    'hover:bg-background flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                    pathname === navItem.href &&
                      'bg-background border border-border',
                  )}
                  onClick={handleLinkClick}
                >
                  {navItem.title}
                </Link>
              ) : (
                <Collapsible key={index} className='w-full group'>
                  <CollapsibleTrigger className='hover:bg-background flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm cursor-pointer'>
                    <div className='flex items-center gap-2'>
                      {navItem.title}
                    </div>
                    <ChevronRightIcon className='size-4 shrink-0 transition-transform duration-200 group-data-[open]:rotate-90' />
                  </CollapsibleTrigger>
                  <CollapsibleContent className='overflow-hidden mt-2 space-y-2'>
                    {navItem.items?.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={cn(
                          'hover:bg-background ml-3 flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                          pathname === item.href &&
                            'bg-background border border-border',
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
