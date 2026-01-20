import { useLoaderData } from "react-router";
import { fetchJSON } from "../lib/api";
import { resolveMediaUrl } from "~/lib/media";

type Post = { id: number; username: string; caption: string; img_url: string };

export async function loader({ request }: { request: Request }) {
  return fetchJSON(request, "/api/posts");
}

function Card({ p }: { p: Post }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", background: "var(--bg)" }}>
      <img src={resolveMediaUrl(p.img_url) || undefined} alt={p.caption} style={{ width: "100%", height: 360, objectFit: "cover" }} />
      <div style={{ padding: 14 }}>
        <div style={{ fontWeight: 800, marginBottom: 6 }}>{p.username}</div>
        <div style={{ opacity: 0.9 }}>{p.caption}</div>
      </div>
    </div>
  );
}

export default function IndexRoute() {
  const data = useLoaderData() as { ok: boolean; items: Post[] };
  const items = data.items || [];

  return (
    <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", alignItems: "start" }}>
      {items.map((p) => <Card key={p.id} p={p} />)}
    </div>
  );
}
