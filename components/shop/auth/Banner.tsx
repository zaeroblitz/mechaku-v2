import React from "react";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="hidden md:block">
      <div className="relative">
        {/* Tablet */}
        <Image
          src="/assets/images/sign-in-banner.png"
          alt="Banner"
          width={364}
          height={764}
          className="block h-[764px] rounded-3xl object-cover lg:hidden"
          priority
        />

        {/* iPad */}
        <Image
          src="/assets/images/sign-in-banner.png"
          alt="Banner"
          width={455}
          height={820}
          className="hidden h-[820px] rounded-3xl object-cover lg:block xl:hidden"
          priority
        />

        {/* Desktop */}
        <Image
          src="/assets/images/sign-in-banner.png"
          alt="Banner"
          width={700}
          height={820}
          className="hidden h-[820px] rounded-3xl object-cover xl:block"
          priority
        />

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-transparent to-[#170645] opacity-80 mix-blend-multiply 2xl:rounded-[32px]" />
        <div className="absolute w-full md:bottom-6 md:px-6 2xl:bottom-12 2xl:px-12">
          <div className="flex flex-col md:gap-6 2xl:gap-8">
            <h3 className="font-poppins font-bold leading-10 text-white md:max-w-[240px] md:text-4xl lg:max-w-[300px] lg:text-5xl">
              Your Hobby Our Passion
            </h3>
            <div className="flex max-w-96 flex-col gap-0">
              <h4 className="font-inter text-base font-bold leading-relaxed text-white">
                Top Collections, Best Prices!
              </h4>
              <p className="font-inter text-sm font-normal leading-snug text-white/50">
                Discover rare and exclusive action figures that will make your
                collection stand out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
