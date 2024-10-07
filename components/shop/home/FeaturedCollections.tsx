"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import { ArrowUpRight, MoveLeft, MoveRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/services/products";

interface CardProps {
  id: string;
  slug: string;
  name: string;
  image: string;
  series: string;
  brand: string;
}

function Card({ id, slug, name, image, series, brand }: CardProps) {
  return (
    <div className="relative mx-auto h-[520px] w-[410px] rounded-3xl">
      {/* Image on Desktop */}
      <Image
        src={image}
        alt={name}
        width={410}
        height={520}
        className="hidden h-[520px] w-[410px] rounded-3xl object-cover lg:block"
      />

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-secondary opacity-80 mix-blend-multiply" />

      <div className="absolute bottom-0 flex flex-col gap-6 p-6 xl:p-8">
        <div className="flex flex-col gap-0">
          <p className="line-clamp-2 font-inter text-3xl font-normal uppercase leading-[120%] text-white">
            {name}
          </p>
          <div className="flex items-center gap-2 font-inter text-sm font-normal leading-snug text-white">
            <p>{series}</p>|<p>{brand}</p>
          </div>
        </div>

        <Link
          href={`/products/${slug}`}
          className="flex w-fit items-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-4 text-center text-white"
        >
          <p className="font-lexend text-sm font-normal  leading-tight">
            Shop Now
          </p>
          <ArrowUpRight size={24} />
        </Link>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return <Skeleton className="h-[520px] w-[410px] rounded-3xl bg-slate-100" />;
}

function CustomPrevArrow(props: any) {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="absolute left-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-4 shadow-xl"
    >
      <MoveLeft size={24} color="black" />
    </button>
  );
}

function CustomNextArrow(props: any) {
  const { onClick } = props;

  return (
    <button
      onClick={onClick}
      className="absolute right-6 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-4 shadow-md"
    >
      <MoveRight size={24} color="black" />
    </button>
  );
}

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  cssEase: "linear",
  centerMode: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1698,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
        variableWidth: true,
      },
    },
  ],
  prevArrow: <CustomPrevArrow />,
  nextArrow: <CustomNextArrow />,
};

export default function FeaturedCollections() {
  const { data: products, isLoading } = useGetProductsQuery("");
  const sliderRef = useRef(null);

  return (
    <div className="flex-center flex w-full max-w-screen-2xl flex-col gap-10 md:gap-12">
      <h6 className="font-poppins text-4xl font-bold leading-10 text-primary md:text-5xl">
        Featured Collections
      </h6>

      <div className="relative w-full max-w-[90vw] md:max-w-[80vw]">
        {isLoading ? (
          <>
            <div className="hidden xl:block">
              <div className="flex-center flex gap-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>

            <div className="hidden md:block xl:hidden">
              <div className="flex-center flex gap-4">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>

            <div className="block md:hidden">
              <div className="flex-center flex">
                <SkeletonCard />
              </div>
            </div>
          </>
        ) : (
          <>
            <Slider ref={sliderRef} {...settings}>
              {products &&
                products.data.length > 0 &&
                products.data.map((product) => (
                  <div key={product.id} className="px-2">
                    <Card
                      id={product.id}
                      slug={product.slug}
                      name={product.name}
                      image={product.images[0].imageUrl}
                      series={product.series.title}
                      brand={product.brand.name}
                    />
                  </div>
                ))}
            </Slider>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/40 to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/40 to-transparent"></div>
          </>
        )}
      </div>
    </div>
  );
}
