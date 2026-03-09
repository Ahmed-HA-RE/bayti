'use server';

import {
  ContactAgentFormData,
  contactAgentSchema,
} from '@/schema/contact-agent';
import { auth } from '../auth';
import { headers } from 'next/headers';

export const contactAgent = async (data: ContactAgentFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) throw new Error('Unauthorized to perform this action');

    const validatedData = contactAgentSchema.safeParse(data);

    if (!validatedData.success) throw new Error('Invalid form data');

    const { name, email, phoneNumber } = validatedData.data;

    // Here you can implement the logic to send the contact details to the agent
    // For example, you can send an email to the agent with the contact details

    return {
      success: true,
      message: 'Thank you! Your submission has been received!',
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
