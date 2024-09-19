"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IBrand, useUpdateBrandMutation } from "@/services/brands";
import {
  Copy,
  LoaderCircleIcon,
  MoreHorizontal,
  Pencil,
  SaveIcon,
  Settings2,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewBrandSchema } from "@/lib/validations";
import { Form } from "@/components/ui/form";
import TextInput from "@/components/shared/form/TextInput";

interface ActionsCellProps {
  row: Row<IBrand>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const brand = row.original;
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  const form = useForm<z.infer<typeof NewBrandSchema>>({
    resolver: zodResolver(NewBrandSchema),
    defaultValues: {
      name: brand.name,
    },
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Brand ID copied",
      description: "The brand ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof NewBrandSchema>) => {
    try {
      const data = {
        id: brand.id,
        name: values.name,
        isActive: values.isActive,
      };

      await updateBrand(data).unwrap();

      toast({
        title: "Success!",
        description: "Brand data updated successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      console.error("There was a problem when updating brand data.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating brand data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  const handleStatus = async () => {
    try {
      const data = {
        id: brand.id,
        name: brand.name,
        isActive: !brand.isActive,
      };

      await updateBrand(data).unwrap();

      toast({
        title: "Success!",
        description: `Successfully update brand to ${brand.isActive ? "Inactive" : "Active"}.`,
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      console.error("There was a problem when updating brand status.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating brand status.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
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
            onClick={() => handleCopyId(brand.id)}
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
            <span>Set to {brand.isActive ? "Inactive" : "Active"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white p-10 font-lexend">
          <DialogHeader>
            <DialogTitle>Edit Brand</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <TextInput
                control={form.control}
                name="name"
                label="Name"
                placeholder="Type brand name"
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="flex-center mt-4 flex gap-3 rounded-full bg-accent-purple py-6 font-lexend font-semibold text-white hover:bg-primary"
              >
                {isLoading ? (
                  <LoaderCircleIcon
                    size={16}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  <SaveIcon size={16} color="white" />
                )}
                {isLoading ? "Updating Brand Data..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionCell;
