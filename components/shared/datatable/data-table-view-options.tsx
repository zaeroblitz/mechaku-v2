"use client";

import { Columns2 } from "lucide-react";
import { Column, Table } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const columns = table.getAllColumns().filter((column) => column.getCanHide());

  const [column1, column2] = columns.reduce(
    (
      result: [Array<Column<TData, unknown>>, Array<Column<TData, unknown>>],
      item,
      index
    ) => {
      const targetArray = index % 2 === 0 ? result[0] : result[1];
      targetArray.push(item);
      return result;
    },
    [[], []]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-2 rounded-2xl px-6 py-3 font-poppins"
        >
          <Columns2 size={16} color="#333333" /> Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-xl bg-white p-3 font-poppins"
      >
        <DropdownMenuLabel>View Columns</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-neutral-200" />
        <div className="grid grid-cols-2 gap-2">
          <div>
            {column1.map((column) => {
              const columnId = column.id.replace("_id", "");

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="cursor-pointer rounded-xl font-poppins capitalize hover:bg-neutral-100"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnId}
                </DropdownMenuCheckboxItem>
              );
            })}
          </div>
          <div>
            {column2.map((column) => {
              const columnId = column.id.replace("_id", "");

              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="cursor-pointer rounded-xl font-poppins capitalize hover:bg-neutral-100"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnId}
                </DropdownMenuCheckboxItem>
              );
            })}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
