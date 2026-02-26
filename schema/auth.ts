import z from 'zod';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 3 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: z.email({ error: 'Please enter a valid email address' }),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.email({ error: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { error: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean().refine((value) => {
    if (value === false) return true;
    return value === true;
  }),
});

export const forgotPasswordSchema = loginSchema.pick({ email: true });
