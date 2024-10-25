"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useGetAllWishlistsQuery } from "@/services/wishlists";
import EmptyState from "@/components/shared/state/EmptyState";
import ProductCard from "../products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function WishlistItems() {
  const { data: session } = useSession();
  const { data: wishlists, isLoading } = useGetAllWishlistsQuery({
    userId: session?.user.id,
  });

  return (
    <div className="flex h-fit w-full flex-wrap gap-x-8 gap-y-4 lg:gap-x-8 lg:gap-y-6">
      {isLoading && <LoadingSkeleton />}

      {!isLoading &&
        wishlists &&
        wishlists.data.length > 0 &&
        wishlists.data.map((item) => (
          <ProductCard
            key={item.id}
            id={item.product.id}
            slug={item.product.slug}
            name={item.product.name}
            imageUrl={item.product.images[0].imageUrl}
            series={item.product.series.title}
            price={item.product.price}
          />
        ))}

      {!wishlists ||
        (wishlists.data.length === 0 && (
          <div className="flex-center flex size-full">
            <EmptyState text="You don't have any wishlists yet." />
          </div>
        ))}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
      <Skeleton className="h-[320px] w-[180px] rounded-2xl bg-slate-200 lg:w-[240px]" />
    </div>
  );
}
