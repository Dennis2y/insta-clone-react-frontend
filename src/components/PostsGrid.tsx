import React from "react";

export function PostsGrid({ posts }: { posts: { id: number; image: string }[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 w-full max-w-3xl mx-auto p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-black flex items-center justify-center overflow-hidden rounded"
        >
          <img
            src={`http://127.0.0.1:3000/uploads/${post.image}`}
            alt=""
            className="max-w-full max-h-full object-cover block w-full h-full"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
