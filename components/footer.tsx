import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';

const navigationData = [
  {
    title: 'Resources',
    items: [
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
    ],
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
    ],
  },
  {
    title: 'Legal',
    items: [
      {
        title: 'Terms & Conditions',
        href: '/terms-and-conditions',
      },
      {
        title: 'Privacy Policy',
        href: '/privacy-policy',
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className='border-t border-border'>
      <div className='container grid gap-6 sm:grid-cols-2 lg:grid-cols-5 py-10 sm:py-14 lg:py-18'>
        <div className='flex flex-col items-start gap-4 lg:col-span-2'>
          <Link href='/'>
            <Image src={'/svg/logo.svg'} alt='Logo' width={100} height={100} />
          </Link>
          <p className='text-muted-foreground md:max-w-xs lg:max-w-sm'>
            Browse properties, plan your visits, and secure the home that fits
            your lifestyle, all from a single platform.
          </p>
        </div>

        {navigationData.map((navItem) => (
          <div key={navItem.title} className='flex flex-col gap-5'>
            <div className='text-lg text-muted-foreground'>{navItem.title}</div>
            <ul className='space-y-3'>
              {navItem.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className='text-foreground transition-colors duration-300'
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className='bg-muted py-6'>
        <div className='container flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-sm order-2 md:order-1'>
            {`©${new Date().getFullYear()}`} {APP_NAME}. All rights reserved.
          </p>
          <div className='order-1 md:order-2 flex items-center gap-2'>
            {/* Instagram */}
            <a
              href='https://www.instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-5 md:p-4 rounded-full bg-background'
            >
              <FaInstagram className='size-5 group-hover:text-primary transition-colors duration-300' />
            </a>

            {/* Linkedin */}
            <a
              href='https://www.linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-5 md:p-4 rounded-full bg-background'
            >
              <FaLinkedinIn className='size-5 group-hover:text-primary transition-colors duration-300' />
            </a>

            {/* Facebook */}
            <a
              href='https://www.facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-5 md:p-4 rounded-full bg-background'
            >
              <FaFacebookF className='size-5 group-hover:text-primary transition-colors duration-300' />
            </a>

            {/* Youtube */}
            <a
              href='https://www.youtube.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-5 md:p-4 rounded-full bg-background'
            >
              <FaYoutube className='size-5 group-hover:text-primary transition-colors duration-300' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
