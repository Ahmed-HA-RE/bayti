'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { BlogFormData, blogSchema } from '@/schema/blog';
import { headers } from 'next/headers';

export const addBlog = async (data: BlogFormData) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== 'ADMIN') {
      return { success: false, message: 'Unauthorized' };
    }

    const validatedData = blogSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fill all required fields correctly',
      };
    }

    const { title, tag, slug, coverImageUrl, coverImageKey } =
      validatedData.data;

    // Check if blog already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return {
        success: false,
        message: 'A blog with this slug already exists',
      };
    }

    const newBlog = await prisma.blog.create({
      data: {
        title,
        tag,
        slug,
        coverImageUrl,
        coverImageKey,
        readTime: 0,
      },
    });

    return { success: true, message: 'Blog added successfully', blog: newBlog };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};
