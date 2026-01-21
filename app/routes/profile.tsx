import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function Profile() {
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 12 }}>Profile</h2>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <NavLink to="posts/grid">Posts</NavLink>
        <NavLink to="reels/grid">Reels</NavLink>
        <NavLink to="tagged/grid">Tagged</NavLink>
        <NavLink to="highlights/grid/1">Highlights</NavLink>
      </div>

      <Outlet />
    </div>
  );
}
