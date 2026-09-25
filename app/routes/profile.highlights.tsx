import { useLoaderData } from "react-router";
import { api } from "../services/api";
import { highlightsSchema, type Highlight } from "../schemas/highlight.schema";
import { HighlightBubble } from "../components/HighlightBubble";

/**
 * Loader
 * - fetch highlights list from backend
 */
export async function loader() {
  try {
    const res = await api.get("/highlights");
    return highlightsSchema.parse(res.data);
  } catch (err) {
    console.error("Failed to load highlights:", err);
    throw new Response("Could not load highlights.", { status: 500 });
  }
}

export default function HighlightsList() {
  const highlights = useLoaderData() as Highlight[];

  if (highlights.length === 0) {
    return <p className="text-center text-gray-500">No highlights yet.</p>;
  }

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {highlights.map((h) => (
        <HighlightBubble key={h.id} highlight={h} />
      ))}
    </div>
  );
}
