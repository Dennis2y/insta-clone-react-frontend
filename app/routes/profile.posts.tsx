import { useLoaderData } from "react-router";
import PostsGrid from "../components/PostsGrid";
import { api } from "../services/api";

export async function loader() {
  const res = await api.get("/posts");
  return { posts: res.data };
}

export default function ProfilePosts() {
  const data = useLoaderData() as { posts: any[] };

  return <PostsGrid posts={data.posts} />;
}
