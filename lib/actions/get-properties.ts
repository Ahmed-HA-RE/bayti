'use server';

import prisma from '../prisma';
import { PropertyList, PropertyStatus } from '../generated/prisma/client';
import { convertToPlainObject } from '../utils';
import { Prisma } from '../generated/prisma/client';

export const getProperties = async (
  {
    search,
    type,
    location,
    price,
    listType,
    status,
    page = 1,
    limit = 6,
  }: {
    search?: string;
    type?: string;
    location?: string;
    price?: string;
    listType?: PropertyList;
    page?: number;
    status?: PropertyStatus;
    limit?: number;
    adminTable?: boolean;
  },
  adminTable: boolean = false,
) => {
  // Search filter
  const searchFilter: Prisma.PropertyWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } },
          { city: { contains: search, mode: 'insensitive' } },
        ],
      }
    : {};

  // Type filter
  const typeFilter: Prisma.PropertyWhereInput = type
    ? { propertyType: type }
    : {};

  // Location filter
  const locationFilter: Prisma.PropertyWhereInput = location
    ? { city: location }
    : {};

  // Price filter
  const priceFilter: Prisma.PropertyWhereInput =
    price && price.includes('-')
      ? {
          price: {
            lte: Number(price.split('-')[1]),
            gte: Number(price.split('-')[0]),
          },
        }
      : price && !price.includes('-')
        ? {
            price: {
              gte: Number(price),
            },
          }
        : {};

  // List Type filter
  const listTypeFilter: Prisma.PropertyWhereInput = listType
    ? { propertyList: listType }
    : {};

  // Status filter
  const statusFilter: Prisma.PropertyWhereInput = status
    ? { status }
    : { status: adminTable ? Prisma.skip : 'AVAILABLE' };

  const properties = await prisma.property.findMany({
    where: {
      ...searchFilter,
      ...typeFilter,
      ...locationFilter,
      ...priceFilter,
      ...listTypeFilter,
      ...statusFilter,
    },
    include: {
      agent: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      propertyImages: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const totalCount = await prisma.property.count({
    where: {
      ...searchFilter,
      ...typeFilter,
      ...locationFilter,
      ...priceFilter,
      ...listTypeFilter,
      ...statusFilter,
    },
  });

  const totalPages = Math.ceil(totalCount / limit);

  return convertToPlainObject({
    properties,
    totalPages,
  });
};
