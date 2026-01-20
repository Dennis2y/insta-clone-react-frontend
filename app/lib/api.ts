export async function fetchJSON(request: Request, path: string) {
  // IMPORTANT: use request.url so it becomes http://localhost:5173/api/... (then Vite proxy forwards to 3000)
  const url = new URL(path, request.url);
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Response(text || `Request failed: ${res.status}`, { status: res.status });
  }
  return res.json();
}
