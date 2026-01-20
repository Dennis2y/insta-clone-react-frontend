import React from "react";
import { useLoaderData } from "react-router";

export default function ProfileReels() {
  const data: any = useLoaderData();
  return (
    <div className="grid grid-cols-3 gap-1">
      {data.reels.map((r: any) => (
        <div key={r.id} className="aspect-square bg-black" />
      ))}
    </div>
  );
}
