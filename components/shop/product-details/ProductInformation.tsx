import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { formatToRupiah } from "@/lib/utils";
import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeriesProps {
  id: string;
  title: string;
}

interface BrandGradeProps {
  id: string;
  name: string;
}

interface Props {
  name: string;
  price: number;
  series: SeriesProps;
  brand: BrandGradeProps;
  grade: BrandGradeProps;
  quantity: number;
}

export default function ProductInformation({
  name,
  price,
  series,
  brand,
  grade,
  quantity,
}: Props) {
  const [qty, setQty] = useState(1);

  const handleDecreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (qty < quantity) {
      setQty(qty + 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 lg:gap-5">
      {/* Name */}
      <h1 className="font-poppins text-2xl font-semibold leading-loose text-primary md:text-3xl">
        {name}
      </h1>
      {/* Revies (soon) */}
      <div className="flex items-center gap-4">
        <Rating SVGclassName="inline-block" initialValue={4} readonly />
        <p className="font-inter text-sm leading-none text-slate-400 lg:text-base">
          (832) reviews
        </p>
      </div>

      {/* Price */}
      <p className="font-poppins text-xl font-semibold leading-7 text-emerald-500">
        {formatToRupiah(price)}
      </p>

      {/* Series, Brand & Grade */}
      <div className="flex select-none flex-col gap-2">
        <p className="font-inter text-sm leading-normal text-secondary md:text-base">
          Series: <span className="text-accent-purple">{series.title}</span>
        </p>

        <p className="font-inter text-sm leading-normal text-secondary md:text-base">
          Brand: <span className="text-accent-purple">{brand.name}</span>
        </p>

        <p className="font-inter text-sm leading-normal text-secondary md:text-base">
          Grade: <span className="text-accent-purple">{grade.name}</span>
        </p>
        <p className="font-inter text-sm leading-normal text-secondary md:text-base">
          Stock: <span className="text-accent-purple">{quantity}</span>
        </p>
      </div>

      {/* Add to Cart */}
      <div className="flex flex-col gap-3">
        <p className="font-inter text-sm font-medium leading-normal text-secondary">
          Amount:
        </p>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          {/* Qty Action */}
          <div className="flex items-center gap-6 md:gap-4">
            <div
              className="flex-center flex cursor-pointer select-none transition-all duration-300"
              onClick={handleDecreaseQty}
            >
              <Minus size={14} />
            </div>

            <div className="flex-center flex rounded-md border border-slate-100 bg-white px-4 py-2 text-sm">
              {qty}
            </div>

            <div
              className="flex-center flex cursor-pointer select-none transition-all duration-300"
              onClick={handleIncreaseQty}
            >
              <Plus size={14} />
            </div>
          </div>

          {/* Add to Cart */}
          <Button className="flex-center flex h-10 w-full rounded-xl bg-accent-purple px-4 py-2 transition duration-300 hover:bg-accent-purple/80 md:w-[200px]">
            <p className="font-poppins text-sm font-medium text-white">
              Add to Cart
            </p>
          </Button>

          {/* Add to Wishlists */}
          <Button className="flex-center flex h-10 w-full rounded-lg border border-slate-200 bg-white transition duration-300 hover:bg-slate-50 md:w-10">
            <span className="text-accent-purple">
              <Heart size={14} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}