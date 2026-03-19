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

const iconStyles = 'text-foreground size-5 shrink-0';

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
    title: 'Dashboard',
    icon: <MdDashboard className={iconStyles} />,
    href: '/admin/dashboard',
  },
  {
    title: 'Properties',
    icon: <MdMapsHomeWork className={iconStyles} />,
    items: [
      {
        title: 'All Properties',
        href: '/admin/properties',
      },
      {
        title: 'Add Property',
        href: '/admin/properties/new',
      },
    ],
  },
  {
    title: 'Users',
    icon: <FaUsers className={iconStyles} />,
    href: '/admin/users',
  },
  {
    title: 'Agents',
    icon: <MdRealEstateAgent className={iconStyles} />,
    items: [
      {
        title: 'All Agents',
        href: '/admin/agents',
      },
      {
        title: 'Add Agent',
        href: '/admin/agents/new',
      },
    ],
  },
  {
    title: 'Settings',
    icon: <IoSettings className={iconStyles} />,
    href: '/admin/settings',
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
    <header className='sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm'>
      <div className='container flex items-center justify-between gap-8 p-4'>
        <div className='flex items-center gap-2'>
          <MenuSheet navigationData={navigationData} />
          <Link href='/admin/dashboard'>
            <Image
              src={'/svg/logo.svg'}
              alt='Logo'
              width={100}
              height={20}
              priority
            />
          </Link>
          <NavigationMenu viewport={false} className='hidden lg:block'>
            <NavigationMenuList className='justify-start gap-5'>
              {navigationData.map((navItem) => {
                if (navItem.href) {
                  // Root link item
                  return (
                    <NavigationMenuItem key={navItem.title}>
                      <NavigationMenuLink
                        asChild
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'flex flex-row items-center gap-1.5',
                        )}
                      >
                        <Link href={navItem.href}>
                          {navItem.icon}
                          {navItem.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                }

                // Section with dropdown
                return (
                  <NavigationMenuItem key={navItem.title}>
                    <NavigationMenuTrigger className='gap-1 p-2'>
                      {navItem.icon}
                      {navItem.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className='data-[motion=from-start]:slide-in-from-left-30! data-[motion=to-start]:slide-out-to-left-30! data-[motion=from-end]:slide-in-from-right-30! data-[motion=to-end]:slide-out-to-right-30! absolute w-auto'>
                      <ul className='grid w-42'>
                        {navItem.items?.map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink
                              href={item.href}
                              className='flex flex-row items-center gap-1.5 hover:text-accent focus:bg-transparent'
                              asChild
                            >
                              <Link href={item.href}>
                                {item.icon}
                                {item.title}
                              </Link>
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
        </div>
        <div className='flex items-center gap-6'>
          <Link
            href='/'
            className='items-center gap-2 text-sm hidden lg:inline-flex hover:text-accent transition'
          >
            <LuArrowLeftFromLine className='text-foreground size-5 shrink-0' />
            Back to Site
          </Link>

          <ProfileDropdown session={session} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
