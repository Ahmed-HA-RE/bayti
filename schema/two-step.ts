import z from 'zod';

export const twoStepOtpSchema = z.object({
  otp: z
    .string({ error: 'OTP is required' })
    .min(6, 'Please enter the 6-digit code'),
  trustDevice: z.boolean().optional().default(false),
});

export type TwoStepOtpInferFormData = z.input<typeof twoStepOtpSchema>;
export type TwoStepOtpOutputFormData = z.output<typeof twoStepOtpSchema>;
