import * as React from "react";
import BottomNav from "./components/BottomNav";

export default function App({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", paddingBottom: 72 }}>
      {children}
      <BottomNav />
    </div>
  );
}
