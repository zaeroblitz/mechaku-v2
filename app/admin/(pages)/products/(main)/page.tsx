"use client";

// Modules
import React from "react";
import Link from "next/link";

// Icons
import { Ellipsis, Plus } from "lucide-react";

// Components
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/EmptyState";
import ErrorState from "@/components/shared/ErrorState";
import { DataTable } from "./data-table";
import { columns } from "./columns";

// Query
import { useGetProductsQuery } from "@/services/products";

export default function Page() {
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Products" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          <div className="mb-10 flex">
            <Link
              href="/admin/products/create"
              className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3"
            >
              <Plus size={16} color="white" />
              <p className="text-center font-lexend text-white">
                Add New Product
              </p>
            </Link>
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
          ) : products && products.data.length > 0 ? (
            <div className="max-w-screen-2xl overflow-x-auto rounded-2xl bg-white p-6 md:p-8">
              <DataTable columns={columns} data={products.data} />
            </div>
          ) : (
            <EmptyState text="No products data found!" />
          )}
        </main>
      </section>
    </>
  );
}
