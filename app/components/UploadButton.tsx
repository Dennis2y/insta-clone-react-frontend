import * as React from "react";

type Props = {
  onUploaded: (url: string) => void;
  label?: string;
  apiBase?: string;
};

export default function UploadButton({
  onUploaded,
  label = "Upload",
  apiBase = "http://127.0.0.1:3000",
}: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const pick = () => inputRef.current?.click();

  const onPickFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setBusy(true);

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${apiBase}/api/upload`, { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok || !data?.url) {
        throw new Error(data?.error || `Upload failed (${res.status})`);
      }

      onUploaded(`${apiBase}${data.url}`);
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        type="button"
        onClick={pick}
        disabled={busy}
        style={{
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "rgba(255,255,255,0.06)",
          color: "white",
          cursor: busy ? "not-allowed" : "pointer",
          fontWeight: 700,
        }}
      >
        {busy ? "Uploading..." : label}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={onPickFile}
        style={{ display: "none" }}
      />

      {error ? <div style={{ color: "#ffb4b4", fontSize: 12, maxWidth: 280 }}>{error}</div> : null}
    </div>
  );
}
