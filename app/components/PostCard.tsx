import { imageUrl } from "~/utils/imageUrl";
import type { Post } from "~/schemas/post.schema";
import { resolveMediaUrl } from "~/lib/media";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="aspect-square overflow-hidden">
      <img
        src={resolveMediaUrl(imageUrl(post.img_url)) || undefined}   // Converts "/uploads/x.png" → "http://127.0.0.1:3000/uploads/x.png"
        alt={post.caption || ""}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
