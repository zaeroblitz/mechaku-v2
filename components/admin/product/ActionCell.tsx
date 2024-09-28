"use client";

// Modules
import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Row } from "@tanstack/react-table";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Icons
import { Copy, Info, MoreHorizontal, Pencil } from "lucide-react";

// Props
import { IProduct } from "@/services/products";

interface ActionsCellProps {
  row: Row<IProduct>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const product = row.original;
  console.log("🚀 ~ file: ActionCell.tsx:32 ~ ActionCell ~ product:", product);
  const router = useRouter();
  const { toast } = useToast();

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Product ID copied",
      description: "The product ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  return (
    <>
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
            onClick={() => handleCopyId(product.id)}
          >
            <Copy size={10} color="#333333" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={() => router.push(`/admin/products/${product.id}`)}
          >
            <Info size={10} color="#333333" />
            <span>Open Details</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={() => router.push(`/admin/products/edit/${product.id}`)}
          >
            <Pencil size={10} color="#333333" />
            <span>Edit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionCell;
