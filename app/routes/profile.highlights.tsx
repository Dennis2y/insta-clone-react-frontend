import { useLoaderData } from "react-router";
import { fetchJSON } from "../lib/api";
import { resolveMediaUrl } from "~/lib/media";

type Highlight = { id: number; title: string; cover: string };

export async function loader({ request }: { request: Request }) {
  return fetchJSON("/api/highlights");
}

export default function HighlightsRoute() {
  const data = useLoaderData() as { ok: boolean; items: Highlight[] };
  const items = data.items || [];

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {items.map((h) => (
        <div key={h.id} style={{ width: 110, textAlign: "center" }}>
          <div style={{ width: 86, height: 86, borderRadius: 999, overflow: "hidden", border: "1px solid var(--border)", margin: "0 auto 8px" }}>
            <img src={resolveMediaUrl(h.cover) || undefined} alt={h.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>{h.title}</div>
        </div>
      ))}
    </div>
  );
}
