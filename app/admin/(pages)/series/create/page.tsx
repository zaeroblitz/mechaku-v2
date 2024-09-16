"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Save, FileUp, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/admin/Header";
import { NewSeriesSchema } from "@/lib/validations";
import { useCreateSeriesMutation } from "@/services/series";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [createSeries, { isLoading }] = useCreateSeriesMutation();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof NewSeriesSchema>>({
    resolver: zodResolver(NewSeriesSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string); // Save preview URL
      };
      reader.readAsDataURL(file); // Convert image file to data URL
      form.setValue("image", file); // Set file into form state
    }
  };

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
          <Link
            href="/admin/series"
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-3"
          >
            <ChevronLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Link>
        </div>

        <div className="flex w-1/2 rounded-3xl bg-white p-10">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-form-label">
                      Image <span className="text-form-negative">*</span>
                    </FormLabel>
                    <FormControl>
                      <>
                        {/* Image Preview Section */}
                        {previewImage ? (
                          <div className="flex-center group relative mt-4">
                            <Image
                              src={previewImage}
                              alt="Preview"
                              width={680}
                              height={380}
                              className="size-auto rounded-2xl object-cover"
                            />
                            <div className="absolute inset-0 h-auto w-full rounded-2xl bg-gradient-to-b from-transparent to-[#170645] opacity-0 mix-blend-multiply duration-500 group-hover:opacity-100 group-hover:transition-opacity" />
                            <div className="flex-center absolute flex size-full flex-col font-lexend opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                              <Input
                                type="file"
                                accept="image/*"
                                placeholder="Type series title"
                                className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                                onChange={handleImageChange}
                                onBlur={field.onBlur}
                                name={field.name}
                                ref={field.ref}
                              />
                              <h3 className="mt-2 text-sm font-medium text-white">
                                <FormLabel className="flex-center relative flex flex-col">
                                  <FileUp
                                    size={48}
                                    color="#FFFFFF"
                                    className="mb-3"
                                  />
                                  <p>
                                    <span>Drag and drop</span>
                                    <span className="text-indigo-400">
                                      {" "}
                                      or browse{" "}
                                    </span>
                                    <span>to upload</span>
                                  </p>
                                </FormLabel>
                              </h3>
                              <p className="mt-1 text-xs text-white">
                                PNG, JPG, GIF up to 5MB
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-center relative flex w-full flex-col rounded-2xl border-2 border-dashed border-form-border py-14 font-lexend">
                            <Input
                              type="file"
                              accept="image/*"
                              placeholder="Type series title"
                              className="absolute inset-0 z-50 size-full cursor-pointer opacity-0"
                              onChange={handleImageChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                              <FormLabel className="flex-center relative flex flex-col">
                                <FileUp
                                  size={48}
                                  color="#6D6D6D"
                                  className="mb-3"
                                />
                                <p>
                                  <span>Drag and drop</span>
                                  <span className="text-indigo-600">
                                    {" "}
                                    or browse{" "}
                                  </span>
                                  <span>to upload</span>
                                </p>
                              </FormLabel>
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        )}
                      </>
                    </FormControl>
                    <FormMessage className="font-lexend text-form-negative" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-form-label">
                      Title <span className="text-form-negative">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type series title"
                        className="rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-lexend text-form-negative" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-form-label">
                      Author
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Type series author"
                        className="rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-lexend text-form-label">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type series description"
                        className="rounded-2xl border border-form-border bg-form-background p-5 font-lexend text-form-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
