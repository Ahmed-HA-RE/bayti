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
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const DesktopNavigation = () => {
  const pathname = usePathname();

  const navigationData = [
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
      image: {
        img: '/images/nav-drowpdown.jpg',
        href: '#',
      },
    },
    {
      title: 'Blog',
      href: '/blog',
    },
  ];

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
                    pathname === navItem.href && 'text-accent',
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
                className={cn(navigationMenuTriggerStyle())}
              >
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='w-80 grid grid-cols-2 gap-2'>
                  {navItem.items.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === item.href && 'text-accent',
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
