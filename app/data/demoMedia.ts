export type DemoItem = { id: number; image: string };

// Demo images (replace later if you want)
export const DEMO_IMAGES: DemoItem[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
  },
];

export function pickDemo(count = 12) {
  const out: DemoItem[] = [];
  for (let i = 0; i < count; i++) out.push(DEMO_IMAGES[i % DEMO_IMAGES.length]);
  return out.map((x, idx) => ({ ...x, id: idx + 1 }));
}
