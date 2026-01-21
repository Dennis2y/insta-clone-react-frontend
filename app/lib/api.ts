const raw = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000";
export const API_BASE = raw.replace(/\/+$/, "");

export function apiUrl(path: string) {
  if (!path.startsWith("/")) path = "/" + path;
  return API_BASE + path;
}

export async function fetchJSON<T>(request: Request, path: string): Promise<T> {
  const url = apiUrl(path);

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text.slice(0, 200)}`);
  }

  if (!ct.includes("application/json")) {
    throw new Error(`Expected JSON, got "${ct || "unknown"}" — ${text.slice(0, 200)}`);
  }

  return JSON.parse(text) as T;
}
