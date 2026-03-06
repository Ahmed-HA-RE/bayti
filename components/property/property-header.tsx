import { Property } from '@/lib/generated/prisma/client';
import { MotionPreset } from '../shared/motion-preset';
import { Separator } from '../ui/separator';
import { formatCityName, formatPrice } from '@/lib/utils';

const PropertyHeader = ({ property }: { property: Property }) => {
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
            className='flex flex-col md:flex-row items-start md:items-center justify-between max-md:gap-6'
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
            <span className='flex items-center'>
              <h4 className='capitalize'>
                {formatCityName(property.city)}, UAE
              </h4>
              <span className='mx-3'>-</span>
              {/* Price */}
              <span className='flex items-center gap-1'>
                <p className='dirham-symbol text-base !font-light'>&#xea;</p>
                <p className='text-base'>{formatPrice(property.price)}</p>{' '}
                {property.propertyList === 'RENT' && (
                  <span className='text-sm text-muted-foreground'>/month</span>
                )}
              </span>
            </span>
          </MotionPreset>
        </div>
      </div>
    </section>
  );
};

export default PropertyHeader;
