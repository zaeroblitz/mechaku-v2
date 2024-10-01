// Modules
import React from "react";
import { Table } from "@tanstack/react-table";

// Components
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/shared/datatable/data-table-view-options";
import ResetButton from "@/components/admin/ResetButton";

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
            placeholder="Filter role name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
        </div>
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
