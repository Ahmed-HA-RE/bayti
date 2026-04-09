import z from 'zod';

export const twoStepOtpSchema = z.object({
  otp: z
    .string({ error: 'OTP is required' })
    .min(6, 'Please enter the 6-digit code'),
  trustDevice: z.boolean().optional().default(false),
});

export type TwoStepOtpFormData = z.input<typeof twoStepOtpSchema>;
export type TwoStepOtpOutputFormData = z.output<typeof twoStepOtpSchema>;

export const twoStepBackupCodeSchema = z.object({
  backupCode: z
    .string({ error: 'Backup code is required' })
    .min(10, 'Please enter the 10-character backup code')
    .max(11, 'Backup code must be exactly 10 characters'), // Allow for an hyphen
  trustDevice: twoStepOtpSchema.shape.trustDevice,
});

export type TwoStepBackupCodeFormData = z.input<typeof twoStepBackupCodeSchema>;
export type TwoStepBackupCodeOutputFormData = z.output<
  typeof twoStepBackupCodeSchema
>;
