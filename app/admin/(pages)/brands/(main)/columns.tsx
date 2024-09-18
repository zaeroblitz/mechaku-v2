"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Copy, Pencil, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IBrand } from "@/services/brands";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";

const handleCopyId = (id: string) => {
  navigator.clipboard.writeText(id);
};

export const columns: ColumnDef<IBrand>[] = [
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
        ? "bg-green-100 text-form-positive border-green-200"
        : "bg-rose-100 text-form-negative";

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
    cell: ({ row }) => {
      const brand = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex flex-col rounded-xl bg-white p-2 font-inter"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-200" />
            <DropdownMenuItem
              className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
              onClick={() => handleCopyId(brand.id)}
            >
              <Copy size={10} color="#333333" />
              <span>Copy ID</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100">
              <Pencil size={10} color="#333333" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100">
              <Settings2 size={10} color="#333333" />
              <span>Set to {brand.isActive ? "Inactive" : "Active"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
