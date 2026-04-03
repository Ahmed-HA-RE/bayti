import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-8'>
      <div className='h-[400px] md:h-[600px] w-full relative'>
        <Image src='/svg/404-page.svg' alt='Error Illustration' fill />
      </div>
      <div className='text-center'>
        <h2 className='mb-2 text-3xl font-semibold'>Page Not Found ⚠</h2>
        <p className='mb-5 text-base text-muted-foreground'>
          We couldn&apos;t find the page you are looking for{' '}
        </p>
        <Button className='rounded-lg text-base' asChild>
          <Link href='/'>Back to home page</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
