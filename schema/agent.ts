import z from 'zod';
import { phoneNumber } from './contact-agent';
import { CITIES, SOCIAL_MEDIA_PLATFORMS } from '@/lib/constants';
import { AgentStatus } from '@/lib/generated/prisma';

export function z_enumFromArray(array: string[], errorMessage?: string) {
  return z.enum([array[0], ...array.slice(1)], errorMessage);
}

export const agentSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.email('Invalid email address'),
  image: z
    .file({ error: 'Image is required' })
    .mime(
      ['image/jpeg', 'image/png', 'image/jpg'],
      'Only JPEG and PNG images are allowed',
    )
    .max(1_000_000, 'Image size must be 1MB or less')
    .optional(),
  phoneNumber: phoneNumber,
  role: z
    .string()
    .min(1, 'Role is required')
    .max(50, 'Role must be less than 50 characters'),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(100, 'Location must be less than 100 characters'),
  city: z_enumFromArray(
    CITIES.map((city) => city.value),
    'Select a valid city',
  ),
  status: z_enumFromArray(
    [AgentStatus.ACTIVE, AgentStatus.INACTIVE],
    'Define the status of the agent',
  ),
  socialMediaLinks: z
    .array(
      z.object({
        platform: z_enumFromArray(
          SOCIAL_MEDIA_PLATFORMS.map((platform) => platform.value),
          'Select a valid platform',
        ),
        url: z.url({ error: 'Invalid URL format' }).min(1, 'URL is required'),
      }),
    )
    .optional(),
});

export type AgentFormData = z.infer<typeof agentSchema>;
