'use client';

import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';
import LinkButton from '../shared/link-button';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = ({
  session,
}: {
  session: typeof auth.$Infer.Session | null;
}) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => setScrolled(window.scrollY > 5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-20 py-4 transition-all duration-300',
        scrolled && ' bg-white/90 backdrop-blur-md shadow-sm ',
        pathname === '/' && !scrolled && 'bg-transparent',
      )}
    >
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link href='/'>
            <Image
              src={`/svg/${pathname === '/' && !scrolled ? 'logo-white' : 'logo'}.svg`}
              alt='logo'
              className='gap-3'
              width={100}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <DesktopNavigation pathname={pathname} scrolled={scrolled} />
          </div>

          {/* Mobile Menu Navigation */}
          <div className='md:hidden'>
            <MobileNavigation
              session={session}
              scrolled={scrolled}
              pathname={pathname}
            />
          </div>

          {/* Profile Dropdown */}
          {session ? (
            <div className='md:block hidden'>
              <ProfileDropdown session={session} />
            </div>
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
