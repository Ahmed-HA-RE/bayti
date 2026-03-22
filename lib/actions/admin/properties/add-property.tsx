'use server';

import { auth } from '@/lib/auth';
import { PropertyList } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { PropertyFormData, propertySchema } from '@/schema/property';
import { headers } from 'next/headers';

export const addProperty = async (data: PropertyFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    const validatedData = propertySchema.safeParse(data);

    if (!validatedData.success)
      throw new Error(
        'One or more fields are invalid. Please check your input.',
      );

    const {
      name,
      address,
      agentId,
      amenities,
      area,
      bathrooms,
      bedrooms,
      city,
      description,
      images,
      latitude,
      longitude,
      price,
      propertyList,
      propertyType,
      isFeatured,
    } = validatedData.data;

    console.log(agentId);

    // Fetch the assigned agent to ensure they exist and have the correct role
    const assignedAgent = await prisma.agent.findUnique({
      where: { id: agentId },
    });

    if (!assignedAgent) throw new Error('Agent not found');

    await prisma.property.create({
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
        images,
        agentId,
      },
    });

    return {
      success: true,
      message: 'Property added successfully.',
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
