'use server';

import { headers } from 'next/headers';
import { auth } from '../auth';
import prisma from '../prisma';

export const toggleFavoriteProperty = async (propertyId: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: 'Unauthorized to toggle favorite property',
        isFavorite: false,
      };
    }

    if (session.user.role !== 'USER') {
      return {
        success: false,
        message: 'Only users can toggle favorite properties',
        isFavorite: false,
      };
    }

    // Check if the property exists and already in user's favorites
    const isFavorite = await prisma.favoriteProperty.findUnique({
      where: {
        favorite_user_property: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (isFavorite) {
      await prisma.favoriteProperty.delete({
        where: {
          favorite_user_property: { userId: session.user.id, propertyId },
        },
      });
      return {
        success: true,
        message: 'Property removed from favorites',
        isFavorite: false,
      };
    } else {
      await prisma.favoriteProperty.create({
        data: {
          userId: session.user.id,
          propertyId,
        },
      });
      return {
        success: true,
        message: 'Property added to favorites',
        isFavorite: true,
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: 'Something went wrong',
      isFavorite: false,
    };
  }
};
