import { useLoaderData } from "react-router";
import { fetchJSON } from "../lib/api";

type Reel = { id: number; videoUrl: string; posterUrl: string; durationSec: number };

export async function loader({ request }: { request: Request }) {
  return fetchJSON(request, "/api/reels/grid");
}

function ReelCard({ r }: { r: Reel }) {
  return (
    <div style={{ width: 320, border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--bg)" }}>
      <div style={{ position: "relative" }}>
        <video
          src={r.videoUrl}
          poster={r.posterUrl}
          controls
          playsInline
          preload="metadata"
          style={{ width: "100%", height: 360, objectFit: "cover", background: "black" }}
        />
        <div style={{ position: "absolute", right: 10, top: 10, fontSize: 12, fontWeight: 800, background: "rgba(0,0,0,0.55)", color: "white", padding: "4px 8px", borderRadius: 999 }}>
          {r.durationSec}s
        </div>
      </div>
    </div>
  );
}

export default function ReelsRoute() {
  const data = useLoaderData() as { ok: boolean; items: Reel[] };
  const items = data.items || [];
  return (
    <div style={{ display: "flex", gap: 22, flexWrap: "wrap", alignItems: "flex-start" }}>
      {items.map((r) => <ReelCard key={r.id} r={r} />)}
    </div>
  );
}
