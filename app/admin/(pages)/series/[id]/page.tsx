"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoveLeft, Pencil } from "lucide-react";
import { ParamsProps } from "@/types";
import { Button } from "@/components/ui/button";
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import { useGetSeriesByIdQuery } from "@/services/series";

const Page = ({ params }: ParamsProps) => {
  const router = useRouter();
  const { data: series, isLoading } = useGetSeriesByIdQuery(params.id);

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Series Details" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3 hover:bg-accent-purple/50"
            onClick={() => router.back()}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        {isLoading ? (
          <>
            <Skeleton className="mb-2 h-[480px] w-1/2 animate-pulse rounded-2xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-24 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-20 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="h-[120px] w-[240px] animate-pulse rounded-2xl bg-slate-200" />
          </>
        ) : (
          <div className="flex w-1/2 rounded-3xl bg-white p-10">
            {series?.data ? (
              <div className="flex w-full flex-col font-lexend">
                <div className="mb-6 flex justify-end">
                  <Button
                    className="gap-2 rounded-2xl bg-primary px-8 py-2 text-center font-lexend text-white"
                    onClick={() =>
                      router.push(`/admin/series/edit/${series.data.id}`)
                    }
                  >
                    <Pencil size={16} color="white" /> Edit Series
                  </Button>
                </div>

                <Image
                  src={series.data.image}
                  alt={series.data.title}
                  width={480}
                  height={320}
                  className="mb-5 size-auto rounded-2xl object-cover"
                />

                <h2 className="mb-2 text-2xl font-bold text-primary">
                  {series.data.title}
                </h2>
                <p className="mb-1 text-base text-subtitle">
                  <span className="font-bold">Created At</span>:{" "}
                  {formatDate(series.data.createdAt)}
                </p>
                {series.data.author && (
                  <p className="mb-1 text-base text-subtitle">
                    <span className="font-bold">Author</span>:{" "}
                    {series.data.author}
                  </p>
                )}
                {series.data.description && (
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold text-subtitle">
                      Description
                    </p>
                    <p className="text-base text-subtitle">
                      {series.data.description}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <EmptyState text="Oops! Series not found." />
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default Page;
