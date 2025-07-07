import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Enter a valid URL'),
  tags: z.string().optional(),
});
