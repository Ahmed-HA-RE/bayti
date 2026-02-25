import z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().refine((value) => {
    if (value === false) return true;
    return value === true;
  }),
});
