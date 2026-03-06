import { ArrowRightIcon } from 'lucide-react';
import LinkButton from '../shared/link-button';
import { MotionPreset } from '../shared/motion-preset';
import Image from 'next/image';

const Cta = () => {
  return (
    <section className='bg-foreground section-spacing overflow-hidden'>
      <div className='container relative py-16 sm:py-24 lg:py-32'>
        {/* Background Decorative Element */}
        <div className='absolute inset-0 flex items-center justify-center z-0'>
          <div className='relative w-full h-full max-w-4xl'>
            <Image
              src='/svg/cta-bg.svg'
              alt='CTA Background'
              fill
              className='object-contain opacity-25 '
            />
          </div>
        </div>

        {/* Content */}
        <div className='relative z-10 flex flex-col items-center justify-center gap-10 sm:gap-12 lg:gap-14'>
          <MotionPreset
            component='div'
            fade
            blur
            slide={{ direction: 'up' }}
            delay={0.1}
            className='text-center max-w-5xl'
          >
            <h2 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-snug tracking-wide max-lg:max-w-2xl'>
              Find your prefect property today. Contact us for expert real
              estate guidance.
            </h2>
          </MotionPreset>

          <MotionPreset fade blur delay={0.2} slide={{ direction: 'up' }}>
            <LinkButton
              href='/contact-us'
              size='default'
              className='group rounded-full'
            >
              Join Now
              <ArrowRightIcon className='size-5 transition-transform group-hover:translate-x-1 duration-300' />
            </LinkButton>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default Cta;
