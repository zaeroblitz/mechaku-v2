"use client";

// Modules
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Shadcn Components
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Custom Components
import Navbar from "@/components/shop/home/Navbar";
import Footer from "@/components/shop/home/Footer";
import CartItem from "@/components/shop/cart/CartItem";
import EmptyState from "@/components/shared/state/EmptyState";
import CartItemSkeleton from "@/components/shop/cart/CartItemSkeleton";

// Utils
import { formatToRupiah } from "@/lib/utils";
import { ICartItem, useGetCartQuery } from "@/services/carts";
import { useCheckout } from "@/context/CheckoutProvider";

export default function MyCarts() {
  const router = useRouter();
  const { data: session } = useSession();
  const { setCheckoutItems } = useCheckout();
  const { data: carts, isLoading: cartsLoading } = useGetCartQuery({
    userId: session?.user.id,
  });
  const [selectedCarts, setSelectedCarts] = useState<ICartItem[]>([]);
  const totalPayment = selectedCarts.reduce(
    (total, cart) => total + cart.product.price * cart.quantity,
    0
  );

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl  flex-col gap-8 p-6 md:p-10 xl:p-16">
        <h1 className="font-poppins text-2xl font-bold text-primary lg:text-3xl">
          My Carts
        </h1>

        {cartsLoading && (
          <div className="flex flex-col gap-6">
            {[0, 1, 2].map((item) => (
              <CartItemSkeleton key={item} />
            ))}
          </div>
        )}

        {!cartsLoading && carts && carts.data.items.length === 0 && (
          <EmptyState text="You don't have any cart items yet" />
        )}

        {!cartsLoading && carts && carts.data.items.length > 0 && (
          <div className="flex flex-col items-start gap-8 lg:flex-row">
            <div className="flex w-full flex-1 flex-col">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="all-cart-iems"
                  checked={selectedCarts.length === carts.data.items.length}
                  className="size-4 rounded-sm border border-slate-300 text-violet-50 data-[state=checked]:bg-accent-purple lg:size-5 lg:rounded-md"
                  onCheckedChange={(checked: boolean) => {
                    setSelectedCarts(checked ? carts.data.items : []);
                  }}
                />
                <label
                  htmlFor="#all-cart-items"
                  className="font-lexend text-sm leading-tight text-secondary"
                >
                  Select all Items
                </label>
              </div>

              {carts.data.items.map((cart) => (
                <CartItem
                  key={cart.id}
                  id={cart.id}
                  name={cart.product.name}
                  price={cart.product.price}
                  stock={cart.product.quantity}
                  quantity={cart.quantity}
                  imageUrl={cart.product.images[0].imageUrl}
                  checked={selectedCarts.some(
                    (selectedCartId) => selectedCartId.id === cart.id
                  )}
                  onChecked={(isCheked) => {
                    setSelectedCarts(
                      isCheked
                        ? [...selectedCarts, cart]
                        : selectedCarts.filter(
                            (selectedCartId) => selectedCartId.id !== cart.id
                          )
                    );
                  }}
                  onQuantityChange={(quantity) => {
                    const updatedCarts = selectedCarts.map((item) =>
                      item.id === cart.id ? { ...item, quantity } : item
                    );

                    setSelectedCarts(updatedCarts);
                  }}
                />
              ))}
            </div>

            {selectedCarts.length > 0 && (
              <div className="flex w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-5 lg:w-[420px]">
                <p className="font-lexend text-base font-medium leading-normal text-secondary">
                  Item List
                </p>
                <hr />
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col justify-between">
                    {selectedCarts.map((cart) => (
                      <div key={cart.id} className="flex w-full">
                        <p className="w-2/3 text-start font-lexend text-sm leading-tight text-slate-500">
                          {cart.product.name} -{" "}
                          <span className="text-accent-purple">
                            (x{cart.quantity})
                          </span>
                        </p>
                        <p className="w-1/3 text-end font-lexend font-semibold leading-tight text-emerald-500">
                          {formatToRupiah(cart.product.price * cart.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between font-lexend text-sm font-semibold lg:text-base">
                    <p className="text-secondary">Total Payment</p>
                    <p className="text-accent-purple">
                      {formatToRupiah(totalPayment)}
                    </p>
                  </div>
                  <div className="flex w-full items-center justify-end gap-5">
                    <Input
                      type="text"
                      placeholder="Enter promo code"
                      className="w-full rounded-lg border border-slate-200 px-4 py-2 font-lexend text-slate-600 ring-0 ring-transparent placeholder:text-slate-300"
                    />
                    <Button className="rounded-lg bg-accent-purple px-6 py-3 text-center font-lexend text-white hover:bg-accent-purple/90">
                      Apply
                    </Button>
                  </div>
                  <div className="flex-center flex w-full rounded-2xl">
                    <Button
                      onClick={() => {
                        setCheckoutItems(selectedCarts);
                        router.push("/checkout");
                      }}
                      className="w-full rounded-2xl bg-primary py-6 text-center text-sm font-semibold text-white transition duration-300 hover:bg-secondary lg:text-base"
                    >
                      Checkout
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
