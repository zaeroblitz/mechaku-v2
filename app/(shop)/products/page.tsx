// Modules
import React from "react";

// Components
import Navbar from "@/components/shop/home/Navbar";
import Footer from "@/components/shop/home/Footer";
import ProductList from "@/components/shop/products/ProductList";

export default function Products() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-8 bg-white md:gap-10 xl:gap-[72px]">
      <Navbar />

      <div className="flex w-full max-w-screen-2xl  flex-col gap-8 p-6 md:p-10 xl:p-16">
        <ProductList />
      </div>

      <Footer />
    </div>
  );
}
