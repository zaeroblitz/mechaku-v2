"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="bg-slate-200 border border-slate-700 w-[100px] h-[100px]"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {props.id}
    </div>
  );
}
