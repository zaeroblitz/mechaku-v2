import React from "react";
import Image from "next/image";
import { Heart, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatToRupiah } from "@/lib/utils";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  checked: boolean;
  onChecked: (isChecked: boolean) => void;
}

export default function CartItem({
  id,
  name,
  price,
  quantity,
  imageUrl,
  checked,
  onChecked,
}: CartItemProps) {
  const handleCheckboxChange = (checked: boolean) => {
    onChecked(checked);
  };

  // TODO: Implement logic to update quantity of item in cart
  const handleQuantityCange = () => {
    // Implement logic tho update quantity of item in cart
  };

  // TODO: Implement logic to remove item from cart
  const handleRemove = () => {
    // Implement logic to remove item from cart
  };

  // TODO: Implement logic to add item to wishlist
  const handleWishlist = () => {
    // Implement logic to add item to wishlist
  };

  return (
    <>
      <div className="flex flex-col gap-6 p-2 lg:flex-row lg:p-4">
        <div className="flex flex-1 items-center gap-4">
          <Checkbox
            id="cart1"
            checked={checked}
            className="size-4 rounded-sm border border-slate-300 text-violet-50 data-[state=checked]:bg-accent-purple lg:size-5 lg:rounded-md"
            onCheckedChange={(checked) =>
              handleCheckboxChange(checked as boolean)
            }
          />
          <Image
            src={imageUrl}
            alt="cart"
            width={120}
            height={120}
            className="size-[60px] rounded-lg object-cover md:size-[80px] md:rounded-2xl lg:size-[120px]"
          />

          <div className="flex flex-col justify-center">
            <p className="line-clamp-2 font-lexend text-xs font-semibold text-secondary md:text-sm lg:text-base">
              {name}
            </p>
            <p className="text-xs font-semibold text-accent-purple md:text-sm lg:text-base">
              {formatToRupiah(price)}
            </p>
          </div>
        </div>

        <div className="flex select-none flex-col gap-4">
          {/* Quantity */}
          <div className="flex flex-col items-end justify-end gap-4">
            <p className="font-lexend text-xs font-semibold text-secondary lg:text-sm">
              Quantity
            </p>
            <div className="flex items-center gap-3">
              <div
                onClick={handleQuantityCange}
                className="flex-center flex size-4 rounded-md bg-accent-purple text-white md:size-5"
              >
                -
              </div>
              <p className="font-lexend text-xs font-normal leading-tight text-neutral-500 md:text-sm">
                {quantity}
              </p>
              <div
                onClick={handleQuantityCange}
                className="flex-center flex size-4 rounded-md bg-accent-purple text-white md:size-5"
              >
                +
              </div>
            </div>
          </div>

          {/* Delete & Fav */}
          <div
            className="flex items-center justify-end gap-4"
            onClick={handleWishlist}
          >
            <div className="text-secondary">
              <Heart size={20} className="size-4 md:size-5" />
            </div>
            <div className="text-secondary" onClick={handleRemove}>
              <Trash2 size={20} className="size-4 md:size-5" />
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
}
