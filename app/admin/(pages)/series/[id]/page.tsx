"use client";

// Modules
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Icons
import { MoveLeft, Pencil, Settings2, LoaderCircle } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";

// Types
import { ParamsProps } from "@/types";

// Utils
import { formatDate } from "@/lib/utils";

// Query
import {
  useGetSeriesByIdQuery,
  useUpdateSeriesStatusMutation,
} from "@/services/series";

export default function Page({ params }: ParamsProps) {
  const router = useRouter();
  const { toast } = useToast();

  // eslint-disable-next-line no-undef
  let debounceTimeout: NodeJS.Timeout | null = null;

  const { data: series, isLoading } = useGetSeriesByIdQuery(params.id);
  const [updateSeriesStatus, { isLoading: updateLoading }] =
    useUpdateSeriesStatusMutation();

  const handleUpdateStatus = async () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(async () => {
      try {
        await updateSeriesStatus({
          id: params.id,
          isActive: series!.data.isActive,
        });

        toast({
          title: "Success!",
          description: "Series status updated successfully!",
          className: "rounded-xl bg-emerald-50 text-emerald-800",
        });
      } catch (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem when updating series status.",
          className: "rounded-xl bg-rose-50 text-rose-800",
        });
      }
    }, 500);
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Series Details" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3 hover:bg-accent-purple/50"
            onClick={() => router.push("/admin/series")}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        {isLoading ? (
          <>
            <Skeleton className="mb-2 h-[480px] w-full animate-pulse rounded-2xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-3/4 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-3/4 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="h-[120px] w-3/4 animate-pulse rounded-2xl bg-slate-200" />
          </>
        ) : (
          <div className="flex w-full rounded-3xl bg-white p-10 xl:w-1/2">
            {series?.data ? (
              <div className="flex w-full flex-col font-lexend">
                <div className="mb-6 flex justify-end">
                  <div className="flex gap-2">
                    <Button
                      className="gap-2 rounded-2xl bg-neutral-200 px-8 py-2 text-center font-lexend text-xs text-accent-gray-alt hover:bg-neutral-300 lg:text-sm"
                      onClick={() => handleUpdateStatus()}
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <LoaderCircle
                          size={16}
                          color="#737373"
                          className="animate-spin"
                        />
                      ) : (
                        <Settings2 size={16} color="#737373" />
                      )}
                      {updateLoading
                        ? "Updating Status.."
                        : `Set to ${series.data.isActive ? "Inactive" : "Active"}`}
                    </Button>
                    <Button
                      className="gap-2 rounded-2xl bg-primary px-8 py-2 text-center font-lexend text-xs text-white lg:text-sm"
                      onClick={() =>
                        router.push(`/admin/series/edit/${series.data.id}`)
                      }
                    >
                      <Pencil size={16} color="white" /> Edit Series
                    </Button>
                  </div>
                </div>

                <Image
                  src={series.data.image}
                  alt={series.data.title}
                  width={480}
                  height={320}
                  className="mb-5 size-auto rounded-2xl object-cover"
                />

                <div className="mb-3 flex justify-start">
                  {series.data.isActive ? (
                    <Badge className="w-fit bg-form-positive px-2 py-1 text-center text-white">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="w-fit bg-form-negative px-2 py-1 text-center text-white">
                      Inactive
                    </Badge>
                  )}
                </div>

                <h2 className="mb-2 text-2xl font-bold text-primary">
                  {series.data.title}
                </h2>

                <p className="mb-1 text-base text-subtitle">
                  <span className="font-bold">Created At</span>:{" "}
                  {formatDate(series.data.createdAt)}
                </p>
                <p className="mb-1 text-base text-subtitle">
                  <span className="font-bold">Updated At</span>:{" "}
                  {formatDate(series.data.updatedAt)}
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
}
