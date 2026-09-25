/**
 * app/routes/profile.tsx
 *
 * Profile layout with tabs.
 * Each tab links to a nested route under /profile.
 */

import { NavLink, Outlet } from "react-router";

const activeLinkStyle: React.CSSProperties = {
  borderBottom: "2px solid #fff",
  paddingBottom: 8,
};

export default function ProfileLayout() {
  return (
    <section style={{ padding: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>@demo_user</h2>
        <p style={{ margin: "6px 0 0", color: "#666" }}>Profile</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 16, borderBottom: "1px solid #333", paddingBottom: 10 }}>
        <NavLink
          to="/profile/posts/grid"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Posts
        </NavLink>

        <NavLink
          to="/profile/reels/grid"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Reels
        </NavLink>

        <NavLink
          to="/profile/tagged/grid"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Tagged
        </NavLink>

        <NavLink
          to="/profile/highlights"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Highlights
        </NavLink>
      </div>

      {/* Active tab content */}
      <div style={{ paddingTop: 12 }}>
        <Outlet />
      </div>
    </section>
  );
}
