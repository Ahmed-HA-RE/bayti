import z from 'zod';
import { signUpSchema } from './auth';
import { z_enumFromArray } from './agent';
import { Role } from '@/lib/generated/prisma';
import parsePhoneNumberFromString from 'libphonenumber-js';

export const optionalPhoneNumber = z
  .string({ error: 'Invalid phone number' })
  .optional()
  .nullable()
  .refine((val) => {
    if (!val) return true; // Allow empty or null values

    if (val) {
      if (!/^\d+$/.test(val)) return false; // Ensure the phone number contains only digits
      const parsedNumber = parsePhoneNumberFromString(val, 'AE');
      if (!parsedNumber) return false;
      return parsedNumber.isValid();
    }
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

export const updateUserSchema = adminUserSchema.omit({
  role: true,
  email: true,
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

export const updateUserEmailSchema = z.object({
  newEmail: signUpSchema.shape.email,
});

export type UpdateUserEmailFormData = z.infer<typeof updateUserEmailSchema>;

export const setupPasswordSchema = z
  .object({
    setPassword: signUpSchema.shape.password,
    confirmPassword: signUpSchema.shape.confirmPassword,
  })
  .refine((data) => data.setPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SetupPasswordFormData = z.infer<typeof setupPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: signUpSchema.shape.password,
    newPassword: signUpSchema.shape.password,
    confirmPassword: signUpSchema.shape.confirmPassword,
    revokeSession: z.boolean().default(false),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// This schema is used to confirm the user's password before enabling two-factor authentication. It ensures that the user provides their current password for verification.
export const confirmTwoFactorSchema = z.object({
  currentPassword: signUpSchema.shape.password,
});

export type ConfirmTwoFactorFormData = z.infer<typeof confirmTwoFactorSchema>;
