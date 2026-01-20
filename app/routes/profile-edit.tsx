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

async function updateProfile(payload: { avatar_url: string; username?: string }) {
  const res = await fetch(`${API_BASE}/api/profile`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Profile update failed (${res.status}): ${txt}`);
  }
  return res.json();
}

export default function ProfileEditRoute() {
  const nav = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  return (
    <div style={{ maxWidth: 520, margin: "20px auto", padding: 16 }}>
      <h2 style={{ margin: "0 0 12px" }}>Change Profile Picture</h2>

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

      {preview ? (
        <div style={{ marginTop: 12, display: "flex", gap: 12, alignItems: "center" }}>
          <img
            src={preview}
            alt="preview"
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(0,0,0,0.2)",
            }}
          />
          <div style={{ opacity: 0.7, fontSize: 13 }}>
            Saved avatar will resolve as: {resolveMediaUrl("/uploads/demo-1.jpg")}
          </div>
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

            const avatar_url =
              up?.img_url ||
              up?.url ||
              (up?.filename ? `/uploads/${up.filename}` : "") ||
              (up?.fileName ? `/uploads/${up.fileName}` : "");

            if (!avatar_url) throw new Error("Upload response did not include a filename/url.");

            await updateProfile({ avatar_url, username: "webeet_user" });

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
        {busy ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
