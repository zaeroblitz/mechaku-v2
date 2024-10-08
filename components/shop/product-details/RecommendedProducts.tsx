"use client";

import React, { useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/services/products";
import ProductCard from "../products/ProductCard";
import { cn } from "@/lib/utils";

export default function RecommendedProducts() {
  const { data: products, isLoading } = useGetProductsQuery("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="mt-20">
      {products && products.data.length > 0 && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <p className="font-inter text-base font-semibold leading-7 text-secondary md:text-lg">
              Recommended Products
            </p>

            <div className="flex gap-4">
              {/* Left Button */}
              <button
                className={cn(
                  "rounded-xl bg-white flex flex-center px-3 py-2 border border-slate-100"
                )}
                onClick={() => scroll("left")}
              >
                ←
              </button>
              {/* Left Button */}
              <button
                className={cn(
                  "rounded-xl bg-white flex flex-center px-3 py-2 border border-slate-100"
                )}
                onClick={() => scroll("right")}
              >
                →
              </button>
            </div>
          </div>

          <div className="flex w-full gap-8 overflow-hidden" ref={scrollRef}>
            {products.data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                name={product.name}
                imageUrl={product.images[0].imageUrl}
                series={product.series.title}
                price={product.price}
              />
            ))}
          </div>
        </div>
      )}
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
    </div>
  );
}
