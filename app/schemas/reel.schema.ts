import { z } from "zod";

/**
 * Matches backend payload from GET /reels/grid
 */
export const reelSchema = z.object({
  id: z.number(),
  video_url: z.string().min(1),
  cover_image_url: z.string().min(1),
  caption: z.string().nullable().optional(),
  created_at: z.string(),
});

/** GET /reels/grid returns an array of reels */
export const reelsSchema = z.array(reelSchema);

export type Reel = z.infer<typeof reelSchema>;
