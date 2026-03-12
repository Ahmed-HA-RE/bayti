import MenuSheet from './menu-sheet';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { MdDashboard, MdMapsHomeWork, MdRealEstateAgent } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { IoSettings } from 'react-icons/io5';
import { LuArrowLeftFromLine } from 'react-icons/lu';
import ProfileDropdown from '../profile-dropdown';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type NavigationData = {
  title: string;
  href?: string;
  icon?: React.ReactNode;
  items?: {
    title: string;
    href: string;
    icon?: React.ReactNode;
  }[];
};

const navigationData: NavigationData[] = [
  {
    title: 'Home',
    icon: <MdDashboard className='text-foreground size-5 shrink-0' />,
    href: '/admin/dashboard',
  },
  {
    title: 'Properties',
    icon: (
      <MdMapsHomeWork className='text-foreground size-5 shrink-0 transition' />
    ),
    items: [
      {
        title: 'All Properties',
        href: '/admin/properties',
      },
      {
        title: 'Add Property',
        href: '/admin/properties/add',
      },
    ],
  },
  {
    title: 'Users',
    icon: <FaUsers className='text-foreground size-5 shrink-0 ' />,
    href: '/admin/users',
  },
  {
    title: 'Agents',
    icon: <MdRealEstateAgent className='text-foreground size-5 shrink-0' />,
    items: [
      {
        title: 'All Agents',
        href: '/admin/agents',
      },
      {
        title: 'Add Agent',
        href: '/admin/agents/add',
      },
    ],
  },
  {
    title: 'Settings',
    icon: <IoSettings className='text-foreground size-5 shrink-0' />,
    href: '/admin/settings',
  },
  {
    title: 'Back to Site',
    icon: <LuArrowLeftFromLine className='text-foreground size-5 shrink-0' />,
    href: '/',
  },
];

const AdminHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'ADMIN') {
    return redirect('/login');
  }

  return (
    <header className='sticky top-0 z-50 border-b'>
      <div className='container flex items-center justify-between gap-8 px-4 py-6'>
        <div className='flex items-center gap-2'>
          <MenuSheet navigationData={navigationData} />
          <Link href='/'>
            <Image
              src={'/svg/logo.svg'}
              alt='Logo'
              width={100}
              height={20}
              priority
            />
          </Link>
        </div>
        <NavigationMenu viewport={false} className='hidden lg:block'>
          <NavigationMenuList className='flex-wrap justify-start'>
            {navigationData.map((navItem) => {
              if (navItem.href) {
                // Root link item
                return (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuLink
                      href={navItem.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'flex flex-row items-center gap-1.5',
                      )}
                    >
                      {navItem.icon}
                      {navItem.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }

              // Section with dropdown
              return (
                <NavigationMenuItem key={navItem.title}>
                  <NavigationMenuTrigger className='gap-1.5 mx-2'>
                    {navItem.icon}
                    {navItem.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                    <ul className='grid w-42 gap-4'>
                      <li>
                        {navItem.items?.map((item) => (
                          <NavigationMenuLink
                            key={item.title}
                            href={item.href}
                            className='flex flex-row items-center gap-1.5 hover:text-accent'
                          >
                            {item.icon}
                            {item.title}
                          </NavigationMenuLink>
                        ))}
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <ProfileDropdown session={session} />
      </div>
    </header>
  );
};

export default AdminHeader;
