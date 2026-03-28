import z from 'zod';

export const blogSchema = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
  slug: z.string({ error: 'Slug is required' }).min(1, 'Slug is required'),
  tag: z.string({ error: 'Tag is required' }).min(1, 'Tag is required'),
  content: z
    .string({ error: 'Content is required' })
    .min(250, 'Content is too short, minimum 250 characters'),
  coverImageUrl: z
    .url({ error: 'Image URL is required' })
    .min(1, 'Image URL is required'),
  coverImageKey: z
    .string({ error: 'Image Key is required' })
    .min(1, 'Image Key is required'),
  readTime: z.coerce
    .number<number>({ error: 'Read Time is required' })
    .min(1, 'Read Time must be at least 1 minute'),
});

export type BlogFormData = z.infer<typeof blogSchema>;
