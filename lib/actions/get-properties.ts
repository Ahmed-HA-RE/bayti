'use server';

import prisma from '../prisma';
import { Prisma, PropertyList } from '../generated/prisma/client';
import { convertToPlainObject } from '../utils';

export const getProperties = async ({
  search,
  type,
  location,
  price,
  listType,
}: {
  search?: string;
  type?: string;
  location?: string;
  price?: string;
  listType?: PropertyList;
}) => {
  // Search filter
  const searchFilter: Prisma.PropertyWhereInput = search
    ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
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

  const properties = await prisma.property.findMany({
    where: {
      ...searchFilter,
      ...typeFilter,
      ...locationFilter,
      ...priceFilter,
      ...listTypeFilter,
      isAvailable: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return convertToPlainObject(properties);
};
