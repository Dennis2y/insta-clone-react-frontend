import { Outlet } from "react-router";
import TopBar from "../components/TopBar";
import ProfileTabs from "../components/ProfileTabs";
import BottomNav from "../components/BottomNav";

export default function Layout() {
  return (
    <div>
      <style>{`
        :root{
          --bg:#ffffff;
          --text:#111111;
          --border:rgba(0,0,0,0.18);
          --muted:rgba(0,0,0,0.62);
          --cardBorder:rgba(0,0,0,0.18);
        }
        :root[data-theme="dark"]{
          --bg:#0b0b0b;
          --text:#f5f5f5;
          --border:rgba(255,255,255,0.20);
          --muted:rgba(255,255,255,0.70);
          --cardBorder:rgba(255,255,255,0.28);
        }
        body{ margin:0; background:var(--bg); color:var(--text); font-family: system-ui,-apple-system,Segoe UI,Roboto,Arial; }
        a{ color:inherit; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 72 }}>
        <TopBar />
        <ProfileTabs />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 24px" }}>
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
