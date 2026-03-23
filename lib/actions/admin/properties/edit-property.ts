'use server';

import { RemovedImage } from '@/components/admin/properties/form/property-form';
import { auth } from '@/lib/auth';
import { PropertyList } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { PropertyFormData, propertySchema } from '@/schema/property';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const editProperty = async (
  data: PropertyFormData,
  removedImages: RemovedImage[],
  id: string,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    const validatedData = propertySchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid property data');

    // Check if the property exists
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) throw new Error('Property not found');

    if (removedImages.length > 0) {
      const keys = removedImages.map((img) => img.key);
      const utapi = new UTApi();
      await utapi.deleteFiles(keys);
      await prisma.propertyImage.deleteMany({
        where: {
          key: { in: keys },
        },
      });
    }

    const {
      name,
      address,
      city,
      description,
      latitude,
      longitude,
      price,
      area,
      bedrooms,
      bathrooms,
      isFeatured,
      propertyList,
      propertyType,
      amenities,
      propertyImages,
      agentId,
    } = validatedData.data;

    await prisma.property.update({
      where: { id },
      data: {
        name,
        address,
        city,
        description,
        latitude,
        longitude,
        price,
        area,
        bedrooms,
        bathrooms,
        isFeatured,
        propertyList: propertyList as PropertyList,
        propertyType,
        amenities,
        agentId,
        propertyImages: {
          upsert: propertyImages.map((img) => ({
            where: { key: img.key },
            update: {
              url: img.url,
            },
            create: {
              url: img.url,
              key: img.key,
            },
          })),
        },
      },
    });

    return {
      success: true,
      message: 'Property updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
