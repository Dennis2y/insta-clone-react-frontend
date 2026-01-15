import type { Reel } from "../schemas/reel.schema";

export default function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden" }}>
      <img
        src={reel.thumbnail_url}
        alt="reel thumbnail"
        style={{ width: "100%", display: "block", aspectRatio: "9/16", objectFit: "cover" }}
      />
    </div>
  );
}
