import { Property } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { capitalizeFirstLetter, formatCityName } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { LiaBedSolid } from 'react-icons/lia';
import { LuBath } from 'react-icons/lu';
import { TbRulerMeasure } from 'react-icons/tb';
import { Separator } from '../ui/separator';
import { FaKey } from 'react-icons/fa';
import { RiPriceTag3Fill } from 'react-icons/ri';

const PropertyCard = ({ property }: { property: Property }) => {
  const beds = property.bedrooms === 1 ? '1 Bed' : `${property.bedrooms} Beds`;
  const baths =
    property.bathrooms === 1 ? '1 Bath' : `${property.bathrooms} Baths`;

  return (
    <Link href={`/property/${property.id}`} className='group'>
      <Card className='border-0 gap-5'>
        <CardHeader className='px-0'>
          <div className='relative aspect-[3/2] w-full rounded-4xl overflow-hidden'>
            <Image
              src={property.images[0].url}
              alt={property.name}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
            />
            {/* Property List Badge */}
            <Badge className='absolute top-4 left-4 text-base px-3 py-1'>
              {property.propertyList === 'RENT' ? (
                <FaKey data-icon='inline-start' />
              ) : (
                <RiPriceTag3Fill data-icon='inline-start' />
              )}
              For{' '}
              {capitalizeFirstLetter(property.propertyList.toLocaleLowerCase())}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='px-0 flex flex-col gap-2'>
          <h3 className='text-2xl font-medium'>{property.name}</h3>
          <div className='flex items-center gap-2 text-base text-muted-foreground capitalize'>
            <FaMapMarkerAlt className='size-5 text-black ' />
            {property.address}, {formatCityName(property.city)}
          </div>
          <Separator className='my-2 bg-gray-200' />
          <div className='flex items-center gap-6 text-base text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <LiaBedSolid className='size-6' />
              {beds}
            </div>
            <div className='flex items-center gap-2'>
              <LuBath className='size-6' />
              {baths}
            </div>
            <div className='flex items-center gap-2'>
              <TbRulerMeasure className='size-6' />
              {property.area} sqft
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
