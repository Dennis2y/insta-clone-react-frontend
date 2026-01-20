import * as React from "react";
import UploadButton from "./UploadButton";

export default function CreatePostForm() {
  const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 12, color: "white" }}>
        Create Post
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <UploadButton onUploaded={(url) => setUploadedUrl(url)} />
        {uploadedUrl ? (
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noreferrer"
            style={{ color: "white", opacity: 0.9, fontSize: 12 }}
          >
            View uploaded
          </a>
        ) : null}
      </div>

      {uploadedUrl ? (
        <div style={{ marginBottom: 12 }}>
          <img
            src={uploadedUrl}
            alt="Uploaded preview"
            style={{
              width: "100%",
              maxWidth: 420,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />
        </div>
      ) : null}

      <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
        Upload an image above. (Next step: save it as a real post.)
      </div>
    </div>
  );
}
