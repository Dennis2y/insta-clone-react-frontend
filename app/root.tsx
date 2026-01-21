import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <h1 style={{ textAlign: "center" }}>
        RootLayout is rendering ✅
      </h1>

      <Outlet />
    </div>
  );
}
