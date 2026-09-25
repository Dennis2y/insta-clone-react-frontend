import { z } from "zod";

/**
 * Matches backend payload from GET /tagged/grid
 */
export const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().min(1),
  caption: z.string().nullable().optional(),
  created_at: z.string(),
  tagged_by: z.string().min(1),
});

/** GET /tagged/grid returns an array */
export const taggedPostsSchema = z.array(taggedPostSchema);

export type TaggedPost = z.infer<typeof taggedPostSchema>;
