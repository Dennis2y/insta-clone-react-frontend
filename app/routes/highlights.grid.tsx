import { useLoaderData } from "react-router";
import { api } from "~/services/api";
import { resolveMediaUrl } from "~/utils/media";

type HighlightItem = { id: number; image: string };

export async function loader({ params }: { params: { id: string } }) {
  const res = await api.get<HighlightItem[]>(`/highlights/grid/${params.id}`);
  return res.data;
}

export default function HighlightsGrid() {
  const items = useLoaderData() as HighlightItem[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h2 className="mb-4 text-lg font-semibold text-white">Highlights</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((h) => (
          <div
            key={h.id}
            className="aspect-square overflow-hidden rounded-xl border border-white/20 bg-white/5"
          >
            <img
              src={resolveMediaUrl(h.image) || undefined}
              alt="highlight"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
