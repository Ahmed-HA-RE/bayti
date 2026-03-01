'use client';
import LinkButton from './shared/link-button';
import { GoDotFill } from 'react-icons/go';
import { WordRotate } from './ui/word-rotate';
import { ArrowRightIcon } from 'lucide-react';
import { MotionPreset } from './shared/motion-preset';

const HeroSection = () => {
  return (
    <section className='bg-[url(/images/hero-background.png)] bg-cover bg-center min-h-screen relative flex items-end'>
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0' />
      <div className='container z-2 py-25'>
        <div className='flex flex-col gap-12 items-start'>
          <div>
            <MotionPreset
              slide={{ direction: 'up' }}
              fade
              delay={0.1}
              component='div'
              className='flex items-center gap-2 mb-4 bg-white/10 px-4 py-2 rounded-full w-fit border border-white/30 text-sm'
            >
              <GoDotFill className='text-primary-foreground' />
              <h2 className='text-primary-foreground font-light tracking-widest uppercase'>
                Modern Estates
              </h2>
            </MotionPreset>
            <MotionPreset
              component='h1'
              slide={{ direction: 'up' }}
              fade
              delay={0.2}
              className='text-secondary-foreground text-4xl md:text-6xl lg:text-7xl mb-2 max-w-3xl lg:max-w-2xl font-bold'
            >
              Where Your Next{' '}
              <span className='inline-flex items-center gap-2'>
                <WordRotate words={['Estate', 'Vision', 'Living', 'Future']} />{' '}
                Begins
              </span>
            </MotionPreset>
            <MotionPreset
              slide={{ direction: 'up' }}
              fade
              delay={0.3}
              component='p'
              className='text-white/80 max-w-lg'
            >
              Discover luxury properties across the UAE, offering elegant
              designs, prime locations, and personalized visits to find the home
              that truly fits your lifestyle.
            </MotionPreset>
          </div>
          <MotionPreset
            slide={{ direction: 'up' }}
            fade
            delay={0.4}
            className='flex flex-col sm:flex-row gap-4'
          >
            <LinkButton
              className='group'
              href='/properties'
              size='lg'
              variant='default'
            >
              Browse Properties
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-1 size-5' />
            </LinkButton>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
