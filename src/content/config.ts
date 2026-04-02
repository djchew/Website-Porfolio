import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    link: z.string(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    date: z.string().optional(),
  }),
});

export const collections = { projects };
