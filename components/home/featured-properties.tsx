import prisma from '@/lib/prisma';
import { MotionPreset } from '../shared/motion-preset';
import SectionHeader from '../shared/section-header';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedProperties = async () => {
  const featuredProperties = await prisma.property.findMany({
    where: {
      isFeatured: true,
    },
    select: {
      id: true,
      images: true,
      name: true,
      location: true,
      city: true,
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return featuredProperties.length === 0 ? null : (
    <section className='section-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-6'>
          <div className='space-y-4'>
            <MotionPreset fade blur slide={{ direction: 'left' }} delay={0.1}>
              <SectionHeader title='featured properties' />
            </MotionPreset>
            <MotionPreset
              component='h2'
              fade
              blur
              delay={0.2}
              slide={{ direction: 'left' }}
              className='text-3xl md:text-4xl lg:text-5xl lg:max-w-2xl leading-tight'
            >
              Handpicked Homes for Refined Living
            </MotionPreset>
            <MotionPreset
              component='p'
              fade
              blur
              delay={0.3}
              slide={{ direction: 'left' }}
              className='text-muted-foreground max-sm:text-base text-lg max-w-4xl'
            >
              Explore our curated selection of featured properties, showcasing
              the finest homes that epitomize luxury, comfort, and style.
            </MotionPreset>
          </div>
          <MotionPreset
            fade
            blur
            delay={0.4}
            slide={{ direction: 'up' }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className='group'
              >
                <div className='flex flex-col sm:flex-row md:flex-col gap-4 sm:items-center md:items-start'>
                  <div className='relative w-full aspect-[4/3] overflow-hidden rounded-lg flex-1'>
                    <Image
                      src={property.images[0]}
                      alt={property.name}
                      fill
                      className='group-hover:scale-105 transition-transform duration-200 object-cover'
                    />
                  </div>
                  <div className='space-y-2 flex-1'>
                    <h3 className='text-xl'>{property.name}</h3>
                    <p className='text-muted-foreground'>
                      {property.location}, {property.city}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
