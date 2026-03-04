import { Avatar } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { MotionPreset } from '@/components/shared/motion-preset';
import { APP_NAME, TESTIMONIALS } from '@/lib/constants';
import Image from 'next/image';
import { FaSquareFacebook, FaSquareThreads } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import React, { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';
import SectionEyebrow from '../shared/section-eyebrow';

const SocialIcons = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'instagram':
      return (
        <Image
          src={`/svg/${icon}-logo.svg`}
          alt={icon}
          width={22}
          height={22}
          className='rounded-sm'
        />
      );
    case 'threads':
      return <FaSquareThreads className='size-6' />;
    case 'facebook':
      return <FaSquareFacebook className='size-6 text-blue-400' />;
    case 'linkedin':
      return <FaLinkedin className='size-6 text-blue-600' />;
  }
};

const TestimonialsSection = () => {
  return (
    <section className='bg-[url(/images/testimonials-bg.jpg)] bg-cover bg-center relative overflow-hidden section-spacing '>
      <div className='absolute inset-0 bg-black/30 z-0' />
      <div className='container flex flex-col gap-12 md:gap-16 lg:gap-18 z-2'>
        {/* Header Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 justify-between items-start'>
          <MotionPreset
            fade
            blur
            delay={0.1}
            slide={{ direction: 'down', offset: 50 }}
            transition={{ duration: 0.5 }}
            className='lg:col-span-1 text-white'
          >
            <SectionEyebrow title='client stories' />
          </MotionPreset>
          <div className='space-y-4 lg:col-span-2 w-full'>
            <MotionPreset
              component='h2'
              fade
              blur
              delay={0.2}
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.5 }}
              className='section-title capitalize lg:!max-w-4xl text-white'
            >
              trusted by homeowners who value quality & care
            </MotionPreset>
            <MotionPreset
              component='p'
              className='section-subtitle !text-white/75'
              fade
              blur
              delay={0.3}
              slide={{ direction: 'down', offset: 50 }}
              transition={{ duration: 0.5 }}
            >
              Every {APP_NAME} client receives professional guidance and genuine
              care — here&apos;s what they say about finding their home with us.
            </MotionPreset>
          </div>
        </div>

        {/* Reviews */}
        <MotionPreset
          fade
          blur
          delay={0.4}
          slide={{ direction: 'down', offset: 50 }}
          transition={{ duration: 0.5 }}
          className='relative grid sm:grid-cols-2 lg:grid-cols-3'
        >
          {/* First Column */}
          <Marquee
            vertical
            pauseOnHover
            delay={0.5}
            duration={50}
            gap={2}
            className='h-225'
          >
            {TESTIMONIALS.Row_1.map((testimonial, index) => (
              <React.Fragment key={index}>
                {testimonial.type === 'primary' ? (
                  <div
                    className='text-card-foreground relative h-125 overflow-hidden rounded-xl bg-cover bg-bottom bg-no-repeat'
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  >
                    {/* Dark Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15' />
                    <div className='from-card absolute inset-x-0 bottom-0 flex h-2/6 flex-col justify-between gap-2 bg-gradient-to-t from-55% to-transparent px-6 pb-6'>
                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />

                      <p>{testimonial.feedback}</p>
                      <span className='text-muted-foreground'>
                        @{testimonial.username}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Card className='gap-4 shadow-none'>
                    <div className='flex items-center justify-between px-6'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='size-12'>
                            <Suspense
                              fallback={
                                <Skeleton className='w-10 rounded-full' />
                              }
                            >
                              <Image
                                width={150}
                                height={150}
                                src={testimonial.image}
                                alt='profile picture'
                                className='rounded-full object-cover'
                              />
                            </Suspense>
                          </Avatar>
                          <div className='space-y-0.5'>
                            <h4 className='font-semibold'>
                              {testimonial.name}
                            </h4>
                            <p className='text-muted-foreground'>
                              @{testimonial.username}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />
                    </div>
                    <CardContent>
                      <p>{testimonial.feedback}</p>
                    </CardContent>
                  </Card>
                )}
              </React.Fragment>
            ))}
          </Marquee>

          {/* Second Column */}
          <Marquee
            vertical
            pauseOnHover
            delay={0.5}
            duration={50}
            gap={2}
            reverse
            className='h-225 max-sm:hidden'
          >
            {TESTIMONIALS.Row_2.map((testimonial, index) => (
              <React.Fragment key={index}>
                {testimonial.type === 'primary' ? (
                  <div
                    className='text-card-foreground relative h-125 overflow-hidden rounded-xl bg-cover bg-clip-content bg-bottom bg-no-repeat'
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  >
                    {/* Dark Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15' />
                    <div className='from-card absolute inset-x-0 bottom-0 flex h-2/6 flex-col justify-between gap-2 bg-gradient-to-t from-55% to-transparent px-6 pb-6'>
                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />

                      <p>{testimonial.feedback}</p>
                      <span className='text-muted-foreground'>
                        @{testimonial.username}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Card className='gap-4 shadow-none'>
                    <div className='flex items-center justify-between px-6'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='size-12'>
                            <Suspense
                              fallback={
                                <Skeleton className='w-10 rounded-full' />
                              }
                            >
                              <Image
                                width={150}
                                height={150}
                                src={testimonial.image}
                                alt='profile picture'
                                className='rounded-full object-cover'
                              />
                            </Suspense>
                          </Avatar>
                          <div className='space-y-0.5'>
                            <h4 className='font-semibold'>
                              {testimonial.name}
                            </h4>
                            <p className='text-muted-foreground'>
                              @{testimonial.username}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />
                    </div>
                    <CardContent>
                      <p>{testimonial.feedback}</p>
                    </CardContent>
                  </Card>
                )}
              </React.Fragment>
            ))}
          </Marquee>

          {/* Third Column */}
          <Marquee
            vertical
            pauseOnHover
            delay={0.9}
            duration={70}
            gap={2}
            className='h-225 max-lg:hidden'
          >
            {TESTIMONIALS.Row_3.map((testimonial, index) => (
              <React.Fragment key={index}>
                {testimonial.type === 'primary' ? (
                  <div
                    className='text-card-foreground relative h-125 overflow-hidden rounded-xl  bg-cover bg-clip-content bg-bottom bg-no-repeat'
                    style={{ backgroundImage: `url(${testimonial.image})` }}
                  >
                    {/* Dark Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15' />
                    <div className='from-card absolute inset-x-0 bottom-0 flex h-2/6 flex-col justify-between gap-2 bg-gradient-to-t from-55% to-transparent px-6 pb-6'>
                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />

                      <p>{testimonial.feedback}</p>
                      <span className='text-muted-foreground'>
                        @{testimonial.username}
                      </span>
                    </div>
                  </div>
                ) : (
                  <Card className='gap-4 shadow-none'>
                    <div className='flex items-center justify-between px-6'>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='size-12'>
                            <Suspense
                              fallback={
                                <Skeleton className='w-10 rounded-full' />
                              }
                            >
                              <Image
                                width={150}
                                height={150}
                                src={testimonial.image}
                                alt='profile picture'
                                className='rounded-full object-cover'
                              />
                            </Suspense>
                          </Avatar>
                          <div className='space-y-0.5'>
                            <h4 className='font-semibold'>
                              {testimonial.name}
                            </h4>
                            <p className='text-muted-foreground'>
                              @{testimonial.username}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social Icons */}
                      <SocialIcons icon={testimonial.social} />
                    </div>
                    <CardContent>
                      <p>{testimonial.feedback}</p>
                    </CardContent>
                  </Card>
                )}
              </React.Fragment>
            ))}
          </Marquee>
        </MotionPreset>
      </div>
    </section>
  );
};

export default TestimonialsSection;
