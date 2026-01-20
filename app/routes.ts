import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  route("", "routes/_layout.tsx", [
    index("routes/_index.tsx"),
    route("reels", "routes/reels.tsx"),
    route("tagged", "routes/tagged.tsx"),
    route("highlights", "routes/highlights.tsx"),
    route("search", "routes/search.tsx"),
    route("create", "routes/create.tsx"),

    // profile routes
    route("profile", "routes/profile.tsx"),
    route("profile/posts/grid", "routes/profile.posts.grid.tsx"),
    route("profile/reels/grid", "routes/profile.reels.grid.tsx"),
    route("profile/tagged/grid", "routes/profile.tagged.grid.tsx"),
    route("profile/highlights", "routes/profile.highlights.tsx"),
  ]),
] satisfies RouteConfig;
