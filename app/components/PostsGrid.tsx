import React from "react";
import { imageUrl } from "../utils/imageUrl";
import { resolveMediaUrl } from "~/lib/media";

export default function PostsGrid({ posts }: { posts: any[] }) {
  if (!posts?.length) {
    return (
      <p className="text-center text-gray-500 mt-6">
        No posts yet. Create your first post!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 mt-3">
      {posts.map((p) => (
        <div key={p.id} className="aspect-square bg-gray-200">
          <img
            src={resolveMediaUrl(imageUrl(p.img_url)) || undefined}
            alt={p.caption ?? ""}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
