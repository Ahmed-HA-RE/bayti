'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { LuArrowLeftFromLine, LuClipboardList } from 'react-icons/lu';
import { ImStatsDots } from 'react-icons/im';
import { MdHomeWork, MdRealEstateAgent } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

const AdminSidebar = ({
  admins,
}: {
  admins: { name: string; image: string; id: string }[];
}) => {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();

  const pagesItems = [
    {
      icon: <ImStatsDots className='size-4' />,
      label: 'Dashboard',
      href: '/admin/dashboard',
    },
    {
      icon: <MdHomeWork className='size-4' />,
      label: 'Properties',
      href: '/admin/properties',
    },
    {
      icon: <FaUsers className='size-4' />,
      label: 'Users',
      href: '/admin/users',
    },
    {
      icon: <MdRealEstateAgent className='size-4' />,
      label: 'Agents',
      href: '/admin/agents',
    },
    {
      icon: <LuClipboardList className='size-4' />,
      label: 'Bookings',
      href: '/admin/bookings',
    },
    {
      icon: <IoSettings className='size-4' />,
      label: 'Settings',
      href: '/admin/settings',
    },
    {
      icon: <LuArrowLeftFromLine className='size-4' />,
      label: 'Back to Site',
      href: '/',
    },
  ];

  return (
    <Sidebar variant='sidebar' collapsible='icon'>
      <SidebarHeader className='bg-muted/40 py-4 px-4'>
        <SidebarMenu className='mx-auto'>
          <SidebarMenuItem className='inline-flex items-start justify-start'>
            <Link href='/admin/dashboard' onClick={() => setOpenMobile(false)}>
              <Image
                src='/svg/logo.svg'
                alt='Logo'
                width={100}
                height={30}
                priority
              />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='bg-muted/40'>
        <SidebarGroup className='pt-4 px-2'>
          <SidebarGroupLabel className='mb-2 text-foreground'>
            PAGES
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2'>
              {pagesItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    className={cn(
                      'focus-visible:ring-accent hover:bg-orange-50 hover:text-accent hover:border-l-2 hover:border-accent rounded-l-none border-l-2 border-transparent',
                      pathname === item.href &&
                        'bg-orange-50 text-accent border-l-2 border-accent rounded-l-none',
                    )}
                    render={
                      <Link
                        href={item.href}
                        onClick={() => setOpenMobile(false)}
                      />
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admins */}
        <SidebarGroup className='px-2 mt-4 border-t'>
          <SidebarGroupLabel className='text-foreground'>
            Admins
          </SidebarGroupLabel>
          <SidebarGroupContent className='mt-2'>
            <SidebarMenu>
              {admins.map((admin) => (
                <SidebarMenuItem key={admin.name}>
                  <SidebarMenuButton
                    className='focus-visible:ring-accent hover:bg-orange-50 hover:text-accent hover:border-l-2 hover:border-accent border-l-2 border-transparent rounded-l-none '
                    render={<Link href={`/admin/users/${admin.id}/edit`} />}
                  >
                    <Avatar className='size-6 transition-[width,height] duration-200 [[data-state=collapsed]_&]:size-4'>
                      <Suspense
                        fallback={
                          <AvatarFallback>
                            {admin.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        }
                      >
                        <Image
                          src={admin.image}
                          alt={admin.name}
                          width={24}
                          height={24}
                          className='rounded-full'
                        />
                      </Suspense>
                    </Avatar>
                    <span>{admin.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
