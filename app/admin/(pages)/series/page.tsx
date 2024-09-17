"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Header from "@/components/admin/Header";
import SeriesCard from "@/components/admin/series/SeriesCard";
import SeriesSkeleton from "@/components/admin/series/SeriesSkeleton";
import EmptyState from "@/components/shared/EmptyState";
import { ISeries, useGetAllSeriesQuery } from "@/services/series";

const Page = () => {
  const { data: series, isLoading } = useGetAllSeriesQuery();
  console.log(series);

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Series" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Link
            href="/admin/series/create"
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3"
          >
            <Plus size={16} color="white" />
            <p className="text-center font-lexend text-white">Add New Series</p>
          </Link>
        </div>

        <div className="flex w-full flex-wrap gap-10">
          {isLoading ? (
            [0, 1, 2, 3, 4, 5].map((val) => (
              <SeriesSkeleton key={`series-skeleton-${val}`} />
            ))
          ) : series && series.data.length > 0 ? (
            series.data.map((item: ISeries) => (
              <SeriesCard key={item.id} item={item} />
            ))
          ) : (
            <EmptyState text="Oops, No product series found!" />
          )}
        </div>
      </main>
    </section>
  );
};

export default Page;
