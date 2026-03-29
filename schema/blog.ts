import z from 'zod';
import { z_enumFromArray } from './agent';

export const blogSchema = z.object({
  title: z.string({ error: 'Title is required' }).min(1, 'Title is required'),
  slug: z.string({ error: 'Slug is required' }).min(1, 'Slug is required'),
  tag: z.string({ error: 'Tag is required' }).min(1, 'Tag is required'),
  coverImageUrl: z
    .url({ error: 'Image URL is required' })
    .min(1, 'Image URL is required'),
  coverImageKey: z
    .string({ error: 'Image Key is required' })
    .min(1, 'Image Key is required'),
});

export type BlogFormData = z.infer<typeof blogSchema>;

export const blogContentSchema = z.object({
  content: z
    .string({ error: 'Content is required' })
    .min(150, 'Add a descriptive content with at least 150 characters'),
  status: z_enumFromArray(['DRAFT', 'PUBLISHED'], 'Invalid status').default(
    'DRAFT',
  ),
});

export type BlogContentFormData = z.input<typeof blogContentSchema>;
