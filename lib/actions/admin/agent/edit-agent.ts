'use server';

import { auth } from '@/lib/auth';
import { AgentRole, AgentStatus } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { AgentFormData, agentSchema } from '@/schema/agent';
import { headers } from 'next/headers';
import { UTApi, UTFile } from 'uploadthing/server';

export const editAgent = async (
  data: AgentFormData,
  id: string | undefined,
) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN')
      throw new Error('Unauthorized');

    if (!id) throw new Error('Agent ID is required for editing.');

    const validatedData = agentSchema.safeParse(data);

    if (!validatedData.success)
      throw new Error(
        'Invalid agent data. Please check the input and try again.',
      );

    // Check if the agent exists
    const isAgent = await prisma.agent.findUnique({
      where: { id: id },
    });

    if (!isAgent) throw new Error('Agent not found.');

    let imageUrl: string | undefined = undefined;
    let imageKey: string | undefined = undefined;

    // Intiliaze UTApi
    const utApi = new UTApi();

    if (validatedData.data.image) {
      // Upload the profile picture to UploadThing
      const file = new UTFile(
        [validatedData.data.image],
        validatedData.data.image.name,
      );

      const uploadResult = await utApi.uploadFiles([file]);
      if (uploadResult.length === 0) {
        throw new Error('Failed to upload image. Please try again.');
      }

      imageUrl = uploadResult[0].data?.ufsUrl;
      imageKey = uploadResult[0].data?.key;

      if (!imageUrl || !imageKey) {
        throw new Error('Failed to retrieve uploaded image URL.');
      }

      // Delete old image from UploadThing if it exists
      if (isAgent.imageKey) {
        await utApi.deleteFiles([isAgent.imageKey]);
      }
    }

    // Update the agent in the database
    await prisma.agent.update({
      where: { id },
      data: {
        name: validatedData.data.name,
        description: validatedData.data.description,
        email: validatedData.data.email,
        phoneNumber: validatedData.data.phoneNumber,
        city: validatedData.data.city,
        location: validatedData.data.location,
        role: validatedData.data.role as AgentRole,
        status: validatedData.data.status as AgentStatus,
        image: imageUrl || isAgent.image, // Keep existing image if no new image is uploaded
        imageKey: imageKey || isAgent.imageKey, // Keep existing image key if no new image is uploaded
        socialMediaLinks: validatedData.data.socialMediaLinks,
      },
    });

    return {
      success: true,
      message: 'Agent edited successfully.',
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
