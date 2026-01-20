import { useLoaderData, Link } from "react-router";
import { api } from "~/services/api";
import { toImageUrl } from "~/utils/image";
import { pickDemo } from "~/data/demoMedia";

type HighlightItem = {
  id: number | string;
  image?: string | null; // backend returns this
};

export async function loader({ params }: any) {
  const highlightId = params?.id ?? "1";
  try {
    const res = await api.get(`/highlights/grid/${highlightId}`);
    const data = (res.data ?? []) as HighlightItem[];
    return { id: highlightId, items: data.length ? data : pickDemo(6) };
  } catch {
    return { id: highlightId, items: pickDemo(6) };
  }
}

export default function ProfileHighlightsId() {
  const data = useLoaderData() as { id: string; items: HighlightItem[] };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-white/80 mb-4">
        <Link to="/profile/highlights" className="text-white/60 hover:text-white">
          ← Back
        </Link>
        <div className="text-sm">Highlights #{data.id}</div>
        <div />
      </div>

      <div className="grid grid-cols-3 gap-[2px]">
        {data.items.map((it) => {
          const src = it.image ? toImageUrl(it.image) : "";
          return (
            <div key={it.id} className="aspect-square bg-white/5 overflow-hidden">
              {src ? (
                <img
                  src={src}
                  alt="highlight"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white/40 text-xs">
                  No image
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
