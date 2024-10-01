// Modules
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Components
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";
import ActionCell from "@/components/admin/role/ActionCell";

// Types
import { IRole } from "@/services/roles";

// Utils
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<IRole>[] = [
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
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Name"
          className="w-[200px]"
        />
      );
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
    id: "actions",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Actions" />;
    },
    cell: (props) => <ActionCell {...props} />,
  },
];
