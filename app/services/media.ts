const DEFAULT_API_ORIGIN = "http://127.0.0.1:3000";

// If you later deploy, you can set VITE_API_ORIGIN in .env
export const API_ORIGIN =
  (import.meta as any).env?.VITE_API_ORIGIN || DEFAULT_API_ORIGIN;

/**
 * Convert backend-stored paths like "/uploads/abc.jpg"
 * into a browser-loadable absolute URL like "http://127.0.0.1:3000/uploads/abc.jpg"
 */
export function publicUrl(path?: string | null) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  // Ensure single slash join
  if (path.startsWith("/")) return `${API_ORIGIN}${path}`;
  return `${API_ORIGIN}/${path}`;
}
