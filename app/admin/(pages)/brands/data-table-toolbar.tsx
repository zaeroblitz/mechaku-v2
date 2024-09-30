// Modules
import React from "react";
import { Table } from "@tanstack/react-table";

// Icons
import { XIcon } from "lucide-react";

// Components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/shared/datatable/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/shared/datatable/data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex flex-col gap-4 py-4 font-poppins">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            className="max-w-sm rounded-2xl border border-form-border bg-slate-50 p-6 text-form-input"
            placeholder="Filter brand name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={[
                {
                  value: "true",
                  label: "Active",
                },
                {
                  value: "false",
                  label: "Inactive",
                },
              ]}
            />
          )}
        </div>
        <div className="flex w-fit">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="gap-2 rounded-xl bg-rose-50 px-5 py-2 text-center text-rose-400"
            >
              <XIcon className="size-4" />
              Reset
            </Button>
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </>
  );
}
