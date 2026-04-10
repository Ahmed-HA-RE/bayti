import { Property, PropertyImage } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import PropertyCard from '../shared/property-card';

const RelatedPropertiesSection = ({
  properties,
}: {
  properties: (Property & { propertyImages: Pick<PropertyImage, 'url'>[] })[];
}) => {
  return (
    <section className='pb-14'>
      <div className='container'>
        <h2 className='text-2xl md:text-3xl mb-6'>Related Properties</h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          {properties.map((property, index) => (
            <MotionPreset
              key={property.id}
              fade
              blur
              slide={{ direction: 'left' }}
              delay={index * 0.1 + 0.3}
              className='h-[350px] md:h-[500px] overflow-hidden'
            >
              <PropertyCard property={property} />
            </MotionPreset>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPropertiesSection;
