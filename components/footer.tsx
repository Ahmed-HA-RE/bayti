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
        title: 'Blog',
        href: '/blog',
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
    <footer className='bg-foreground pt-10 sm:pt-14 lg:pt-18 pb-8'>
      <div className='container'>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-5'>
          <div className='flex flex-col items-start gap-4 lg:col-span-2'>
            <Link href='/'>
              <Image
                src={'/svg/logo-white.svg'}
                alt='Logo'
                width={100}
                height={30}
              />
            </Link>
            <p className='text-muted-foreground md:max-w-xs lg:max-w-sm'>
              Browse properties, plan your visits, and secure the home that fits
              your lifestyle, all from a single platform.
            </p>
          </div>

          {navigationData.map((navItem) => (
            <div key={navItem.title} className='flex flex-col gap-5'>
              <div className='text-lg text-white font-semibold'>
                {navItem.title}
              </div>
              <ul className='space-y-3'>
                {navItem.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-white transition-all duration-300 link-animated'
                    >
                      <span className='relative'>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='bg-foreground pt-20'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
            <p className='order-2 md:order-1 text-white'>
              {`© ${new Date().getFullYear()}`} {APP_NAME}. All rights reserved.
            </p>
            <div className='order-1 md:order-2 flex items-center gap-3'>
              {/* Instagram */}
              <a
                href='https://www.instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='group p-2.5 rounded-lg bg-white/10 hover:bg-primary backdrop-blur-sm border border-white/20 hover:border-primary transition-all duration-300 hover:scale-110'
              >
                <FaInstagram className='size-5 text-white transition-transform duration-300' />
              </a>

              {/* Linkedin */}
              <a
                href='https://www.linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='group p-2.5 rounded-lg bg-white/10 hover:bg-primary backdrop-blur-sm border border-white/20 hover:border-primary transition-all duration-300 hover:scale-110'
              >
                <FaLinkedinIn className='size-5 text-white transition-transform duration-300' />
              </a>

              {/* Facebook */}
              <a
                href='https://www.facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='group p-2.5 rounded-lg bg-white/10 hover:bg-primary backdrop-blur-sm border border-white/20 hover:border-primary transition-all duration-300 hover:scale-110'
              >
                <FaFacebookF className='size-5 text-white transition-transform duration-300' />
              </a>

              {/* Youtube */}
              <a
                href='https://www.youtube.com'
                target='_blank'
                rel='noopener noreferrer'
                className='group p-2.5 rounded-lg bg-white/10 hover:bg-primary backdrop-blur-sm border border-white/20 hover:border-primary transition-all duration-300 hover:scale-110'
              >
                <FaYoutube className='size-5 text-white transition-transform duration-300' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
