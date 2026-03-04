import prisma from '@/lib/prisma';
import { MotionPreset } from '../shared/motion-preset';
import PropertyCard from '../shared/property-card';
import { ArrowRightIcon } from 'lucide-react';
import LinkButton from '../shared/link-button';
import SectionEyebrow from '../shared/section-eyebrow';

const LatestPropertiesSection = async () => {
  const latestProperties = await prisma.property.findMany({
    where: {
      isFeatured: false,
      isAvailable: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 3,
  });

  return latestProperties.length === 0 ? null : (
    <section className='section-spacing'>
      <div className='container'>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down' }}
          className='space-y-4 mb-10 text-center md:text-left'
        >
          <SectionEyebrow title='explore' />
          <h2 className='section-title'>Our Latest Properties</h2>
        </MotionPreset>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14'>
          {latestProperties.map((property, index) => (
            <MotionPreset
              fade
              blur
              slide={{ direction: 'up' }}
              delay={index * 0.2 + 0.2}
              key={property.id}
            >
              <PropertyCard property={property} />
            </MotionPreset>
          ))}
        </div>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'up' }}
          delay={0.5}
          className='flex sm:justify-end sm:items-end mt-8'
        >
          <LinkButton
            href='/properties'
            className='group max-sm:w-full'
            variant='default'
            size='lg'
          >
            View All Properties
            <ArrowRightIcon className='text-white group-hover:translate-x-2 transition-transform duration-200 size-5' />
          </LinkButton>
        </MotionPreset>
      </div>
    </section>
  );
};

export default LatestPropertiesSection;
