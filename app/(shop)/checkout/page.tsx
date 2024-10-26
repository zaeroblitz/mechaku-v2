"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Footer from "@/components/shop/home/Footer";
import Navbar from "@/components/shop/home/Navbar";
import { useCheckout } from "@/context/CheckoutProvider";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { formatToRupiah } from "@/lib/utils";
import { IAddress, useGetAllAddresssQuery } from "@/services/address";
import SingleSelect from "@/components/shared/utils/SingleSelect";
import Image from "next/image";

export default function Checkout() {
  const router = useRouter();
  const { checkoutItems } = useCheckout();
  const { data: session } = useSession();
  const { data: addressesList } = useGetAllAddresssQuery({
    userId: session?.user.id,
  });
  const [addressId, setAddressId] = useState<string>("");
  const [shippingAddress, setShippingAddress] = useState<IAddress | undefined>(
    undefined
  );

  useEffect(() => {
    if (addressId) {
      const selectedAddress = addressesList?.data?.find(
        (address) => address.id === addressId
      );
      setShippingAddress(selectedAddress);
    }
  }, [addressId, addressesList]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl flex-col gap-8 p-6 md:p-10 xl:p-16">
        <h1 className="font-poppins text-2xl font-bold text-primary lg:text-3xl">
          Checkout
        </h1>

        <div className="flex flex-col gap-6 font-poppins lg:gap-8 xl:flex-row xl:gap-10">
          <Button
            onClick={() => router.push("/my-carts")}
            className="flex-center flex w-fit gap-2 rounded-2xl bg-primary px-8 text-white transition duration-300 hover:bg-secondary"
          >
            <span>
              <ArrowLeft className="size-3 md:size-4" />
            </span>
            <span>Back</span>
          </Button>

          <div className="flex w-full flex-col gap-6 lg:gap-8 xl:flex-row">
            <div className="flex w-full flex-col gap-6 lg:gap-8">
              {/* Address */}
              <div className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 p-4 lg:gap-5 lg:p-5">
                <div className="flex w-full justify-between">
                  <p className="text-sm text-primary md:text-base">Address</p>
                  <Button className="bg-transparent text-form-label hover:bg-transparent">
                    + New Address
                  </Button>
                </div>

                <SingleSelect
                  label="Address"
                  placeholder="Select an address"
                  options={addressesList?.data?.map((address) => ({
                    value: address.id,
                    label: address.label,
                  }))}
                  onSelectChange={(value) => setAddressId(value)}
                  fullWidth
                />

                {shippingAddress && (
                  <div className="flex items-start gap-4">
                    <span>
                      <MapPin className="size-4 md:size-5" />
                    </span>
                    <div className="flex flex-col gap-3">
                      <p className="font-semibold text-slate-400">
                        Shipping Address
                      </p>
                      <div className="mb-4 text-sm text-gray-600">
                        <p>
                          {shippingAddress?.province.name},{" "}
                          {shippingAddress?.regency.name}
                        </p>
                        <p>
                          {shippingAddress?.district.name},{" "}
                          {shippingAddress?.village.name}
                        </p>
                        <p>{shippingAddress?.address}</p>
                        <p>{shippingAddress?.zipCode}</p>
                        <p>{shippingAddress?.phone_number}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items */}
              <div className="flex w-full flex-col gap-4 rounded-2xl border border-slate-200 p-4 lg:gap-5 lg:p-5">
                <div className="flex flex-col gap-4">
                  <p className="text-sm text-primary md:text-base">Item List</p>
                  <div className="flex flex-col gap-2">
                    {checkoutItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Image
                            src={item.product.images[0].imageUrl}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className="rounded-xl object-cover"
                          />
                          <div className="flex flex-col gap-0">
                            <p className="flex gap-2 text-xs text-slate-500 md:text-sm lg:text-base">
                              <span>{item.product.name}</span>
                              <span className="font-semibold text-secondary">
                                (x{item.quantity})
                              </span>
                            </p>
                            <p className="text-xs text-accent-purple md:text-sm lg:text-base">
                              {formatToRupiah(item.product.price)}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-accent-purple md:text-sm lg:text-base">
                          {formatToRupiah(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-fit w-full flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-4 lg:gap-8 lg:p-6 xl:w-[480px]">
              <div className="flex flex-col gap-2">
                <p>Message</p>
                <Textarea
                  className="h-[120px] w-full resize-none rounded-2xl border border-slate-200 p-4"
                  placeholder="Leave a message"
                />
              </div>

              <hr className="my-4" />

              <div className="flex flex-col gap-2">
                <p className="flex justify-between text-sm md:text-base">
                  <span className="text-secondary">Total Order: </span>
                  <span className="font-semibold text-accent-purple">
                    {checkoutItems.reduce((prev, current) => {
                      return prev + current.quantity;
                    }, 0)}{" "}
                    items
                  </span>
                </p>
                <p className="flex justify-between text-sm md:text-base">
                  <span className="text-secondary">Total Payment: </span>
                  <span className="font-semibold text-accent-purple">
                    {formatToRupiah(
                      checkoutItems.reduce((prev, current) => {
                        return prev + current.product.price * current.quantity;
                      }, 0)
                    )}
                  </span>
                </p>
                <Button className="mt-6 w-full rounded-2xl bg-primary py-6 text-center font-semibold text-white hover:bg-secondary">
                  Checkout Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
