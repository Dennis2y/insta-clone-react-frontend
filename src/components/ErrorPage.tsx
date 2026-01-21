import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const err: any = useRouteError();
  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Route Error</h2>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        {String(err?.message || err)}
      </pre>
    </div>
  );
}
