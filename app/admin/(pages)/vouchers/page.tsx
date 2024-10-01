"use client";

// Modules
import React from "react";
import { useRouter } from "next/navigation";

// Icons
import { Ellipsis, Plus } from "lucide-react";

// Shadncn Components
import { Button } from "@/components/ui/button";

// Custom Components
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";

// Query
import { useGetAllVouchersQuery } from "@/services/vouchers";

export default function Page() {
  const router = useRouter();

  const { data: vouchers, isLoading, isError } = useGetAllVouchersQuery({});

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Vouchers" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          <div className="mb-10 flex">
            <Button
              onClick={() => router.push("/admin/vouchers/create")}
              className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6"
            >
              <Plus size={16} color="white" />
              <p className="text-center font-lexend text-white">
                Add New Voucher
              </p>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex h-[480px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Ellipsis size={32} color="#333333" className="animate-pulse" />
                <p className="text-center font-lexend text-gray-500">
                  Loading...
                </p>
              </div>
            </div>
          ) : isError ? (
            <ErrorState text="There was something went wrong." />
          ) : vouchers && vouchers.data.length > 0 ? (
            <div className="max-w-screen-2xl overflow-x-auto rounded-2xl bg-white p-6 md:p-8">
              <DataTable columns={columns} data={vouchers.data} />
            </div>
          ) : (
            <EmptyState text="No vouchers data found!" />
          )}
        </main>
      </section>
    </>
  );
}
