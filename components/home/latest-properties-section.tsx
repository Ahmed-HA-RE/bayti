import prisma from '@/lib/prisma';
import { MotionPreset } from '../shared/motion-preset';
import PropertyCard from '../shared/property-card';
import SectionEyebrow from '../shared/section-eyebrow';
import SecondaryLinkButton from '../shared/secondary-link-button';

const LatestPropertiesSection = async () => {
  const latestProperties = await prisma.property.findMany({
    where: {
      isFeatured: false,
      status: 'AVAILABLE',
    },
    include: {
      propertyImages: {
        select: {
          url: true,
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 2,
  });

  return latestProperties.length === 0 ? null : (
    <section className='section-spacing'>
      <div className='container'>
        <MotionPreset
          fade
          blur
          slide={{ direction: 'down' }}
          className='flex flex-col gap-4 items-center md:items-start mb-10'
        >
          <SectionEyebrow title='explore' />
          <h2 className='section-title'>Our Latest Properties</h2>
          <p className='section-subtitle'>
            Discover the newest additions to our property listings.
          </p>
        </MotionPreset>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {latestProperties.map((property, index) => (
            <MotionPreset
              fade
              blur
              slide={{ direction: 'up' }}
              delay={index * 0.2 + 0.2}
              key={property.id}
              className='h-[350px] md:h-[500px] overflow-hidden'
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
          <SecondaryLinkButton
            text='View More'
            href='/properties'
            className='w-full md:w-auto'
          />
        </MotionPreset>
      </div>
    </section>
  );
};

export default LatestPropertiesSection;
