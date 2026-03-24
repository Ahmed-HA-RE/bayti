import PropertyDetails from '@/components/property/property-details';
import PropertyDetailsSection from '@/components/property/property-details';
import PropertyGallery from '@/components/property/property-gallery';
import PropertyHeaderSection from '@/components/property/property-header-section';
import PropertyMap from '@/components/property/property-map';
import RelatedPropertiesSection from '@/components/property/related-properties';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    select: {
      name: true,
      description: true,
    },
  });

  return {
    title: property?.name,
    description: property?.description,
  };
}

const PropertyPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      propertyImages: {
        select: {
          url: true,
        },
      },
      agent: true,
    },
  });

  if (!property) {
    return redirect('/properties');
  }
  const relatedProperties = await prisma.property.findMany({
    where: {
      id: { not: id },
      city: property.city,
      price: {
        gte: property.price,
      },
    },
    include: {
      propertyImages: {
        select: {
          url: true,
        },
        take: 1,
      },
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <PropertyHeaderSection property={property} />
      <section className='container py-14'>
        <PropertyGallery images={property.propertyImages} alt={property.name} />
      </section>
      <section className='container'>
        <PropertyDetails property={property} />
      </section>
      <section className='container pt-14'>
        <PropertyMap
          longitude={property.longitude}
          latitude={property.latitude}
        />
      </section>
      {relatedProperties.length > 0 && (
        <RelatedPropertiesSection properties={relatedProperties} />
      )}
    </>
  );
};

export default PropertyPage;
