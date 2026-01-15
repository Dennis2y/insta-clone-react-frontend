import { useLoaderData } from "react-router";
import { api } from "../services/api";

type Reel = { id?: number; thumb_url?: string };

export async function loader() {
  const res = await api.get<Reel[]>("/reels/grid");
  return res.data;
}

export default function ReelsGrid() {
  const reels = useLoaderData() as Reel[];

  if (reels.length === 0) return <p style={{ color: "#666" }}>No reels yet.</p>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
      {reels.map((r, idx) => (
        <div key={r.id ?? idx} style={{ aspectRatio: "1 / 1", background: "#111" }} />
      ))}
    </div>
  );
}
