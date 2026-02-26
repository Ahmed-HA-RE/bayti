import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className='sticky z-50 w-full bg-muted border-y border-border'>
      <div className='container flex items-center justify-between py-5'>
        {/* Logo */}
        <Link href='/'>
          <Image
            src='/svg/logo.svg'
            alt='logo'
            className='gap-3'
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNavigation />

        <div className='flex items-center gap-2'>
          {/* Mobile Menu Navigation */}
          <MobileNavigation />
          <ProfileDropdown session={session} />
        </div>
      </div>
    </header>
  );
};

export default Header;
