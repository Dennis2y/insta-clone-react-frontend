import { Link, useLocation } from "react-router";

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const active = pathname.startsWith(to.replace(/\/$/, ""));
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </Link>
  );
}

export default function BottomNav() {
  return (
    <nav
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        borderTop: "1px solid #eee",
        background: "white",
        padding: 12,
        display: "flex",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <NavItem to="/profile/posts/grid" label="Posts" />
      <NavItem to="/profile/reels/grid" label="Reels" />
    </nav>
  );
}
