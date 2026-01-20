import type { RouteObject } from "react-router";

export function PostsGrid({ posts }: { posts: any[] }) {
  return (
    <div className="grid grid-cols-3 gap-1 w-full max-w-3xl mx-auto p-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-black flex items-center justify-center overflow-hidden rounded"
        >
          <img
            src={post.image_url}
            alt={post.caption ?? ""}
            className="max-w-full max-h-full object-contain block"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

const profilePostsGridRoutes: RouteObject[] = [
  {
    path: "/profile/posts/grid",
    element: <PostsGrid posts={[]} />,
  },
];

export default profilePostsGridRoutes;
