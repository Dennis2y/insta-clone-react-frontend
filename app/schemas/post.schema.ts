import { z } from "zod";

export const createPostDtoSchema = z.object({
  img_url: z.string().url(),
  caption: z.string().nullable().optional(),
});

export const postSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
});

export const postsSchema = z.array(postSchema);

export type CreatePostDto = z.infer<typeof createPostDtoSchema>;
export type Post = z.infer<typeof postSchema>;
