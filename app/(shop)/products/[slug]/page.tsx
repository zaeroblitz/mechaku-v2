"use client";

// Modules
import React from "react";
import { useSearchParams } from "next/navigation";

// Components
import Navbar from "@/components/shop/home/Navbar";
import Footer from "@/components/shop/home/Footer";
import ProductBreadcrumb from "@/components/shop/product-details/ProductBreadcrumb";
import ProductGallery from "@/components/shop/product-details/ProductGallery";
import ProductInformation from "@/components/shop/product-details/ProductInformation";
import ProductDescription from "@/components/shop/product-details/ProductDescription";
import RecommendedProducts from "@/components/shop/product-details/RecommendedProducts";
import ProductDetailSkeleton from "@/components/shop/product-details/ProductDetailSkeleton";

// Query
import { useGetProductByIdQuery } from "@/services/products";

// Types
import { ParamsSlugProps } from "@/types";

export default function Page({ params }: ParamsSlugProps) {
  const searchParams = useSearchParams();
  const id = searchParams.get("param") ?? "";

  const { data: product, isLoading } = useGetProductByIdQuery(id);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <>
        {isLoading && <ProductDetailSkeleton />}

        {!isLoading && product && (
          <div className="flex w-full max-w-screen-2xl flex-col gap-8 px-6 md:px-10 xl:px-16">
            <ProductBreadcrumb name={product.data.name} />

            <div className="flex flex-col justify-center gap-8 lg:flex-row lg:justify-start lg:gap-10">
              <ProductGallery
                imageUrls={product.data.images.map((image) => ({
                  id: image.id,
                  url: image.imageUrl,
                  alt: image.altText,
                }))}
              />

              <ProductInformation
                name={product.data.name}
                price={product.data.price}
                series={product.data.series}
                brand={product.data.brand}
                grade={product.data.grade}
                quantity={product.data.quantity}
              />
            </div>

            <ProductDescription description={product.data.description} />

            <RecommendedProducts />
          </div>
        )}
      </>

      <Footer />
    </div>
  );
}
