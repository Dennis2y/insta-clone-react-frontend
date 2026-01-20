import { useLoaderData } from "react-router";
import { api } from "~/services/api";
import { resolveMediaUrl } from "~/utils/media";

type Reel = { id: number; image: string };

export async function loader() {
  const res = await api.get<Reel[]>("/reels/grid");
  return res.data;
}

export default function ReelsGrid() {
  const items = useLoaderData() as Reel[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h2 className="mb-4 text-lg font-semibold text-white">Reels</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((r) => (
          <div
            key={r.id}
            className="aspect-square overflow-hidden rounded-xl border border-white/20 bg-white/5"
          >
            <img
              src={resolveMediaUrl(r.image) || undefined}
              alt="reel"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
