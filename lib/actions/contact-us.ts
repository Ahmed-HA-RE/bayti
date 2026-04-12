'use server';

import { ContactUsFormData, contactUsSchema } from '@/schema/contact-us';
import { headers } from 'next/headers';
import rateLimit from '../rateLimit';
import resend from '../resend';
import { DOMAIN } from '../constants';
import ContactEmail from '@/emails/contact-email';

export const contactUs = async (data: ContactUsFormData) => {
  const companyEmail = process.env.EMAIL!;

  try {
    const headersList = await headers();
    const clientIp = headersList.get('x-forwarded-for');

    if (!clientIp) throw new Error('Unable to determine client IP address');

    const validatedData = contactUsSchema.safeParse(data);
    if (!validatedData.success) throw new Error('Invalid form data');

    const { name, email, message, phoneNumber } = validatedData.data;

    // Check rate limit (e.g., 5 messages per 10s per IP)
    const { success } = await rateLimit.limit(clientIp, {
      ip: clientIp,
    });

    if (!success) {
      throw new Error(
        'You are sending messages too frequently. Please try again later.',
      );
    }

    // Send email
    void resend.emails.send({
      from: `Bayti Contact Form <no-reply@${DOMAIN}>`,
      to: companyEmail,
      replyTo: email,
      subject: 'New Message from Bayti',
      react: ContactEmail({
        name,
        email,
        phoneNumber,
        message,
      }),
    });

    return {
      success: true,
      message: 'Your message has been sent successfully.',
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return { success: false, message: errorMessage };
  }
};
