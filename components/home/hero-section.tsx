import { MotionPreset } from '../shared/motion-preset';
import MainLinkButton from '../shared/main-link-button';
import SecondaryLinkButton from '../shared/secondary-link-button';

const HeroSection = () => {
  return (
    <section className='relative'>
      {/* Vedio player */}
      <video
        autoPlay
        loop
        muted
        className='absolute inset-0 w-full h-full object-cover'
        src='/hero-vedio.mp4'
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15 z-0' />
      <div className='container min-h-screen flex flex-col items-center justify-center relative z-10'>
        <MotionPreset
          component='h1'
          fade
          blur
          slide={{ direction: 'up' }}
          delay={0.1}
          className='text-white text-center text-[46px] md:text-7xl lg:text-8xl leading-snug md:leading-tight font-medium max-w-md md:max-w-2xl lg:max-w-4xl'
        >
          Your Next Home, Just a Click Away
        </MotionPreset>
        <MotionPreset
          component='p'
          fade
          blur
          slide={{ direction: 'up' }}
          delay={0.3}
          className='text-white text-center md:text-lg mt-4 max-w-md md:max-w-xl lg:max-w-3xl font-medium'
        >
          Find homes that suit your vibe, your budget, and your future. Whether
          you&apos;re looking to rent or buy, we&apos;ve got you covered with
          the best listings in town.
        </MotionPreset>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'up' }}
          delay={0.4}
          className='mt-14 flex flex-col md:items-center gap-4 md:flex-row md:gap-6'
        >
          <MainLinkButton
            text='Explore Properties'
            href='/properties'
            size={'lg'}
          />
          <SecondaryLinkButton
            text='Learn More'
            href='/learn-more'
            size={'lg'}
          />
        </MotionPreset>
      </div>
    </section>
  );
};

export default HeroSection;
