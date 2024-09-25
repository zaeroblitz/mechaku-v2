"use client";

// Modules
import React from "react";
import Link from "next/link";

// Icons
import { Plus } from "lucide-react";

// Components
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";
import SeriesCard from "@/components/admin/series/SeriesCard";
import SeriesSkeleton from "@/components/admin/series/SeriesSkeleton";

// Query
import { ISeries, useGetAllSeriesQuery } from "@/services/series";

/* 
 Series List Page
 This component is responsible for displaying a list of all product series.
 It uses the `useGetAllSeriesQuery` hook to fetch the series data from the server.
 If the data is not available, it displays a skeleton animation.
 If there are no series, it displays an empty state message.
 If there are series, it renders a list of series cards.
*/

export default function Page() {
  const { data: series, isLoading } = useGetAllSeriesQuery({});

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Series" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <AddNewSeriesButton />
        </div>

        <SeriesList series={series?.data} isLoading={isLoading} />
      </main>
    </section>
  );
}

function AddNewSeriesButton() {
  return (
    <Link
      href="/admin/series/create"
      className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3"
    >
      <Plus size={16} color="white" />
      <p className="text-center font-lexend text-white">Add New Series</p>
    </Link>
  );
}

function SkeletonSeriesList() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((val) => (
        <SeriesSkeleton key={`series-skeleton-${val}`} />
      ))}
    </>
  );
}

function SeriesList({
  series,
  isLoading,
}: {
  series: ISeries[] | undefined;
  isLoading: boolean;
}) {
  return (
    <div className="flex w-full flex-wrap gap-10">
      {isLoading ? (
        <SkeletonSeriesList />
      ) : series && series.length > 0 ? (
        series.map((item) => <SeriesCard key={item.id} item={item} />)
      ) : (
        <EmptyState text="Oops, No product series found!" />
      )}
    </div>
  );
}
