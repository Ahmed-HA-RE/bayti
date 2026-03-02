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
import Image from 'next/image';

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
    <NavigationMenu className='flex items-center max-md:hidden'>
      <NavigationMenuList className='gap-6'>
        {navigationData.map((navItem) =>
          !navItem.items && !navItem.image ? (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuLink
                render={<Link href={navItem.href!} />}
                className={cn(
                  navigationMenuTriggerStyle(),
                  'hover:font-bold',
                  pathname === navItem.href && 'font-bold hover:font-bold ',
                )}
              >
                {navItem.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={navItem.title}>
              <NavigationMenuTrigger className='text-foreground bg-transparent text-base shadow-none [&_svg]:size-4 cursor-pointer font-medium'>
                {navItem.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                className={cn('shadow-lg bg-white rounded-lg w-120')}
              >
                <div className='grid grid-cols-2 gap-2'>
                  <ul className='flex flex-col py-2 rounded-md h-full gap-2'>
                    {navItem.items?.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          render={<Link href={item.href} />}
                          className={cn(
                            'hover:font-semibold flex items-center font-medium rounded-sm px-3 text-base',
                            pathname === item.href &&
                              'text-foreground font-bold',
                          )}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className='relative flex flex-col h-full overflow-hidden'>
                    <Image
                      src={navItem.image?.img as string}
                      fill
                      alt='navigation image'
                      className='h-full w-full rounded-md object-cover'
                    />
                    <span className='absolute inset-0 h-full bg-gradient-to-t from-black/60 to-transparent' />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNavigation;
