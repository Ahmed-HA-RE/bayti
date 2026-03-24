import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@/lib/generated/prisma';
import { formatPrice } from '@/lib/utils';
import { LiaBedSolid } from 'react-icons/lia';
import { LuBath, LuMapPin } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';

const PropertyDetailsCard = ({ property }: { property: Property }) => {
  const statusStyles = {
    AVAILABLE: 'bg-green-50 text-green-700 border-green-200',
    SOLD: 'bg-red-50 text-red-700 border-red-200',
    RENTED: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-base font-semibold'>
          Property Details
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3 text-sm divide-y'>
        <div className='flex items-center justify-between pb-2'>
          <span className='text-muted-foreground'>Price</span>
          <span className='font-semibold'>
            <span className='dirham-symbol text-base'>&#xea;</span>{' '}
            {formatPrice(property.price)}
            {property.propertyList === 'RENT' && (
              <span className='text-muted-foreground font-normal'> / mo</span>
            )}
          </span>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Type</span>
          <span className='capitalize'>
            {property.propertyType.split('_').join(' ')}
          </span>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Area</span>
          <div className='flex items-center gap-1.5'>
            <TbRulerMeasure className='size-4' />
            <span>{property.area.toLocaleString()} sqft</span>
          </div>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Bedrooms</span>
          <div className='flex items-center gap-1.5'>
            <LiaBedSolid className='size-4' />
            <span>{property.bedrooms}</span>
          </div>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Bathrooms</span>
          <div className='flex items-center gap-1.5'>
            <LuBath className='size-4' />
            <span>{property.bathrooms}</span>
          </div>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>City</span>
          <div className='flex items-center gap-1.5'>
            <LuMapPin className='size-4' />
            <span className='capitalize'>{property.city}</span>
          </div>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Status</span>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusStyles[property.status]} capitalize`}
          >
            {property.status.toLowerCase()}
          </span>
        </div>
        <div className='flex items-center justify-between pb-2.5'>
          <span className='text-muted-foreground'>Featured</span>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
              property.isFeatured
                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                : 'bg-muted text-muted-foreground border-border'
            }`}
          >
            {property.isFeatured ? 'Yes' : 'No'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyDetailsCard;
