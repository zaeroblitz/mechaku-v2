// Modules
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Components
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";
import ActionCell from "@/components/admin/payment-methods/ActionCell";

// Types
import { IPaymentMethod } from "@/services/payment-methods";

// Utils
import { cn, formatDate } from "@/lib/utils";

export const columns: ColumnDef<IPaymentMethod>[] = [
  {
    accessorFn: (_, index) => index + 1,
    id: "no",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="No" />;
    },
    cell: ({ row }) => {
      return <div className="w-fit">{row.getValue("no")}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Created At" />;
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const formattedDate = formatDate(createdAt);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Updated At" />;
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      const formattedDate = formatDate(updatedAt);

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "isActive",
    id: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const isActive = row.getValue("status") as boolean;
      const text = isActive ? "Active" : "Inactive";

      return (
        <Badge
          className={cn(
            "px-4 py-2 lg:px-6 lg:py-3 text-center rounded-2xl font-semibold select-none",
            isActive &&
              "bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-emerald-50 duration-300 transition",
            !isActive &&
              "bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-rose-50 duration-300 transition"
          )}
        >
          {text}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const isActive = row.getValue(columnId) as boolean;
      return filterValue.includes(isActive.toString());
    },
  },
  {
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Actions" />;
    },
    cell: (props) => <ActionCell {...props} />,
  },
];
