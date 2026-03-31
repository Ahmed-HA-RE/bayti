'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { HiOutlineSlash } from 'react-icons/hi2';
import Link from 'next/link';
import { USER_NAVIGATION } from '@/lib/constants';

const AccountBreadCrumb = () => {
  const pathname = usePathname();
  const currentLink = USER_NAVIGATION.find((l) => l.href === pathname);
  const isHome = pathname === '/account';

  if (isHome) {
    return null; // Don't render breadcrumb on the home page
  }
  return (
    <Breadcrumb>
      <BreadcrumbList className='gap-1'>
        <BreadcrumbItem>
          <BreadcrumbLink
            render={<Link href={'/account'}>Home</Link>}
            href='/account'
          />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <HiOutlineSlash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className='capitalize'>
            {currentLink?.label || 'Page'}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AccountBreadCrumb;
