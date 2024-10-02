// Modules
import React from "react";
import { Table } from "@tanstack/react-table";

// Components
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/shared/datatable/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/shared/datatable/data-table-faceted-filter";
import ResetButton from "@/components/admin/ResetButton";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  roleData: string[];
}

export function DataTableToolbar<TData>({
  table,
  roleData,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex flex-col gap-4 py-4 font-poppins">
        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            className="max-w-sm rounded-2xl border border-form-border bg-slate-50 p-6 text-form-input"
            placeholder="Filter admin username..."
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
          />

          {table.getColumn("role_name") && (
            <DataTableFacetedFilter
              column={table.getColumn("role_name")}
              title="Role"
              options={roleData.map((role) => ({
                label: role,
                value: role,
              }))}
            />
          )}

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
            <ResetButton handleClick={() => table.resetColumnFilters()} />
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </>
  );
}
