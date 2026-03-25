import z from 'zod';
import { signUpSchema } from './auth';
import { z_enumFromArray } from './agent';
import { Role } from '@/lib/generated/prisma';
import { phoneNumber } from './contact-agent';

export const adminUserSchema = z.object({
  name: signUpSchema.shape.name,
  email: signUpSchema.shape.email,
  phoneNumber: phoneNumber.optional().nullable(),
  role: z_enumFromArray([Role.ADMIN, Role.USER], 'Select a valid role'),
  image: z
    .url({ error: 'Invalid image URL' })
    .min(1, 'Image URL cannot be empty'),
  imageKey: z.string().optional(),
});

export type AdminUserFormData = z.infer<typeof adminUserSchema>;
