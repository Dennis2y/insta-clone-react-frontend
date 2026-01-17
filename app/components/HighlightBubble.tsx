import { Link } from "react-router";
import type { Highlight } from "../schemas/highlight.schema";

/**
 * HighlightBubble
 * - small round bubble used in the highlights list
 * - clicking opens /profile/highlights/:id
 */
export function HighlightBubble({ highlight }: { highlight: Highlight }) {
  return (
    <Link
      to={`/profile/highlights/${highlight.id}`}
      className="flex flex-col items-center gap-2"
    >
      <div className="h-16 w-16 rounded-full overflow-hidden border bg-gray-200">
        <img
          src={highlight.cover_image_url}
          alt={highlight.title}
          className="h-full w-full object-cover"
        />
      </div>
      <p className="text-xs text-gray-700 max-w-[72px] truncate">
        {highlight.title}
      </p>
    </Link>
  );
}
