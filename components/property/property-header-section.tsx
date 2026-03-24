import { Property } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import { Separator } from '../ui/separator';
import { formatPrice } from '@/lib/utils';
import { PiMapPinFill } from 'react-icons/pi';

const PropertyHeaderSection = ({ property }: { property: Property }) => {
  return (
    <section className='section-top-spacing'>
      <div className='container'>
        <div className='flex flex-col gap-4'>
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
            slide={{ direction: 'left' }}
            delay={0.2}
            className='flex flex-col lg:flex-row gap-6 justify-between items-start'
          >
            {/* Left — stats + address */}
            <div className='flex flex-col gap-4'>
              <div className='flex items-center'>
                {/* Area */}
                <div className='flex flex-col gap-1'>
                  <h4 className='text-lg'>Area</h4>
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

              {/* Address */}
              <div className='flex items-center gap-2 text-muted-foreground'>
                <PiMapPinFill className='size-4 text-accent' />
                <span className='text-sm'>{property.address}</span>
              </div>
            </div>

            {/* Right — price */}
            <div className='flex flex-col items-start lg:items-end gap-1.5 lg:self-end'>
              <span className='text-xs uppercase tracking-widest text-muted-foreground font-medium'>
                {property.propertyList === 'RENT'
                  ? 'Monthly Rent'
                  : 'Sale Price'}
              </span>
              <div className='flex items-baseline gap-1.5'>
                <span className='dirham-symbol text-4xl font-bold leading-none'>
                  &#xea;
                </span>
                <span className='text-4xl font-bold tracking-tight'>
                  {formatPrice(property.price)}
                </span>
                {property.propertyList === 'RENT' && (
                  <span className='text-base text-muted-foreground mb-0.5'>
                    / mo
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
