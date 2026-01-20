import { useLoaderData } from "react-router";
import { api } from "~/services/api";
import { resolveMediaUrl } from "~/lib/media";

type Tagged = { id: number; image: string };

export async function loader() {
  const res = await api.get<Tagged[]>("/tagged/grid");
  return res.data;
}

export default function TaggedGrid() {
  const items = useLoaderData() as Tagged[];

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <h2 className="mb-4 text-lg font-semibold text-white">Tagged</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {items.map((t) => (
          <div
            key={t.id}
            className="aspect-square overflow-hidden rounded-xl border border-white/20 bg-white/5"
          >
            <img
              src={resolveMediaUrl(t.image) || undefined}
              alt="tagged"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
