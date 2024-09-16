import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SeriesSkeleton = () => {
  return (
    <Skeleton className="h-[320px] w-[480px] animate-pulse overflow-hidden rounded-2xl bg-slate-200" />
  );
};

export default SeriesSkeleton;
