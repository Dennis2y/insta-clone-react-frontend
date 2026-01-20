import { useState } from "react";
import { api } from "../lib/axios";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/upload", formData);
      console.log("Uploaded:", res.data);
      alert("Upload successful");
    } catch (err) {
      console.error("Upload failed", err);
    }
  }

  return (
    <div className="p-4 bg-black text-white">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}
