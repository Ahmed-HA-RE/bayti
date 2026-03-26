'use server';

import prisma from '../prisma';

export const getAgentProperties = async (
  agentId: string,
  page: number,
  limit: number = 12,
) => {
  const properties = await prisma.property.findMany({
    where: { agentId },
    select: {
      id: true,
      name: true,
      price: true,
      propertyImages: {
        select: {
          url: true,
        },
        take: 1,
      },
      propertyList: true,
      bathrooms: true,
      bedrooms: true,
      area: true,
      address: true,
    },
    take: limit,
    skip: (page - 1) * limit,
    orderBy: { createdAt: 'desc' },
  });

  const totalProperties = await prisma.property.count({
    where: { agentId },
  });
  const totalPages = Math.ceil(totalProperties / limit);

  return { properties, totalPages };
};
