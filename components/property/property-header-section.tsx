import { Property } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import { Separator } from '../ui/separator';
import { formatCityName, formatPrice } from '@/lib/utils';
import { LuMapPinHouse } from 'react-icons/lu';

const PropertyHeaderSection = ({ property }: { property: Property }) => {
  return (
    <section className='section-header-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-8'>
          <MotionPreset
            component='h1'
            fade
            blur
            slide={{ direction: 'left' }}
            delay={0.1}
            className='text-4xl md:text-5xl'
          >
            {property.name}
          </MotionPreset>
          <MotionPreset
            fade
            blur
            slide={{ direction: 'up' }}
            delay={0.2}
            className='flex flex-col lg:flex-row items-start lg:items-center justify-between max-lg:gap-6'
          >
            {/* Left side */}
            <div className='flex items-center'>
              {/* Area */}
              <div className='flex flex-col gap-1'>
                <h4 className='text-lg '>Area</h4>
                <span className='text-sm text-muted-foreground'>
                  {property.area} sq Ft.
                </span>
              </div>
              <Separator orientation='vertical' className='mx-8' />
              {/* Bedrooms */}
              <div className='flex flex-col gap-1'>
                <h4 className='text-lg'>Bedrooms</h4>
                <span className='text-sm text-muted-foreground'>
                  {property.bedrooms}{' '}
                  {property.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </span>
              </div>
              <Separator orientation='vertical' className='mx-8' />
              {/* Bathrooms */}
              <div className='flex flex-col gap-1'>
                <h4 className='text-lg'>Bathrooms</h4>
                <span className='text-sm text-muted-foreground'>
                  {property.bathrooms}{' '}
                  {property.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                </span>
              </div>
            </div>

            {/* Right side  */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <LuMapPinHouse className='size-4' />
                <span>
                  {property.address}, {formatCityName(property.city)}, UAE
                </span>
              </div>
              <div className='flex items-center gap-1.5'>
                <span className='dirham-symbol text-2xl text-foreground'>
                  &#xea;
                </span>
                <span className='text-2xl font-bold tracking-tight'>
                  {formatPrice(property.price)}
                </span>
                {property.propertyList === 'RENT' && (
                  <span className='text-sm font-medium text-muted-foreground'>
                    /month
                  </span>
                )}
              </div>
            </div>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderSection;
