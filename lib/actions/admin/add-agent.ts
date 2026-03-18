'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { AgentFormData, agentSchema } from '@/schema/agent';
import { headers } from 'next/headers';
import { UTApi, UTFile } from 'uploadthing/server';

export const addAgent = async (data: AgentFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    const validatedData = agentSchema.safeParse(data);

    if (!validatedData.success)
      throw new Error(
        'Invalid agent data. Please check the input and try again.',
      );

    if (!validatedData.data.image)
      throw new Error('Profile picture is required.');

    // Check if the agent already exists
    const existingAgent = await prisma.agent.findUnique({
      where: { email: data.email },
    });

    if (existingAgent)
      throw new Error('An agent with this email already exists.');

    // Intiliaze UTApi
    const utApi = new UTApi();

    // Upload the profile picture to UploadThing
    const file = new UTFile(
      [validatedData.data.image],
      validatedData.data.image.name,
    );

    const uploadResult = await utApi.uploadFiles([file]);

    if (uploadResult.length === 0)
      throw new Error('Failed to upload profile picture.');

    const imageUrl = uploadResult[0].data?.ufsUrl;

    // Create the new agent in the database
    await prisma.agent.create({
      data: {
        name: validatedData.data.name,
        email: validatedData.data.email,
        phoneNumber: validatedData.data.phoneNumber,
        city: validatedData.data.city,
        location: validatedData.data.location,
        role: validatedData.data.role,
        status: validatedData.data.status,
        image: imageUrl!,
      },
    });

    return {
      success: true,
      message: 'Agent added successfully.',
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
