"use client";

// Modules
import React, { useState } from "react";
import Image from "next/image";

// Icons
import { Trash2 } from "lucide-react";

// Components
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Utils
import { formatToRupiah } from "@/lib/utils";
import {
  useActionCartItemMutation,
  useRemoveCartItemMutation,
} from "@/services/carts";

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
  const { toast } = useToast();
  const [actionCartItem, { isLoading }] = useActionCartItemMutation();
  const [removeCartItem, { isLoading: removeLoading }] =
    useRemoveCartItemMutation();

  const handleCheckboxChange = (checked: boolean) => {
    onChecked(checked);
  };

  const handleQuantityChange = async (action: "increase" | "decrease") => {
    try {
      await actionCartItem({
        action,
        id,
      }).unwrap();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update cart item",
        className: "rounded-xl bg-rose-50 text-rose-800",
        duration: 2000,
      });
    }
  };

  const handleRemove = async () => {
    try {
      await removeCartItem({ id }).unwrap();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove cart item",
        className: "rounded-xl bg-rose-50 text-rose-800",
        duration: 2000,
      });
    }
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
              <Button
                disabled={isLoading}
                onClick={() => handleQuantityChange("decrease")}
                className="flex-center flex size-4 w-fit cursor-pointer rounded-md bg-accent-purple p-0 text-white transition duration-300 hover:scale-110 md:size-5"
              >
                -
              </Button>
              <p className="font-lexend text-xs font-normal leading-tight text-neutral-500 md:text-sm">
                {quantity}
              </p>
              <Button
                disabled={isLoading}
                onClick={() => handleQuantityChange("increase")}
                className="flex-center flex size-4 w-fit cursor-pointer rounded-md bg-accent-purple p-0 text-white transition duration-300 hover:scale-110 md:size-5"
              >
                +
              </Button>
            </div>
          </div>

          {/* Delete */}
          <div className="flex items-center justify-end gap-4">
            <DeleteDialog isLoading={removeLoading} onDelete={handleRemove} />
          </div>
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
}

interface DeleteDialogProps {
  isLoading: boolean;
  onDelete: () => void;
}

function DeleteDialog({ isLoading, onDelete }: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {" "}
        <Button className="size-5 w-fit cursor-pointer bg-transparent p-0 text-secondary hover:bg-transparent lg:size-6">
          <Trash2 size={20} className="size-4 md:size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl bg-white p-6 font-lexend">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will remove this product from
            your carts.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            className="rounded-xl bg-slate-50 px-6 py-4 text-center text-slate-700 transition  duration-300 hover:bg-slate-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="rounded-xl bg-rose-50 px-6 py-4 text-center text-rose-700 transition duration-300 hover:bg-rose-100"
            onClick={onDelete}
            disabled={isLoading}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
