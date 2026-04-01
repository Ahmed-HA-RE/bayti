'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
} from '../ui/sidebar';
import Image from 'next/image';
import { USER_NAVIGATION } from '@/lib/constants';
import { Separator } from '../ui/separator';
import { LuLogOut } from 'react-icons/lu';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/auth';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Suspense } from 'react';
import { FaPersonWalkingArrowLoopLeft } from 'react-icons/fa6';

const AccountSidebar = ({
  session,
}: {
  session: typeof auth.$Infer.Session;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const handleLogout = async () => {
    setOpenMobile(false);
    await authClient.signOut();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <Sidebar
      collapsible='icon'
      className='[&_[data-slot=sidebar-inner]]:bg-accent !border-r-0'
    >
      <SidebarHeader className='py-3 bg-accent'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <Avatar className='size-12'>
              <Suspense
                fallback={
                  <AvatarFallback className='uppercase'>
                    {session.user.name.slice(0, 2)}
                  </AvatarFallback>
                }
              >
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={48}
                  height={48}
                  className='rounded-full'
                />
              </Suspense>
            </Avatar>
            <div className='flex flex-col'>
              <span className='text-base text-white font-semibold'>
                {session.user.name}
              </span>
              <span className='text-xs text-white/85 truncate max-w-[180px]'>
                {session.user.email}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator className='my-0 bg-gray-200' />
      <SidebarContent className='pt-2 bg-accent'>
        <SidebarGroup className='px-0'>
          <SidebarGroupLabel className='ml-2.5 text-white'>
            Pages
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-0.5'>
              {USER_NAVIGATION.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      className={cn(
                        'border-l-2 border-transparent py-5.5 px-4 rounded-none transition duration-300 hover:bg-[#e65c00] hover:text-white hover:border-white  gap-2.5 text-white',
                        isActive &&
                          'border-orange-50 bg-[#e65c00] hover:bg-[#e65c00]',
                      )}
                      onClick={() => setOpenMobile(false)}
                      render={
                        <Link href={item.href}>
                          <Icon className='!size-5' />
                          <span className='text-base'>{item.label}</span>
                        </Link>
                      }
                    ></SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className='my-0 bg-gray-200' />
        <SidebarGroup className='px-0'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className='hover:bg-[#e65c00] border-l-2 border-transparent hover:border-white py-5.5 px-4 rounded-none transition duration-300 cursor-pointer'
                onClick={() => setOpenMobile(false)}
                render={
                  <Link href='/'>
                    <FaPersonWalkingArrowLoopLeft className='!size-5 text-white' />
                    <span className='text-base text-white'>Back to Home</span>
                  </Link>
                }
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className='hover:bg-[#e65c00] border-l-2 border-transparent hover:border-white py-5.5 px-4 rounded-none transition duration-300 cursor-pointer'
                onClick={handleLogout}
              >
                <LuLogOut className='!size-5 text-white' />
                <span className='text-base text-white'>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AccountSidebar;
