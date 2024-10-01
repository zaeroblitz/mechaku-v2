// Modules
import React from "react";
import { ColumnDef } from "@tanstack/react-table";

// Components
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";
import ActionCell from "@/components/admin/voucher/ActionCell";

// Types
import { IVoucher } from "@/services/vouchers";

// Utils
import { cn, formatDate, formatToRupiah } from "@/lib/utils";

export const columns: ColumnDef<IVoucher>[] = [
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
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Code"
          className="w-[180px]"
        />
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Type"
          className="w-[180px]"
        />
      );
    },
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      const value = type.replace("_", " ");

      return (
        <div
          className={cn(
            "px-4 py-2 lg:px-6 lg:py-3 rounded-2xl text-center select-none font-semibold",
            type === "PERCENTAGE" &&
              "bg-orange-50 text-orange-500 hover:bg-orange-500 hover:text-orange-50 duration-300 transition",
            type === "FIXED_AMOUNT" &&
              "bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-emerald-50 duration-300 transition"
          )}
        >
          {value}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const type = row.getValue(columnId) as string;
      return filterValue.includes(type.toString());
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Value" />;
    },
    cell: ({ row }) => {
      const value = row.getValue("value") as number;
      let formattedValue;

      if (row.original.type === "FIXED_AMOUNT") {
        formattedValue = formatToRupiah(value);
      } else {
        formattedValue = value;
      }

      return (
        <div
          className={cn(
            "w-[180px] font-semibold",
            row.original.type === "FIXED_AMOUNT" && " text-emerald-500",
            row.original.type === "PERCENTAGE" && " text-orange-500"
          )}
        >
          {formattedValue}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Start Date"
          className="w-[200px]"
        />
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("startDate") as string;
      let formattedDate;

      if (updatedAt) {
        formattedDate = formatDate(updatedAt);
      } else {
        formattedDate = "-";
      }

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="End Date"
          className="w-[200px]"
        />
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("endDate") as string;
      let formattedDate;

      if (updatedAt) {
        formattedDate = formatDate(updatedAt);
      } else {
        formattedDate = "-";
      }

      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "usageLimit",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Usage Limit"
          className="w-[150px]"
        />
      );
    },
  },
  {
    accessorKey: "usageCount",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Usage Count"
          className="w-[150px]"
        />
      );
    },
    cell: ({ row }) => {
      const usageCount = row.getValue("usageCount") as number;

      return <div className="font-medium text-sky-500">{usageCount ?? 0}</div>;
    },
  },
  {
    accessorKey: "minPurchaseAmount",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Min. Purchase" />;
    },
    cell: ({ row }) => {
      const minPurchaseAmount = row.getValue("minPurchaseAmount") as number;
      let formattedValue;

      if (minPurchaseAmount) {
        formattedValue = formatToRupiah(minPurchaseAmount);
      } else {
        formattedValue = "-";
      }

      return (
        <div className="font-semibold text-emerald-500">{formattedValue}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Created At"
          className="w-[200px]"
        />
      );
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
      return (
        <DataTableColumnHeader
          column={column}
          title="Updated At"
          className="w-[200px]"
        />
      );
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
