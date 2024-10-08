"use client";

// Modules
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Icons
import { MoveLeft, Save, LoaderCircle } from "lucide-react";

// Shadcn Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import Header from "@/components/admin/Header";
import TextArea from "@/components/shared/form/TextArea";
import TextInput from "@/components/shared/form/TextInput";
import ImageUpload from "@/components/shared/form/ImageUpload";

// Validation
import { UpdateSeriesSchema } from "@/lib/validations";

// Query
import {
  useUpdateSeriesMutation,
  useGetSeriesByIdQuery,
} from "@/services/series";

// Types
import { ParamsProps } from "@/types";

const defaultValues: z.infer<typeof UpdateSeriesSchema> = {
  title: "",
  author: "",
  description: "",
  image: undefined,
};

export default function Page({ params }: ParamsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [updateSeries, { isLoading }] = useUpdateSeriesMutation();
  const { data: series, isLoading: dataLoading } = useGetSeriesByIdQuery(
    params.id
  );

  const form = useForm<z.infer<typeof UpdateSeriesSchema>>({
    resolver: zodResolver(UpdateSeriesSchema),
    defaultValues,
  });

  useEffect(() => {
    if (series) {
      form.reset({
        title: series.data.title,
        author: series?.data.author ?? "",
        description: series?.data.description ?? "",
        image: undefined,
      });
    }
  }, [series, form]);

  const onSubmit = async (values: z.infer<typeof UpdateSeriesSchema>) => {
    try {
      const formData = new FormData();
      formData.append("id", params.id);
      formData.append("title", values.title);
      formData.append("description", values.description ?? "");
      formData.append("author", values.author ?? "");
      formData.append("isActive", "true");

      // Check if a new image file has been selected
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      await updateSeries(formData).unwrap();

      toast({
        title: "Success!",
        description: "Series updated successfully!",
      });

      router.push(`/admin/series/${params.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating series.",
      });
    }
  };

  return (
    <section className="mb-24 flex w-full flex-1 flex-col">
      <Header title="Update Series" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3 hover:bg-accent-purple/50"
            onClick={() => router.push(`/admin/series/${params.id}`)}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        {dataLoading ? (
          <>
            <Skeleton className="mb-2 h-[480px] w-full animate-pulse rounded-2xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-3/4 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="mb-2 h-8 w-3/4 animate-pulse rounded-xl bg-slate-200" />
            <Skeleton className="h-[120px] w-3/4 animate-pulse rounded-2xl bg-slate-200" />
          </>
        ) : (
          <div className="flex w-full rounded-3xl bg-white p-10 lg:w-3/4 xl:w-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-5"
              >
                <ImageUpload
                  control={form.control}
                  name="image"
                  label="Image"
                  defaultImageURL={series?.data.image}
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
                  {isLoading ? "Updating Series.." : "Update"}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </main>
    </section>
  );
}
