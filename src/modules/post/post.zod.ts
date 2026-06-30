import { z } from "zod";

export const createPostZodSchema = z.object({
  body: z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.string(),
  }),
});

export const updatePostZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    authorId: z.string().optional(),
  }),
});
