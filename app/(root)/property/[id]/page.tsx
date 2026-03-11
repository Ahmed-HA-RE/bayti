import PropertyDetailsSection from '@/components/property/property-details-section';
import PropertyGallerySection from '@/components/property/property-gallery-section';
import PropertyHeaderSection from '@/components/property/property-header-section';
import PropertyMapSection from '@/components/property/property-map-section';
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
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <PropertyGallerySection
        galleryImage={{ images: property.images, alt: property.name }}
      />
      <PropertyHeaderSection property={property} />
      <PropertyDetailsSection property={property} />
      <PropertyMapSection
        longitude={property.longitude}
        latitude={property.latitude}
      />
      {relatedProperties.length > 0 && (
        <RelatedPropertiesSection properties={relatedProperties} />
      )}
    </>
  );
};

export default PropertyPage;
