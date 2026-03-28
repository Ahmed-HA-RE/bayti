import prisma from '@/lib/prisma';
import { MotionPreset } from '../shared/motion-preset';
import Image from 'next/image';
import Link from 'next/link';
import SectionEyebrow from '../shared/section-eyebrow';

const FeaturedProperties = async () => {
  const featuredProperties = await prisma.property.findMany({
    where: {
      isFeatured: true,
      status: 'AVAILABLE',
    },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      propertyImages: {
        select: {
          url: true,
        },
        take: 1,
      },
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return featuredProperties.length === 0 ? null : (
    <section className='section-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-10'>
          <div className='space-y-4 text-center md:text-left'>
            <MotionPreset fade blur slide={{ direction: 'left' }} delay={0.1}>
              <SectionEyebrow title='featured properties' />
            </MotionPreset>
            <MotionPreset
              component='h2'
              fade
              blur
              delay={0.2}
              slide={{ direction: 'left' }}
              className='section-title'
            >
              Handpicked Homes for Refined Living
            </MotionPreset>
            <MotionPreset
              component='p'
              fade
              blur
              delay={0.3}
              slide={{ direction: 'left' }}
              className='section-subtitle'
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
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
          >
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                href={`/properties/${property.id}`}
                className='group'
              >
                <div className='flex flex-col sm:flex-row md:flex-col gap-4 sm:items-center md:items-start'>
                  <div className='relative w-full aspect-[3/2] overflow-hidden rounded-lg flex-1'>
                    <Image
                      src={property.propertyImages[0].url}
                      alt={property.name}
                      fill
                      className='group-hover:scale-105 transition-transform duration-200 object-cover'
                    />
                  </div>
                  <div className='space-y-2 flex-1'>
                    <h3 className='text-xl'>{property.name}</h3>
                    <p className='text-muted-foreground'>
                      {property.address}, {property.city}
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
