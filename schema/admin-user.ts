import z from 'zod';
import { signUpSchema } from './auth';
import { z_enumFromArray } from './agent';
import { Role } from '@/lib/generated/prisma';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

export const optionalPhoneNumber = z
  .string({ error: 'Invalid phone number' })
  .optional()
  .nullable()
  .refine((val) => {
    if (val === '' || val === null) return true; // Allow empty or null values

    if (val) {
      const parsedNumber = parsePhoneNumberWithError(val, 'AE');
      if (!parsedNumber.isValid()) return false; // Invalid phone number
    }

    return true; // Valid phone number
  }, 'Please enter a valid phone number');

export const adminUserSchema = z.object({
  name: signUpSchema.shape.name,
  email: signUpSchema.shape.email,
  phoneNumber: optionalPhoneNumber,
  role: z_enumFromArray([Role.ADMIN, Role.USER], 'Select a valid role'),
  image: z
    .url({ error: 'Invalid image URL' })
    .min(1, 'Image URL cannot be empty'),
  imageKey: z.string().optional(),
});

export type AdminUserFormData = z.infer<typeof adminUserSchema>;
