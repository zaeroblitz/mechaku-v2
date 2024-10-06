import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex w-full max-w-screen-2xl items-center justify-between px-[40px] 2xl:px-[100px]">
      <div className="flex max-w-[428px] flex-col gap-6 lg:gap-8">
        <h1 className="h1-hero-mobile lg:h1-hero-desktop">
          Your Hobby Our Passion
        </h1>
        <p className="subtitle-mobile lg:subtitle-desktop">
          Discover a world where your favorite characters come to life. Explore
          our wide selection of action figures, from iconic superheroes to
          legendary anime figures, and find the perfect addition to your
          collection.
        </p>
        <Link
          href="/products"
          className="flex-center flex w-fit gap-3 rounded-full border border-primary bg-primary px-12 py-3 text-white transition duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/50"
        >
          <p className="font-lexend">Explore Now</p>
          <ArrowUpRight size={24} />
        </Link>
      </div>

      {/* Banner on Desktop */}
      <Image
        src="/assets/images/hero-banner.png"
        alt="banner"
        width={700}
        height={500}
        className="hidden object-contain xl:block"
        priority
      />

      {/* Banner on iPad */}
      <Image
        src="/assets/images/hero-banner.png"
        alt="banner"
        width={482}
        height={340}
        className="hidden object-contain lg:block xl:hidden"
        priority
      />

      {/* Banner on Tablet */}
      <Image
        src="/assets/images/hero-banner.png"
        alt="banner"
        width={340}
        height={240}
        className="hidden object-contain md:block lg:hidden xl:hidden"
        priority
      />
    </div>
  );
}
