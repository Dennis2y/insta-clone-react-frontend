import type { RouteObject } from "react-router";
import { PostsGrid } from "./routes/profile.posts.grid";

export default [
  { path: "/", element: <>🏠 Home Feed</> },
  { path: "/create", element: <>➕ Create Post</> },
  { path: "/profile", element: <>👤 Profile</> },
  { path: "/profile/posts/grid", element: <PostsGrid posts={[]} /> },
] satisfies RouteObject[];
