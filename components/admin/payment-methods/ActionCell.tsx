"use client";

// Modules
import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import {
  Copy,
  LoaderCircleIcon,
  MoreHorizontal,
  Pencil,
  SaveIcon,
  Settings2,
} from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Custom Components
import TextInput from "@/components/shared/form/TextInput";

// Query
import {
  IPaymentMethod,
  useUpdatePaymentMethodsMutation,
} from "@/services/payment-methods";

// Schema
import { NewPaymentMethodSchema } from "@/lib/validations";

interface ActionsCellProps {
  row: Row<IPaymentMethod>;
}

const ActionCell = ({ row }: ActionsCellProps) => {
  const paymentMethod = row.original;
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [updatePaymentMethod, { isLoading }] =
    useUpdatePaymentMethodsMutation();

  const form = useForm<z.infer<typeof NewPaymentMethodSchema>>({
    resolver: zodResolver(NewPaymentMethodSchema),
    defaultValues: {
      name: paymentMethod.name,
    },
  });

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Payment method ID copied",
      description: "The payment method ID has been copied to your clipboard.",
      className: "bg-white rounded-xl",
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const onSubmit = async (values: z.infer<typeof NewPaymentMethodSchema>) => {
    try {
      const data = {
        id: paymentMethod.id,
        name: values.name,
        isActive: values.isActive,
      };

      await updatePaymentMethod(data).unwrap();

      toast({
        title: "Success!",
        description: "Payment method data updated successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating payment method data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  const handleStatus = async () => {
    try {
      const data = {
        id: paymentMethod.id,
        name: paymentMethod.name,
        isActive: !paymentMethod.isActive,
      };

      await updatePaymentMethod(data).unwrap();

      toast({
        title: "Success!",
        description: `Successfully update payment method to ${paymentMethod.isActive ? "Inactive" : "Active"}.`,
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating payment method status.",
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
            onClick={() => handleCopyId(paymentMethod.id)}
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
            <span>Set to {paymentMethod.isActive ? "Inactive" : "Active"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl bg-white p-10 font-lexend">
          <DialogHeader>
            <DialogTitle>Edit Payment Method</DialogTitle>
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
                placeholder="Type payment method name"
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
                {isLoading ? "Updating payment method data..." : "Update"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionCell;
