import z from 'zod';
import parsePhoneNumber from 'libphonenumber-js';

const phoneNumber = z.string().refine(
  (value) => {
    const parsedNumber = parsePhoneNumber(value, 'AE');
    return parsedNumber?.isValid();
  },
  {
    error: 'Invalid UAE phone number',
  },
);

export const contactAgentSchema = z.object({
  name: z
    .string({ error: 'Invalid name' })
    .min(2, 'Name must be at least 2 characters'),
  email: z.email({ error: 'Email is required' }),
  phone: phoneNumber,
});

export type ContactAgentFormData = z.infer<typeof contactAgentSchema>;
