import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import LinkButton from '../shared/link-button';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className='fixed top-6 left-0 right-0 w-full z-10 max-md:px-6'>
      <div className='flex items-center justify-between bg-white max-w-3xl mx-auto p-4 py-3 shadow-sm rounded-full'>
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

        {/* Mobile Menu Navigation */}
        <div className='md:hidden'>
          <MobileNavigation session={session} />
        </div>

        {/* Profile Dropdown */}
        {session ? (
          <ProfileDropdown session={session} />
        ) : (
          <LinkButton
            variant='default'
            size='md'
            className='hidden md:flex rounded-full'
            href='/login'
          >
            Login
          </LinkButton>
        )}
      </div>
    </header>
  );
};

export default Header;
