import React from "react";
import { Navigate } from "react-router-dom";

import Profile from "./routes/profile";
import ProfilePosts from "./routes/profile.posts";
import ProfilePostsGrid from "./routes/profile.posts.grid";
import ReelsGrid from "./routes/reels.grid";
import TaggedGrid from "./routes/tagged.grid";
import HighlightsGrid from "./routes/highlights.grid";

const routes = [
  {
    path: "/profile",
    element: <Profile />,
    children: [
      {
        index: true,
        element: <Navigate to="posts/grid" replace />,
      },
      {
        path: "posts",
        element: <ProfilePosts />,
      },
      {
        path: "posts/grid",
        element: <ProfilePostsGrid />,
      },
      {
        path: "reels/grid",
        element: <ReelsGrid />,
      },
      {
        path: "tagged/grid",
        element: <TaggedGrid />,
      },
      {
        path: "highlights/grid/:id",
        element: <HighlightsGrid />,
      },
    ],
  },

  // fallback → redirect to profile
  {
    path: "*",
    element: <Navigate to="/profile/posts/grid" replace />,
  },
];

export default routes;
