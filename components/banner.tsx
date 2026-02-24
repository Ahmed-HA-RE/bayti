import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className='py-3 flex items-center justify-center text-foreground relative bg-[#262626] px-5'>
      <div className='absolute inset-0 bg-[url(/images/banner.png)] bg-cover bg-center bg-no-repeat' />
      <p className='text-foreground text-sm z-10'>
        ✨ Your Dream Home is Just a Click Away
        <Link href='/listings' className='underline ml-2'>
          Explore Now!
        </Link>
      </p>
    </div>
  );
};

export default Banner;
