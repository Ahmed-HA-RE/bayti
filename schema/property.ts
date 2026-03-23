import { z } from 'zod';
import { z_enumFromArray } from './agent';
import {
  AMENITIES,
  CITIES,
  PROPERTY_LIST_TYPES,
  PROPERTY_TYPES,
} from '@/lib/constants';

const propertyImageSchema = z.object({
  url: z.url({ error: 'Invalid image URL' }),
  key: z.string({ error: 'Invalid image key' }),
});

export const propertySchema = z.object({
  name: z
    .string({ error: 'Property name is required' })
    .min(10, 'Property name must be at least 10 characters long')
    .max(100, 'Property name must be less than 100 characters long')
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      'Property name can only contain letters, numbers, and spaces',
    ),
  description: z
    .string({ error: 'Property description is required' })
    .min(20, 'Property description must be at least 20 characters long')
    .max(1000, 'Property description must be less than 1000 characters long'),
  agentId: z
    .string({ error: 'Assign Agent for this property' })
    .min(1, 'Agent is required'),
  address: z
    .string({ error: 'Property address is required' })
    .min(10, 'Property address must be at least 10 characters long')
    .max(200, 'Property address must be less than 200 characters long'),
  latitude: z.coerce.number<number>().min(-90).max(90),
  longitude: z.coerce.number<number>().min(-180).max(180),
  city: z_enumFromArray(
    CITIES.map((city) => city.value),
    'City is required',
  ),
  price: z.coerce
    .number<number>()
    .positive({ error: 'Price must be a positive number' }),
  area: z.coerce
    .number<number>()
    .positive({ error: 'Area must be a positive number' }),
  bedrooms: z.coerce
    .number<number>()
    .min(1, 'Bedrooms must be at least 1')
    .max(20, 'Bedrooms must be less than 20'),
  bathrooms: z.coerce
    .number<number>()
    .min(1, 'Bathrooms must be at least 1')
    .max(20, 'Bathrooms must be less than 20'),
  propertyImages: z
    .array(propertyImageSchema)
    .min(1, 'At least one image is required'),
  isFeatured: z.boolean().optional(),
  propertyList: z_enumFromArray(
    PROPERTY_LIST_TYPES.map((type) => type.value),
    'Select a valid property list',
  ),
  propertyType: z_enumFromArray(
    PROPERTY_TYPES.map((type) => type.value),
    'Select a valid property type',
  ),
  amenities: z
    .array(
      z_enumFromArray(
        AMENITIES.map((amenity) => amenity.name),
        'Select a valid amenity',
      ),
    )
    .min(3, 'At least three amenities are required'),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
