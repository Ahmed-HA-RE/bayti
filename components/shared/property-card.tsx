import { Property } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { capitalizeFirstLetter, formatPrice } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { LuMapPinHouse } from 'react-icons/lu';
import { LiaBedSolid } from 'react-icons/lia';
import { LuBath } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';

const PropertyCard = ({ property }: { property: Property }) => {
  const beds = property.bedrooms === 1 ? '1 Bed' : `${property.bedrooms} Beds`;
  const baths =
    property.bathrooms === 1 ? '1 Bath' : `${property.bathrooms} Baths`;

  return (
    <Link href={`/properties/${property.id}`} className='group'>
      <Card className='gap-5 px-5'>
        <CardHeader className='px-0'>
          <div className='w-full relative aspect-[3/2] rounded-2xl overflow-hidden'>
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300'
            />
            <Badge className='absolute top-4 right-4 bg-[#ff6b00] text-white'>
              For{' '}
              {capitalizeFirstLetter(property.propertyList.toLocaleLowerCase())}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='px-0 flex flex-col gap-4'>
          <span className='dirham-symbol text-2xl !font-normal'>
            &#xea; {formatPrice(property.price)}{' '}
            {property.propertyList === 'RENT' && (
              <span className='text-sm text-muted-foreground'>/ month</span>
            )}
          </span>
          <h2 className='text-3xl font-medium'>{property.name}</h2>
          <p className='flex items-center gap-2 text-muted-foreground text-lg'>
            <LuMapPinHouse className='size-5' /> {property.location},{' '}
            {property.city}
          </p>
        </CardContent>
        <CardFooter className='px-0 flex justify-between items-center text-slate-700'>
          {/* Beds */}
          <span className='flex items-center gap-2 text-lg'>
            <LiaBedSolid className='size-6' /> {beds}
          </span>
          {/* Baths */}
          <span className='flex items-center gap-2 text-lg'>
            <LuBath className='size-6' /> {baths}
          </span>
          {/* Area */}
          <span className='flex items-center gap-2 text-lg'>
            <TbRulerMeasure className='size-6' /> {property.area} sqft
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
