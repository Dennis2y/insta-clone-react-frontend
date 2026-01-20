import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { resolveMediaUrl } from "~/lib/media";

type Tag = { name: string; x: number; y: number };
type TaggedItem = { id: number; imageUrl: string; tags: Tag[] };

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL("/api/tagged/grid", request.url);
  const res = await fetch(url);
  if (!res.ok) throw new Response("Failed to load tagged", { status: res.status });
  return res.json();
}

export default function ProfileTaggedGridRoute() {
  const data = useLoaderData() as { ok: boolean; items: TaggedItem[] };
  const items = data.items || [];

  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        alignItems: "start",
      }}
    >
      {items.map((t) => (
        <div
          key={t.id}
          style={{
            position: "relative",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <img
            src={resolveMediaUrl(t.imageUrl) || undefined}
            alt="Tagged"
            style={{ width: "100%", height: 300, objectFit: "cover", display: "block" }}
          />

          {(t.tags || []).slice(0, 3).map((tag, idx) => (
            <div
              key={idx}
              style={{
                position: "absolute",
                left: `${(tag.x ?? 0.2) * 100}%`,
                top: `${(tag.y ?? 0.2) * 100}%`,
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.62)",
                color: "white",
                padding: "6px 10px",
                borderRadius: 999,
                fontSize: 12,
                border: "1px solid rgba(255,255,255,0.14)",
                backdropFilter: "blur(6px)",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              {tag.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
