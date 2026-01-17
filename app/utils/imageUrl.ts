/**
 * app/utils/imageUrl.ts
 *
 * Unsplash images often need query params for best rendering.
 * Some components append params using "&" which breaks URLs that have no "?".
 *
 * This helper safely appends params whether or not the URL already has a query string.
 */
export function withImageParams(url: string, params: string) {
  if (!url) return url;
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}${params}`;
}

/**
 * A handy default for Unsplash-style images.
 * (Safe even if the URL already has query params.)
 */
export function withUnsplashDefaults(url: string) {
  return withImageParams(url, "auto=format&fit=crop&w=900&q=80");
}
