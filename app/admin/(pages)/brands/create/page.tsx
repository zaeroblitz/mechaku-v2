"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft, Save, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewBrandSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Header from "@/components/admin/Header";
import TextInput from "@/components/shared/form/TextInput";
import { useCreateBrandMutation } from "@/services/brands";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [createBrand, { isLoading }] = useCreateBrandMutation();

  const form = useForm<z.infer<typeof NewBrandSchema>>({
    resolver: zodResolver(NewBrandSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof NewBrandSchema>) => {
    try {
      const data = {
        name: values.name,
        isActive: true,
      };

      await createBrand(data);

      toast({
        title: "Success!",
        description: "Brand created successfully!",
      });

      router.push("/admin/brands");
    } catch (error) {
      console.error("There was a problem when create new brand.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when create new brand.",
      });
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Create New Brand" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3 hover:bg-accent-purple/50"
            onClick={() => router.back()}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        <div className="flex w-1/2 rounded-3xl bg-white p-10">
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
                className="flex-center mt-4 flex gap-3 rounded-full bg-primary py-6 font-lexend font-semibold text-white hover:bg-[#372174]"
              >
                {isLoading ? (
                  <LoaderCircle
                    size={16}
                    color="white"
                    className="animate-spin"
                  />
                ) : (
                  <Save size={16} color="white" />
                )}
                {isLoading ? "Creating New Brand.." : "Create New Brand"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </section>
  );
}
