'use client';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { navigationData } from '@/lib/constants';

const DesktopNavigation = ({
  pathname,
  scrolled,
}: {
  pathname: string;
  scrolled: boolean;
}) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className='gap-4'>
        {navigationData.map((navItem) => {
          if (!navItem.items) {
            return (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-black',
                    pathname === navItem.href && 'text-accent font-bold',
                    pathname === '/' && 'text-white',
                    scrolled && pathname === '/' && 'text-black',
                  )}
                >
                  <Link href={navItem.href}>{navItem.title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-black',
                  pathname === '/' && 'text-white',
                  scrolled && pathname === '/' && 'text-black',
                )}
              >
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='w-80 grid grid-cols-2 '>
                  {navItem.items.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && 'text-accent font-bold',
                        )}
                      >
                        <Link href={item.href}>{item.title}</Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
