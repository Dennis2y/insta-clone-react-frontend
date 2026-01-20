import { redirect } from "react-router";

export function loader() {
  return redirect("/profile/posts/grid");
}

export default function ProfileIndex() {
  return null;
}
