import { useState } from "react";
import { useNavigate } from "react-router";
import { resolveMediaUrl } from "~/lib/media";

const API_BASE = "http://127.0.0.1:3000";

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

export default function CreateRoute() {
  const nav = useNavigate();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div style={{ maxWidth: 520, margin: "20px auto", padding: 16 }}>
      <h2 style={{ margin: "0 0 12px" }}>Create Post</h2>

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

      <div style={{ marginTop: 12 }}>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption..."
          style={{ width: "100%", minHeight: 90, padding: 10, borderRadius: 10 }}
        />
      </div>

      {preview ? (
        <div style={{ marginTop: 12, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
          <img src={preview} alt="preview" style={{ width: "100%", display: "block" }} />
        </div>
      ) : null}

      {err ? <div style={{ marginTop: 10, color: "crimson", fontWeight: 700 }}>{err}</div> : null}

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

            const img_url =
              up?.img_url ||
              up?.url ||
              (up?.filename ? `/uploads/${up.filename}` : "") ||
              (up?.fileName ? `/uploads/${up.fileName}` : "");

            if (!img_url) throw new Error("Upload response did not include a filename/url.");

            await createPost({
              img_url,
              caption,
              username: "webeet_user",
            });

            nav("/profile");
          } catch (e: any) {
            setErr(e?.message || "Something went wrong.");
          } finally {
            setBusy(false);
          }
        }}
        disabled={busy}
        style={{ marginTop: 12, width: "100%", padding: "12px 14px", borderRadius: 12, fontWeight: 800 }}
      >
        {busy ? "Posting..." : "Post"}
      </button>

      <div style={{ marginTop: 10, opacity: 0.7, fontSize: 13 }}>
        Preview URL resolver test: {preview ? resolveMediaUrl("/uploads/demo-1.jpg") : ""}
      </div>
    </div>
  );
}
