import React from "react";
import { imageUrl } from "./imageUrl";
import { resolveMediaUrl } from "~/lib/media";

type Tag = { name: string; x: number; y: number };
type Tagged = { id: number; img_url: string; tags?: Tag[]; caption?: string };

export function TaggedGrid({ items }: { items: Tagged[] }) {
  return (
    <div className="gridWrap">
      {items.map((t) => {
        const tags = Array.isArray(t.tags) ? t.tags : [];
        return (
          <div key={t.id} className="tile">
            <img src={resolveMediaUrl(imageUrl(t.img_url)) || undefined} alt={t.caption || "tagged"} />
            <div className="tagLayer">
              {tags.map((tag, i) => {
                const x = typeof tag?.x === "number" ? tag.x : 50;
                const y = typeof tag?.y === "number" ? tag.y : 50;
                const name = typeof tag?.name === "string" ? tag.name : "";
                return (
                  <div
                    key={`${t.id}-${i}`}
                    className="tagChip"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
