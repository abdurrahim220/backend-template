import { z } from "zod";

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.email(),
  }),
});

export const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.email().optional(),
  }),
});
