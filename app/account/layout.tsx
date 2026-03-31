import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AccountSidebar from '@/components/account/account-sidebar';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountBreadCrumb from '@/components/account/account-bread-crumb';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My Account',
    template: '%s | My Account',
  },
  description:
    'Manage your account, view your properties and bookings, and update your settings.',
};

const AccountLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className='bg-muted flex min-h-dvh w-full'>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '17rem',
          } as React.CSSProperties
        }
        mobileSidebarWidth='50%'
      >
        <AccountSidebar session={session} />
        <div className='flex flex-1 flex-col'>
          <header className='bg-white border-b sticky top-0 z-50 flex h-16 md:h-18 items-center justify-between gap-6 px-4 sm:px-6'>
            <SidebarTrigger className='[&_svg]:!size-5 block md:hidden' />
            {/* title */}
            <h1 className='text-xl md:text-2xl font-bold hidden md:block'>
              My Account
            </h1>
            <AccountBreadCrumb />
          </header>
          <main className='size-full flex-1 px-4 py-6 sm:px-6 bg-white'>
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AccountLayout;
