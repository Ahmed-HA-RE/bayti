import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import resend from './resend';
import VerifyEmail from '@/emails/VerifyEmail';

const domain = process.env.DOMAIN;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: `Bayti <no-reply@${domain}>`,
        to: user.email,
        subject: 'Verify Your Email Address',
        react: VerifyEmail({ name: user.name, url }),
      });
    },
  },
});
