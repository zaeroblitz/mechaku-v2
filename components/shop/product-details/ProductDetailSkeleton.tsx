import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 px-6 md:px-10 xl:px-16">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-center flex flex-col gap-6">
          <Skeleton className="size-[320px] rounded-2xl bg-slate-200 md:size-[500px]" />
          <div className="flex gap-4">
            <Skeleton className="size-[50px] rounded-lg bg-slate-200" />
            <Skeleton className="size-[50px] rounded-lg bg-slate-200" />
            <Skeleton className="size-[50px] rounded-lg bg-slate-200" />
            <Skeleton className="size-[50px] rounded-lg bg-slate-200" />
            <Skeleton className="size-[50px] rounded-lg bg-slate-200" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-[32px] w-[600px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[540px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[500px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[240px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[240px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[240px] rounded-lg bg-slate-200" />
          <Skeleton className="h-[32px] w-[540px] rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-[24px] w-[200px] rounded-lg bg-slate-200" />
        <Skeleton className="h-[300px] w-full rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
