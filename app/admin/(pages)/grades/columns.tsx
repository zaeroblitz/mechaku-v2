// Modules
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Components
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";
import ActionCell from "@/components/admin/grade/ActionCell";

// Types
import { IGrade } from "@/services/grades";

// Utils
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<IGrade>[] = [
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
      const className = isActive
        ? "bg-green-100 text-form-positive border-green-200 hover:bg-green-200"
        : "bg-rose-100 text-form-negative hover:bg-rose-200";

      return <Badge className={`${className} font-light`}>{text}</Badge>;
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
