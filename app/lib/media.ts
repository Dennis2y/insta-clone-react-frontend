const API_BASE = "http://127.0.0.1:3000";

/**
 * Never throw. Always return "" if input is missing/invalid.
 * - absolute http(s) urls: return as-is
 * - "/uploads/..." or any "/..." path: prefix with API_BASE
 * - "uploads/..." or "file.jpg": also prefix
 */
export function resolveMediaUrl(raw?: unknown): string {
  if (typeof raw !== "string") return "";
  const s = raw.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return `${API_BASE}${s}`;
  return `${API_BASE}/${s}`;
}
