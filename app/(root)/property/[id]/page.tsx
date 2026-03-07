import PropertyDetailsSection from '@/components/property/property-details-section';
import PropertyGallerySection from '@/components/property/property-gallery-section';
import PropertyHeaderSection from '@/components/property/property-header-section';
import prisma from '@/lib/prisma';
import { convertToPlainObject } from '@/lib/utils';
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

  const relatedProperties = await prisma.property.findMany({
    where: {
      id: { not: id },
      city: property?.city,
      price: {
        gte: property?.price,
      },
    },
    take: 3,
  });

  if (!property) {
    return redirect('/properties');
  }

  return (
    <>
      <PropertyHeaderSection property={property} />
      <PropertyGallerySection
        galleryImage={{ images: property.images, alt: property.name }}
      />
      <PropertyDetailsSection property={convertToPlainObject(property)} />
    </>
  );
};

export default PropertyPage;
