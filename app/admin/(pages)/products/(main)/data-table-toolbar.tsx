// Modules
import React from "react";

// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "@/components/shared/datatable/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/shared/datatable/data-table-faceted-filter";
import ResetButton from "@/components/admin/ResetButton";

// Types
import { IBrand, IGrade, ISeries } from "./columns";

// Utils
import { formatToRupiah } from "@/lib/utils";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  series: ISeries[];
  brands: IBrand[];
  grades: IGrade[];
}

const status = ["DRAFT", "AVAILABLE", "SOLDOUT", "ARCHIVED"];

export function DataTableToolbar<TData>({
  table,
  series,
  brands,
  grades,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex w-full flex-col gap-4 rounded-2xl border border-dashed p-4 font-poppins md:w-fit md:px-8 md:py-6">
        <div className="flex flex-col gap-4">
          {/* Product Name Filter */}
          <div className="flex flex-col gap-2">
            <Label className="text-form-label">Product Name</Label>
            <Input
              className="rounded-2xl border border-form-border bg-slate-50 p-6 text-form-input"
              placeholder="Search product name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
            />
          </div>

          {/* Price Filter */}
          <div className="flex w-full items-center gap-3">
            {table.getColumn("price") && (
              <div className="flex w-full flex-col gap-2 lg:flex-row">
                <div className="flex flex-col gap-2">
                  <Label className="text-form-label">Min Price</Label>
                  <Input
                    className="rounded-2xl border border-form-border bg-slate-50 p-6 text-form-input"
                    placeholder="Min"
                    type="text"
                    value={formatToRupiah(
                      (
                        table.getColumn("price")?.getFilterValue() as [
                          number,
                          number,
                        ]
                      )?.[0] ?? ""
                    )}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^\d]/g, "");
                      const numberValue = Number(numericValue);

                      const currentFilters = (table
                        .getColumn("price")
                        ?.getFilterValue() as [number, number]) ?? [0, 100000];
                      table
                        .getColumn("price")
                        ?.setFilterValue([numberValue, currentFilters[1]]);
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-form-label">Max Price</Label>
                  <Input
                    className="rounded-2xl border border-form-border bg-slate-50 p-6 text-form-input"
                    placeholder="Max"
                    type="text"
                    value={formatToRupiah(
                      (
                        table.getColumn("price")?.getFilterValue() as [
                          number,
                          number,
                        ]
                      )?.[1] ?? ""
                    )}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^\d]/g, "");
                      const numberValue = Number(numericValue);

                      const currentFilters = (table
                        .getColumn("price")
                        ?.getFilterValue() as [number, number]) ?? [0, 100000];
                      table
                        .getColumn("price")
                        ?.setFilterValue([currentFilters[0], numberValue]);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <hr />

          {/* Series & Brand Filter */}
          <div className="flex items-center gap-3">
            {table.getColumn("series_id") && (
              <DataTableFacetedFilter
                column={table.getColumn("series_id")}
                title="Series"
                options={series.map((item) => ({
                  label: item.title,
                  value: item.id,
                }))}
                classname="w-full"
              />
            )}
            {table.getColumn("brand_id") && (
              <DataTableFacetedFilter
                column={table.getColumn("brand_id")}
                title="Brands"
                options={brands.map((item) => ({
                  label: item?.name ?? "",
                  value: item?.id ?? "",
                }))}
                classname="w-full"
              />
            )}
          </div>

          {/* Grade & Status Filter */}
          <div className="flex items-center gap-3">
            {table.getColumn("grade_id") && (
              <DataTableFacetedFilter
                column={table.getColumn("grade_id")}
                title="Grades"
                options={grades.map((item) => ({
                  label: item?.name ?? "",
                  value: item?.id ?? "",
                }))}
                classname="w-full"
              />
            )}
            {table.getColumn("status") && (
              <DataTableFacetedFilter
                column={table.getColumn("status")}
                title="Status"
                options={status.map((item) => ({
                  label: item,
                  value: item,
                }))}
                classname="w-full"
              />
            )}
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex w-fit">
          {isFiltered && (
            <ResetButton handleClick={() => table.resetColumnFilters()} />
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </>
  );
}
