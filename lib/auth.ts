import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from './prisma';
import resend from './resend';
import VerifyEmail from '@/emails/verify-email';
import { nextCookies } from 'better-auth/next-js';
import { admin, customSession } from 'better-auth/plugins';
import ResetPasswordEmail from '@/emails/reset-password';
import { captcha } from 'better-auth/plugins';
import { dash } from '@better-auth/infra';
import { APP_NAME } from './constants';
import { createAuthMiddleware } from 'better-auth/api';
import { Role } from './generated/prisma';
import EmailChangeEmailConfirmation from '@/emails/email-change-email-confirmation';

const domain = process.env.DOMAIN;

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const error = ctx.query?.error;
      const isBanned = error === 'banned';
      const isCanceled =
        error === 'please_restart_the_process' || error === 'access_denied';

      if (isBanned) {
        return ctx.redirect('/banned');
      } else if (isCanceled) {
        return ctx.redirect('/login');
      }
    }),
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
        void resend.emails.send({
          from: `Bayti <no-reply@${domain}>`,
          to: user.email,
          subject: 'Confirm your new email address',
          react: EmailChangeEmailConfirmation({
            userName: user.name,
            newEmail,
            url,
          }),
        });
      },
    },
  },

  appName: APP_NAME,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 60 * 1000, // 1 hour

    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: `Bayti <no-reply@${domain}>`,
        to: user.email,
        subject: 'Reset Your Password',
        react: ResetPasswordEmail({ url }),
      });
    },
    customSyntheticUser: ({ coreFields, additionalFields, id }) => ({
      banned: false,
      banexpires: null,
      banReason: null,
      ...coreFields,
      ...additionalFields,
      id,
    }),
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 24 * 60 * 60 * 1000, // 24 hours
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: `Bayti <no-reply@${domain}>`,
        to: user.email,
        subject: 'Verify Your Email Address',
        react: VerifyEmail({ name: user.name, url }),
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: 'consent',
    },
    dropbox: {
      clientId: process.env.DROPBOX_CLIENT_ID as string,
      clientSecret: process.env.DROPBOX_CLIENT_SECRET as string,
    },
  },

  plugins: [
    nextCookies(),
    customSession(async ({ user, session }) => {
      const userRole = await prisma.user.findUnique({
        where: { id: user.id },
        select: { role: true, phoneNumber: true },
      });
      return {
        ...session,
        user: {
          ...user,
          image: user.image as string,
          role: userRole?.role,
          phoneNumber: userRole?.phoneNumber,
        },
      };
    }),

    captcha({
      provider: 'google-recaptcha',
      secretKey: process.env.GOOGLE_RECAPTCHA as string,
      endpoints: ['/sign-up/email', '/sign-in/email'],
    }),
    dash(),
    admin({
      defaultRole: Role.USER,
      adminRoles: [Role.ADMIN],
    }),
  ],

  advanced: {
    ipAddress: {
      ipAddressHeaders: ['x-vercel-forwarded-for', 'x-forwarded-for'],
    },
  },
});
