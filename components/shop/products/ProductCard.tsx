import { formatToRupiah } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface Props {
  id: string;
  slug: string;
  imageUrl: string;
  series: string;
  name: string;
  price: number;
}

export default function ProductCard({
  id,
  slug,
  imageUrl,
  series,
  name,
  price,
}: Props) {
  return (
    <div className="flex h-fit w-[180px] cursor-pointer flex-col rounded-2xl border border-[#ecedf2] bg-white p-4 lg:w-[240px]">
      <Image
        src={imageUrl}
        alt={name}
        width={200}
        height={200}
        className="hidden size-[200px] rounded-2xl object-cover lg:block"
      />

      <Image
        src={imageUrl}
        alt={name}
        width={150}
        height={150}
        className="block size-[150px] rounded-2xl object-cover lg:hidden"
      />

      <div className="mt-3 flex flex-col gap-1">
        <p className="line-clamp-1 font-inter text-xs font-normal leading-tight tracking-tight text-accent-gray-alt">
          {series}
        </p>
        <p className="line-clamp-1 font-poppins text-sm font-semibold leading-normal tracking-tight text-primary">
          {name}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="font-poppins text-base font-semibold leading-normal tracking-tight text-emerald-600">
          {formatToRupiah(price)}
        </p>
      </div>
    </div>
  );
}
