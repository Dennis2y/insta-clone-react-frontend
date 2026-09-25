import { useEffect, useState } from "react";
import { api } from "~/services/api";

/**
 * Profile Reels Grid
 *
 * We fetch reels from the backend:
 *   GET http://127.0.0.1:3000/api/reels/grid
 *
 * IMPORTANT:
 * - We do NOT call fetch("/api/...") here.
 * - We do NOT call axios.create() here.
 * - We ONLY use the shared axios client from: app/services/api.ts
 *   which already has baseURL = http://127.0.0.1:3000/api
 */

type Reel = {
  id: number;
  video_url: string;
  cover_image_url: string;
  caption: string;
  created_at: string;
};

export default function ProfileReelsGrid() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .get<Reel[]>("/reels/grid") // -> http://127.0.0.1:3000/api/reels/grid
      .then((res) => {
        if (!cancelled) setReels(res.data);
      })
      .catch((err) => {
        console.error("Failed to load reels:", err);
        if (!cancelled) setError("Failed to load reels");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <div style={{ padding: 16 }}>{error}</div>;
  if (!reels.length) return <div style={{ padding: 16 }}>No reels yet</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Reels</h2>

      {/* Simple grid - keep it obvious while debugging */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {reels.map((r) => (
          <div key={r.id} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
            <img
              src={r.cover_image_url}
              alt={r.caption}
              style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{r.caption}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{r.created_at}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
