"use client";

// Modules
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Icons
import { Ellipsis, MoveLeft, Pencil, Settings2 } from "lucide-react";

// Shadcn Components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Custom Components
import Header from "@/components/admin/Header";
import ImageModal from "@/components/shared/ImageModal";
import ErrorState from "@/components/shared/ErrorState";

// Types
import { ParamsProps } from "@/types";

// Query
import {
  useGetProductByIdQuery,
  useUpdateProductStatusMutation,
} from "@/services/products";

// Utils
import { cn, formatToRupiah } from "@/lib/utils";

export default function Page({ params }: ParamsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(params.id);
  const [updateProductStatus, { isLoading: updateLoading }] =
    useUpdateProductStatusMutation();

  const status = ["DRAFT", "AVAILABLE", "SOLDOUT", "ARCHIVED"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleStatus = async (id: string, status: string) => {
    try {
      await updateProductStatus({ id, status }).unwrap();

      toast({
        title: "Success!",
        description: "Product status has been updated.",
        className: "rounded-xl bg-emerald-50 text-emerald-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem when updating product status.",
        className: "rounded-xl bg-pink-50 text-pink-800",
      });
    }
  };

  return (
    <section className="flex w-full flex-1 flex-col">
      <Header title="Product Details" />
      <main className="mt-10 flex w-full flex-1 flex-col rounded-2xl">
        {/* Back Button */}
        <div className="mb-10 flex">
          <Button
            className="flex-center flex space-x-2 rounded-full bg-accent-purple px-10 py-6 hover:bg-accent-purple/50"
            onClick={() => router.back()}
          >
            <MoveLeft size={16} color="white" />
            <p className="text-center font-lexend text-white">Back</p>
          </Button>
        </div>

        {isLoading && (
          <div className="flex h-[480px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Ellipsis size={32} color="#333333" className="animate-pulse" />
              <p className="text-center font-lexend text-gray-500">
                Loading...
              </p>
            </div>
          </div>
        )}

        {isError && <ErrorState text="There was something went wrong." />}

        {!isLoading && !isError && product && (
          <div className="flex w-full flex-col rounded-3xl bg-white p-10 font-poppins">
            <div className="mb-10 flex justify-between">
              <div
                className={cn(
                  "w-[200px] px-6 py-3 rounded-full font-bold flex flex-center",
                  product.data.status === "DRAFT" &&
                    "bg-neutral-50 text-neutral-500",
                  product.data.status === "AVAILABLE" &&
                    "bg-emerald-50 text-emerald-500",
                  product.data.status === "SOLDOUT" &&
                    "bg-rose-50 text-rose-500",
                  product.data.status === "ARCHIVED" &&
                    "bg-orange-50 text-orange-500"
                )}
              >
                {product.data.status}
              </div>

              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    disabled={updateLoading}
                    className="flex-center flex w-[200px] gap-2 rounded-full bg-teal-50 py-4 font-bold text-teal-500 transition duration-300 hover:bg-teal-500 hover:text-teal-50"
                  >
                    <Settings2 size={14} />{" "}
                    {updateLoading ? "Updating..." : "Update Status"}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full rounded-2xl bg-white px-6 py-3 text-secondary">
                    <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    {status.map((status, index) => {
                      return (
                        product.data.status !== status && (
                          <DropdownMenuItem
                            key={index}
                            className={
                              "cursor-pointer rounded-xl px-4 py-2 transition duration-300 hover:bg-slate-100"
                            }
                            onClick={() =>
                              handleStatus(product.data.id, status)
                            }
                          >
                            {status}
                          </DropdownMenuItem>
                        )
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link
                  href={`/admin/products/edit/${product.data.id}`}
                  className="flex-center flex w-[200px] gap-2 rounded-full bg-purple-50 py-4 font-bold text-accent-purple transition duration-300 hover:bg-accent-purple hover:text-purple-50"
                >
                  <Pencil size={14} /> Edit Product
                </Link>
              </div>
            </div>

            <div className="flex gap-10">
              <div className="flex max-w-xl flex-wrap gap-3">
                {[...product.data.images]
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image.imageUrl}
                        alt={`Product Image ${index + 1}`}
                        width={image.isPrimary ? 500 : 160}
                        height={image.isPrimary ? 500 : 160}
                        className="cursor-pointer rounded-2xl object-cover"
                        onClick={() => {
                          setSelectedImageIndex(index);
                          setIsModalOpen(true);
                        }}
                      />
                    </div>
                  ))}
              </div>

              <div className="flex w-full flex-col gap-4">
                <h1 className="line-clamp-2 text-[32px] font-bold text-primary">
                  {product.data.name}
                </h1>
                <p className="text-xl font-semibold text-emerald-500">
                  {formatToRupiah(product.data.price)}
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-secondary">
                    Series:{" "}
                    <span className="font-medium text-accent-purple">
                      {product.data.series.title}
                    </span>
                  </p>
                  <p className="text-lg text-secondary">
                    Brand:{" "}
                    <span className="font-medium text-accent-purple">
                      {product.data.brand.name}
                    </span>
                  </p>
                  <p className="text-lg text-secondary">
                    Grade:{" "}
                    <span className="font-medium text-accent-purple">
                      {product.data.grade.name}
                    </span>
                  </p>
                  {product.data.dimensions && (
                    <p className="text-lg text-secondary">
                      Dimensions:{" "}
                      <span className="font-medium text-accent-purple">
                        {product.data.dimensions}
                      </span>
                    </p>
                  )}
                  {product.data.weight && (
                    <p className="text-lg text-secondary">
                      Weight:{" "}
                      <span className="font-medium text-accent-purple">
                        {product.data.weight} kg
                      </span>
                    </p>
                  )}
                </div>
                <div className="mt-3 flex flex-col gap-1 rounded-2xl bg-slate-50 p-8">
                  <p className="text-lg text-secondary">Description:</p>
                  <p className="text-lg font-light text-accent-gray">
                    {product.data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {product && isModalOpen && (
          <ImageModal
            images={[...product.data.images].sort(
              (a, b) => a.displayOrder - b.displayOrder
            )}
            initialImageIndex={selectedImageIndex}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>
    </section>
  );
}
