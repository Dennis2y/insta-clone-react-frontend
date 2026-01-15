import { z } from "zod";

export const reelSchema = z.object({
  id: z.number(),
  thumbnail_url: z.string().url(),
  video_url: z.string().url().optional(),
  created_at: z.string(),
});

export const reelsSchema = z.array(reelSchema);

export type Reel = z.infer<typeof reelSchema>;
