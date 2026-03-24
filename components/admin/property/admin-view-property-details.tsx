import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AMENITIES } from '@/lib/constants';
import {
  ArrowLeftIcon,
  PencilIcon,
  ClipboardListIcon,
  ExternalLink,
} from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '../../ui/button';
import PropertyAssignedAgentCard from './property-assign-agent-card';
import PropertyDetailsCard from './property-details-card';
import PropertyGallery from '@/components/property/property-gallery';

const AdminViewPropertyDetails = async ({ id }: { id: string }) => {
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      agent: true,
      propertyImages: {
        select: {
          url: true,
        },
      },
      _count: {
        select: {
          bookings: true,
        },
      },
    },
  });

  if (!property) {
    return redirect('/admin/properties');
  }

  const amenitiesList = AMENITIES.filter((amenity) =>
    property.amenities.includes(amenity.name),
  );

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-col gap-1.5'>
          <Link
            href='/admin/properties'
            className='inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit'
          >
            <ArrowLeftIcon className='size-3.5' />
            Back to Properties
          </Link>
          <h1 className='text-2xl font-bold'>{property.name}</h1>
          <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
            <FaMapMarkerAlt className='size-4 text-accent' />
            {property.address}
          </div>
        </div>

        <Button asChild size={'sm'}>
          <Link href={`/admin/property/${property.id}/edit`}>
            <PencilIcon className='size-4' />
            Edit Property
          </Link>
        </Button>
      </div>

      {/* Body */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
        {/* LEFT — Gallery + Description + Amenities */}
        <div className='xl:col-span-2 space-y-6'>
          {/* Image Gallery */}
          {property.propertyImages.length > 0 && (
            <PropertyGallery
              images={property.propertyImages}
              alt={property.name}
            />
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className='text-base font-semibold'>
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-muted-foreground leading-tight'>
                {property.description}
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          {amenitiesList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className='text-base font-semibold'>
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
                  {amenitiesList.map((amenity, i) => (
                    <div key={i} className='flex items-center gap-2.5'>
                      <amenity.icon className='size-5 shrink-0' />
                      <span className='text-sm'>{amenity.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT — Property Details + Agent + Bookings */}
        <div className='space-y-4'>
          {/* Property Details */}
          <PropertyDetailsCard property={property} />

          {/* Assigned Agent */}
          <PropertyAssignedAgentCard property={property} />

          {/* Bookings */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-0'>
              <CardTitle className='text-base flex items-center gap-2'>
                <ClipboardListIcon className='size-4' />
                Bookings
              </CardTitle>
              <Link
                href='/admin/bookings'
                className='inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border rounded-md px-2.5 py-1.5 transition-colors'
              >
                View All
                <ExternalLink className='size-3' />
              </Link>
            </CardHeader>
            <Separator className='mb-2' />
            <CardContent>
              <div className='flex items-baseline gap-2'>
                <span className='text-3xl font-bold'>
                  {property._count.bookings.toLocaleString()}
                </span>
                <span className='text-sm text-muted-foreground'>
                  Total Booking{property._count.bookings !== 1 ? 's' : ''}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminViewPropertyDetails;
