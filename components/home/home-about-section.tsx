import { APP_NAME, STATISTICS } from '@/lib/constants';
import { MotionPreset } from '../shared/motion-preset';
import Image from 'next/image';
import { NumberTicker } from '../ui/number-ticker';
import SectionHeader from '../shared/section-header';

const HomeAboutSection = () => {
  return (
    <section className='section-spacing'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-20'>
          {/* Left Col */}
          <MotionPreset
            slide={{ direction: 'right' }}
            blur
            fade
            delay={0.2}
            className='flex flex-col justify-between gap-7 lg:gap-40 lg:col-span-1'
          >
            <SectionHeader title={`About ${APP_NAME}`} />
            {/* Image */}
            <Image
              src='/images/team/team.jpg'
              alt='Team'
              width={0}
              height={0}
              sizes='100vw'
              className='w-full object-cover rounded-lg lg:h-[200px]'
            />
          </MotionPreset>
          <MotionPreset
            slide={{ direction: 'left' }}
            blur
            fade
            delay={0.3}
            className='flex flex-col justify-between gap-8 lg:col-span-2'
          >
            <div className='space-y-4'>
              <h2 className='text-2xl md:text-4xl lg:text-4xl font-bold'>
                Bayti specializes in connecting clients with premium properties
                across the UAE.
              </h2>
              <p className='text-muted-foreground text-sm md:text-base max-w-2xl'>
                Our team at {APP_NAME} carefully selects each property, ensuring
                only the finest apartments, villas, and estates are showcased.
                We provide personalized visits, expert guidance, and a seamless
                experience so you can find a home that truly matches your
                lifestyle.
              </p>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 justify-between gap-8'>
              {STATISTICS.filter((_, index) => index < 3).map((stat) => (
                <div className='flex flex-col gap-2' key={stat.label}>
                  <span className='text-3xl md:text-4xl font-medium'>
                    <NumberTicker value={Number(stat.value.split('+')[0])} />+
                  </span>
                  <span className='text-muted-foreground text-lg'>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;
