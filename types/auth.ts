import { loginSchema } from '@/schema/auth';
import z from 'zod';

export type LoginFormData = z.infer<typeof loginSchema>;
