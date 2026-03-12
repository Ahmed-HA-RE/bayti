import LinkButton from '../shared/link-button';
import { ArrowRightIcon } from 'lucide-react';
import { MotionPreset } from '../shared/motion-preset';
import { Card, CardContent, CardHeader } from '../ui/card';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = async () => {
  const property = await prisma.property.findMany({
    where: {
      isFeatured: false,
      status: 'AVAILABLE',
    },
    take: 1,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      images: true,
      name: true,
    },
  });

  return (
    <section className='bg-[url(/images/hero.jpg)] bg-cover bg-center relative section-top-spacing'>
      <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent z-0' />
      <div className='container min-h-[50vh] lg:min-h-[90vh] flex flex-col justify-between relative z-10'>
        <div className='space-y-10'>
          <MotionPreset
            component='h1'
            slide={{ direction: 'down' }}
            fade
            blur
            delay={0.1}
            className='text-secondary-foreground text-[46px] md:text-6xl lg:text-[80px] max-w-2xl lg:max-w-3xl leading-snug'
          >
            Exceptional Homes for{' '}
            <span className='italic font-serif'>Modern Living</span>
          </MotionPreset>
          <MotionPreset
            slide={{ direction: 'down' }}
            fade
            blur
            delay={0.2}
            className=''
          >
            <LinkButton className='group' href='/properties' variant='default'>
              Explore Properties
              <ArrowRightIcon className='transition-transform duration-200 group-hover:translate-x-1' />
            </LinkButton>
          </MotionPreset>
        </div>
        <div className='flex items-end justify-between gap-4 pb-14 lg:pb-20'>
          <div className='hidden items-center gap-2 text-secondary-foreground md:flex'>
            <span className='text-sm font-medium uppercase tracking-widest'>
              Scroll
            </span>
            <div className='flex flex-col gap-1'>
              <ArrowRightIcon className='size-4 animate-bounce rotate-90' />
            </div>
          </div>

          {property.length > 0 && (
            <MotionPreset
              blur
              fade
              slide={{ direction: 'up' }}
              delay={0.4}
              component='span'
            >
              <Link
                className='group block'
                href={`/property/${property[0].id}`}
              >
                <Card className='w-64 overflow-hidden rounded-xl border-0 bg-white py-1.5 shadow-xl transition-all duration-300 hover:shadow-2xl'>
                  <CardHeader className='px-1.5'>
                    <div className='relative h-32 overflow-hidden rounded-lg'>
                      <Image
                        src={property[0].images[0]}
                        alt={property[0].name}
                        fill
                        sizes='256px'
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    </div>
                  </CardHeader>
                  <CardContent className='space-y-3 px-1.5'>
                    <h3 className='line-clamp-1 text-base font-semibold'>
                      {property[0].name}
                    </h3>
                    <div className='flex items-center gap-2'>
                      <span className='inline-flex items-center justify-center rounded-md border border-border bg-muted/50 p-1.5 transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground'>
                        <ArrowRightIcon className='size-3.5 transition-transform group-hover:translate-x-0.5' />
                      </span>
                      <span className='text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground'>
                        View Details
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </MotionPreset>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
