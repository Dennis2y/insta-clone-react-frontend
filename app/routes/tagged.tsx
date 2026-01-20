import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { fetchJSON } from "../lib/api";
import { resolveMediaUrl } from "~/lib/media";

type TaggedItem = {
  id: number;
  imageUrl?: string;
  img_url?: string;
  image?: string;
  caption?: string;
  username?: string;
  tags?: any[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  return fetchJSON(request, "/api/tagged/grid");
}

export default function TaggedRoute() {
  const data = useLoaderData() as { ok: boolean; items: TaggedItem[] };
  const items = data.items || [];

  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
      {items.map((t) => {
        const rawImg = (t.image ?? t.img_url ?? t.imageUrl) as any;
        const src =
          typeof rawImg === "string" && rawImg.trim().length > 0 ? resolveMediaUrl(rawImg) : undefined;

        const firstTag = t.tags?.[0] as any;
        const tagText =
          typeof firstTag === "string"
            ? firstTag
            : firstTag?.username ?? firstTag?.name ?? "";

        const label =
          tagText && String(tagText).trim().length
            ? String(tagText).startsWith("@")
              ? String(tagText)
              : `@${String(tagText)}`
            : "";

        return (
          <div
            key={t.id}
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <img
              src={src || undefined}
              alt={t.caption || "tagged"}
              style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
            />

            {/* ONE tag only (top-left) */}
            {label ? <div className="tag-pill">{label}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
