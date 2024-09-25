// Modules
import React from "react";

// Components
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/shared/datatable/data-table-column-header";

// Libraries
import { formatDate, formatToRupiah } from "@/lib/utils";
import { IProduct } from "@/services/products";
import Image from "next/image";
import ActionCell from "@/components/admin/product/ActionCell";

// Column Types
export interface ISeries {
  id: string;
  title: string;
}

export interface IBrand {
  id: string;
  name: string;
}

export interface IGrade {
  id: string;
  name: string;
}

interface Thumbnail {
  id: string;
  imageUrl: string;
  altText: string;
}

export const columns: ColumnDef<IProduct>[] = [
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
    accessorKey: "images",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Thumbnail" />;
    },
    cell: ({ row }) => {
      const images = row.getValue("images") as Thumbnail[];
      const image = images[0];

      return (
        <Image
          src={image.imageUrl}
          alt={image.altText}
          width={100}
          height={100}
          objectFit="cover"
          className="size-auto rounded-lg"
          style={{
            width: "auto",
            height: "auto",
          }}
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return <div className="line-clamp-2 w-[200px]">{name}</div>;
    },
  },
  {
    accessorKey: "series.id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Series" />;
    },
    cell: ({ row }) => {
      const title = row.original.series.title;

      return <div className="line-clamp-2 w-[200px]">{title}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return filterValue.includes(value.toString());
    },
  },
  {
    accessorKey: "brand.id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Brand" />;
    },
    cell: ({ row }) => {
      const brandName = row.original.brand?.name ?? "";

      return <div className="line-clamp-2 w-[200px]">{brandName}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return filterValue.includes(value?.toString());
    },
  },
  {
    accessorKey: "grade.id",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Grade" />;
    },
    cell: ({ row }) => {
      const gradeName = row.original.grade?.name ?? "";

      return <div className="line-clamp-2 w-[200px]">{gradeName}</div>;
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return filterValue.includes(value.toString());
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Price" />;
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as string;
      const formattedPrice = formatToRupiah(Number(price));

      return (
        <div className="w-[150px] font-semibold text-emerald-500">
          {formattedPrice}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Qty" />;
    },
  },
  {
    accessorKey: "dimensions",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Dimensions" />;
    },
  },
  {
    accessorKey: "weight",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Weight" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.original.status;
      let className;
      switch (status) {
        case "DRAFT":
          className = "bg-neutral-50 text-neutral-500";
          break;

        case "AVAILABLE":
          className = "bg-emerald-50 text-emerald-500";
          break;

        case "ARCHIVED":
          className = "bg-orange-50 text-orange-500";
          break;

        case "SOLDOUT":
          className = "bg-pink-50 text-pink-500";
          break;

        default:
          break;
      }

      return (
        <div
          className={`${className} w-[150px] rounded-xl px-3 py-2 text-center font-semibold`}
        >
          {status}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId) as string;
      return filterValue.includes(value.toString());
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

      return <div className="w-[220px]">{formattedDate}</div>;
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

      return <div className="w-[220px]">{formattedDate}</div>;
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
