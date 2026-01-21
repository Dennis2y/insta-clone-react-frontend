import type { LoaderFunctionArgs } from "react-router-dom";
import { fetchJSON } from "../lib/api";
import TaggedGrid from "../components/TaggedGrid";

export async function loader({ request }: LoaderFunctionArgs) {
  return fetchJSON("/api/tagged/grid");
}

export default function Route() {
  return <TaggedGrid />;
}
