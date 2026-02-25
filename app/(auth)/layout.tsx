import Image from 'next/image';
import { Toaster } from 'react-hot-toast';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className='h-dvh lg:grid lg:grid-cols-2'>
        {/* Dashboard Preview */}
        <div className='max-lg:hidden relative bg-[url("/images/auth.jpg")] bg-cover bg-center z-2 flex items-end'>
          <div className='absolute inset-0 bg-black/40' />
          <div className='pb-12 px-8 z-30 flex flex-col items-start gap-4 max-w-4xl'>
            <h3 className='text-white text-3xl xl:text-5xl leading-tight font-bold tracking-tight'>
              Find a Place You&apos;ll Love to Call Home
            </h3>
            <p className='text-white/90 text-base xl:text-lg leading-relaxed max-w-2xl'>
              Explore beautiful properties tailored for comfort, convenience,
              and the way you want to live. Discover spaces designed to match
              your lifestyle, offering the perfect balance between modern living
              and everyday ease.
            </p>
          </div>
          <Image
            src={'/svg/logo.svg'}
            alt='Logo'
            width={100}
            height={100}
            priority
            className='z-2 top-0 left-0 absolute m-4'
          />
        </div>
        {children}
      </div>
      <Toaster position='top-center' />
    </main>
  );
};

export default AuthLayout;
