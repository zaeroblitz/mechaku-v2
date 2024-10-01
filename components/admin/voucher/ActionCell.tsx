"use client";

// Module
import React from "react";
import { useRouter } from "next/navigation";
import { Row } from "@tanstack/react-table";

// Icons
import { Copy, MoreHorizontal, Pencil, Settings2 } from "lucide-react";

// Shadcn Components
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Services
import { IVoucher, useUpdateVoucherStatusMutation } from "@/services/vouchers";

interface ActionsCellProps {
  row: Row<IVoucher>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const voucher = row.original;
  const { toast } = useToast();
  const router = useRouter();

  const [updateStatus, { isLoading }] = useUpdateVoucherStatusMutation();

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Voucher ID copied",
      description: "The voucher ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  const handleEdit = () => {
    router.push(`/admin/vouchers/edit/${voucher.id}`);
  };

  const handleStatus = async () => {
    try {
      const data = {
        id: voucher.id,
        status: !voucher.isActive,
      };

      await updateStatus(data).unwrap();

      toast({
        title: "Success!",
        description: `Successfully update voucher to ${voucher.isActive ? "Inactive" : "Active"}.`,
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating voucher status.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isLoading}>
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
            onClick={() => handleCopyId(voucher.id)}
          >
            <Copy size={10} color="#333333" />
            <span>Copy ID</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={handleEdit}
          >
            <Pencil size={10} color="#333333" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 rounded-lg hover:cursor-pointer hover:bg-slate-100"
            onClick={handleStatus}
          >
            <Settings2 size={10} color="#333333" />
            <span>Set to {voucher.isActive ? "Inactive" : "Active"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ActionCell;
