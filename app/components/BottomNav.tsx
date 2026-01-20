import { NavLink } from "react-router";

function Icon({ name }: { name: "home" | "search" | "plus" | "profile" }) {
  const common = { width: 22, height: 22, fill: "none" as const, stroke: "currentColor", strokeWidth: 1.8 };
  if (name === "home")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5z" />
      </svg>
    );
  if (name === "search")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
    );
  if (name === "plus")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </svg>
  );
}

function Item({ to, icon }: { to: string; icon: "home" | "search" | "plus" | "profile" }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        width: 56,
        height: 44,
        display: "grid",
        placeItems: "center",
        borderRadius: 12,
        textDecoration: "none",
        color: "var(--text)",
        opacity: isActive ? 1 : 0.75,
        background: isActive ? "var(--card)" : "transparent",
      })}
    >
      <Icon name={icon} />
    </NavLink>
  );
}

export default function BottomNav() {
  return (
    <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
      <div style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-around", maxWidth: 900, margin: "0 auto" }}>
        <Item to="/" icon="home" />
        <Item to="/search" icon="search" />
        <Item to="/create" icon="plus" />
        <Item to="/profile" icon="profile" />
      </div>
    </div>
  );
}
