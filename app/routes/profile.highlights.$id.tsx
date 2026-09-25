import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { api } from "../services/api";
import { highlightSchema, type Highlight } from "../schemas/highlight.schema";
import { HighlightStory } from "../components/HighlightStory";

/**
 * Loader
 * - uses dynamic param :id (from filename $id)
 * - fetches one highlight
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const highlightId = params.id;

  if (!highlightId) {
    throw new Response("Missing id", { status: 400 });
  }

  try {
    const res = await api.get(`/highlights/${highlightId}`);
    return highlightSchema.parse(res.data);
  } catch (err) {
    console.error("Failed to load highlight:", err);
    throw new Response("Highlight not found", { status: 404 });
  }
}

export default function HighlightDetail() {
  const highlight = useLoaderData() as Highlight;
  return <HighlightStory highlight={highlight} />;
}
