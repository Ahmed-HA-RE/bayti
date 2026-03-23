import { Property, PropertyImage } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import PropertyCard from '../shared/property-card';
import { cn } from '@/lib/utils';

const RelatedPropertiesSection = ({
  properties,
}: {
  properties: (Property & { propertyImages: Pick<PropertyImage, 'url'>[] })[];
}) => {
  return (
    <section className='section-spacing'>
      <div className='container'>
        <h2 className='text-2xl md:text-3xl mb-6'>Related Properties</h2>

        <div
          className={cn(
            'grid grid-cols-1 gap-6',
            properties.length > 2
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : 'md:grid-cols-2',
          )}
        >
          {properties.map((property, index) => (
            <MotionPreset
              key={property.id}
              fade
              blur
              slide={{ direction: 'left' }}
              delay={index * 0.1 + 0.3}
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
