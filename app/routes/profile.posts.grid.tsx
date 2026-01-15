import { useLoaderData } from "react-router";
import { api } from "../services/api";

type Post = { id: number; img_url: string; caption: string | null; created_at: string };

export async function loader() {
  const res = await api.get<Post[]>("/posts");
  return res.data;
}

export default function PostsGrid() {
  const posts = useLoaderData() as Post[];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 6,
      }}
    >
      {posts.map((p) => (
        <div key={p.id} style={{ aspectRatio: "1 / 1", overflow: "hidden", background: "#f3f3f3" }}>
          <img
            src={p.img_url}
            alt={p.caption ?? "post"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ))}
    </div>
  );
}
