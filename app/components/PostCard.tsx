import type { Post } from "../schemas/post.schema";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 10, overflow: "hidden" }}>
      <img src={post.img_url} alt={post.caption ?? "post"} style={{ width: "100%", display: "block" }} />
      <div style={{ padding: 10, fontSize: 14 }}>
        <div style={{ fontWeight: 600 }}>@you</div>
        <div>{post.caption ?? ""}</div>
      </div>
    </div>
  );
}
