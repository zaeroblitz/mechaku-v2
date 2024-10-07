"use client";

// Modules
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { Ellipsis, LoaderCircleIcon, Plus, SaveIcon } from "lucide-react";

// Shadncn Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Header from "@/components/admin/Header";
import EmptyState from "@/components/shared/state/EmptyState";
import ErrorState from "@/components/shared/state/ErrorState";
import TextInput from "@/components/shared/form/TextInput";

// Schema
import { NewPaymentMethodSchema } from "@/lib/validations";

// Query
import {
  useGetAllPaymentMethodsQuery,
  useCreatePaymentMethodMutation,
} from "@/services/payment-methods";

export default function Page() {
  const { toast } = useToast();
  const {
    data: paymentMethods,
    isLoading,
    isError,
  } = useGetAllPaymentMethodsQuery({});
  const [updateData, { isLoading: createLoading }] =
    useCreatePaymentMethodMutation();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof NewPaymentMethodSchema>>({
    resolver: zodResolver(NewPaymentMethodSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewPaymentMethodSchema>) => {
    try {
      const data = {
        name: values.name,
        isActive: true,
      };

      await updateData(data);

      toast({
        title: "Success!",
        description: "New Payment Method created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when creating payment method data.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <section className="flex w-full flex-1 flex-col">
        <Header title="Payment Methods" />
        <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
          <div className="mb-10 flex">
            <Button
              onClick={() => setOpen(true)}
              className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6"
            >
              <Plus size={16} color="white" />
              <p className="text-center font-lexend text-white">
                Add New Payment Method
              </p>
            </Button>
          </div>

          {isLoading ? (
            <div className="flex h-[480px] items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Ellipsis size={32} color="#333333" className="animate-pulse" />
                <p className="text-center font-lexend text-gray-500">
                  Loading...
                </p>
              </div>
            </div>
          ) : isError ? (
            <ErrorState text="There was something went wrong." />
          ) : paymentMethods && paymentMethods.data.length > 0 ? (
            <div className="rounded-2xl bg-white p-8">
              <DataTable columns={columns} data={paymentMethods.data} />
            </div>
          ) : (
            <EmptyState text="No payment methods data found!" />
          )}
        </main>
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-2xl bg-white p-10 font-lexend">
          <DialogHeader>
            <DialogTitle>Create New Payment Method</DialogTitle>
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
                {createLoading ? (
                  <LoaderCircleIcon
                    size={16}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  <SaveIcon size={16} color="white" />
                )}
                {isLoading
                  ? "Creating A New Payment Method ..."
                  : "Create New Payment Method"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
