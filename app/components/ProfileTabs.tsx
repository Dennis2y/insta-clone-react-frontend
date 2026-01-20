import * as React from "react";
import { NavLink } from "react-router";

const tabs = [
  { to: "/", label: "Posts", end: true },
  { to: "/reels", label: "Reels" },
  { to: "/tagged", label: "Tagged" },
  { to: "/highlights", label: "Highlight" },
];

export default function ProfileTabs() {
  return (
    <div style={{ borderBottom: "2px solid var(--border)" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingTop: 16,
          paddingBottom: 10,
        }}
      >
        {tabs.map((t) => (
          <NavLink
            key={t.label}
            to={t.to}
            end={(t as any).end}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: "var(--text)",
              fontWeight: isActive ? 800 : 600,
              textAlign: "center",
              paddingBottom: 14,
              borderBottom: isActive ? "4px solid var(--text)" : "4px solid transparent",
              minWidth: 120,
            })}
          >
            {t.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
