import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import resend from './resend';
import VerifyEmail from '@/emails/verify-email';
import { nextCookies } from 'better-auth/next-js';
import { customSession } from 'better-auth/plugins';
import ResetPasswordEmail from '@/emails/reset-password';

const domain = process.env.DOMAIN;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60 * 1000, // 1 hour

    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: `Bayti <no-reply@${domain}>`,
        to: user.email,
        subject: 'Reset Your Password',
        react: ResetPasswordEmail({ url }),
      });
    },
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
  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      const userRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true },
      });
      return {
        ...session,
        user: {
          ...user,
          image: user.image as string,
          role: userRole?.role,
        },
      };
    }),
  ],
});
