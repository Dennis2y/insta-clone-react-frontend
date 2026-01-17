import { z } from "zod";

/**
 * Highlight schema:
 * - a "story bubble" on profile
 */
export const highlightSchema = z.object({
  id: z.number(),
  cover_image_url: z.string().min(1),
  title: z.string().min(1),
  created_at: z.string(),
});

/** GET /highlights returns a list */
export const highlightsSchema = z.array(highlightSchema);

export type Highlight = z.infer<typeof highlightSchema>;
