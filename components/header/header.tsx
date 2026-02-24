import Link from 'next/link';
import Image from 'next/image';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';
import ProfileDropdown from '../profile-dropdown';

const navigationData = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Properties',
    href: '/properties',
  },
  {
    title: 'Services',
    href: '/services',
  },
  {
    title: 'Company',
    items: [
      {
        title: 'About Us',
        href: '/about-us',
      },
      {
        title: 'Contact Us',
        href: '/contact-us',
      },
      {
        title: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
    ],
    image: {
      img: '/images/nav-drowpdown.jpg',
      href: '#',
    },
  },
];

const Header = () => {
  return (
    <header className='sticky z-50 w-full bg-muted'>
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
        <DesktopNavigation navigationData={navigationData} />

        <div className='flex items-center gap-2'>
          {/* Mobile Menu Navigation */}
          <MobileNavigation navigationData={navigationData} />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
