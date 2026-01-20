import * as React from "react";
import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { fetchJSON } from "../lib/api";
import { resolveMediaUrl } from "~/lib/media";

const API_BASE = "http://127.0.0.1:3000";

type Post = {
  id: number;
  username: string;
  caption: string;
  img_url: string;
  created_at?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  return fetchJSON(request, "/api/posts");
}

async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}): ${txt}`);
  }
  return res.json();
}

async function createPost(payload: { img_url: string; caption?: string; username?: string }) {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Create post failed (${res.status}): ${txt}`);
  }
  return res.json();
}

function HomeCreatePost() {
  const [caption, setCaption] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 12, marginBottom: 14 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
            setErr("");
            if (f) setPreview(URL.createObjectURL(f));
            else setPreview("");
          }}
        />
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          style={{
            flex: "1 1 240px",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
          }}
        />
        <button
          onClick={async () => {
            try {
              if (!file) {
                setErr("Please select an image.");
                return;
              }
              setBusy(true);
              setErr("");

              const up = await uploadFile(file);

              // Support multiple response shapes
              const img_url =
                up?.img_url ||
                up?.url ||
                (up?.filename ? `/uploads/${up.filename}` : "") ||
                (up?.fileName ? `/uploads/${up.fileName}` : "") ||
                (up?.name ? `/uploads/${up.name}` : "");

              if (!img_url) throw new Error("Upload response did not include filename/url.");

              await createPost({ img_url, caption, username: "webeet_user" });

              window.location.reload();
            } catch (e: any) {
              setErr(e?.message || "Something went wrong.");
            } finally {
              setBusy(false);
            }
          }}
          disabled={busy}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            fontWeight: 800,
            border: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          {busy ? "Posting..." : "Post"}
        </button>
      </div>

      {err ? <div style={{ marginTop: 10, color: "crimson", fontWeight: 700 }}>{err}</div> : null}

      {preview ? (
        <div style={{ marginTop: 12, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.12)" }}>
          <img src={preview} alt="preview" style={{ width: "100%", display: "block" }} />
        </div>
      ) : null}
    </div>
  );
}

export default function HomeRoute() {
  const data = useLoaderData() as { ok: boolean; items: Post[] };
  const items = data?.items || [];

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 style={{ margin: 0 }}>Home</h2>
      </div>

      <HomeCreatePost />

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {items.map((p) => {
          const src = typeof p.img_url === "string" ? resolveMediaUrl(p.img_url) : "";
          return (
            <div
              key={p.id}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(0,0,0,0.12)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <img
                src={src || undefined}
                alt={p.caption || "post"}
                style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{p.username}</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>{p.caption}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
