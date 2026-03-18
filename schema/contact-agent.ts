import z from 'zod';
import parsePhoneNumber from 'libphonenumber-js';

export const phoneNumber = z
  .string({ error: 'Phone number is required' })
  .refine(
    (value) => {
      const parsedNumber = parsePhoneNumber(value, 'AE');
      return parsedNumber?.isValid();
    },
    {
      error: 'Please enter a valid number',
    },
  );

export const contactAgentSchema = z.object({
  name: z
    .string({ error: 'Invalid name' })
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z.email({ error: 'Email is required' }),
  phoneNumber: phoneNumber,
});

export type ContactAgentFormData = z.infer<typeof contactAgentSchema>;
