import * as React from "react";
import { Link, useLocation } from "react-router-dom";

function Item({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      aria-label={label}
      style={{
        textDecoration: "none",
        color: "inherit",
        opacity: active ? 1 : 0.7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        minWidth: 56,
      }}
    >
      <div style={{ fontSize: 20, lineHeight: 1 }}>{icon}</div>
    </Link>
  );
}

export default function BottomNav() {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: 64,
        borderTop: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 999,
      }}
    >
      <Item to="/" label="Home" icon="🏠" />
      <Item to="/search" label="Search" icon="🔎" />
      <Item to="/create" label="Create" icon="➕" />
      <Item to="/profile" label="Profile" icon="👤" />
    </div>
  );
}
