export function normalizeImageUrl(input: string): string {
  try {
    const url = new URL(input);

    if (url.hostname.includes("images.unsplash.com")) {
      if (!url.searchParams.get("auto")) url.searchParams.set("auto", "format");
      if (!url.searchParams.get("fit")) url.searchParams.set("fit", "crop");
      if (!url.searchParams.get("w")) url.searchParams.set("w", "900");
      if (!url.searchParams.get("q")) url.searchParams.set("q", "80");
    }

    return url.toString();
  } catch {
    return input;
  }
}
