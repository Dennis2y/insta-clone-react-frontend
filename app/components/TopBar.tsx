import { useEffect, useState } from "react";

function applyTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

export default function TopBar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as "light" | "dark" | null) ?? "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          height: 56,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>Instagram</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={toggle}
            style={{
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--text)",
              borderRadius: 999,
              padding: "6px 10px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 12,
            }}
            title="Toggle theme"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          {/* REAL RED HEART */}
          <button
            type="button"
            aria-label="Likes"
            style={{
              width: 34,
              height: 34,
              borderRadius: 999,
              display: "grid",
              placeItems: "center",
              border: "1px solid var(--border)",
              background: "transparent",
              cursor: "pointer",
            }}
            title="Likes"
          >
            <span style={{ color: "#ff2d55", fontSize: 18, lineHeight: 1 }}>♥</span>
          </button>
        </div>
      </div>
    </div>
  );
}
