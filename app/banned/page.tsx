import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Banned',
  description: 'You have been banned from the platform.',
};

const BannedPage = () => {
  return (
    <main className='min-h-screen bg-white flex items-center justify-center px-4'>
      <div className='flex flex-col items-center text-center max-w-md w-full gap-6'>
        {/* SVG Icon */}
        <div className='relative w-36 h-36 drop-shadow-xl'>
          <Image
            src='/svg/banned.svg'
            alt='Banned'
            fill
            priority
            className='object-contain'
          />
        </div>

        {/* Text content */}
        <div className='flex flex-col gap-3'>
          <h1 className='text-4xl font-bold tracking-tight text-foreground'>
            Account Banned
          </h1>
          <p className='text-muted-foreground text-base leading-relaxed'>
            You have been banned from accessing this platform. If you believe
            this is a mistake, please contact support.
          </p>
        </div>

        {/* CTA */}
        <Button asChild className='group'>
          <Link href='/'>
            <FaArrowLeft className='size-3 group-hover:-translate-x-1 transition-transform duration-300' />
            Go Back Home
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default BannedPage;
