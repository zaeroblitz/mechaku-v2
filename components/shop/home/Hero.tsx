import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="flex-center flex w-full px-[40px] 2xl:px-[100px]">
      <div className="flex w-full max-w-screen-2xl items-center justify-between">
        {/* Text */}
        <div className="flex w-full flex-col gap-6 md:max-w-[428px] lg:gap-8">
          <h1 className="h1-hero-mobile sm:h1-hero-tablet lg:h1-hero-desktop">
            <span>Your Hobby</span>
            <span>Our Passion</span>
          </h1>
          <p className="subtitle-mobile sm:subtitle-tablet lg:subtitle-desktop">
            Discover a world where your favorite characters come to life.
            Explore our wide selection of action figures, from iconic
            superheroes to legendary anime figures, and find the perfect
            addition to your collection.
          </p>
          <Link
            href="/products"
            className="flex-center flex w-full gap-3 rounded-full border border-primary bg-primary px-8 py-3 text-sm text-white transition duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/50 sm:px-12 sm:text-base md:w-fit"
          >
            <p className="font-lexend">Explore Now</p>
            <ArrowUpRight size={24} />
          </Link>
        </div>

        {/* Banner on Desktop */}
        <Image
          src="/assets/images/hero-banner.png"
          alt="banner"
          width={750}
          height={500}
          className="hidden object-contain xl:block"
          priority
        />

        {/* Banner on iPad */}
        <Image
          src="/assets/images/hero-banner.png"
          alt="banner"
          width={530}
          height={330}
          className="hidden object-contain lg:block xl:hidden"
          priority
        />

        {/* Banner on Tablet */}
        <Image
          src="/assets/images/hero-banner.png"
          alt="banner"
          width={360}
          height={160}
          className="hidden object-contain md:block lg:hidden xl:hidden"
          priority
        />
      </div>
    </section>
  );
}
