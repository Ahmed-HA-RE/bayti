import { loginSchema, signUpSchema } from '@/schema/auth';
import z from 'zod';

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
