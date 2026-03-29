'use server';

import { auth } from '@/lib/auth';
import { BlogStatus } from '@/lib/generated/prisma';
import prisma from '@/lib/prisma';
import { blogContentSchema, BlogContentFormData } from '@/schema/blog';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

export const addBlogContent = async (data: BlogContentFormData, id: string) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = blogContentSchema.safeParse(data);

    if (!validatedData.success) {
      return { success: false, message: 'Please provide valid content' };
    }

    // Check if blog exists
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!blog) {
      return { success: false, message: 'Blog not found' };
    }

    const { content, status } = validatedData.data;

    // Calculate reading time
    const wordsPerMinute = 200;
    const noOfWords = content.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);

    // Save content, status, and readTime to the database
    await prisma.blog.update({
      where: { id },
      data: {
        content,
        status: status as BlogStatus,
        readTime,
      },
    });

    revalidatePath(`/admin/blog/${blog.slug}/content`);
    return { success: true, message: 'Blog updated successfully' };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'Failed to update blog' };
  }
};
