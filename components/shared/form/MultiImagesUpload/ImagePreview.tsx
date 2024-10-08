import React from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function ImagePreview({
  url,
  index,
  order,
}: {
  url: string;
  index: number;
  order: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="relative aspect-[16/9] rounded-2xl"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Image
        src={url}
        alt={`preview-image-${index}"}`}
        width={180}
        height={180}
        className="rounded-2xl object-cover"
      />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-neutral-800 opacity-80 mix-blend-multiply" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="text-center text-4xl font-bold text-white">
          {order + 1}
        </span>
      </div>
    </div>
  );
}
