import React from "react";
import RootLayout from "./app/root";
import Profile from "./app/routes/profile";
import ProfilePostsGrid, { loader as postsGridLoader } from "./app/routes/profile.posts.grid";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProfilePostsGrid />,
        loader: postsGridLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];
