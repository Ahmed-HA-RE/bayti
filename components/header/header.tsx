import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';

const Header = () => {
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
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
