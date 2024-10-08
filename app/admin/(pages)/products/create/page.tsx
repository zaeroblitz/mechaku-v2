"use client";

// Modules
import React from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewProductSchema } from "@/lib/validations";
import { useToast } from "@/hooks/use-toast";

// Icons
import {
  BoxIcon,
  SaveIcon,
  WeightIcon,
  PackageIcon,
  LoaderCircle,
  MoveLeftIcon,
  Ellipsis,
  FilmIcon,
  TagIcon,
  SparkleIcon,
  Banknote,
} from "lucide-react";

// Shadcn Components
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Custom Components
import Header from "@/components/admin/Header";
import Dropdown from "@/components/shared/form/Dropdown";
import TextArea from "@/components/shared/form/TextArea";
import TextInput from "@/components/shared/form/TextInput";
import NumberInput from "@/components/shared/form/NumberInput";
import MultiImagesUpload from "@/components/shared/form/MultiImagesUpload";

// Query
import { useGetAllSeriesQuery } from "@/services/series";
import { useGetAllBrandsQuery } from "@/services/brands";
import { useGetAllGradesQuery } from "@/services/grades";
import { useCreateProductMutation } from "@/services/products";

// Utils
import { generateSlug } from "@/lib/utils";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  // Mutation for creating product
  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Query for dropdown options
  const { data: seriesList, isLoading: seriesLoading } = useGetAllSeriesQuery({
    isActive: "active",
  });
  const { data: brandList, isLoading: brandLoading } = useGetAllBrandsQuery({
    isActive: "active",
  });
  const { data: gradeList, isLoading: gradeLoading } = useGetAllGradesQuery({
    isActive: "active",
  });

  const form = useForm<z.infer<typeof NewProductSchema>>({
    resolver: zodResolver(NewProductSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      dimensions: "",
      weight: 0,
      price: 0,
      quantity: 0,
      status: "DRAFT",
      seriesId: "",
      brandId: "",
      gradeId: "",
      images: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof NewProductSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("slug", generateSlug(data.name));
    formData.append("description", data.description);
    formData.append("dimensions", data.dimensions || "");
    formData.append("weight", data.weight ? data.weight.toString() : "");
    formData.append("price", data.price.toString());
    formData.append("quantity", data.quantity.toString());
    formData.append("seriesId", data.seriesId);
    if (data.brandId) formData.append("brandId", data.brandId);
    if (data.gradeId) formData.append("gradeId", data.gradeId);
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }

    try {
      const product = await createProduct(formData).unwrap();

      toast({
        title: "Success!",
        description: "Product created successfully!",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });

      router.push(`/admin/products/${product.data.id}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when create new product.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Create New Product" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6 hover:bg-accent-purple/50"
            onClick={() => router.push("/admin/products")}
          >
            <MoveLeftIcon size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        {seriesLoading || brandLoading || gradeLoading ? (
          <div className="flex h-[480px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Ellipsis size={32} color="#333333" className="animate-pulse" />
              <p className="text-center font-lexend text-gray-500">
                Loading...
              </p>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-5"
            >
              <div className="flex flex-col gap-6">
                <MultiImagesUpload
                  control={form.control}
                  name="images"
                  label="Images"
                  required
                />
                <div className="flex h-fit w-full flex-1 flex-col gap-4 rounded-3xl bg-white p-10 lg:w-4/5">
                  <TextInput
                    control={form.control}
                    name="name"
                    label="Name"
                    placeholder="Type product name"
                    required
                  />

                  <TextArea
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Type product description"
                  />

                  <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
                    <TextInput
                      control={form.control}
                      name="dimensions"
                      label="Dimensions"
                      icon={<PackageIcon size={14} />}
                      placeholder="Dimensions (100 x 50 x 5)"
                    />

                    <NumberInput
                      control={form.control}
                      name="weight"
                      label="Weight"
                      unit="kg"
                      unitPosition="right"
                      icon={<WeightIcon size={14} />}
                      placeholder="Weight (kg)"
                    />
                  </div>

                  <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
                    <NumberInput
                      control={form.control}
                      name="price"
                      label="Price"
                      icon={<Banknote size={14} />}
                      unitPosition="right"
                      placeholder="Price (Rp 100.000)"
                      required
                      isPrice
                    />

                    <NumberInput
                      control={form.control}
                      name="quantity"
                      label="Quantity"
                      unitPosition="right"
                      icon={<BoxIcon size={14} />}
                      placeholder="Quantity"
                      required
                    />
                  </div>

                  <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
                    <Dropdown
                      control={form.control}
                      name="seriesId"
                      placeholder="Select series"
                      label="Series"
                      icon={<FilmIcon size={14} />}
                      required
                      options={
                        seriesList?.data?.map((series) => ({
                          value: series.id,
                          label: series.title,
                        })) || []
                      }
                      onSelect={(value) => {
                        form.setValue("seriesId", value);
                      }}
                    />

                    <Dropdown
                      control={form.control}
                      name="brandId"
                      placeholder="Select brand"
                      label="Brand"
                      icon={<TagIcon size={14} />}
                      required
                      options={
                        brandList?.data?.map((brand) => ({
                          value: brand.id,
                          label: brand.name,
                        })) || []
                      }
                      onSelect={(value) => {
                        form.setValue("brandId", value);
                      }}
                    />

                    <Dropdown
                      control={form.control}
                      name="gradeId"
                      placeholder="Select grade"
                      label="Grade"
                      icon={<SparkleIcon size={14} />}
                      required
                      options={
                        gradeList?.data?.map((grade) => ({
                          value: grade.id,
                          label: grade.name,
                        })) || []
                      }
                      onSelect={(value) => {
                        form.setValue("gradeId", value);
                      }}
                    />
                  </div>

                  <div className="flex justify-center lg:justify-end">
                    <Button
                      className="flex-center mt-4 flex w-[320px] gap-3 rounded-full bg-primary py-6 font-lexend font-semibold text-white hover:bg-[#372174]"
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
                        <SaveIcon size={16} color="white" />
                      )}
                      {isLoading
                        ? "Creating New Product.."
                        : "Create New Product"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        )}
      </main>
    </section>
  );
}
