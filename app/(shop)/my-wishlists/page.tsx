import React from "react";
import Navbar from "@/components/shop/home/Navbar";
import Footer from "@/components/shop/home/Footer";
import WishlistItems from "@/components/shop/my-wishlists/WishlistItems";

export default function MyWishlists() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl  flex-col gap-8 p-6 md:p-10 xl:p-16">
        <h1 className="font-poppins text-2xl font-bold text-primary lg:text-3xl">
          My Wishlists
        </h1>

        <WishlistItems />
      </div>

      <Footer />
    </div>
  );
}
