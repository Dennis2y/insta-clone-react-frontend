export function imageUrl(path?: string | null): string | null {

  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `http://127.0.0.1:3000${path}`;
}
