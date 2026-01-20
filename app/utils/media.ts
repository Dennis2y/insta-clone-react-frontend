export const BACKEND_ORIGIN =
  (import.meta as any).env?.VITE_API_ORIGIN || "http://127.0.0.1:3000";

export function resolveMediaUrl(src: string) {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/uploads/")) return `${BACKEND_ORIGIN}${src}`;
  return src;
}
