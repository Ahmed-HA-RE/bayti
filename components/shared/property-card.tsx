import { Property, PropertyImage } from '@/lib/generated/prisma/client';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';
import { LiaBedSolid } from 'react-icons/lia';
import { LuBath, LuMapPin } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';
import { CSSProperties } from 'react';

type PropertyCardProps = {
  property: Pick<
    Property,
    | 'id'
    | 'name'
    | 'address'
    | 'bedrooms'
    | 'bathrooms'
    | 'area'
    | 'propertyList'
    | 'price'
  > & { propertyImages: Pick<PropertyImage, 'url'>[] };
  isAgentListing?: boolean;
};

const PropertyCard = ({ property, isAgentListing }: PropertyCardProps) => {
  const styles: CSSProperties = {
    backgroundImage: `url(${property.propertyImages[0]?.url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const href = isAgentListing
    ? `/admin/property/${property.id}/view`
    : `/property/${property.id}`;

  const beds = property.bedrooms === 1 ? '1 Bed' : `${property.bedrooms} Beds`;
  const baths =
    property.bathrooms === 1 ? '1 Bath' : `${property.bathrooms} Baths`;

  return (
    <Link href={href} className='group size-full'>
      <Card
        className='border-0 h-full rounded-none group-hover:scale-[1.03] transition-transform duration-500 relative'
        style={styles}
      >
        <CardContent className='absolute bottom-6 left-4 md:left-6 flex flex-col gap-2.5 z-10 p-0 w-full'>
          {/* Property Specs */}
          <div className='backdrop-blur-md w-full max-w-[300px] px-5 py-3 bg-black/40 border border-white/10 flex items-center justify-between text-white'>
            <div className='flex items-center gap-1.5'>
              <LiaBedSolid className='size-4 opacity-70' />
              <span className='text-sm font-medium'>{beds}</span>
            </div>
            <div className='w-px h-4 bg-white/20' />
            <div className='flex items-center gap-1.5'>
              <LuBath className='size-4 opacity-70' />
              <span className='text-sm font-medium'>{baths}</span>
            </div>
            <div className='w-px h-4 bg-white/20' />
            <div className='flex items-center gap-1.5'>
              <TbRulerMeasure className='size-4 opacity-70' />
              <span className='text-sm font-medium'>{property.area} sqft</span>
            </div>
          </div>
          {/* Property Details */}
          <div className='backdrop-blur-md w-full max-w-xs md:max-w-sm bg-black/40 border border-white/10 text-white overflow-hidden'>
            <div className='flex items-stretch'>
              <span className='flex-1 text-sm font-semibold leading-snug px-5 py-3.5 flex items-center'>
                {property.name}
              </span>
              <div className='border-l border-white/10 bg-white/10 flex flex-col items-center justify-center px-4 py-3 shrink-0'>
                <span className='text-[9px] uppercase tracking-widest text-white/50 leading-none mb-1'>
                  Price
                </span>
                <span className='flex items-center gap-1'>
                  <span className='dirham-symbol'>&#xea;</span>
                  <span className='text-sm font-bold whitespace-nowrap'>
                    {formatPrice(property.price)}{' '}
                    {property.propertyList === 'RENT' ? '/mo' : ''}
                  </span>
                </span>
              </div>
            </div>
            <div className='border-t border-white/10 px-5 py-2.5 flex items-center gap-2'>
              <LuMapPin className='size-3.5 shrink-0 text-accent' />
              <span className='text-xs text-white/60 truncate'>
                {property.address}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
