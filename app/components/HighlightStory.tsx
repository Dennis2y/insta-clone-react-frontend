import type { Highlight } from "../schemas/highlight.schema";

/**
 * HighlightStory
 * - simple full-screen style story view
 * - later you can expand this to multiple slides, progress bars, etc.
 */
export function HighlightStory({ highlight }: { highlight: Highlight }) {
  return (
    <div className="mx-auto max-w-lg rounded-xl overflow-hidden border bg-black">
      <div className="p-4 text-white font-semibold">{highlight.title}</div>

      <div className="w-full aspect-[9/16] bg-gray-900">
        <img
          src={highlight.cover_image_url}
          alt={highlight.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
