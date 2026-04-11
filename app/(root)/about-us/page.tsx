import FAQ from '@/components/home/faq-section';
import { MotionPreset } from '@/components/shared/motion-preset';
import SectionEyebrow from '@/components/shared/section-eyebrow';
import { Separator } from '@/components/ui/separator';
import { APP_NAME, ABOUT_STATISTICS, OUR_PURPOSE } from '@/lib/constants';
import type { Metadata } from 'next';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn more about ${APP_NAME}, our mission, and how we are revolutionizing the real estate market in the UAE with our innovative platform.`,
};

const AboutUsPage = () => {
  return (
    <>
      {/* Header Section */}
      <section className='section-header-spacing'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:justify-between items-start gap-2.5'>
            {/* Eyebrow */}
            <MotionPreset
              fade
              slide={{ direction: 'left' }}
              delay={0.1}
              className='lg:col-span-1 inline-flex items-center gap-1.5 tracking-widest uppercase text-base'
            >
              <GoDotFill className='text-[#ff6b00]' />
              About {APP_NAME}
            </MotionPreset>
            <div className='space-y-4 lg:col-span-2'>
              <MotionPreset
                component='h1'
                fade
                slide={{ direction: 'right' }}
                delay={0.15}
                className='text-4xl md:text-5xl xl:text-6xl leading-tight font-normal'
              >
                A Trusted Real Estate Agency with a Modern Vision
              </MotionPreset>
              <MotionPreset
                component='p'
                fade
                slide={{ direction: 'right' }}
                delay={0.2}
                className=' text-sm lg:text-base text-muted-foreground max-w-3xl'
              >
                We&apos;re dedicated to helping clients find elegant, minimalist
                homes designed for comfort, quality, and lasting value.
              </MotionPreset>
            </div>
          </div>
        </div>
      </section>
      {/* Image Showcase Section */}
      <section className='section-spacing'>
        <div className='relative h-[80vh]'>
          <Image
            src='/images/about-us/about-us-showcase.jpg'
            alt='About Us Showcase'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 bg-black/5' />
        </div>
      </section>

      {/* Company Stats Section */}
      <section className='section-bottom-spacing'>
        <div className='container grid grid-cols-2 lg:grid-cols-4 justify-between gap-8 lg:gap-16'>
          {ABOUT_STATISTICS.map((stat, index) => (
            <MotionPreset
              fade
              slide={{ direction: 'up' }}
              delay={index * 0.1}
              key={index}
              className='flex flex-col'
            >
              <span className='inline-flex items-center text-4xl'>
                {stat.value}
              </span>
              <Separator className='my-4' />
              <p className='uppercase tracking-wide text-base lg:text-lg'>
                {stat.label}
              </p>
              <p className='text-muted-foreground text-sm lg:text-base mt-6'>
                {stat.description}
              </p>
            </MotionPreset>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className='section-spacing'>
        <div className='container'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:justify-between items-start gap-2.5'>
            {/* Eyebrow */}
            <MotionPreset
              fade
              slide={{ direction: 'left' }}
              delay={0.1}
              className='lg:col-span-1 inline-flex items-center gap-1.5 tracking-widest uppercase text-sm md:text-base'
            >
              <GoDotFill className='text-[#ff6b00]' />
              Our Story
            </MotionPreset>
            <MotionPreset
              fade
              slide={{ direction: 'right' }}
              delay={0.15}
              className='space-y-6 lg:col-span-2'
            >
              <h2 className='text-2xl md:text-4xl  leading-tight font-normal'>
                At {APP_NAME}, we simplify the journey to your next home — where
                modern living meets lasting comfort.
              </h2>
              <p className='text-muted-foreground'>
                Built on trust and guided by integrity, {APP_NAME} was founded
                to redefine how people experience real estate. We believe that a
                home should be more than just a property — it should reflect a
                lifestyle of quality, simplicity, and peace of mind. Through a
                thoughtful and transparent approach, our team ensures that every
                client finds a home that truly fits their needs and aspirations.
              </p>
              <p className='text-muted-foreground'>
                Our commitment goes beyond transactions. We focus on
                craftsmanship, design, and service that stand the test of time —
                values that shape every decision we make. At {APP_NAME}, we
                don&apos;t just sell homes; we create experiences built on
                trust, guided by professionalism, and inspired by modern living.
              </p>
            </MotionPreset>
          </div>
          <MotionPreset
            fade
            slide={{ direction: 'down' }}
            delay={0.2}
            className='flex flex-col md:flex-row gap-3 mt-10 lg:mt-14'
          >
            <Image
              src='/images/about-us/our-story-1.jpg'
              alt='Our Story Image 1'
              width={0}
              height={0}
              sizes='100vw'
              className='flex-1 object-cover max-h-[300px] rounded-xl brightness-90'
            />
            <Image
              src='/images/about-us/our-story-2.jpg'
              alt='Our Story Image 2'
              width={0}
              height={0}
              sizes='100vw'
              className='flex-1 object-cover max-h-[300px] rounded-xl'
            />
          </MotionPreset>
        </div>
      </section>

      {/* Our Purpose Section */}
      <section className='section-spacing'>
        <div className='container flex flex-col gap-8 lg:gap-10'>
          <div className='space-y-2'>
            <MotionPreset fade slide={{ direction: 'left' }} delay={0.3}>
              <SectionEyebrow title='our purpose' />
              <h2 className='section-title lg:!max-w-3xl'>
                Simplifying Real Estate,{' '}
                <span className='italic font-light'>Enriching Lives</span>
              </h2>
            </MotionPreset>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-9 gap-10'>
            {/* Left Column */}
            <MotionPreset
              fade
              slide={{ direction: 'left' }}
              delay={0.2}
              className='xl:col-span-3'
            >
              <Image
                src='/images/about-us/about-our-purpose.jpg'
                alt='Our Purpose'
                width={0}
                height={0}
                sizes='100vw'
                className='w-full object-cover max-lg:max-h-[450px]'
              />
            </MotionPreset>
            {/* Right Column */}
            <div className='flex flex-col items-start xl:col-span-6 xl:pt-4'>
              {OUR_PURPOSE.map((purpose, index) => {
                const Icon = purpose.icon;
                return (
                  <MotionPreset
                    fade
                    slide={{ direction: 'right' }}
                    delay={index * 0.1}
                    key={index}
                  >
                    <div className='flex flex-col gap-6'>
                      {/* Icon */}
                      <span className='size-14 bg-accent flex items-center justify-center'>
                        <Icon className='size-6.5 text-white' />
                      </span>
                      {/* Title & Description */}
                      <div className='flex flex-col gap-1'>
                        <h3 className='text-2xl'>{purpose.title}</h3>
                        <p className='text-muted-foreground'>
                          {purpose.description}
                        </p>
                      </div>
                    </div>
                    {index < OUR_PURPOSE.length - 1 && (
                      <Separator className='my-6 xl:my-8' />
                    )}
                  </MotionPreset>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <FAQ />
    </>
  );
};

export default AboutUsPage;
