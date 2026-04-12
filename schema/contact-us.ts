import z from 'zod';
import { signUpSchema } from './auth';
import { phoneNumber } from './contact-agent';

export const contactUsSchema = z.object({
  name: signUpSchema.shape.name,
  email: signUpSchema.shape.email,
  phoneNumber: phoneNumber,
  message: z
    .string()
    .min(25, 'Please enter a discriptive message with at least 25 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactUsFormData = z.infer<typeof contactUsSchema>;
