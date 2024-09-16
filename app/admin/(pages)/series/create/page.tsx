"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { MoveLeft, Save, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewSeriesSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Header from "@/components/admin/Header";
import TextInput from "@/components/shared/form/TextInput";
import TextArea from "@/components/shared/form/TextArea";
import ImageUpload from "@/components/shared/form/ImageUpload";
import { useCreateSeriesMutation } from "@/services/series";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createSeries, { isLoading }] = useCreateSeriesMutation();
  const form = useForm<z.infer<typeof NewSeriesSchema>>({
    resolver: zodResolver(NewSeriesSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof NewSeriesSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description ?? "");
      formData.append("author", values.author ?? "");
      formData.append("isActive", "true");
      formData.append("image", values.image);

      await createSeries(formData).unwrap();

      toast({
        title: "Success!",
        description: "Series created successfully!",
      });

      router.push("/admin/series");
    } catch (error) {
      console.error("There was a problem when create new series.");
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when create new series.",
      });
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Create New Series" />
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
              <ImageUpload
                control={form.control}
                name="image"
                label="Image"
                required
              />

              <TextInput
                control={form.control}
                name="title"
                label="Title"
                placeholder="Type series title"
                required
              />

              <TextInput
                control={form.control}
                name="author"
                label="Author"
                placeholder="Type series author"
              />

              <TextArea
                control={form.control}
                name="description"
                label="Description"
                placeholder="Type series description"
              />

              <Button
                className="flex-center mt-4 flex gap-3 rounded-full bg-primary py-6 font-lexend font-semibold text-white hover:bg-[#372174]"
                type="submit"
                disabled={isLoading}
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
                {isLoading ? "Creating New Series.." : "Create"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </section>
  );
};

export default Page;
