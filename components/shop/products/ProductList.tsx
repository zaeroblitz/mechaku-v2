"use client";

import React, { useState } from "react";
import Filter from "./Filter";
import ProductCard from "./ProductCard";

// Services
import { useGetAllSeriesQuery } from "@/services/series";
import { useGetAllBrandsQuery } from "@/services/brands";
import { useGetAllGradesQuery } from "@/services/grades";
import { useGetProductsQuery } from "@/services/products";
import { Skeleton } from "@/components/ui/skeleton";
import TextInput from "@/components/shared/utils/TextInput";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import SingleSelect from "@/components/shared/utils/SingleSelect";
import EmptyState from "@/components/shared/state/EmptyState";

export default function ProductList() {
  const [query, setQuery] = useState<URLSearchParams>(new URLSearchParams());
  const [nameQuery, setNameQuery] = useState("");

  // Queries
  const { data: series, isLoading: seriesLoading } = useGetAllSeriesQuery({
    isActive: "active",
  });
  const { data: brands, isLoading: brandsLoading } = useGetAllBrandsQuery({
    isActive: "active",
  });
  const { data: grades, isLoading: gradesLoading } = useGetAllGradesQuery({
    isActive: "active",
  });
  const { data: products, isLoading: producstLoading } = useGetProductsQuery(
    query.toString()
  );

  const isLoading =
    seriesLoading || brandsLoading || gradesLoading || producstLoading;

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex justify-between">
            <div className="flex w-full flex-col gap-2 md:flex-row">
              <TextInput
                placeholder="Find your favourite collection"
                icon={<Search size={16} />}
                onChange={(value) => setNameQuery(value)}
              />

              <Button
                className="h-[48px] rounded-3xl bg-accent-purple px-12 text-center font-poppins font-semibold text-white lg:h-[56px]"
                onClick={() => {
                  const newQuery = new URLSearchParams(query);

                  if (nameQuery) {
                    newQuery.set("name", nameQuery);
                  } else {
                    newQuery.delete("name");
                  }

                  setQuery(newQuery);
                }}
              >
                Search
              </Button>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <SingleSelect
                label="Sort by"
                placeholder="Sort by"
                options={[
                  { label: "Newest", value: "newest" },
                  { label: "Lowest Price", value: "lowest_price" },
                  { label: "Highest Price", value: "highest_price" },
                ]}
                onSelectChange={(value) => {
                  const newQuery = new URLSearchParams(query);

                  if (value) {
                    newQuery.set("sortBy", value);
                  } else {
                    newQuery.delete("sortBy");
                  }

                  setQuery(newQuery);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <div className="flex items-center justify-between gap-3">
              <Filter
                series={series?.data}
                brands={brands?.data}
                grades={grades?.data}
                onFilterChange={(values) => {
                  const newQuery = new URLSearchParams(query);

                  if (values.series) {
                    newQuery.delete("series");
                    values.series.forEach((seriesId) =>
                      newQuery.append("series", seriesId)
                    );
                  }

                  if (values.brands) {
                    newQuery.delete("brands");
                    values.brands.forEach((brand) =>
                      newQuery.append("brands", brand)
                    );
                  }

                  if (values.grades) {
                    newQuery.delete("grades");
                    values.grades.forEach((grade) =>
                      newQuery.append("grades", grade)
                    );
                  }

                  if (values.minPrice) {
                    newQuery.set("minPrice", values.minPrice.toString());
                  } else {
                    newQuery.delete("minPrice");
                  }

                  if (values.maxPrice) {
                    newQuery.set("maxPrice", values.maxPrice.toString());
                  } else {
                    newQuery.delete("maxPrice");
                  }

                  setQuery(newQuery);
                }}
              />

              <div className="block lg:hidden">
                <SingleSelect
                  label="Sort by"
                  width={180}
                  placeholder="Sort by"
                  options={[
                    { label: "Newest", value: "newest" },
                    { label: "Lowest Price", value: "lowest_price" },
                    { label: "Highest Price", value: "highest_price" },
                  ]}
                  onSelectChange={(value) => {
                    const newQuery = new URLSearchParams(query);

                    if (value) {
                      newQuery.set("sortBy", value);
                    } else {
                      newQuery.delete("sortBy");
                    }

                    setQuery(newQuery);
                  }}
                />
              </div>
            </div>
            <div className="flex h-fit w-full flex-wrap gap-x-8 gap-y-4 lg:gap-x-8 lg:gap-y-6">
              {products &&
                products.data.length > 0 &&
                products.data.map((product) => (
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

              {!products ||
                (products.data.length === 0 && (
                  <div className="flex-center flex size-full">
                    <EmptyState text="No products found." />
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
      <Skeleton className="block h-[50px] w-[240px] rounded-lg bg-slate-200 lg:hidden" />
      <Skeleton className="hidden h-[800px] w-[700px] rounded-2xl bg-slate-200 lg:block" />

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
    </div>
  );
}
