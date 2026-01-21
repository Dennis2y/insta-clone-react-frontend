import * as React from "react";

type Props = {
  onUploaded: (url: string) => void;
  label?: string;
};

export default function UploadButton({ onUploaded, label = "Upload Image" }: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onPickFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow selecting same file again

    if (!file) return;

    const okType = ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    if (!okType) {
      setError("Only JPG / PNG / WEBP allowed");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("File too large (max 50MB)");
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      // If you have Vite proxy -> use "/api/upload"
      // Otherwise (no proxy) your backend CORS is enabled, so this also works:
      const res = await fetch((``.replace(//+
,"") + "/api/upload"), {
        method: "POST",
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data?.ok || !data?.url) {
        throw new Error(data?.error || "Upload failed");
      }

      // Ensure absolute URL for <img src="">
      const absolute = data.url.startsWith("http")
        ? data.url
        : `http://127.0.0.1:3000${data.url}`;

      onUploaded(absolute);
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          cursor: uploading ? "not-allowed" : "pointer",
          fontWeight: 700,
        }}
      >
        {uploading ? "Uploading..." : label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onPickFile}
        style={{ display: "none" }}
      />

      {error ? (
        <div style={{ color: "#ffb4b4", fontSize: 12, maxWidth: 260 }}>{error}</div>
      ) : null}
    </div>
  );
}
