import { z } from "zod";

export const createCommentZodSchema = z.object({
  body: z.object({
    content: z.string(),
    postId: z.string(),
    authorId: z.string(),
    parentId: z.string(),
  }),
});

export const updateCommentZodSchema = z.object({
  body: z.object({
    content: z.string().optional(),
    postId: z.string().optional(),
    authorId: z.string().optional(),
    parentId: z.string().optional(),
  }),
});