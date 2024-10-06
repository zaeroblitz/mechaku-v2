// Modules
import React from "react";

// Components
import Navbar from "@/components/shop/home/Navbar";
import Hero from "@/components/shop/home/Hero";
import Series from "@/components/shop/home/Series";
import About from "@/components/shop/home/About";
import FeaturedCollections from "@/components/shop/home/FeaturedCollections";
import Explore from "@/components/shop/home/Explore";
import Newsletter from "@/components/shop/home/Newsletter";
import Footer from "@/components/shop/home/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-12 bg-white lg:gap-[72px]">
      <Navbar />
      <Hero />
      <Series />
      <About />
      <FeaturedCollections />
      <Explore />
      <Newsletter />
      <Footer />
    </div>
  );
}
