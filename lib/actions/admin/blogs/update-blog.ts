'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { BlogFormData, blogSchema } from '@/schema/blog';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { UTApi } from 'uploadthing/server';

export const updateBlog = async (data: BlogFormData, id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = blogSchema.safeParse(data);

    // Fetch the existing blog to check if it exists
    const existingBlog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!existingBlog) {
      return { success: false, message: 'Blog not found' };
    }

    if (!validatedData.success) {
      return { success: false, message: 'Please provide valid data' };
    }

    const { title, slug, tag, coverImageKey, coverImageUrl } =
      validatedData.data;

    // Check if new image is provided and is different from the existing one
    if (coverImageKey !== existingBlog.coverImageKey) {
      const utapi = new UTApi();
      await utapi.deleteFiles([existingBlog.coverImageKey]);
    }

    await prisma.blog.update({
      where: { id: existingBlog.id },
      data: {
        title,
        slug,
        tag,
        coverImageKey,
        coverImageUrl,
      },
    });

    revalidatePath('/admin/blogs');
    return { success: true, message: 'Blog updated successfully' };
  } catch (error) {
    console.error('Error:', error);
    return {
      success: false,
      message: 'An error occurred while editing the blog',
    };
  }
};
