"use client";

// Modules
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { MoveLeft, LoaderCircleIcon, SaveIcon } from "lucide-react";

// Shadcn Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import Header from "@/components/admin/Header";
import TextInput from "@/components/shared/form/TextInput";
import TextArea from "@/components/shared/form/TextArea";

// Validation Schema
import { NewVoucherSchema } from "@/lib/validations";

// Mutation Hook
import { useCreateVoucherMutation } from "@/services/vouchers";
import NumberInput from "@/components/shared/form/NumberInput";
import SingleSelect from "@/components/shared/form/SingleSelect";
import DatePicker from "@/components/shared/form/DatePicker";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [createVoucher, { isLoading }] = useCreateVoucherMutation();

  const form = useForm<z.infer<typeof NewVoucherSchema>>({
    resolver: zodResolver(NewVoucherSchema),
    defaultValues: {
      code: "",
      description: "",
      value: 0,
      isActive: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof NewVoucherSchema>) => {
    try {
      const data = {
        code: values.code,
        description: values.description,
        value: values.value,
        type: values.type,
        startDate: values.startDate,
        endDate: values.endDate,
        usageLimit: values.usageLimit,
        minPurchaseAmount: values.minPurchaseAmount,
        isActive: values.isActive,
      };

      await createVoucher(data).unwrap();

      toast({
        title: "Success!",
        description: "Voucher created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });

      router.push("/admin/vouchers");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when create new voucher.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Create New Voucher" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6 hover:bg-accent-purple/50"
            onClick={() => router.push("/admin/vouchers")}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        <div className="flex w-full rounded-3xl bg-white p-10 lg:w-3/4 2xl:w-1/2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <TextInput
                control={form.control}
                name="code"
                label="Code"
                placeholder="Type voucher code"
                required
              />

              <TextArea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Type voucher description"
              />

              <SingleSelect
                control={form.control}
                name="type"
                label="Type"
                placeholder="Select voucher type"
                options={[
                  { value: "PERCENTAGE", label: "Percentage" },
                  { value: "FIXED_AMOUNT", label: "Fixed Amount" },
                ]}
                required
              />

              <NumberInput
                control={form.control}
                name="value"
                label="Value"
                placeholder={`Type voucher value ${form.watch("type") === "PERCENTAGE" ? "(%)" : "(Rp.)"}`}
                required
                unit={`${form.watch("type") === "PERCENTAGE" ? "%" : "Rp"}`}
                unitPosition="left"
                isPrice={form.watch("type") === "FIXED_AMOUNT"}
              />

              <div className="flex justify-between gap-6">
                <DatePicker
                  control={form.control}
                  name="startDate"
                  label="Start Date"
                  placeholder="Select start date"
                />

                <DatePicker
                  control={form.control}
                  name="endDate"
                  label="End Date"
                  placeholder="Select end date"
                />
              </div>

              <div className="flex justify-between gap-6">
                <NumberInput
                  control={form.control}
                  name="usageLimit"
                  label="Usage Limit"
                  placeholder="Type usage limit"
                />

                <NumberInput
                  control={form.control}
                  name="minPurchaseAmount"
                  label="Min Purchase"
                  placeholder="Type min purchase (Rp.)"
                  unit="Rp"
                  unitPosition="left"
                  isPrice
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex-center mt-4 flex gap-3 rounded-full bg-primary py-6 font-lexend font-semibold text-white hover:bg-primary/90"
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
                {isLoading ? "Creating new voucher..." : "Create New Voucher"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </section>
  );
}
