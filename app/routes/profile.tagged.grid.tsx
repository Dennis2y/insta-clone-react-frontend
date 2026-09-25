import { useEffect, useState } from "react";
import { api } from "~/services/api";

/**
 * Profile Tagged Grid
 *
 * Backend endpoint:
 *   GET http://127.0.0.1:3000/api/tagged/grid
 *
 * IMPORTANT:
 * - Use shared axios client (app/services/api.ts)
 * - Do NOT call fetch("/api/...") because React Router Dev can intercept it
 */

type TaggedItem = {
  id: number;
  img_url: string;
  caption: string;
  created_at: string;
  tagged_by: string;
};

export default function ProfileTaggedGrid() {
  const [items, setItems] = useState<TaggedItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    api
      .get<TaggedItem[]>("/tagged/grid") // -> http://127.0.0.1:3000/api/tagged/grid
      .then((res) => {
        if (!cancelled) setItems(res.data);
      })
      .catch((err) => {
        console.error("Failed to load tagged:", err);
        if (!cancelled) setError("Failed to load tagged posts");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <div style={{ padding: 16 }}>{error}</div>;
  if (!items.length) return <div style={{ padding: 16 }}>No tagged posts yet</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Tagged</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {items.map((t) => (
          <div key={t.id} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
            <img
              src={t.img_url}
              alt={t.caption}
              style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: 10 }}>
              <div style={{ fontWeight: 600 }}>{t.caption}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Tagged by: {t.tagged_by}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{t.created_at}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
