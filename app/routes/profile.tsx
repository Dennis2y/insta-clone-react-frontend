import { NavLink, Outlet } from "react-router";

export default function ProfileLayout() {
  return (
    <section style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>@demo_user</h2>
        <p style={{ margin: "6px 0 0", color: "#666" }}>Profile</p>
      </div>

      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #eee", paddingBottom: 10 }}>
        <NavLink to="/profile/posts/grid">Posts</NavLink>
        <NavLink to="/profile/reels/grid">Reels</NavLink>
      </div>

      <div style={{ paddingTop: 12 }}>
        <Outlet />
      </div>
    </section>
  );
}
