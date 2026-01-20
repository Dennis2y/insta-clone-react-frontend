import type { Reel } from "../schemas/reel.schema";
import { resolveMediaUrl } from "~/lib/media";

export default function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden" }}>
      <img
        src={resolveMediaUrl(reel.thumbnail_url) || undefined}
        alt="reel thumbnail"
        style={{ width: "100%", display: "block", aspectRatio: "9/16", objectFit: "cover" }}
      />
    </div>
  );
}
