import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CartItemSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 p-2 lg:flex-row lg:p-4">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="size-[120px] rounded-2xl bg-slate-100" />
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-1">
            <Skeleton className="h-6 w-40 rounded-xl bg-slate-100" />
            <Skeleton className="h-6 w-20 rounded-xl bg-slate-100" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-6 w-16 rounded-xl bg-slate-100" />
            <Skeleton className="h-6 w-32 rounded-xl bg-slate-100" />
            <Skeleton className="h-6 w-12 rounded-xl bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
