import * as React from "react";
import UploadButton from "./UploadButton";
import { resolveMediaUrl } from "~/lib/media";

export default function CreatePostForm() {
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

  return (
    <div style={{ padding: 18, maxWidth: 920, margin: "0 auto" }}>
      <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Create Post</div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <UploadButton onUploaded={(url) => setUploadedUrl(url)} label="Upload Image" />
        {uploadedUrl ? (
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#111", opacity: 0.9, fontSize: 12, fontWeight: 700 }}
          >
            View uploaded
          </a>
        ) : null}
      </div>

      {uploadedUrl ? (
        <div style={{ marginBottom: 12 }}>
          <img
            src={resolveMediaUrl(uploadedUrl) || undefined}
            alt="Uploaded preview"
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.12)",
            }}
          />
        </div>
      ) : (
        <div style={{ opacity: 0.75, fontSize: 13 }}>
          Upload an image to preview it here.
        </div>
      )}

      <div style={{ opacity: 0.7, fontSize: 12, marginTop: 10 }}>
        Next step (optional): save it as a real post in DB.
      </div>
    </div>
  );
}
