const API_ORIGIN =
  (import.meta as any).env?.VITE_API_ORIGIN || "http://127.0.0.1:3000";

export function toImageUrl(value?: string | null) {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_ORIGIN}${value}`;
  return `${API_ORIGIN}/${value}`;
}
