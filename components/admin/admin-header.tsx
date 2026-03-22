import ProfileDropdown from '../profile-dropdown';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';

const AdminHeader = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/login');
  }

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <header className='border-b px-4 h-16 flex items-center justify-between bg-white'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger className='md:hidden [&_svg]:!size-6' />

        {/* Greeting */}
        <div className='hidden md:flex md:flex-col sm:min-w-0'>
          <p className='text-base font-semibold text-foreground'>
            {greeting}, {session.user.name} 👋
          </p>
        </div>
      </div>

      {/* Right — profile */}
      <ProfileDropdown session={session} />
    </header>
  );
};
export default AdminHeader;
