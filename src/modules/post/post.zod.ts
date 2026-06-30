import { z } from "zod";

export const createPostZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const updatePostZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
  }),
});
