import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';
import LinkButton from '../shared/link-button';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { headers } from 'next/headers';

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-20 py-4 transition duration-300 max-lg:px-4',
      )}
    >
      <div className='mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-sm'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/'>
            <Image
              src={'/svg/logo.svg'}
              alt='logo'
              className='gap-3'
              width={100}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <DesktopNavigation />
          </div>

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
              size='default'
              className='hidden md:flex rounded-full px-4 py-2'
              href='/login'
            >
              Login
            </LinkButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
